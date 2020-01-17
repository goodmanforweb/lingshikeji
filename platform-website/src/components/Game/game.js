import util from "../../util/util";
import {
  mapGetters,
  mapActions
} from "vuex";
import gamesocket from "./gameSocket2";
const regnumber = /^\d+(\.\d+)?$/;
const regdecimal = /^\d+(\.\d{1,2})?$/;
import ExchangePanel from "../ExchangePanel";
import Big from 'bignumber.js';
export default {
  components: {
    ExchangePanel
  },
  data() {
    return {
      assetLoader: false,
      betHistoryLoader: false,
      isMobile: window.innerWidth > 704,
      isBigScreen: window.innerWidth > 1500,
      historyResult: [],
      currentResultTableHeight: 250,
      currentResult: [],
      btnTopPriority: false,
      balanceMax: 1000,
      bettop: 1000,
      betfloor: 100,
      round: 1,
      firstMessageHasCome: false,
      man: {
        bet: 100,
        slider: 100,
        crash: 1,
        disable: false,
        btn: {
          bgcolor: "#808080",
          color: "#fff",
          txt: this.$t("ms.placebet"),
          icon: "",
          btnDisable: false
        }
      },
      auto: {
        state: true,
        rate: "",
        cubeValue: "20%",
        cube: [
          ["20%", true],
          ["40%", false],
          ["60%", false],
          ["80%", false]
        ],
        freshActive: false,
        btn: {
          bgcolor: "#f5bc03",
          color: "#11152e",
          txt: this.$t("ms.open"),
          btnDisable: false
        }
      },
      indicator: {
        wwidth: "",
        lwidth: "",
        wcolor: "",
        lcolor: ""
      }
    };
  },
  created() {
    this.pager = 0;
    this.count = null;
    this.size = 12;

    this.checkToken();
    this.createSocket();
    this.setBrowerBar();
    this.init();

  },
  computed: {
    ...mapGetters(["balance", "login"])
  },
  mounted() {
    this.initChartAfterMounted();
    this.$refs.currentResultTableDom && this.setCurrentResultTableHeight();
  },
  beforeDestroy() {
    window.removeEventListener(
      "resize",
      this.setCurrentResultTableHeight,
      false
    );
    this.chartDispose();
    this.closeWs();
  },
  methods: {
    ...gamesocket,
    ...mapActions(["getAsset"]),
    setBrowerBar() {
      document.title = "Funny Up";
      let targetLink = [...document.head.getElementsByTagName("link")].find(link => link.getAttribute('rel') == 'icon');
      targetLink && targetLink.setAttribute('href', 'game.ico');
    },
    setCurrentResultTableHeight() {
      this.$refs.currentResultTableDom && this.$nextTick(() => {
        
        this.currentResultTableHeight =
          this.$refs.currentResultTableDom.clientHeight - 10;
      });
    },
    swithTab(type) {
      type.name == 1 && (this.fresh(), this.setCurrentResultTableHeight());
    },
    saveMyRecord(data) {
      let mygamerecord = localStorage.getItem("mygamerecord") || "[]";
      mygamerecord = JSON.parse(mygamerecord);
      mygamerecord.unshift(data);
      localStorage.setItem("mygamerecord", JSON.stringify(mygamerecord));
    },
    loadMore() {
      if (this.betHistoryLoader) return;
      if (this.count) {
        if (this.pager * this.size >= this.count) {
          return false;
        }
      }
      this.pager++;
      this.showMyRecord();
    },
    showMyRecord(pager) {
      // let mygamerecord = localStorage.getItem("mygamerecord") || "[]";
      // return (this.historyResult = JSON.parse(mygamerecord));
      let currency = this.$options.filters.currency;
      this.betHistoryLoader = true;
      this.wssend("betHistory", {
        pager: pager || this.pager,
        size: this.size
      }, data => {
        this.betHistoryLoader = false;
        if (data.count > 0) {
          let result = data.bets.map(el => ({
            nickname: el.nickname,
            bet: currency(util.dropDec(el.bet)),
            rate: (util.dropDec(el.rate)).toFixed(2) + "x",
            profit: el.profit > 0 ?
              "+" + currency(util.dropDec(el.profit)) : currency(util.dropDec(el.profit)),
            rprofit: el.profit,
            userid: el.uid,
            round: el.round,
            room: el.room
          }));
          //存在是刷新， 直接覆盖原来的数据, 同时重置pager=1
          if (pager) {
            this.historyResult = result;
            this.pager = 1;
          }
          //不存在是在获取历史记录
          else {
            this.historyResult = this.historyResult.concat(result)
          }
          this.count = data.count
        }

      });
    },
    counterBalanceMax() {
      let value = this.balance.balance;
      value = Math.ceil(value);
      this.balanceMax = value - (value % 100);
    },
    givenBalanceToStore(data) {
      data && this.$store.commit("givenBalance", data);
    },
    checkHasMoney() {
      if (Number(this.balance.balance) < 100) {
        this.btnManager("showNoMoney");
      }
    },
    checkForPlaceBet() {
      if (Number(this.balance.balance) < 100) {
        this.btnManager("showNoMoney");
        return false;
      }
      if (!this.man.bet || !this.man.crash) {
        this.$message.info(this.$t("ms.checkempty"));
        return false;
      }
      if (!regnumber.test(this.man.bet) || !regnumber.test(this.man.crash)) {
        this.$message.info(this.$t("ms.checknumber"));
        return false;
      }
      if (String(this.man.bet).indexOf(".") > -1) {
        this.$message.info(this.$t("ms.checknodecimal"));
        return false;
      }
      if (Number(this.man.bet) < this.betfloor) {
        this.$message.info(this.$t("ms.shouldoverfloor"));
        return false;
      }
      if (Number(this.man.bet) > this.bettop) {
        this.$message.info(this.$t("ms.shouldnotovertop"));
        return false;
      }
      if (Number(this.man.bet) > Number(this.balance.balance)) {
        this.$message.info(this.$t("ms.betlessthanbalance"));
        return false;
      }
      if (Number(this.man.crash) <= 1) {
        this.$message.info(this.$t("ms.crashover1"));
        return false;
      }
      if (!regdecimal.test(this.man.crash)) {
        this.$message.info(this.$t("ms.onlytwodecimal"));
        return false;
      }
      if (Number(this.man.crash) > 200) {
        this.$message.info(this.$t("ms.crashlessthan200"));
        return false;
      }
      return true;
    },
    handleMan() {
      switch (this.CS.roundstatus) {
        case "ROUND_PREPARE":
          this.doPlaceBet();
          break;
        case "ROUND_RUNNING":
          this.doCashOut();
          break;
        default:
      }
    },
    handleAuto() {
      //开启
      if (this.auto.state) {
        if (Number(this.balance.balance) < 100) {
          this.autoBtnManager("showNoMoney");
          return false;
        }
        if (Number(this.auto.rate) <= 1) {
          this.$message.info(this.$t("ms.crashover1"));
          return false;
        }
        this.autoBtnManager("close");
        this.man.disable = true;
      }
      //关闭
      else {
        this.autoBtnManager("open");
        this.man.disable = false;
      }
      this.auto.state = !this.auto.state;
      console.log(this.auto.state);
    },
    autoBtnManager(type) {
      const config = {
        close: () => ({
          txt: this.$t("ms.close"),
          bgcolor: "#701747",
          color: "#fff"
        }),
        open: () => ({
          txt: this.$t("ms.open"),
          bgcolor: "#f5bc03",
          color: "#11152e"
        }),
        showNoMoney: () => {
          //没有钱 有最高优先级，一旦设置，不可被覆盖,除了自己覆盖自己
          //可以通过设置auto.btn.btnDisable=false 减除最高级
          this.btnManager("showNoMoney");
          return {
            txt: this.$t("ms.nomoney"),
            bgcolor: "#808080",
            color: "#fff",
            btnDisable: true
          };
        }
      };

      this.auto.btn = config[type]();
    },
    doAutoGame(type) {
      switch (type) {
        case "placebet":
          if (Number(this.balance.balance) < 100) {
            this.autoBtnManager("showNoMoney");
            return false;
          }
          this.wssend(
            "bet", {
              // bet: Math.round((Number(this.auto.cubeValue.replace("%", "")) / 100) * Number(this.bettop)) *100 +"",
              bet: Big(this.auto.cubeValue.replace("%", "")).div(100).times(this.bettop).times(100).valueOf(),
              rate: Big(this.auto.rate).times(100).valueOf()
            },
            () => {}
          );
          break;
        case "cashout":
          break;
        default:
      }
    },
    doPlaceBet() {
      if (!this.CS.isBet && this.checkForPlaceBet()) {
        //按钮显示betting
        this.btnManager("showLoader");
        //设置betting 不能点击
        this.CS.isBet = "NOCLICK";
        this.wssend(
          "bet", {
            bet: Big(this.man.bet).times(100).valueOf(),
            rate: Big(this.man.crash).times(100).valueOf()
          },
          () => {
            //在running 前应答 显示loader 等待 running 去显示cashout
            if (this.CS.roundstatus == "ROUND_PREPARE") {
              this.btnManager("showBetSuc");
            } else if (this.CS.roundstatus == "ROUND_RUNNING") {
              //在running 后应答
              this.btnManager("doCashOut");
            }
            this.CS.isBet = true;
          }
        );
      }
    },
    doCashOut() {
      if (this.CS.isBet == true && !this.CS.isCashout) {
        // 设置cashout中，不能再次点击
        this.CS.isCashout = "NOCLICK";
        this.wssend(
          "cashout", {},
          () => {
            //this.$msg.info('cash out successfully');
          }
        );
      }
    },
    handleTimes($event) {
      let target = $event.target;
      let type = target.getAttribute("type");
      let t = 1;
      if (type == "add") {
        if (this.man.crash * 2 <= 200) {
          t = this.man.crash ? this.man.crash : 1;
          this.man.crash = 2 * t;
        }
      } else if (type == "reduce") {
        if (this.man.crash / 2 >= 1) {
          this.man.crash = Math.ceil(this.man.crash / 2);
        }
      }
    },
    handleTimesAuto($event) {
      let target = $event.target;
      let type = target.getAttribute("type");
      let t = 1;
      if (type == "add") {
        if (this.auto.rate * 2 <= 200) {
          t = this.auto.rate ? this.auto.rate : 1;
          this.auto.rate = 2 * t;
        }
      } else if (type == "reduce") {
        if (this.auto.rate / 2 >= 1) {
          this.auto.rate = Math.ceil(this.auto.rate / 2);
        }
      }
    },
    chooseCube(e) {
      let target = e.target;
      let idx = target.getAttribute("datakey");
      this.auto.cube = this.auto.cube.map((cb, index) => {
        index == idx ?
          ((cb[1] = true), (this.auto.cubeValue = cb[0])) :
          (cb[1] = false);
        return cb;
      });
    },
    fresh() {
      this.auto.freshActive = true;
      this.auto.rate = (Math.random() * 99 + 1).toFixed(2);
      setTimeout(() => {
        this.auto.freshActive = false;
      }, 1000);
    },
    btnManager(type) {
      const cashOutBtnConfig = {
        disableJoinGame: () => ({
          txt: this.$t("ms.placebet"),
          bgcolor: "#808080",
          color: "#fff"
        }),
        joinGame: () => ({
          txt: this.$t("ms.placebet"),
          bgcolor: "#f5bc03",
          color: "#11152e"
        }),
        showLoader: () => ({
          txt: this.$t("ms.betting"),
          bgcolor: "#f5bc03",
          color: "#11152e",
          showLoader: true
        }),
        showBetSuc: () => ({
          txt: this.$t("ms.betsuc"),
          bgcolor: "#f5bc03",
          color: "#11152e",
          showLoader: true
        }),
        doCashOut: () => ({
          txt: this.$t("ms.crashout"),
          bgcolor: "#70a700",
          color: "#fff"
        }),
        winCashOut: () => ({
          txt: this.$t("ms.crashout"),
          bgcolor: "#70a700",
          color: "#fff",
          icon: "el-icon-check"
        }),
        lossCashOut: () => ({
          txt: this.$t("ms.crashout"),
          bgcolor: "#701747",
          color: "#fff",
          icon: "el-icon-close"
        }),
        waitNextGame: () => ({
          txt: this.$t("ms.waitnextgame"),
          bgcolor: "#808080",
          color: "#fff"
        }),
        showNoMoney: () => {
          //没有钱 有最高优先级，一旦设置，不可被覆盖,除了自己覆盖自己
          //可以通过设置man.btn.btnDisable=false 减除最高级
          return {
            txt: this.$t("ms.nomoney"),
            bgcolor: "#808080",
            color: "#fff",
            btnDisable: true
          };
          this.autoBtnManager("showNoMoney");
        }
      };

      if (!this.man.btn.btnDisable || type == "showNoMoney") {
        return (this.man.btn = cashOutBtnConfig[type]());
      }
    },
    addRowClass({
      row
    }) {
      return row.profit > 0 ? "win" : row.profit < 0 ? "loss" : "flat";
    },
    addCellClass({
      row,
      column,
      rowIndex,
      columnIndex
    }) {
      if (columnIndex == 4) {
        return row.rprofit > 0 ? "win" : row.rprofit < 0 ? "loss" : "flat";
      }
    },
    checkToken() {
      util
        .checkToken({
          data: {
            token: this.login.token
          }
        }, {}, this)
        .then(res => {
          if (res.status == 200 && res.data.code == 0) {
            if (!!res.data.status) {} else {
              this.$message.info(this.$t("ms.loginvalid"));
              this.$store.commit("givenLogin", {
                token: "timeout"
              });
              setTimeout(() => {
                this.$router.push({
                  name: "Login"
                });
              }, 1000);
            }
          }
        })
        .catch(err => {
          this.$message.info(this.$t("ms.loginvalid"));
          this.$store.commit("givenLogin", {
            token: "timeout"
          });
          setTimeout(() => {
            this.$router.push({
              name: "Login"
            });
          }, 1000);
        });
    }
  },
  watch: {
    balance: {
      deep: true,
      handler: function (n, o) {
        // this.counterBalanceMax();
      }
    },
    "man.slider": function (n, o) {
      this.man.bet = isNaN(n) ? 100 : Number(n);
    }
  }
};