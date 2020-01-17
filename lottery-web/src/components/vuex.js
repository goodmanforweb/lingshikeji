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
    loginInfo: {},
    roomList: [],
    issueList: [],
    lotteryRecord: {},
    wallet: 0,
    trendid: '',
    activeroom: {}
  },
  getters: {
    lang: state => state.lang,
    isMobile: state => state.isMobile,
    loginInfo: state => state.loginInfo,
    roomList: state => state.roomList,
    issueList: state => state.issueList,
    lotteryRecord: state => state.lotteryRecord,
    wallet: state => state.wallet,
    trendid: state => state.trendid,
    activeroom: state => state.activeroom
  },
  mutations: {
    givenLang(state, n) {
      state.lang = n;
      //记录到本地
      localStorage.setItem("lang", n);
    },
    givenIsMobile(state, n) {
      state.isMobile = n;
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
    givenRoomList(state, n) {
      state.roomList = n;
    },
    givenActiveRoom(state, n) {
      if(!util.isEmpty(n)) {
        state.activeroom = n;
        localStorage.setItem('activeroom', JSON.stringify(n))
      }
    },
    givenIssueList(state, n) {
      state.issueList = n;
    },
    givenLotteryRecord(state, n) {
      state.lotteryRecord = Object.assign({}, state.lotteryRecord, n)
    },
    givenWallet(state, n) {
      state.wallet = n;
    },
    trendidChange(state, n) {
      state.trendid = n;
    },
    exit(state) {
      state.loginInfo = {};
      localStorage.removeItem('login');
    },
  },
  actions: {
    getRoomList({ commit, state }, data) {
      let {ctx, isCommitActiveRoom} = data;
      return util.getRoomList({}, ctx)
            .then(res => {
                if(res.data.code == 0) {
                  commit('givenRoomList', res.data.list);
                  if(isCommitActiveRoom) {
                    let activeroom = localStorage.getItem('activeroom');
                    if(activeroom) {
                      activeroom = JSON.parse(activeroom);
                      let isExit = res.data.list.find(el => el.id == activeroom.id);
                      if(isExit) {
                        commit("givenActiveRoom", activeroom);
                      }
                      else {
                        localStorage.removeItem('activeroom');
                        commit('givenActiveRoom', res.data.list[0]);
                      }
                    }
                    else {
                      commit('givenActiveRoom', res.data.list[0]);
                    }
                  }
                
                  
                  return res.data.list;
                }
            })
            .catch(err => {
              ctx.$message.info(window.errorInfo(err.response));
            })
            .finally(() => {
                
            })
    },
    getIssueList({ commit, state }, data) {
      let {ctx, params} = data;
      return util.getIssueList({params}, ctx)
            .then(res => {
                if(res.data.code == 0) {
                  //record 饭回来的是 string object
                    res.data.list.forEach(el => {
                      el.record = el.record ? JSON.parse(el.record) : el.record
                    });
                    commit('givenIssueList', res.data.list);
                    return res.data.list;
                }
            })
            .catch(err => {
              ctx.$message.info(window.errorInfo(err.response));
            })
            .finally(() => {})
  
    },
    getLotteryRecord({ commit, state }, data) {
      let {ctx, params} = data;
      return util.getLotteryRecord({params}, ctx)
            .then(res => {
                if(res.data.code == 0) {
                    commit('givenLotteryRecord', {[params.issue_id]: Array.isArray(res.data.list) && res.data.list.length > 0 ? res.data.list : []});
                    return res.data.list;
                }
            })
            .catch(err => {
              ctx.$message.info(window.errorInfo(err.response));
            })
            .finally(() => {})
    },
    getWallet({ commit, state }, data) {
      let {ctx, noShowErr} = data;
      return util.getWallet({}, ctx)
            .then(res => {
                if(res.data.code == 0) {
                    let t = Big(res.data.wallet.balance).div(100).toNumber();
                    commit('givenWallet', t);
                    return t;
                }
            })
            .catch(err => {
              !noShowErr && ctx.$message.info(window.errorInfo(err.response));
            })
            .finally(() => {})
    }
  }
});

export default store;