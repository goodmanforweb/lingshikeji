import VueRouter from "vue-router";
import Login from "./Login/Login";
import Register from "./Login/Register";
import LoginTab from "./Login/LoginTab";
import ForgetPassword from "./ForgetPassword";
import Dashboard from "./Dashboard";
import Rewards from "./Rewards/Rewards";
import RewardRecord from "./Rewards/RewardRecord";
import Report from "./Report";
import Game from "./Game/Game2.vue";
import Agreement from "./Agreement";
import Index from "./Index";
import walletList from "./Wallet/List";
import wallet from "./Wallet/Wallet";
import walletDeposit from "./Wallet/Deposit";
import walletWithdraw from "./Wallet/Withdraw";
import walletRecord from "./Wallet/Record";
import accountindex from "./Account/Index";
import accountupdatepassword from "./Account/UpdatePassword";
import FAQ from "./qa";
import Room from "./Room/Index";
import ListRecord from "./Wallet/ListRecord";
// import KJ from './newkj/index';
import KJChildren from './newkj/components/router';
import RightLogin from '../components/Login/rightLogin';
import Pay from '../components/pay';
import Poster from './Poster';
import lang from '../i18n/index';

import Card from './card/index';
import Apple from './card/apple';
import Andriod from './card/andriod';

import CJTCheck from './cjtcheck/index';
const router = new VueRouter({
  routes: [{
      path: "/logintab",
      component: LoginTab,
      name: "logintab",
      children: [{
          path: "register",
          component: Register,
          name: "register"
        },
        {
          path: "login",
          component: Login,
          name: "login"
        }
      ]
    },
    {
      path: "/oauth",
      component: RightLogin,
      // component:  () => import(/* webpackChunkName: "oauth" */'../components/Login/rightLogin'),
      name: "oauth"
    },
    {
      path: "/pay",
      component: Pay,
      // component:  () => import(/* webpackChunkName: "pay" */'../components/pay'),
      name: "pay"
    },
    {
      path: "/faq",
      
      component: FAQ,
      // component:  () => import(/* webpackChunkName: "faq" */"./qa"),
      name: "faq"
    },
    {
      path: "/forgetpassword",
      component: ForgetPassword,
      name: "forgetpassword",
      // component:  () => import(/* webpackChunkName: "forgetpassword" */"./ForgetPassword"),
    },
    {
      path: "/dashboard",
      component: Dashboard,
      children: [{
          path: "rewards",
          name: "rewards",
          component: Rewards
        },
        {
          name: "rewardrecord",
          path: "rewardrecord",
          component: RewardRecord
        },
        {
          name: "walletlist",
          path: "walletlist",
          component: walletList
        },
        {
          name: "listrecord",
          path: "listrecord",
          component: ListRecord
        },
        {
          name: "walletrecord",
          path: "walletrecord/:id",
          component: walletRecord
        },
        {
          name: "wallet",
          path: "wallet/:id",
          component: wallet,
          children: [{
              name: "walletdeposit",
              path: "deposit",
              component: walletDeposit
            },
            {
              name: "walletwithdraw",
              path: "withdraw",
              component: walletWithdraw
            }
          ]
        },
        {
          name: "accountindex",
          path: "accountindex",
          component: accountindex
        },
        {
          name: "accountupdatepassword",
          path: "accountupdatepassword",
          component: accountupdatepassword,
          // component:  () => import(/* webpackChunkName: "ppdatepassword" */"./Account/UpdatePassword")
        }
      ]
    },
    {
      name: "report",
      path: "/publicreport",
      component: Report,
      // component:  () => import(/* webpackChunkName: "report" */"./Report")
    },
    {
      name: "room",
      path: "/room",
      component: Room,
      // component:  () => import("./Room/Index")
    },
    {
      name: "game",
      path: "/game",
      component: Game,
      // component:  () => import("./Game/Game2.vue")
    },

    {
      path: "/index",
      component: Index,
      name: "index"
    },
    {
      path: "/agreement",
      component: Agreement,
      // component:  () => import(/* webpackChunkName: "agreement" */"./Agreement"),
      name: "agreement"
    },
    ...KJChildren,
    {
      name: "poster",
      path: "/poster",
      component: Poster,
    },
    {
      name: "card",
      path: "/card",
      component: Card,
      // component:  () => import(/* webpackChunkName: "download" */'./card/index')
    },
    {
      name: "apple",
      path: "/apple",
      component: Apple,
      // component:  () => import(/* webpackChunkName: "apple" */'./card/apple')
    },
    {
      name: "andriod",
      path: "/andriod",
      component: Andriod,
      // component:  () => import(/* webpackChunkName: "andriod" */'./card/andriod')
    },
    {
      name: "cjtcheck",
      path: "/cjtcheck",
      component: CJTCheck,
      // component:  () => import(/* webpackChunkName: "cjtcheck" */'./cjtcheck/index')
    },
    
  ]
});

router.beforeEach((to, from, next) => {
  console.log(to, from);
  let login = JSON.parse(localStorage.getItem("login") || "{}");
  let nocheck = [
    "index",
    "register",
    "login",
    "forgetpassword",
    "agreement",
    "report",
    "poster",
    'game',
    'apple',
    'andriod',
    'card',
    'cjtcheck',
    'faq'
  ];
  if (!to.matched.length) {
    next("/index");
  }
  //已经登录， 不能进入登录页面
  else if (
    to.name == "login" &&
    !["timeout", "", undefined].includes(login.token)
  ) {
    next(false);
  } else if (nocheck.includes(to.name)) {
    next();
  } else if (!login.token) {
    sessionStorage.setItem('cjoyquery', JSON.stringify(to.query));
    next({
      name: 'login',
      query: {
        redirect: to.name,
        ...to.query
      }
    });
  } else {
    next();
  }

  //set tab icon and name
  let targetLink = [...document.head.getElementsByTagName("link")].find(link => link.getAttribute('rel') == 'icon');

  if (['room', 'game'].includes(to.name)) {
    document.title = "Funny Up";
    targetLink && targetLink.setAttribute('href', 'game.ico');
  } else if (to.path.indexOf('kj') > -1) {
    document.title = lang.t('ms.cjsl');
    targetLink && targetLink.setAttribute('href', 'cjpool.ico');
  } else {
    document.title = "Crypto JOY";
    targetLink && targetLink.setAttribute('href', 'favicon.ico');
  }

});

export default router;