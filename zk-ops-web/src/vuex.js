import Vue from "vue";
import Vuex from "vuex";
import util from "./util";
import Big from 'bignumber.js';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    lang: localStorage.getItem("lang") || util.getSysLang(),
    isMobile: window.innerWidth <= 700,
    drawerActive: true,
    aboutPanel: {
      key: 'about',
      // key: 'pro',
      value: false
    },
  
    loginInfo: {},
    userInfo: {},
    viplists: [],
    assets: [],
  },
  getters: {

    firsttime: state => state.firsttime,
    lang: state => state.lang,
    isMobile: state => state.isMobile,
    drawerActive: state => state.drawerActive,
    loginInfo: state => state.loginInfo,
    userInfo: state => state.userInfo,
    aboutPanel: state => state.aboutPanel,


    viplists: state => state.viplists,
    assets: state => state.assets
  },
  mutations: {
    givenVipLists(state, n) {
      state.viplists = Object.assign([], n);
    },
    givenAssetsLists(state, n) {
      state.assets = Object.assign([], n);
    },
    givenDrawerActive(state, n) {
      state.drawerActive = n;
    },
    givenLang(state, n) {
      state.lang = n;
      //记录到本地
      localStorage.setItem("lang", n);
    },
    givenIsMobile(state, n) {
      state.isMobile = n;
    },
    givenAboutPanel(state, n) {
      state.aboutPanel = Object.assign({}, state.aboutPanel, n)
    },
    givenLoginInfo(state, n) {
      if(n) {
        state.loginInfo = Object.assign({}, state.loginInfo, n);
        localStorage.setItem('login', JSON.stringify(state.loginInfo));
      }
      else {
        state.loginInfo = {};
        localStorage.removeItem('login');
      }
    },
    givenUserInfo(state, n) {
      state.userInfo = Object.assign({}, state.userInfo, n)
    },
    exit(state) {
      state.loginInfo = {};
      localStorage.removeItem('login');
    },
  },
  actions: {
    getVipLists({ commit, state }, ctx) {
      request.getVipLists({})
      .then(res => {
        commit('givenVipLists', res.data.list);
      })
    },
    getAssetLists({ commit, state }, ctx) {
      request.getAssetLists({})
      .then(res => {
        commit('givenAssetsLists', res.data.assets);
      })
    },
    getUserInfo({ commit, state }, ctx) {
      request.getUserInfo({})
      .then(res => {
        commit('givenUserInfo', res.data);
      })
    },
  }

});

export default store;