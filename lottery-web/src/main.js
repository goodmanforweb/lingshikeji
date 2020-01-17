import util from "./util/util";
import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import router from "./components/router";
import store from "./components/vuex";
import i18n from "./i18n";
import errorInfo from './error';
import Big from 'bignumber.js';
import dialogConfig from './components/widget/dialog/config';
import "element-ui/lib/theme-chalk/index.css";
import ElementUI from "element-ui";
require("promise.prototype.finally").shim();
Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(ElementUI);
//错误转换配置， 全局
window.errorInfo = errorInfo;


(function (window, store) {
  let login = localStorage.getItem("login");
  if (login) {
    store.commit("givenLoginInfo", JSON.parse(login));
  }

  if(window.innerWidth > 700 && navigator.userAgent.indexOf('Mac') == -1) {
    let style = document.createElement('style');
    style.setAttribute('type', "text/css");
    style.innerHTML = '::-webkit-scrollbar-corner{background-color:#fff}::-webkit-scrollbar-track{background-color:#fff}::-webkit-scrollbar-thumb{border-radius:10px;background-color:#666}::-webkit-scrollbar{width:10px;background-color:#666}';
    document.head.appendChild(style);
  }
})(window, store);


Vue.prototype.errorInfo = errorInfo;

Vue.filter("currency", function (s, n) {
  n = n > 0 && n <= 20 ? n : n === 0 ? 0 : 2;
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
  
  return bb.toFormat(n, 1, fmt);
});

Vue.filter("capitalize", function (s) {
  if (!s) return "";
  return s.substring(0, 1).toUpperCase() + s.substring(1);
});
Vue.filter("clip", function (s) {
  if (!s) return "";
  s = String(s);
  let len = s.length;
  return s.substring(0, 5) + "******" + s.substring(len - 5, len);
});
Vue.filter('toten', function (number) {
  return parseInt(number, 16)
});
Vue.filter("format", function (time, format = "YY-MM-DD hh:mm:ss") {
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
});

Vue.filter('makeUp', function(s, t) {
  return util.makeUp(s, t)
});

//使用于table
Vue.directive('loadmore', {
  bind(el, binding) {
    const tableBody = el.querySelector('.el-table__body-wrapper');
    el.scrollHandler = function () {
      const marker = 1
      const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
      if (scrollDistance <= marker) {
        typeof binding.value == 'function' && binding.value();
      }
    }
    tableBody.addEventListener('scroll', el.scrollHandler, false)
  },
  unbind(el) {
    const tableBody = el.querySelector('.el-table__body-wrapper');
    tableBody.removeEventListener('scroll', el.scrollHandler, false);
  }
});

Vue.directive('fetchmore', {
  bind(el, binding) {
    el.scrollHandler = function () {
      const marker = 1
      const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
      if (scrollDistance <= marker) {
        typeof binding.value == 'function' && binding.value();
      }
    }
    el.addEventListener('scroll', el.scrollHandler, false)
  },
  unbind(el) {
    el.removeEventListener('scroll', el.scrollHandler, false);
  }
});

export default new Vue({
  router,
  store,
  i18n,
  render: h => {
    return h(App)
  }
}).$mount("#app");