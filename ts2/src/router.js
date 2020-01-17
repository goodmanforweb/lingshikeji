import VueRouter from "vue-router";

import index from './components/ts/index';
import pool from './components/kj/mypool';
import kj from './components/kj/kj';
import wallet from './components/wallet/index';
import tool from './components/tool/index';
import cjs from './components/cjs/index';
import hub from './components/hub/index';
import help from './components/help/index';
import report from './components/report/index';
import my from './components/my/index';
import rw from './components/rw/index';

// import guide from './components/guide/index';
// import lg from './components/login/index';
// import login from './components/login/login';
// import scan from './components/login/scan';
import about from './components/about/index';
import ts from './components/ts/index';
// import hy from './components/rw/hy';
// import calcer from './components/calcer/index';


//移动端路由
import dotrw from './components/rw/dot/index';
import ddetail from './components/rw/dot/detail';
import ddash from './components/rw/dot/dash';
import bdetail from './components/rw/bn/detail';
import bdash from './components/rw/bn/dash';

// import calcer from './components/calcer/index'
import calcerrest from './components/calcer/dot/rest'
import hysj from './components/rw/dot/hysj'
import syjsq from './components/rw/dot/sycalcer'
import hysyjl from './components/rw/dot/hysyrecord'
import hytxjl from './components/rw/dot/txrecord'
import cznl from './components/rw/dot/chargepower'
import czjl from './components/rw/dot/czrecord'
import xmyj from './components/rw/dot/gzlzm'

import hysytj from './components/rw/bn/hysytj'
import keybuy from './components/rw/bn/keybuyrecord'
import keyexc from './components/rw/bn/keyrecord'
import bsyjsq from './components/rw/bn/sycalcer'


import dashdetail from './components/rw/dot/dashdetail'
import bdashdetail from './components/rw/bn/dashdetail'

import bnrw from './components/rw/bn/index';

