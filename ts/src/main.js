import Vue from "vue";
import App from './app.vue';
import VueRouter from "vue-router";
import router from './router';
import store from './vuex';
import i18n from './i18n/index';
import './assets/common.scss';
import './assets/mobilestyle.scss';
import './assets/pcstyle.scss';
import util from './util';
//全局Math 动画库
import './tween.js';
import './request';
import './error/index';

import "element-ui/lib/theme-chalk/index.css";
import ElementUI from "element-ui";
require("promise.prototype.finally").shim();
import Page from './components/widgets/page';
import Pager from './components/widgets/pager';
import Scroll from './components/widgets/scroll';
import NoRecord from './components/widgets/norecord';
import RightPanel from './components/widgets/panel/rightpanel';
Vue.use(ElementUI);
Vue.use(VueRouter);
VueRouter.prototype.goBack = function() {
    this.isBack = true;
    this.back();
}


Vue.filter('makeUp', function(s, t) {
    return util.makeUp(s, t)
});
Vue.filter('toUpperCase', function(s) {
    return (s + '').toUpperCase();
});
Vue.filter('getday', function(s) {
  return util.getDayFromStr(s)
});
Vue.filter('fix', function(s, n = 2) {
  return util.fix(s,n)
});
Vue.filter('fix8', function(s) {
  return util.fix(s, 8)
});
Vue.filter("currency", function (s, n) {
  return util.currency(s, n)
});
Vue.filter("capitalize", function (s) {
if (!s) return "";
return s.substring(0, 1).toUpperCase() + s.substring(1);
});
Vue.filter("uppercase", function (s) {
if (!s) return "";
return s.toUpperCase();
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
  return util.format(time, format)
});
Vue.filter('w', function(num, point) {
  return util.tranNumber(num, point)
})


Vue.component('Page', Page);
Vue.component('Pager', Pager);
Vue.component('Scroll', Scroll);
Vue.component('RightPanel', RightPanel);
Vue.component('NoRecord', NoRecord);

Vue.directive('loadmore', {
  bind(el, binding) {
    let isActive = el.getAttribute('data-tableLoader');
    isActive = Boolean(isActive);
    if(!isActive) return;
    const tableBody = el.querySelector('.el-table__body-wrapper');
    let loader = document.createElement('div');
    loader.setAttribute('class', 'showlaoder')
    loader.style.opacity = 0;
    loader.active = false;
    const next = () => {
      loader.style.opacity = 0;
      loader.active = false;
    };
    el.scrollHandler = function () {
      const marker = 2
      const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
      if (scrollDistance <= marker && !loader.active) {
        loader.style.opacity = 1;
        loader.active = true;
        typeof binding.value == 'function' && binding.value(next);
      }
    }
   
    tableBody.appendChild(loader);
    tableBody.addEventListener('scroll', el.scrollHandler, false);
    //初始化 显示 加载
    loader.style.opacity = 1;
    loader.active = true;
    binding.value(next);
  },
  unbind(el) {
    if(!el.scrollHandler) return;
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
    render: function(h) {
        return h(App);
    }
}).$mount("#app");



(function(window, store) {
  let login = localStorage.getItem("login");
  if (login) {
    store.commit("givenLoginInfo", JSON.parse(login));
  }

  if(window.innerWidth > 700 && navigator.userAgent.indexOf('Mac') == -1) {
    let style = document.createElement('style');
    style.setAttribute('type', "text/css");
    style.innerHTML = '::-webkit-scrollbar-corner{background-color:#fff}::-webkit-scrollbar-track{background-color:#fff}::-webkit-scrollbar-thumb{border-radius:4px;background-color:#666}::-webkit-scrollbar{width:8px;background-color:#666}';
    document.head.appendChild(style);
  }
})(window, store);