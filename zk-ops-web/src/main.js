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
import './error/index.js';
import './request.js';
import deviceSetter from './components/deviceSetter.js';
import loadmoremixin from './mixins/loadmorehandle.js';
//全局Math 动画库
import './tween.js';

import "element-ui/lib/theme-chalk/index.css";
import ElementUI from "element-ui";
require("promise.prototype.finally").shim();
import Page from './components/widgets/page';
import Scroll from './components/widgets/scroll';
import XXTable from './components/widgets/xxtable/index';
import XXRadio from './components/widgets/xxradio';
import XXSearch from './components/widgets/xxsearch';
import XXPager from './components/widgets/pager';
import RightPanel from './components/widgets/panel/rightpanel';
import NoRecord from './components/widgets/norecord';
Vue.component('NoRecord', NoRecord);

Vue.use(deviceSetter, 700);
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(XXTable);
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
Vue.filter("clip", function (s) {
  if (!s) return "";
  s = String(s);
  let len = s.length;
  return s.substring(0, 5) + "******" + s.substring(len - 5, len);
  });
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
Vue.component('Page', Page);
Vue.component('Scroll', Scroll);
Vue.component('XXRadio', XXRadio);
Vue.component('XXPager', XXPager);
Vue.component('XXSearch', XXSearch);
Vue.component('RightPanel', RightPanel);
Vue.mixin(loadmoremixin);
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