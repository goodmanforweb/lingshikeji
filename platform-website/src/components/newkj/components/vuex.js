import Vue from "vue";
import Vuex from "vuex";
import util from "util";
import errorInfo from '../error/index';
import Big from 'bignumber.js';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    lang: localStorage.getItem("lang") || util.getSysLang(),
    isMobile: window.innerWidth <= 700,
  
  },
  getters: {
    isMobile: state => state.isMobile, 
    lang: state => state.lang,
  },
  mutations: {
    givenLang(state, n) {
      state.lang = n;
      localStorage.setItem("lang", n);
    },
    givenIsMobile(state, n) {
      state.isMobile = n;
    },

  },
  actions: {
    
  }
});

export default store;