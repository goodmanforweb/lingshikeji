import Vue from "vue";
import Vuex from "vuex";
import Big from 'bignumber.js';
Vue.use(Vuex);

const getHT = () => ({
  history_earnings: ['0','00'],
  history_earningsraw:0,
  end_time: new Date(),
  start_time:new Date(),
  gas:0,
  earnings:0,
  key:0,
  yestoday_earnings: ['0','00'],
  last_week_earnings:0,
  description: {
      power: 0,
      next_level_need:0
  },
  standard: {
      experience:0,
      sum_user_withdraw:0,
      sum_key:0,
      sum_found:0,
      yield_rate:0
  },
  isSign: false,
  total_waterraw: 0,
  total_water: ['0','00'],
  qr_img:'',
  xm_img:'',
  class_id:'',
  isSign: false,
  isLoad: false
})
const store = new Vuex.Store({
  state: {
    isMobile: window.innerWidth <= 700,
    aboutPanel: {
      key: 'about',
      // key: 'pro',
      value: false
    },
    //登录信息
    loginInfo: {},
    //用户基本信息， vip
    userInfo: {},
    vip:{
      viplevel: 1
    },
    vipLists: [],
    assetsLists: [],
    manAssetsLists: [],
    //钱包账户信息 cjs
    useraccount: {
      value: 0
    },
    cjoyaccount: {
      value:0
    },
    signHYDetail: getHT(),
    fwsHYLists: [],
    registarData: {},
    typeTextLists:{},
    typeTextDetail: {},
    isShowDialog: false
  },
  getters: {
    firsttime: state => state.firsttime,
    isMobile: state => state.isMobile,
    loginInfo: state => state.loginInfo,
    aboutPanel: state => state.aboutPanel,
    userInfo: state => state.userInfo,
    vip: state => state.vip,
    vipLists: state => state.vipLists,
    assetsLists: state => state.assetsLists,
    manAssetsLists: state => state.manAssetsLists,
    useraccount: state => state.useraccount,
    getBalance: state => coin => {
      const t = state.manAssetsLists.find(el => el.asset.symbol == coin);
      if(t && t.account) {
        return t.account.value
      }
      else {
        return 0;
      }
    },
    signHYDetail: state => state.signHYDetail,
    fwsHYLists: state => state.fwsHYLists,
    balance: state => ({cjs: state.useraccount, cjoy: state.cjoyaccount}),
    registarData: state => state.registarData,
    isShowDialog: state => state.isShowDialog
  },
  mutations: {
    givenShowDialog(state, n) {
      state.isShowDialog = n
    },
    givenTypeTextLists(state, n) {
      state.typeTextLists = Object.assign({}, state.typeTextLists, n)
    },
    givenTypeTextDetail(state, n) {
      state.typeTextDetail = Object.assign({}, state.typeTextDetail, n)
    },
    givenRegistarData(state, n) {
      state.registarData = n;
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
      state.userInfo = Object.assign({}, state.userInfo, n);
    },
    givenVip(state, n) {
      state.vip = Object.assign({}, state.vip,n)
    },
    givenVipLists(state, n) {
      state.vipLists = n;
    },
    givenAssetsLists(state, n) {
      state.assetsLists = Object.assign([], state.assetsLists, n);
    },
    givenManAssetsLists(state, n) {
      state.manAssetsLists = Object.assign([], n);
    },
    givenUserAccount(state, n) {
      state.useraccount = n;
    },
    givenCjoyAccount(state, n) {
      state.cjoyaccount = n;
    },
    givenSignHYDetail(state, n) {
      if(!n) {
        state.signHYDetail = getHT();
      }
      else {
        state.signHYDetail = Object.assign({}, state.signHYDetail, n)
      }
    },
    givenFWSHYLists(state, n) {
      state.fwsHYLists = Object.assign([], n)
    },
    exit(state) {
      state.loginInfo = {};
      state.userInfo = {};
      state.useraccount = {
        value: 0
      };
      state.manAssetsLists = [];
      state.signHYDetail = {};
      localStorage.removeItem('login');
    },
  },
  actions: {
    getUserInfo({ commit, state }, ctx) {
      return request.getUserInfo()
            .then(res => {
                if(res.data.user) {
                  commit('givenUserInfo', res.data.user);
                  res.data.vip.exp = res.data.vip.exp || 0;
                  commit('givenVip', res.data.vip);
                  return res.data.vip;
                }
            })
            
    },
    getVipLists({ commit, state }, ctx) {
      return request.getVipLists()
            .then(res => {
                if(res.data.list) {
                  commit('givenVipLists', res.data.list);
                  return res.data.list
                }
            })
    },
    getAssetsLists({ commit, state }, ctx) {
      return request.getAssetsLists()
             .then(res => {
               commit('givenAssetsLists', res.data.assets);
             })
    },
    getFWSHYLists({ commit, state }, ctx) {
      return request.getHYLists({params: {id: ctx.id}})
             .then(res => {
               res.data.list.forEach(el => {
                 el.metadata  = JSON.parse(el.metadata);
                 el.cname = el.metadata.name;
                 el.enname = el.metadata.name_en;
               })
               commit('givenFWSHYLists', res.data.list);
               commit('givenTypeTextLists',{[ctx.id]: res.data.list})
               return res.data.list;
             })
    },
    getManAssetsLists({ commit, state }, ctx) {
      return request.getManAssetsLists()
             .then(res => {
               if(!res.data.list)return [];
               res.data.list.forEach(el => {
                 if(!util.isEmpty(el.account)) {
                   el.account.value = util.fromHex(el.account.value, el.account.decimals || 0, 8)
                 }
                 else {
                   el.account.value = 0;
                 }
               })
               let useraccount = res.data.list.find(el => el.asset.symbol == 'cjs') || {};
               let cjoyaccount = res.data.list.find(el => el.asset.symbol == 'cjoy') || {};
               if(!util.isEmpty(useraccount)) {
                 useraccount = Object.assign(useraccount.asset, useraccount.account || {})
               }
               if(!util.isEmpty(cjoyaccount)) {
                cjoyaccount = Object.assign(cjoyaccount.asset, cjoyaccount.account || {})
              }
              //按 value排序
              let sortArr = res.data.list.map(el => el.asset.symbol);
              sortArr.sort();
              sortArr = sortArr.map(el => {
                return res.data.list.find(tt => tt.asset.symbol == el)
              })
               commit('givenManAssetsLists', sortArr);
               commit('givenUserAccount', useraccount);
               commit('givenCjoyAccount', cjoyaccount);
               return res.data.list;
             })
    }
  }
});

export default store;