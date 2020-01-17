import axios from "axios";
import apiconfig from '../apiconfig';
import Big from 'bignumber.js';
const config = {
  createJY: ['/v1/user/challenge','get'],
  createJYCode :['/v1/user/verification-code','post'],
  regi: ['/rp-user','post',1],
  sendhb: ['/rp-send','post',1],
  getyjrecord: ['/rp-receive','get',1],
  gethbrecord: ['/rp-send','get', 1],
  getviplevel: ['/rp-vip','get',1],
  shake: ['/rp-receive','post',1],
  getlatestrecord: ['/rp-last-issue','get', 1],
  getbalance: ['/rp-balance','get',1],
  upvip: ['/rp-vip','get', 1],
  getuserinfo: ['/rp-user','get', 1],
  getawardrecord: ['/rp-prize','get', 1],
  getinvitedrecord: ['/rp-invited','get', 1],
  getshakerecord: [p => `/rp-receive/${p.id}`,'get', 1],
  getissuedetail: [p => `/rp-issue/${p.id}`,'get', 1],
  getsaletime: ['/rp-config','get', 1]
};

let redirectToLogin = ctx => {
  let t = `./#/logintab/login?redirect=${location.origin+location.pathname}&hashuri=${location.hash.replace('#/','')}`;
  window.location.href = t;
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
    return (data, ctx) => {
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
          url: url2 + (typeof url == 'function' ? url(ctx.urlparams) : url),
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
              store.commit("givenLoginInfo", null);
              redirectToLogin(ctx);
            } else {
              msg.info(window.errorInfo(err.response));
              reject(err);
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
      
      return function destroy() {
        dom.removeEventListener("touchstart", touchstart, false);
        dom.removeEventListener("touchend", touchend, false);
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
  getpath() {
    let url = location.origin + location.pathname;
    let a = url.split('//');
    let b = a[1].split('/');
    let reg = /\.html$/g;
    b = b.filter(el => !reg.test(el)&&el);
    return a[0] + "//" + b.join('/')
  }

}
let utilinstance = new util()
export default utilinstance;