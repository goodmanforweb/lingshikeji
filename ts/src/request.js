import axios from "axios";
import apiconfig from '../apiconfig';
import $i18n from './i18n/index';
import $store from './vuex';
import $router from './router';
import ElementUI from "element-ui";
import bsapi from './components/rw/bs/api'
import util from "./util";
console.log(ElementUI)
const message = ElementUI.Message
// 1 must ,0 noneed, 2, give or not
const config = {
  ...bsapi,
  verifyMan: ['/v1/user/challenge','get'],
  getCode :['/v1/user/verification-code','post'],
  toRegis: ['/v1/user/register','post'],
  toLogin: ['/v1/user/login','post'],
  resetPass: ['/v1/user/rest-password','post'],
  checkIsRegis: ['/v1/user/check-name','post'],
  toWidthdraw: ['/v1/user/withdraw','post', 1],
  getAssetsLists:['/v1/user/asset','get', 1],
  getManAssetsLists: ['/v1/user/account','get',1],
  getInviteID: ['/v1/user/invitecode','get',1],
  getCZLists: ['/v1/user/recharge','get',1],
  getTXLists: ['/v1/user/withdraw','get',1],
  getReportLists: ['/v1/user/announcement','get'],
  getReportDetail: [p => `/v1/user/announcement/${p.id}`, 'get'],
  getUserInfo: ['/v1/user/user-info','get',1],
  getVipLists: ['/v1/user/vip','get'],
  createWallet: ['/v1/user/wallet','post',1],
  getUserWallet: ['/v1/user/get-account','get',1],
  getHubLists: ['/v1/contract/project','get'],
  getHubDetail: [p => `/v1/contract/project/${p.id}`, 'get', 1],
  getSignHubLists: ['/v1/contract/user-project','get',1],
  getHYLists: ['/v1/contract/contract','get',1],
  getHYDetail: [p => `/v1/contract/contract/${p.id}`,'get',1],
  getCJSExchange: ['/v1/user/exchange','get'],
  getCJSStatics: ['/v1/user/bancor', 'get'],
  getCJSPriceRecord: ['/v1/user/bancor-price-list','get'],
  getCJSBuyLists:['/v1/user/account-flow','get', 1],
  buyCJS:['/v1/user/bancor-buy','post', 1],
  signFWS: ['/v1/contract/agentcontreact','post', 1],
  getSignDetail: ['/v1/contract/usercontract','get',1],
  fwsWidthdraw: ['/v1/contract/agentwithdraw','post',1],
  fwsWidthdrawLists: ['/v1/contract/agentwithdraw','get',1],
  fwsDeposit: ['/v1/contract/agentrecharge','post', 1],
  fwsDepositLists: ['/v1/contract/agentrecharge','get',1],
  fwsProfitLists: ['/v1/contract/agentincome','get',1],
  fwsUpgrade: ['/v1/contract/agentupgrade','post',1],
  getFWSStatics: ['/v1/contract/agentstatistics','get',1],
  signBN: ['/v1/contract/dtbccontreact','post',1],
  bnDeposit: ['/v1/contract/dtbcrecharge','post',1],
  bnDepositLists: ['/v1/contract/dtbcrecharge','get',1],
  bnWithdraw: ['/v1/contract/dtbcwithdraw', 'post', 1],
  bnWithdrawLists: ['/v1/contract/dtbcwithdraw','get', 1],
  bnProfitLists: ['/v1/contract/dtbcincome','get',1],
  getBNKeyPrice: ['/v1/contract/dtbcprice','get', 1],
  getBNKEYTOCJOYPrice: ['/v1/contract/dtbc-cjoy-rate','get', 1],
  getBNRanks: ['/v1/contract/dtbcrank','get',1],
  getBNStatics: ['/v1/contract/dtbcstatistics','get',1],
  getBNSignNum: ['/v1/contract/dtbc-alive-count','get', 1],
  getFWSSignNum: ['/v1/contract/agent-alive-count','get', 1],
  getPowerPrice: ['/v1/contract/agent-cjoy-rate', 'get', 1],
  getBNNOSignSum:['/v1/contract/dtbc-contract-detail','get']
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
          return redirectToLogin()
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
            if (err.response) {
              if(err.response.data.code == '10010') {
                this.$message($i18n.t("m.loginvalid"));
                $store.commit("givenLoginInfo", null);
                redirectToLogin();
              }
              else {
                this.$message(window.errorInfo(err));
                reject(err.response)
              }
            } 
          })
        })
      };
    }
}
export default window.request = new request();