import prohub from './components/kj/prohub';
import poolrecord from './components/kj/poolrecord';
import deposit from './components/wallet/deposit';
import record from './components/wallet/record';
import withdraw from './components/wallet/withdraw';
// import poster from './components/tool/poster';
import buy from './components/cjs/buy';
import detail from './components/report/detail';
import cj from './components/rw/cj';
// import news from './components/about/news';
// import center from './components/center/index';
// import notice from './components/notice/index';
// import pro from './components/pro/index';
import checkin from './components/widgets/checkin';
import proin from './components/widgets/pro';
const router = new VueRouter({
  routes: [
    {
      path:'/index',
      name:'index',
      component: index,
      meta: {requiresAuth: true},
    },
    {
      path:'/checkin',
      name:'checkin',
      component: checkin,
      meta: {requiresAuth: true},
    },
    {
      path:'/proin',
      name:'proin',
      component: proin,
      meta: {requiresAuth: true},
    },
    {
      path:'/center',
      name:'center',
      // component: center,
      component:  () => import(/* webpackChunkName: "center" */ './components/center/index'),

      meta: {requiresAuth: true},
    },
    {
      path:'/notice',
      name:'notice',
      // component: notice,
      component:  () => import(/* webpackChunkName: "notice" */ './components/notice/index'),

      meta: {requiresAuth: true},
    },
    {
      path:'/pool',
      name:'pool',
      component:pool,
      meta: {requiresAuth: true},
    },
    {
      path:'/kj',
      name:'kj',
      component:kj,
      meta: {requiresAuth: true},
    },
    {
      path:'/prohub',
      name:'prohub',
      component:prohub,
      meta: {requiresAuth: true},
    },
    {
      path:'/poolrecord',
      name:'poolrecord',
      component:poolrecord,
      meta: {requiresAuth: true},
    },
    {
      path:'/wallet',
      name:'wallet',
      component:wallet,
      meta: {requiresAuth: true},
    },
    {
      path:'/deposit',
      name:'deposit',
      component:deposit,
      meta: {requiresAuth: true},
    },
    {
      path:'/record',
      name:'record',
      component:record,
      meta: {requiresAuth: true},
    },
    {
      path:'/withdraw',
      name:'withdraw',
      component:withdraw,
      meta: {requiresAuth: true},
    },
    {
      path:'/tool',
      name:'tool',
      component:tool,
      meta: {requiresAuth: true},
    },
    {
      path:'/poster',
      name:'poster',
      component:  () => import(/* webpackChunkName: "poster" */ './components/tool/poster'),

      // component:poster,
      meta: {requiresAuth: true},
    },
    {
      path:'/cjs',
      name:'cjs',
      component:cjs,
      meta: {requiresAuth: true},
    },
    {
      path:'/buy',
      name:'buy',
      component:buy,
      meta: {requiresAuth: true},
    },

    {
      path:'/hub',
      name:'hub',
      component:hub,
      meta: {requiresAuth: true},
    },
    {
      path:'/help',
      name:'help',
      component:help,
      meta: {requiresAuth: true},
    },
    {
      path:'/pro',
      name:'pro',
      // component:pro,
      component:  () => import(/* webpackChunkName: "pro" */ './components/pro/index'),
      meta: {requiresAuth: true},
    },
    {
      path:'/index',
      name:'ts',
      component:ts,
    },
    {
      path:'/report',
      name:'report',
      component:report,
      meta: {requiresAuth: true},
    },
    {
      path:'/detail',
      name:'detail',
      component:detail,
      meta: {requiresAuth: true},
    },
    {
      path:'/my',
      name:'my',
      component:my,
      meta: {requiresAuth: true},
    },
    {
      path:'/rw',
      name:'rw',
      component:rw,
      meta: {requiresAuth: true},
    },
    {
      path:'/dotrw',
      name:'dotrw',
      component:dotrw,
      meta: {requiresAuth: true},
    },
    {
      path:'/ddetail',
      name:'ddetail',
      component:ddetail,
      meta: {requiresAuth: true},
    },

    /////////////////////////////////
    {
      path:'/hysj',
      name:'hysj',
      component:hysj,
      meta: {requiresAuth: true},
    },
    {
      path:'/syjsq',
      name:'syjsq',
      component:syjsq,
      meta: {requiresAuth: true},
    },
    {
      path:'/hysyjl',
      name:'hysyjl',
      component:hysyjl,
      meta: {requiresAuth: true},
    },
    {
      path:'/hytxjl',
      name:'hytxjl',
      component:hytxjl,
      meta: {requiresAuth: true},
    },
    {
      path:'/cznl',
      name:'cznl',
      component:cznl,
      meta: {requiresAuth: true},
    },
    {
      path:'/czjl',
      name:'czjl',
      component:czjl,
      meta: {requiresAuth: true},
    },
    {
      path:'/xmyj',
      name:'xmyj',
      component:xmyj,
      meta: {requiresAuth: true},
    },
    {
      path:'/hysytj',
      name:'hysytj',
      component:hysytj,
      meta: {requiresAuth: true},
    },
    {
      path:'/keybuy',
      name:'keybuy',
      component:keybuy,
      meta: {requiresAuth: true},
    },
    {
      path:'/keyexc',
      name:'keyexc',
      component:keyexc,
      meta: {requiresAuth: true},
    },
    {
      path:'/bsyjsq',
      name:'bsyjsq',
      component:bsyjsq,
      meta: {requiresAuth: true},
    },







    {
      path:'/bdash',
      name:'bdash',
      component:bdash,
      meta: {requiresAuth: true},
    },
    {
      path:'/bdetail',
      name:'bdetail',
      component:bdetail,
      meta: {requiresAuth: true},
    },
    {
      path:'/ddash',
      name:'ddash',
      component:ddash,
      meta: {requiresAuth: true},
    },
    {
      path:'/calcer',
      name:'calcer',
      // component:calcer,
      meta: {requiresAuth: true},
      component:  () => import(/* webpackChunkName: "calcer" */ './components/calcer/index'),

    },
    {
      path:'/calcerrest',
      name:'calcerrest',
      component:calcerrest,
      meta: {requiresAuth: true},
    },
    {
      path:'/dashdetail',
      name:'dashdetail',
      component:dashdetail,
      meta: {requiresAuth: true},
    },
    {
      path:'/bdashdetail',
      name:'bdashdetail',
      component:bdashdetail,
      meta: {requiresAuth: true},
    },

    {
      path:'/bnrw',
      name:'bnrw',
      component:bnrw,
      meta: {requiresAuth: true},
    },
    {
      path:'/cj',
      name:'cj',
      component:cj,
      meta: {requiresAuth: true},
    },
    {
      path:'/guide',
      name:'guide',
      // component:guide,
      component:  () => import(/* webpackChunkName: "guide" */ './components/guide/index'),

    },
    {
      path:'/about',
      name:'about',
      component:about,
      // component:  () => import(/* webpackChunkName: "about" */ './components/about/index'),

    },
    {
      path:'/news',
      name:'news',
      // component:news,
      component:  () => import(/* webpackChunkName: "news" */ './components/about/news'),

    },
    {
      path:'/lg',
      name:'lg',
      // component:lg,
      meta: {requiresAuth: true},
      component:  () => import(/* webpackChunkName: "login" */ './components/login/index'),

      children: [
        {
          path:'login',
          name:'login',
          component:  () => import(/* webpackChunkName: "login" */ './components/login/login'),

          // component:login,
        },
        {
          path:'scan',
          name:'scan',
          component:  () => import(/* webpackChunkName: "login" */ './components/login/scan'),

          // component:scan,
        },

      ]
    },

  ]
});



router.beforeEach((to, from, next) => {
  if (!to.matched.length) {
    next("/index");
  }
  // else if(to.matched.some(record => record.meta.requiresAuth)) {
  //   let t = localStorage.getItem('login') || '{}';
  //   t = JSON.parse(t);
  //   if(!t.token) {
      
  //   }
  //   else {
  //     next();
  //   }
  // }
  else {
    next();
  }
});

export default router;