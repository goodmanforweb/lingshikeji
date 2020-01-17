import axios from "axios";
import apiconfig from 'apiconfig';
import Big from 'bignumber.js';
const config = {
  getRequestId: ['/request-id', 'get'],
  getLoginInfo: ['/oauth', 'post'],
  getRoomList: ['/rooms','get'],
  getIssueList: ['/issues', 'get'],
  buyLottery: ['/buy', 'post', 1],
  exchange: ['/unified-order', 'post', 1],
  whithdraw: ['/withdraw', 'post', 1],
  getExchangeRecord:['/recharges', 'get', 1],
  getWidthdrawRecord: ['/withdraw', 'get', 1],
  getLotteryRecord: ['/tickets', 'get', 1],
  getLotteryRecordByRoom: ['/tickets-by-room', 'get', 1],
  getWallet: ['/user-info', 'get', 1],
  acceptPrize: ['/accpet', 'post', 1],
  getHotNumber: ['/issue-frequency', 'get', 1],
  getHotNumberByRoom: ['/number-frequency', 'get', 1],
  getHotPareByRoom: ['/paris-frequency', 'get', 1],
  getRoomAwardPool: [p => `/wallet/${p.roomid}`, 'get'],
  getTotalRoomAward: [p => `/user-level/${p.roomid}`, 'get', 1],
  getTotalGamePool: ['/game-pool', 'get']
};

let redirectToLogin = ctx => {
  if (ctx.$route.name != 'login') {
    //记录query
    let t = ctx.$route.query,
      obj = {};
    for (let k in t) {
      if (Object.hasOwnProperty.call(t, k)) {
        obj[k] = t[k];
      }
    }
    //双重保险
    sessionStorage.setItem('cjoyquery', JSON.stringify(obj));
    ctx.$router.push({
      name: "login",
      query: {
        redirect: ctx.$route.name,
        ...obj
      }
    });
  }
};
class util {
  constructor() {
    this.init();
  }
  init() {
    Object.keys(config).forEach(key => {
      this[key] = this.ajax(config[key][1], config[key][0], config[key][2]);
    });
  }
  ajax(method, url, hasToken) {
    return (data = {}, ctx) => {
      let login = JSON.parse(localStorage.getItem("login") || "{}");
      if (hasToken && !login.token) {
        redirectToLogin(ctx)
      }

      let msg = ctx.$message,
        store = ctx.$store,
        router = ctx.$router,
        i18n = ctx.$i18n;
      return new Promise((resolve, reject) => {
        let config = {
          method,
          url: `https://${apiconfig.url+ (typeof url == 'function' ? url(data) : url)}`,
          responseType: "json",
          headers: hasToken ? {
            authorization: `Bearer ${login.token}`
          } : {},
          ...data
        };
        axios(config)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            if (err.response && err.response.status == 401) {
              msg.info(i18n.t("ms.loginvalid"));
              //token 失效
              store.commit("givenLoginInfo", null);
              //ctx.$route是引用
              redirectToLogin(ctx);
            } else {
              reject(err);
              // msg.info(errorInfo(err.response));
            }
          });
      });
    };
  }

  ws(token, room) {
    let ws = null;
    try {
      ws = new WebSocket(
        `wss://${apiconfig.url}/ws?token=${token}&room=${room}`
      );
    } catch (error) {
      alert(error);
      console.log(error, "error");
    }
    return ws;
  }

  getStyle(element, styleName) {
    try {
      var computed = window.getComputedStyle(element);
      return computed ? computed[styleName] : null;
    } catch (e) {
      return element.style[styleName];
    }
  }
  getSysLang() {
    let lang = navigator.systemLanguage ?
      navigator.systemLanguage :
      navigator.language;
    return lang.substr(0, 2);
  }
  getDomPosition(target) {
    if (!target) return [0, 0];
    let position = [target.offsetLeft, target.offsetTop];
    target = target.offsetParent;
    while (target) {
      position[0] += target.offsetLeft;
      position[1] += target.offsetTop;
      target = target.offsetParent;
    }
    return position;
  }
  getScrollTop(target) {
    let scrollTop = 0;
    if (target) {
      scrollTop = target.scrollTop;
    } else if (document.documentElement && document.documentElement.scrollTop) {
      scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
      scrollTop = document.body.scrollTop;
    }
    return scrollTop;
  }
  isScrollShow(target) {
    const wSize = [window.innerWidth, window.innerHeight];
    const divSize = [target.clientWidth, target.clientHeight];
    const divPosition = this.getDomPosition(target);
    const divYCenter = divPosition[1] + divSize[1] / 2;
    const wScrollYCenter = this.getScrollTop() + wSize[1] / 2;
    return Math.abs(wScrollYCenter - divYCenter) < 200;
  }
  checkDomPosition(target) {
    const wSize = [window.innerWidth, window.innerHeight];
    const divSize = [target.clientWidth, target.clientHeight];
    const divPosition = this.getDomPosition(target);
    const divBottomHeight = divPosition[1] + divSize[1];
    const wScroll = this.getScrollTop();
    const divYCenter = divPosition[1] + divSize[1] / 2;
    const wScrollYCenter = wScroll + wSize[1] / 2;

    //向上影藏了
    if (wScroll > divBottomHeight) {
      return 'hide';
    }
    //向下影藏
    else if (divPosition[1] > (wScroll + wSize[1])) {
      return 'hide';
    }
    //div中点是否在屏幕-+200处
    else if (Math.abs(wScrollYCenter - divYCenter) < 350) {
      return 'show';
    } else {
      return 'transition';
    }
  }
  getQueryString(name) {
    let reg = new RegExp("(&|\\?)" + name + "=([^&]*)(&|$)");
    let r = window.location.href.substr(0).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
  fromHex(hex, deci, type = 'number') {
    if (!hex) {
      return 0;
    }
    let t = Math.pow(10, Number(deci));
    let d = Big(hex, 16).div(t);
    return type == 'number' ? d.toNumber() : d.valueOf();
  }
  toHex(hex, deci = 8) {
    if (!hex) {
      return '';
    }
    let t = Math.pow(10, Number(deci));
    return Big(hex).times(t).toString(16);
  }
  dropDec(number, deci = 100) {
    if (!number) {
      return 0;
    }
    return Big(number).div(deci).toNumber();
  }

  makeUp(number, len = 2) {
    if(isNaN(number)) return number;
    if(number == undefined) return '';
    let t = len - String(number).length;

    return t > 0 ? '0'.repeat(t)+ String(number) : String(number);
  }
  isEmpty(obj) {
    let t = ({}).toString.call(obj);
    let cf = {
      "[object Object]": (obj) => Object.keys(obj).length > 0,
      "[object Array]": (obj) => obj.length > 0,
      "[object Number]": () => true,
      "[object Boolean]": () => obj,
      "[object String]": () => {
        if(obj == 'undefined' || obj == 'null' || obj.trim() == '') {
          return false
        }
        else {
          return true;
        }
      },
      "[object Null]": () => false,
      "[object Undefined]": () => false,
    }[t](obj);
    return !cf;
  }
}

export default new util();