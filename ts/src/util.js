import Big from 'bignumber.js';
class util {
  constructor() {
    
  }
  isWX() {
    return navigator.userAgent.indexOf('MicroMessenger') > -1
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
  getTextWidth(text,size=12) {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext("2d");
    ctx.font = `{size}px`;
    return ctx.measureText(text+'').width;
  }
  getQueryString(name) {
    let reg = new RegExp("(&|\\?)" + name + "=([^&]*)(&|$)");
    let r = window.location.href.substr(0).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
  fromHex(hex, deci,weishu=2) {
    if (!hex) {
      return 0+'';
    }
    let t = Math.pow(10, Number(deci));
    let d = Big(hex, 16).div(t);
    return d.toFixed(weishu, 1);
  }
  dropHex(hex, deci = 0, weishu=2) {
    if(!hex) return 0;
    let t = Math.pow(10, Number(deci));
    return Big(hex).div(t).toFixed(weishu, 1);
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
  getDay(day){
    let today = new Date();
    let targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
    today.setTime(targetday_milliseconds); 
    let tYear = today.getFullYear();
    let tMonth = today.getMonth();
    let tDate = today.getDate();
  　return tYear+"-"+this.makeUp(tMonth+1)+"-"+this.makeUp(tDate);
  }
  getDayFromStr(str) {
    let reg = /^(\d+)h(\d+)m(\d+)s$/;
    if(!reg.test(str)) return 0;
    const t = str.match(reg)
    if(t) {
      let h = t[1], m = t[2], s = t[3];
      return Math.ceil(h/24)
    }
    return 0;
  }
  currency(s,n) {
    n = n > 0 && n <= 20 ? n : (n == 'group' ? "group" : (n === 0 ? 0 : 2));
    if(s == '' || s == undefined || s == null || isNaN(s)) {
      s = 0;
    }
    let bb = new Big(s);
    if(bb.isNaN()) {
      return '0.00'
    }
    let fmt = {
      prefix: '',
      decimalSeparator: '.',
      groupSeparator: ',',
      groupSize: 3,
      secondaryGroupSize: 0,
      fractionGroupSeparator: ' ',
      fractionGroupSize: 0,
      suffix: ''
    };
    
    return n == 'group' ? bb.toFormat(fmt) : bb.toFormat(n, 1, fmt);
  }
  format(time, format = "YY-MM-DD hh:mm:ss") {
    // time = time.replace(/-/g, "/")

    time = time || new Date();
    var date = new Date(time);
    var year = date.getFullYear(),
      month = date.getMonth() + 1, //月份是从0开始的
      day = date.getDate(),
      hour = date.getHours(),
      min = date.getMinutes(),
      sec = date.getSeconds();
    var preArr = Array.apply(null, Array(10)).map(function (elem, index) {
      return "0" + index;
    }); ////开个长度为10的数组 格式为 00 01 02 03
    var newTime = format
      .replace(/YY/g, year)
      .replace(/MM/g, preArr[month] || month)
      .replace(/DD/g, preArr[day] || day)
      .replace(/hh/g, preArr[hour] || hour)
      .replace(/mm/g, preArr[min] || min)
      .replace(/ss/g, preArr[sec] || sec);
  
    return newTime;
  }
  fix(n, dp=2, rm=1) {
    return Big(n).toFixed(dp, rm)
  }
  tranNumber(num, point=2) {
    num = this.fix(num, point)
    let numb = num.toString().split('.');
    let numStr = numb[0].toString();
    // 十万以内直接返回 
    if (numStr.length < 6) {
        return num;
    }
    // //大于8位数是亿
    // else if (numStr.length > 8) {
    //   return Big(numb).div(1e8).toFixed(point, 1) + ''
    //     return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿';
    // }
    //大于6位数是十万 (以10W分割 10W以下全部显示)
    else if (numStr.length > 5) {
        return Big(num).div(1e6).toFixed(point, 1) + 'W'
    }
  }
}
export default window.util = new util();