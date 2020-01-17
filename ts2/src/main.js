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

import "element-ui/lib/theme-chalk/index.css";
import ElementUI from "element-ui";
require("promise.prototype.finally").shim();
import Page from './components/widgets/page';
import Scroll from './components/widgets/scroll';
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

Vue.component('Page', Page);
Vue.component('Scroll', Scroll);
Vue.component('RightPanel', RightPanel);

new Vue({
    router,
    store,
    i18n,
    render: function(h) {
        return h(App);
    }
}).$mount("#app");