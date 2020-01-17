import game from "./eth";
import onlyId from './onlyId';
import util from "../../util/util";
import Big from 'bignumber.js';

const notice = [
  "CODE_ROOM_EVT_STATUS",
  "CODE_ROOM_EVT_RATE_CHANGED",
  "CODE_ROOM_EVT_PLACE_BET",
  "CODE_ROOM_EVT_CASHOUT",
  "CODE_CHAT",
  "CRC"
];
const wsconfig = {
  bet: ({
    id,
    bet,
    rate
  }) => ({
    id,
    code: "CODE_PLACE_BET",
    bet, // 下注金额，x100后取整传递。也就是说协议里面的float只保留两位小数
    rate // 同上，倍率
  }),
  cashout: ({
    id
  }) => ({
    id,
    code: "CODE_CASH_OUT"
  }),
  buy: ({
    id,
    value
  }) => ({
    id,
    code: "CODE_BUY",
    value
  }),
  sell: ({
    id,
    value
  }) => ({
    id,
    code: "CODE_SELL",
    value
  }),
  balance: ({
    id
  }) => ({
    id,
    code: "CODE_BALANCE"
  }),
  exchangeHistory: ({
    id,
    pager,
    size
  }) => ({
    id,
    code: "CODE_BUY_SELL_HISTORY",
    page: {
      offset: (pager - 1) * size,
      size,
      orderby: "create_time", //选填
      order: "desc" // 选填
    }
  }),
  betHistory: ({
    id,
    pager,
    size
  }) => ({
    id,
    code: "CODE_BET_HISTORY",
    page: {
      offset: (pager - 1) * size,
      size,
      orderby: "place_time", //选填
      order: "desc" // 选填
    }
  }),
  chat: ({
    id,
    chat
  }) => {
    return {
      id,
      code: "CODE_CHAT",
      chat: JSON.stringify(chat)
    };
  }
};

