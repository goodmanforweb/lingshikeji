import axios from "axios";
import apiconfig from 'apiconfig';
import kj from '../components/newkj/components/api';
import Big from 'bignumber.js';
// import errorInfo from '../error/index';
const config = {
  verifyMan: ["/challenge", "post"],
  verifyValidate: ["/validate", "post"],
  register: ["/register", "post"],
  login: ["/login", "post"],
  getAssetLists: ["/assets", "get"],
  getAsset: ["/balance-of-asset", "get", 1],
  getGameLists: ["/game", "get"],
  getReports: ["/announcement", "get"],
  getWater: ["/water", "get", 1],
  getWaterLists: ["/water-of-community", "get", 1],
  updateUser: ["/reset-password", "post"],
  getCode: ["/valid-code", "post"],
  widthDraw: ["/withdraw", "post", 1],
  getWithdrawRecords: ["/withdraw", "get", 1],
  getRiskLog: ['/risk-log', "get", 1],
  getDepositRecords: ["/deposit", "get", 1],
  getPerInfo: ['/per-info', "get"],
  checkToken: ['/check-token', 'post'],
  checkHasInvite: ['/invite-status', 'get'],
  doOath: ['/oauth', 'post', 1],
  getOrderInfo: ['/pay', 'get', 1],
  doPay: ['/pay', 'post', 1],
  checkName: ['/check-name', 'get'],
  checkPhone: ['/check-phone', 'get'],
  getBlockHeight: ['/block-number', 'get'],
  //矿机api
  ...kj
};
const headStore = Array.from({
  length: 19
}).map((el, i) =>
  require(`../assets/images/head${i + 1}.png`)
);
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
    return (data, otherparam, ctx) => {
      let login = JSON.parse(localStorage.getItem("login") || "{}");
      if (hasToken && !login.token) {
        redirectToLogin(ctx)
      }

      let msg = ctx.$message,
        store = ctx.$store,
        router = ctx.$router,
        i18n = ctx.$i18n;
      return new Promise((resolve, reject) => {
        let url2 = `https://${apiconfig.url}`;
        let config = {
          method,
          url: url2 + url,
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
              store.commit("givenLogin", {
                token: "timeout"
              });
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
  UsernameToHead(str) {
    if (!str) return headStore[0];
    let code = str.charCodeAt(0);
    let number = code == 19 ? 19 : code % 19;
    return headStore[number == 0 ? 0 : number - 1];
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

  touch(dom, cb) {
    let startx, starty;
      function getAngle(angx, angy) {
        return Math.atan2(angy, angx) * 180 / Math.PI;
      };
  //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
      function getDirection(startx, starty, endx, endy) {
          let angx = endx - startx;
          let angy = endy - starty;
          let result = 0;

          //如果滑动距离太短
          if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
            return result;
          }

          let angle = getAngle(angx, angy);
          if (angle >= -135 && angle <= -45) {
            result = 1;
          } else if (angle > 45 && angle < 135) {
            result = 2;
          } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
            result = 3;
          } else if (angle >= -45 && angle <= 45) {
            result = 4;
          }
          return result;
      }
      //手指接触屏幕
      const touchstart = function(e) {
            startx = e.touches[0].pageX;
            starty = e.touches[0].pageY;
      };
      const touchend = function(e) {
        let endx, endy;
        endx = e.changedTouches[0].pageX;
        endy = e.changedTouches[0].pageY;
        let direction = getDirection(startx, starty, endx, endy);
            if(direction != 0) {
              cb && cb(direction);
            }
      };

      dom.addEventListener("touchstart", touchstart, false);
      //手指离开屏幕
      dom.addEventListener("touchend", touchend, false);
      
      return {
        touchstart,
        touchend
      }
  }
  checkSys() {
    let ua = navigator.userAgent.toLowerCase();    
    if (/iphone|ipad|ipod/.test(ua)) {
            return 'ios'       
    } else if (/android/.test(ua)) {
            return 'andriod'
    }
    return 'pc'
  }
  getpath() {
    let url = location.origin + location.pathname;
    let a = url.split('//');
    let b = a[1].split('/');
    let reg = /\.html$/g;
    b = b.filter(el => !reg.test(el)&&el);
    return a[0] + "//" + b.join('/')
  }
}

export default new util();