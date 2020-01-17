import axios from "axios";
import apiconfig from '../apiconfig';
import $store from './vuex';
import $router from './router';
import ElementUI from "element-ui";

import util from "./util";
console.log(ElementUI)
const message = ElementUI.Message
// 1 must ,0 noneed, 2, give or not
const config = {
  verifyMan: ['/v1/challenge','get'],
  getCode :['/v1/verification-code','post'],
  toLogin: ['/v1/login','post'],
  getUserInfo: ['/v1/user-info','get', 1],
  getUserLists: ['/v1/user','get', 1],
  amendUserState: [p => `/v1/user-status/${p.userid}`,'put', 1],
  getBlackLists: ['/v1/blacklist','get', 1],
  deleteBlackItem: [p => `/v1/blacklist/${p.id}`,'delete', 1],
  addBlackItem: ['/v1/blacklist','post', 1],
  checkIsBlackItem: ['/v1/blacklist','post', 1],
  getVipLists: ['/v1/vip','get', 1],
  addVipItem: ['/v1/vip','post', 1],
  amendVipItem: [p => `/v1/vip/${p.id}`,'put', 1],
  deleteVipItem: [p => `/v1/vip/${p.id}`,'delete', 1],
  getTxLists: ['/v1/withdraw','get'],
  doTxAudit: ['/v1/ChangeAuditWithdraw', 'post', 1],
  getXmLists: ['/v1/project','get', 1],
  getAssetLists: ['/v1/asset','get', 1],

  getFaBiLists: ['/v1/currency-config','get', 1],
  getFaBiState: ['/v1/currency-schedule','get', 1],
  doFaBi: ['/v1/run-currency','post', 1],
  getFaBiRecords: ['/v1/currency-log','get',1]
};
const redirectToLogin = () => {
  // $router.replace('login');
  if ($router.currentRoute.name != 'login') {
    //记录query
    let t = $router.currentRoute.query,
      obj = {};
    for (let k in t) {
      if (Object.hasOwnProperty.call(t, k)) {
        obj[k] = t[k];
      }
    }
    //双重保险
    sessionStorage.setItem('tsquery', JSON.stringify(obj));
    $router.push({
      name: "login",
      query: {
        redirect: $router.currentRoute.name,
        ...obj
      }
    });
  }
};

class request {
    constructor() {
      this.init();
    }
    init() {
      Object.keys(config).forEach(key => {
        this[key] = this.ajax(config[key][1], config[key][0], config[key][2]);
      });
    }
    $message(str) {
      message({
        message: str,
        type: 'info'
      })
    }
    ajax(method, url, hasToken) {
      return (data={}, needparams) => {
        let login = JSON.parse(localStorage.getItem("login") || "{}");
        if (hasToken && !login.token) {
          redirectToLogin()
          return Promise.reject('login is invalid');
        }
        let url2 = apiconfig.url;
        data = Object.assign({}, data);
        let dt = {};
        if(!util.isEmpty(data)) {
          if(!(data.params || data.data)) {
            dt[method == 'post' ? 'data' : 'params'] = data;
          }
          else {
            dt = data;
          }
        }
        

        let config = {
          method,
          url: url2 + (typeof url == 'function' ? url(needparams) : url),
          responseType: "json",
          headers: login.token ? {
            authorization: `Bearer ${login.token}`
          } : {},
          ...dt
        };
        return new Promise((resolve, reject) => {
          axios(config)
          .then(res => resolve(res))
          .catch(err => {
            if (err.response.data) {
              if(err.response.data.code == '10010') {
                this.$message('登录态过期');
                $store.commit("givenLoginInfo", null);
                redirectToLogin();
              }
              else {
                this.$message(window.errorInfo(err));
                reject(err.response)
              }
            } 
            else {
              this.$message('获取数据出错');
              reject(err.response)
            }
          })
        })
      };
    }
}
export default window.request = new request();