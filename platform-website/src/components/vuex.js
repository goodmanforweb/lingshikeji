import Vue from "vue";
import Vuex from "vuex";
import util from "util";
import errorInfo from '../error/index';
import Big from 'bignumber.js';
import apiconfig from "apiconfig";
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    cjtid: apiconfig.assetid,
    login: {
      head: ""
    },
    water: {
      water: {
        water: 0,
        level: 0,
        waterofcommunity: 0,
        mint: 0
      }
    },
    waterLists: [],
    assetList: [],

//kj
    isMobile: window.innerWidth <= 700,
    asset: {},
    balance: {
      balance: 0,
      balanceofcjt: 0
    },
    audio: {
      tx: false,
      bg: false
    },
    //存放suc
    pool: {
      weekBalance:0,
      TotalBalance:0,
      Energy:0,
      Free:0,
      Valid:0
    },


    rightPanel: false,
    lang: localStorage.getItem("lang") || util.getSysLang(),
    toDepositState: false,

  },
  getters: {
    cjtid: state => state.cjtid,
    audio: state => state.audio,
    isMobile: state => state.isMobile,
    login: state => {
      return state.login;
    },
    rightPanel: state => state.rightPanel,
    isLogin: state => state.isLogin,
    account: state => state.account,
    invitation: state => state.invitation,
    balance: state => state.balance,
    lang: state => state.lang,
    water: state => state.water,
    waterLists: state => state.waterLists,
    assetList: state => state.assetList,
    asset: state => state.asset,
    balance: state => state.balance,
    toDepositState: state => state.toDepositState,
    pool: state => state.pool
  },
  mutations: {
    givenAudio(state, n) {
      state.audio = Object.assign({}, state.audio, n);
      localStorage.setItem('kjaudio', JSON.stringify(state.audio));
    },
    givenIsMobile(state, n) {
      state.isMobile = n;
    },
    givenToDepositState(state, n) {
      state.toDepositState = n;
    },
    givenRightPanel(state, n) {
      state.rightPanel = n;
    },
    givenLogin(state, n) {
      if (n.token == "timeout") {
        localStorage.setItem("login", "");
        state.isLogin = false;
      } else {
        let old = localStorage.getItem("login") || "{}";
        let hhead = Object.assign(n, {
          head: util.UsernameToHead(n.user.username)
        });
        let nnew = Object.assign(JSON.parse(old), hhead);

        localStorage.setItem("login", JSON.stringify(nnew));
        state.login = Object.assign({}, state.login, nnew);
      }
    },
    givenAssetLists(state, n) {
      if (!n) n = [];
      state.assetList = n;
    },
    givenAsset(state, n) {
      if (!n.asset) {
        delete state.asset[n.asset];
      } else {
        state.asset = Object.assign({}, state.asset, {
          [n.asset]: n
        });
      }
    },
    calcAsset(state, n) {
      state.asset[n.asset].value = Big(state.asset[n.asset].value).plus(n.value).toNumber();
    },
    calcPool(state, n) {
      state.pool.Balance = Big(state.pool.Balance).plus(n.value).toNumber();
    },
    givenWater(state, n) {
      if (!n.water) {
        n.water = {
          water: 0,
          level: 0,
          waterofcommunity: 0,
          mint: 0
        };
      }
      state.water = Object.assign({}, state.water, n);
    },
    givenWaterLists(state, n) {
      if (!n) n = [];
      state.waterLists = n;
    },
    givenBalance(state, n) {
      state.balance = Object.assign({}, state.balance, n);
    },
    givenBalanceValue(state, value) {
      state.asset.value = util.fromHex(value, 2);
    },
    exit(state) {
      localStorage.removeItem("login");
      state.isLogin = false;
      state.login = {};
      state.account = {
        chips: ""
      };
      state.invitation = {};
      state.balance = {};
    },
    givenLang(state, n) {
      state.lang = n;
      //记录到本地
      localStorage.setItem("lang", n);
    },
    givenPool(state, n) {
      if(n.process) {
        let pool = n.pool;
        pool.Balance = util.dropDec(pool.Balance, 1e4);
        pool.TotalBalance = util.dropDec(pool.TotalBalance, 1e4);
        pool.Energy = util.dropDec(pool.Energy, 1e4);
        pool.Free = util.dropDec(pool.Free, 1e4);
        pool.Valid = util.dropDec(pool.Valid, 1e4);
        if (Array.isArray(pool.Machines)) {
          let t = pool.Machines.reduce((prev, next) => Number(prev) + Number(next.Mined), 0);
          pool.weekBalance = util.dropDec(t, 1e4);
        } else {
          pool.weekBalance = 0;
        }
        n = n.pool;
      }
      state.pool = Object.assign({}, state.pool, n);
    }
  },
  actions: {
    getAssetLists({
      commit,
      state
    }, ctx) {
      return util
        .getAssetLists({}, {}, ctx)
        .then(res => {
          if (res.status == 200 && res.data.code == 0) {
            commit("givenAssetLists", res.data.assets);
            return res.data.assets;
          }
        })
        .catch(err => {
          ctx.$message.info(errorInfo(err.response));
        })
        .finally(() => {});
    },
    getAsset({
      commit,
      state
    }, data) {
      const {
        ctx,
        asset
      } = data;
      return util
        .getAsset({
            params: {
              asset
            }
          }, {},
          ctx
        )
        .then(res => {
          if (res.status == 200) {
            let {
              decimals,
              value
            } = res.data.balance;
            res.data.balance.value = value ? util.fromHex(value, decimals) : 0;
            commit("givenAsset", res.data.balance);
            return res;
          } else {
            commit("givenAsset", {
              asset: null
            });
          }
        })
        .catch(err => {
          commit("givenAsset", {
            asset: null
          });
          err.response.data && ctx.$message.info(errorInfo(err.response));

        });
    },
    getWater({
      commit,
      state
    }, data) {
      const {
        ctx,
        params
      } = data;
      return util
        .getWater({
          params
        }, {}, ctx)
        .then(res => {
          if (res.status == 200 && res.data.code == 0) {
            let {
              water,
              decimals
            } = res.data;
            if (water) {
              water.water = util.fromHex(water.water, decimals);
              water.waterofcommunity = water.waterofcommunity ? util.fromHex(water.waterofcommunity, decimals) : 0;
              water.mint = water.mint ? util.fromHex(water.mint, decimals) : 0;
              water.level = water.level ? Big(water.level).times(100).toNumber() : 0;
            }
            commit("givenWater", res.data);
            return res;
          } else {}
        })
        .catch(err => {
          ctx.$message.info(errorInfo(err.response));

        });
    },
    getWaterLists({
      commit,
      state
    }, data) {
      const {
        ctx,
        params
      } = data;
      return util
        .getWaterLists({
          params
        }, {}, ctx)
        .then(res => {
          if (res.status == 200 && res.data.code == 0) {
            // commit("givenWaterLists", res.data.list);
            return res.data;
          } else {}
        })
        .catch(err => {
          ctx.$message.info(errorInfo(err.response));
        })
        .finally(() => {});
    },
    getPool({
      commit,
      state
    }, data) {
      const {
        ctx,
        params
      } = data;
      return util
        .getPool({
          params
        }, {}, ctx)
        .then(res => {
          if (res.status == 200 && res.data.code == 0) {
            let pool = res.data.pool;
            pool.Balance = util.dropDec(pool.Balance, 1e4);
            pool.TotalBalance = util.dropDec(pool.TotalBalance, 1e4);
            pool.Energy = util.dropDec(pool.Energy, 1e4);
            pool.Free = util.dropDec(pool.Free, 1e4);
            pool.Valid = util.dropDec(pool.Valid, 1e4);
            if (Array.isArray(pool.Machines)) {
              let t = pool.Machines.reduce((prev, next) => Number(prev) + Number(next.Mined), 0);
              pool.weekBalance = util.dropDec(t, 1e4);
            } else {
              pool.weekBalance = 0;
            }
            commit("givenPool", pool);
            return res.data;
          }
        })
        .catch(err => {
          ctx.$message.info(errorInfo(err.response));
        })
        .finally(() => {});
    }
  }
});

export default store;