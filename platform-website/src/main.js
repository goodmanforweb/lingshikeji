import util from "./util/util";
import Vue from "vue";

import VueRouter from "vue-router";
import router from "./components/router";
import store from "./components/vuex";
import i18n from "./i18n";
import errorInfo from './error';
import Big from 'bignumber.js';





import App from "./App.vue";
import KJAPP from './components/newkj/index';




import "element-ui/lib/theme-chalk/index.css";
import ElementUI from "element-ui";
require("promise.prototype.finally").shim();
Vue.config.productionTip = false;
import DiolaogConfigRun from './components/newkj/components/widgets/dialog/config.js';
Vue.use(DiolaogConfigRun);
Vue.use(VueRouter);
Vue.use(ElementUI);

function isWeixin() {
  let ua = window.navigator.userAgent.toLowerCase();
  return ua.indexOf('micromessenger') > -1
};

(function (window, store) {

  //全局跳转
  if (isWeixin) {
    let rg = /from=(groupmessage|singlemessage|timeline)/ig;
    let href = window.location.href;
    if (rg.test(href)) {
      const inviteid = util.getQueryString('inviteid');
      if (inviteid) {
        if (href.indexOf('poster') > -1) {
          window.location.href = window.location.origin + '/#/poster?inviteid=' + inviteid;
        } else if (href.indexOf('register') > -1) {
          window.location.href = window.location.origin + '/#/logintab/register?inviteid=' + inviteid;
        }
      }
    }
  }
  const checkItems = ['', 'singlemessage', 'timeline'];

  let login = localStorage.getItem("login");
  let audio = localStorage.getItem('kjaudio');
  if (login) {
    store.commit("givenLogin", JSON.parse(login));
  }
  if (audio) {
    store.commit("givenAudio", JSON.parse(audio));
  }

  if(window.innerWidth > 700 && navigator.userAgent.indexOf('Mac') == -1) {
    let style = document.createElement('style');
    style.setAttribute('type', "text/css");
    style.innerHTML = '::-webkit-scrollbar-corner{background-color:#fff}::-webkit-scrollbar-track{background-color:#fff}::-webkit-scrollbar-thumb{border-radius:4px;background-color:#666}::-webkit-scrollbar{width:8px;background-color:#666}';
    document.head.appendChild(style);
  }
})(window, store);


Vue.prototype.errorInfo = errorInfo;

Vue.filter("currency", function (s, n) {
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
Vue.filter('usernameToHead', function (username) {
  return util.UsernameToHead(username);
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



new Vue({
  router,
  store,
  i18n,
  methods: {
    setBodyLang() {
      const html = document.documentElement.classList;
      html.remove("zh");
      html.remove("en");
      html.remove("kjfont");
      html.add(this.$i18n.locale);
      if (this.$i18n.locale != "en") {
        if (this.$route.name && this.$route.name.indexOf("kj") > -1) {
          html.add("kjfont");
        }
      }
    }
  },
  watch: {
    $route: function() {
      this.setBodyLang();
    },
    "$i18n.locale": {
      immediate: true,
      handler: function(n) {
        this.setBodyLang(n);
      }
    }
  },
  render: function(h) {
    if(!this.$route.name) {
      return h('div');
    }
    if(this.$route.name && this.$route.name.indexOf('kj') > -1) {
      return h(KJAPP);
    }
    else {
      const t = document;
      t.documentElement.removeAttribute('style');
      t.documentElement.classList.remove('html');
      t.body.classList.remove('body');
      t.body.classList.remove('kjbk');
      return h(App);
    }
  }
}).$mount("#app");