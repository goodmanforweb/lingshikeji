import Vue from "vue";
import Vuex from "vuex";
import util from "./util";
import Big from 'bignumber.js';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    lang: localStorage.getItem("lang") || util.getSysLang(),
    isMobile: window.innerWidth <= 700,
    aboutPanel: {
      key: 'about',
      // key: 'pro',
      value: false
    },
    loginInfo: {},
    userinfo: {
      send:0,
      received:0,
      exp:0,
      rock_cnt:0,
      invited_cnt:0
    },
    latestrecord: {
      id:0,
      person_num:1,
      endtime: new Date()
    },
    lastissue: {
      id:0,
      person_num:1,
      endtime: new Date()
    },
    balance: {
      balance:0,
      min_money:0
    },
    viplevel: [],
    vip: {
      name: "vip1",
      exp: 100,
      sort: 1
    },
    prizerecord: [],
    saletime: {
      
    },
    hticker: null,
    firsttime:0
  },
  getters: {
    firsttime: state => state.firsttime,
    lang: state => state.lang,
    isMobile: state => state.isMobile,
    loginInfo: state => state.loginInfo,
    aboutPanel: state => state.aboutPanel,
    userinfo: state => state.userinfo,
    latestrecord: state => state.latestrecord,
    lastissue: state => state.lastissue,
    balance: state => state.balance,
    viplevel: state => state.viplevel,
    vip: state => state.vip,
    prizerecord: state => state.prizerecord,
    hticker: state => state.hticker,
    saletime: state => state.saletime

  },
  mutations: {
    givenfirsttime(state, n) {
      state.firsttime = n;
    },
    giventicker(state, n) {
      state.hticker = n;
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
      state.userinfo = Object.assign({}, state.userinfo, n);
    },
    givenlatestrecord(state, n) {
      state.latestrecord = Object.assign({}, state.latestrecord, n);
    },
    givenbalance(state, n) {
      state.balance = n;
    },
    givenviplevel(state, n) {
      state.viplevel = n;
    },
    givenvip(state, n) {
      state.vip = n;
    },
    givenlastissue(state, n) {
      state.lastissue = Object.assign({}, state.lastissue, n)
    },
    givenprizerecord(state, n) {
      state.prizerecord = Object.assign([], state.prizerecord, n)
    },
    givensaletime(state, n) {
      state.saletime = Object.assign({}, state.saletime, n);
    },
    exit(state) {
      state.loginInfo = {};
      localStorage.removeItem('login');
    },
  },
  actions: {
    regi({ commit, state }, ctx) {
      return util.regi({}, ctx);
    },
    getuserinfo({ commit, state }, ctx) {
      return util.getuserinfo({}, ctx)
            .then(res => {
                if(res.data.code == 0) {
                  res.data.user.rock_cnt = (res.data.user.rock_cnt || 0) + (res.data.user.give_cnt || 0);
                  res.data.user.send = Big(res.data.user.send || 0).div(100).toNumber();
                  res.data.user.received = Big(res.data.user.received || 0).div(100).toNumber();
                  res.data.user.invited_cnt = res.data.invited_cnt || 0;
                  commit('givenUserInfo', res.data.user);
                  res.data.vip.exp =  res.data.user.exp || 0;
                  commit('givenvip', res.data.vip);
                  return res.data;
                }
            })
            
    },

    getlatestrecord({ commit, state }, ctx) {
      return util.getlatestrecord({}, ctx)
            .then(res => {
                if(res.data.code == 0) {
                  res.data.record.total = Big(res.data.record.total).div(100).toNumber();
                  commit('givenlatestrecord', res.data.record);
                  return res.data.record;
                }
            })
            
    },
    getsaletime({ commit, state }, ctx) {
      return util.getsaletime({}, ctx)
            .then(res => {
                if(res.data.code == 0) {
                  commit('givensaletime', res.data.record);
                  return res.data.record;
                }
            })
    },
    shake({ commit, state }, ctx) {
      // return new Promise((resolve, reject) => {
      //   setTimeout(() => {reject(123)}, 2000);
      // })
      return util.shake({}, ctx)
            .then(res => {
                if(res.data.code == 0) {
                  res.data.issue.total = Big(res.data.issue.total).div(100).toNumber();
                  commit('givenlatestrecord', res.data.issue);
                  return res.data;
                }
            })
            
    },
    getbalance({ commit, state }, ctx) {
      return util.getbalance({}, ctx)
            .then(res => {
                if(res.data.code == 0) {
                  commit('givenbalance', res.data.record);
                  return res.data.record;
                }
            })
            .catch(err => {
              ctx.$message.info(window.errorInfo(err.response));
            })
            .finally(() => {
                
            });
    },
    getissuedetail({ commit, state }, ctx) {
      return util.getissuedetail({}, ctx)
            .then(res => {
                if(res.data.code == 0) {
                    delete ctx.urlparams;
                    commit('givenlastissue', res.data.record);
                    return res.data.record;
                }
            })
    },
    getprizerecord({ commit, state }, data) {
      return util.getawardrecord({
          params: {
              issue_id: data.id
          }
      }, data.ctx)
      .then(res => {
          if(res.data.code == 0) {
            let lists = Array.isArray(res.data.list) && res.data.list.map(el => {
                return {
                    nickname: el.nickname,
                    value: Big(el.value).div(1e2).toNumber()
                }
            });
            commit('givenprizerecord', lists);
            return lists;

          }
      })
    },
    getviplevel({ commit, state }, ctx) {
      return util.getviplevel({}, ctx)
            .then(res => {
                if(res.data.code == 0) {
                  res.data.list = Array.isArray(res.data.list) && res.data.list.map(el => {
                    return {
                      ...el,
                      exp: el.exp || 0
                    }
                  });

                  commit('givenviplevel', res.data.list || []);
                  return res.data.list;
                }
            })
    },

  }

});

export default store;