export default {
  init() {
    this.wsCBManager = Object.create(null);
    this.wsopened = false;
    this.loaderShow = false;
    this.renderChart = this.renderChart();
    // currentState;
    this.CS = {
      roundstatus: "",
      isBet: false, //false NOCLIK true
      isCashout: false, // fakse NOCLIK true
      room: "",
      round: ""
    };
    //currentRecord
    this.CR = {
      my: {
        bet: [],
        cash: []
      },
      other: {
        bet: [],
        cash: []
      },
      win: 0,
      loss: 0,
      bet: 0,
      cash: 0
    };
    //history record
    this.firstMessageFlag = 1;
  },
  wsopen() {
    this.wsopened = true;
    this.loaderShow = false;
    this.assetLoader = false;
    this.afterOpen();
  },
  afterOpen() {
    //刷新 兑换组件的  余额
  },
  afterFirstMessageCome(data) {
    this.firstMessageHasCome = true;
    this.showMyRecord(1);
    this.checkHasMoney();
  },
  wssend(type, data, res, err) {
    if (!this.wsopened) {
      return false;
    }
    //添加进管理器
    //给定一个唯一的数字id
    data.id = onlyId();
    this.wsCBManager[data.id] = {
      [data.id]: type,
      //添加room round 做应答进一步确认是本应答
      room: this.CS.room,
      round: this.CS.round,
      res,
      err
    };
    // ROUND_PREPARE ROUND_RUNNING ROUND_STOPPED
    this.ws.send(JSON.stringify(wsconfig[type](data)));
  },
  wsclose(e) {
    // console.log(e,'close')
    if (this.wsclosetype == "self") {
      return this.wsclosetype = '';
    }
    this.chartDispose();
    setTimeout(() => {
      this.$message.info(this.$t("ms.autolink"));
      this.createSocket();
    }, 3000);
  },
  tickforCreateWs() {
    setTimeout(() => {
      if (!this.wsopen) {
        //尝试第二次连接
        this.$message.info(this.$t("ms.reconnect"));
        this.createSocket();
      }
    }, 2000);
  },
  closeWs() {
    this.wsclosetype == 'self';
    this.ws.close();
  },
  createSocket() {
    this.assetLoader = true;
    this.ws = util.ws(this.login.token, this.$route.query.room);
    // console.log(this.ws, this.ws.status);
    this.wsopened = false;
    this.ws.addEventListener("message", this.wsmessage);
    this.ws.addEventListener("close", this.wsclose);
    this.ws.addEventListener("open", this.wsopen);
    this.ws.addEventListener("error", this.wserror);
    this.tickforCreateWs();
  },
  wserror(e) {
    // console.log(e, e.statusCode)
  },
  wsmessage(evt) {
    let data = JSON.parse(evt.data);
    let code = data.code || data[0].code;
    //可以按id分类
    if (code == "CODE_SUCCEED") {
      if (
        this.wsCBManager[data.id] &&
        this.wsCBManager[data.id].room == this.CS.room &&
        this.wsCBManager[data.id].round == this.CS.round
      ) {
        this.wsCBManager[data.id].res(data);
        delete this.wsCBManager[data.id];
      }
    } else if (code == "CODE_ERROR") {
      if (
        this.wsCBManager[data.id] &&
        this.wsCBManager[data.id].room == this.CS.room &&
        this.wsCBManager[data.id].round == this.CS.round
      ) {
        this.wsCBManager[data.id].err ?
          this.wsCBManager[data.id].err(code.errmsg) :
          this.$message.warning(code.errmsg);
        delete this.wsCBManager[data.id];
      } else {
        this.$message.warning("unknow error");
      }
    } else if (notice.includes(code)) {
      this.handleWSMessage(data, code);
    }
  },
  handleWSMessage(data, code) {
    switch (code) {
      case "CODE_ROOM_EVT_RATE_CHANGED":
        // this.handleRateChange(data);
        break;
      case "CODE_ROOM_EVT_STATUS":
        this.handleRoomStatus(data);
        break;
      case "CODE_ROOM_EVT_PLACE_BET":
        this.handlePlaceBet(data);
        break;
      case "CODE_ROOM_EVT_CASHOUT":
        this.handleCashOut(data);
        break;
      case "CRC":
        // this.handleChat(data);
        break;
      default:
    }
  },
  handleRoomStatus(data) {
    let swichObj = {
      ROUND_PREPARE: data => {
        //清空上一局记录
        this.currentResult = [];
        this.CS.roundstatus = "ROUND_PREPARE";
        this.CS.room = data.room;
        this.CS.round = data.round;
        this.round = data.round;
        data.bettop && (this.bettop = util.dropDec(data.bettop));
        data.betfloor && (this.betfloor = util.dropDec(data.betfloor));
        data.balance &&
          this.givenBalanceToStore({
            balance: util.dropDec(data.balance)
          });
        this.showMyRecord(1);
        //分支 判断是手动true，还是自动模式false

        if (this.auto.state) {
          //显示可以下注
          this.btnManager("joinGame");
        } else {
          //自动， 开局就下注
          this.doAutoGame("placebet");
        }
        this.showProgress("init");
        //显示倒计时
        this.renderChart.STARTING(data);
        //显示下注
      },
      ROUND_RUNNING: data => {
        this.CS.roundstatus = "ROUND_RUNNING";
        this.CS.room = data.room;
        this.CS.round = data.round;
        this.round = data.round;
        data.bettop && (this.bettop = util.dropDec(data.bettop));
        data.betfloor && (this.betfloor = util.dropDec(data.betfloor));
        data.balance &&
          this.givenBalanceToStore({
            balance: util.dropDec(data.balance)
          });
        if (this.auto.state) {
          //这个节点 判断isBet 状态，来确定是否下注， 下注中
          if (this.CS.isBet == false) {
            // 没有下注 显示等待下一局
            this.btnManager("waitNextGame");
          } else if (this.CS.isBet == "NOCLICK") {
            //已经下注但没有收到响应， 继续显示加载图
          } else if (this.CS.isBet == true) {
            // 已经下注成功， 并且没有cashout. 显示cashout按钮
            !this.CS.isCashout && this.btnManager("doCashOut");
          }
        }
        //显示rate 变化
        this.renderChart.PROGRESS(data);
        //显示cashout
      },
      ROUND_STOPPED: data => {
        this.CS.roundstatus = "ROUND_STOPPED";
        this.CS.room = data.room;
        this.CS.round = data.round;
        this.round = data.round;
        data.bettop && (this.bettop = util.dropDec(data.bettop));
        data.betfloor && (this.betfloor = util.dropDec(data.betfloor));
        this.makeCashout(util.dropDec(data.rate));
        this.renderChart.ENDED(data);
        this.showProgress("wl");

        this.showMyRecord(1);
        if (this.auto.state) {
          //清空CS 某些状态
          Object.assign(this.CS, {
            isBet: false,
            isCashout: false
          });
          Object.assign(this.CR, {
            win: 0,
            loss: 0,
            bet: 0,
            cash: 0
          });
        }
        data.balance &&
          this.givenBalanceToStore({
            balance: util.dropDec(data.balance)
          });
      }
    } [data.status](data);
    //处理第一次message come 的回调
    this.firstMessageFlag == 1 &&
      (this.afterFirstMessageCome(data), (this.firstMessageFlag = 2));
  },
  handlePlaceBet(data) {
    let currency = this.$options.filters.currency;

    let record = {
      nickname: data.nickname,
      bet: currency(util.dropDec(data.bet)),
      rbet: util.dropDec(data.bet),
      rate: 0,
      profit: 0,
      userid: data.userid
    };

    if (data.userid == this.login.user.id) {
      this.currentResult.unshift(record);
    } else {
      //如果已经把自己放在首位，其他放在之后；自己没在首位，其他放首位
      this.currentResult[0] &&
        this.currentResult[0].userid == this.login.user.id ?
        this.currentResult.splice(1, 0, record) :
        this.currentResult.unshift(record);
    }
    this.CR.bet++;
  },
  updateOldBet(cashout = []) {
    let newRecords = this.currentResult.slice(0);
    let isOldOne = false;
    //如果bet 存在，就替换；没有就放到数组顶部
    cashout.forEach(cash => {
      this.currentResult.forEach((bet, index) => {
        if (bet.userid == cash.userid) {
          newRecords[index] = cash;
          isOldOne = true;
        }
      });

      if (!isOldOne) {
        newRecords.unshift(cash);
      }
      isOldOne = false;
    });

    return newRecords;
  },
  handleCashOut(data) {
    let currency = this.$options.filters.currency;
    if (Array.isArray(data)) {
      let mycashoutrecord = false;
      this.CR.cash += data.length;
      let crec = data.map((dd, index) => {
        let newrate = 0;
        let {
          rate,
          bet,
          profit,
          nickname,
          userid,
          round,
          room
        } = data;
        bet = currency(util.dropDec(bet));
        profit = util.dropDec(profit);
        newrate = (util.dropDec(rate)).toFixed(2);
        rate = newrate + "x";
        rprofit > 0 ? this.CR.win++ : this.CR.loss++;
        if (userid == this.login.user.id) {
          mycashoutrecord = {
            nickname,
            bet,
            rate,
            profit,
            userid
          };
          this.saveMyRecord({
            nickname,
            bet,
            rate,
            profit,
            userid,
            round,
            room
          });
        }
        //canvas 上显示cashout
        this.chart.escape({
          nickname,
          bet,
          rate: newrate,
          profit,
          userid
        });
        return {
          nickname,
          bet,
          rate,
          profit,
          userid
        };
      });

      if (mycashoutrecord) {
        this.CS.isCashout = true;
        Number(mycashoutrecord.profit) > 0 ?
          this.btnManager("winCashOut") :
          this.btnManager("lossCashOut");
      }
      this.currentResult = this.updateOldBet(crec);
    } else {
      let {
        rate,
        bet,
        profit,
        nickname,
        userid,
        round,
        room
      } = data;
      let newrate = 0;
      bet = currency(util.dropDec(bet));

      newrate = (util.dropDec(rate)).toFixed(2);
      rate = newrate + "x";
      profit = util.dropDec(profit);
      profit > 0 ? this.CR.win++ : this.CR.loss++;
      if (userid == this.login.user.id) {
        this.CS.isCashout = true;
        this.saveMyRecord({
          nickname,
          bet,
          rate,
          profit,
          userid,
          round,
          room
        });
        Number(profit) > 0 ?
          this.btnManager("winCashOut") :
          this.btnManager("lossCashOut");
      }
      this.chart.escape({
        nickname,
        bet,
        rate: newrate,
        profit,
        userid
      });
      this.currentResult = this.updateOldBet([{
        nickname,
        bet,
        rate,
        profit,
        userid
      }]);
      this.CR.cash++;
    }
    this.showProgress("cp");
  },
  makeCashout(stopRate) {
    this.currentResult.filter(el => el.rate == 0).map(el => {
      this.CR.cash++;
      this.CR.loss++
      el.rate = stopRate;
      el.profit = -100;
      return el;
    });
  },
  showProgress(type) {
    let {
      wwidth,
      lwidth,
      wcolor,
      lcolor
    } = {
      init: {
        wwidth: 1,
        lwidth: 0,
        wcolor: "#808080",
        lcolor: ""
      },
      //cashout/placebet
      cp: {
        wwidth: this.CR.cash,
        lwidth: this.CR.bet,
        wcolor: "#11E763",
        lcolor: "#8C8C8C"
      },
      //win/loss
      wl: {
        wwidth: this.CR.win,
        lwidth: this.CR.loss,
        wcolor: "#70A700",
        lcolor: "#EA0070"
      }
    } [type];
    this.indicator = {
      wwidth: `${(wwidth * 100) / (wwidth + lwidth)}%`,
      lwidth: `${(lwidth * 100) / (wwidth + lwidth)}%`,
      wcolor: wcolor,
      lcolor: lcolor
    };
  },
  initChartAfterMounted() {
    if (!this.chart) {
      this.chart = new game();
    }
    this.chart.startRendering(this.$refs.chart);
    console.log(this);
    this.renderChart.CONNECTION();
    // setInterval(() => {
    //   console.log(this.chart.currentGamePayout, "909090");
    //   let data = {
    //     rate: this.chart.currentGamePayout
    //   };
    //   this.chart.escape(data);
    //   setTimeout(() => {
    //     this.chart.escape(data);
    //   }, 120);
    // }, 5000);
    return this.chart;
  },
  renderChart() {
    return {
      CONNECTION: param => {
        this.chart.state = "CONNECTION";
      },
      STARTING: param => {
        this.chart.state = "STARTING";
        this.chart.startTime = Date.now() + Number(param.duration);
      },
      PROGRESS: param => {
        this.chart.state = "PROGRESS";
        this.chart.startTime = Date.now() - Number(param.duration);
      },
      ENDED: param => {
        this.chart.state = "ENDED";
        this.chart.endRate = param.rate;
      }
    };
  },
  chartDispose() {
    this.chart.stopRendering();
  }
};