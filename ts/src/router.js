import VueRouter from "vue-router";

import index from './components/ts/index';
import wallet from './components/wallet/index';
// import tool from './components/tool/index';
import cjs from './components/cjs/index';
import hub from './components/hub/index';
import help from './components/help/index';
// import report from './components/report/index';
// import my from './components/my/index';
import qianyue from './components/yiqianyu/index';


import about from './components/about/index';
//移动端路由
import dotrw from './components/rw/dot/index';
// import bnrw from './components/rw/bn/index';

import ddetail from './components/rw/dot/detail';
import ddash from './components/rw/dot/dash';
// import bdetail from './components/rw/bn/detail';
// import bdash from './components/rw/bn/dash';


// import calcer from './components/calcer/index'
import calcerrest from './components/calcer/dot/rest'
import hysj from './components/rw/dot/hysj'
import syjsq from './components/rw/dot/sycalcer'
import hysyjl from './components/rw/dot/hysyrecord'
import hytxjl from './components/rw/dot/txrecord'
import cznl from './components/rw/dot/chargepower'
import czjl from './components/rw/dot/czrecord'
import xmyj from './components/rw/dot/gzlzm'

// import hysytj from './components/rw/bn/hysytj'
// import keybuy from './components/rw/bn/keybuyrecord'
// import keyexc from './components/rw/bn/keyrecord'
// import bsyjsq from './components/rw/bn/sycalcer'


import dashdetail from './components/rw/dot/dashdetail'
// import bdashdetail from './components/rw/bn/dashdetail'


import deposit from './components/wallet/deposit';
import record from './components/wallet/record';
import withdraw from './components/wallet/withdraw';
import buy from './components/cjs/buy';
// import detail from './components/report/detail';
// import cj from './components/rw/cj';
import checkin from './components/cjs/checkin';
import txcheck from './components/rw/widgets/checkin';
import cjsbuyrecord from './components/cjs/record';
import proin from './components/widgets/pro';
import dothy from './components/rw/app/dot'
import bshy from './components/rw/app/bs'
//bs
import bsrm from './components/rw/bs/index'
import bsdash from './components/rw/bs/dash';
import sgtd from './components/rw/bs/sgtd/index';
import bsdetail from './components/rw/bs/detail';
import bsddetail from './components/rw/bs/dashdetail';
import hyybj from './components/rw/bs/hyybj';
import bsbuyjl from './components/rw/bs/keybuyrecord';
import bsexjl from './components/rw/bs/keyrecord';
import sgjl from './components/rw/bs/sgjl';
import bstj from './components/rw/bs/hysytj';


const router = new VueRouter({
  routes: [
    {
      path:'/index',
      name:'index',
      component: index,
    },
    {
      path:'/checkin',
      name:'checkin',
      component: checkin,
      meta: {requiresAuth: true},
    },
    {
      path:'/cjsbuyrecord',
      name:'cjsbuyrecord',
      component: cjsbuyrecord,
      meta: {requiresAuth: true},
    },
    {
      path:'/qianyue',
      name:'qianyue',
      component: qianyue,
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
    },
    
    {
      path:'/wallet',
      name:'wallet',
      component:wallet,
      meta: {requiresAuth: true},
      children: [
        {
          path:':name/deposit',
          name:'pdeposit',
          component:deposit,
          meta: {requiresAuth: true},
        },
        {
          path:':name/record',
          name:'precord',
          component:record,
          meta: {requiresAuth: true},
        },
        {
          path:':name/withdraw',
          name:'pwithdraw',
          component:withdraw,
          meta: {requiresAuth: true},
        },
      ]
    },
    {
      path:'/:name/deposit',
      name:'deposit',
      component:deposit,
      meta: {requiresAuth: true},
    },
    {
      path:'/:name/record',
      name:'record',
      component:record,
      meta: {requiresAuth: true},
    },
    {
      path:'/:name/withdraw',
      name:'withdraw',
      component:withdraw,
      meta: {requiresAuth: true},
    },
    {
      path:'/tool',
      name:'tool',
      // component:tool,
      component:  () => import(/* webpackChunkName: "tool" */ './components/tool/index'),
      meta: {requiresAuth: true}
    },
    {
      path:'/poster',
      name:'poster',
      component:  () => import(/* webpackChunkName: "tool" */ './components/tool/poster'),
      // component:poster,
      meta: {requiresAuth: true}
    },
    {
      path:'/resetpassindex',
      name:'resetpassindex',
      component:  () => import(/* webpackChunkName: "tool" */ './components/tool/resetpassindex'),
      // component:poster,
      meta: {requiresAuth: true},
    },
    {
      path:'/resetpass',
      name:'resetpass',
      component:  () => import(/* webpackChunkName: "tool" */ './components/tool/resetpass'),
      // component:poster,
      meta: {requiresAuth: true},
    },
    {
      path:'/cjs',
      name:'cjs',
      component:cjs,
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
      children: [
        {
          path:'fws/:id',
          name:'pfws',
          component:dothy,
          meta: {requiresAuth: true},
          children: [
            {
              path:'rw',
              name:'pdotrw',
              component:dotrw,
              meta: {requiresAuth: true},
            }
          ]
        },
        // {
        //   path:'bn/:id',
        //   name:'pbn',
        //   component:dothy,
        //   meta: {requiresAuth: true},
        //   children: [
        //     {
        //       path:'rw',
        //       name:'pbnrw',
        //       component:bnrw,
        //       meta: {requiresAuth: true},
        //     },
        //   ]
        // },
        {
          path:'bs/:id',
          name:'bsindex',
          component:bshy,
          meta: {requiresAuth: true},
          children: [
            {
              path:'rw',
              name:'bsrw',
              component:bsrm,
              meta: {requiresAuth: true},
            },
          ]
        }
      ]
    },
    {
      path:'/help',
      name:'help',
      component:  () => import(/* webpackChunkName: "help" */ './components/help/index'),
      // component:help,
    },
    {
      path:'/pro',
      name:'pro',
      // component:pro,
      component:  () => import(/* webpackChunkName: "pro" */ './components/pro/index'),
      // meta: {requiresAuth: true},
    },
    {
      path:'/report',
      name:'report',
      component:  () => import(/* webpackChunkName: "report" */ './components/report/index'),
      // component:report,
    },
    {
      path:'/detail',
      name:'detail',
      component:  () => import(/* webpackChunkName: "report" */ './components/report/detail'),
      // component:detail,
    },
    // {
    //   path:'/my',
    //   name:'my',
    //   // component:my,
    //   component:  () => import(/* webpackChunkName: "my" */ './components/my/index'),
    //   meta: {requiresAuth: true},
    // },
    // {
    //   path:'/bn/:id',
    //   name:'bn',
    //   component:dothy,
    //   meta: {requiresAuth: true},
    //   children: [
    //     {
    //       path:'bdash',
    //       name:'bdash',
    //       component:bdash,
    //       meta: {requiresAuth: true},
    //     },
    //     {
    //       path:'dashdetail',
    //       name:'bdashdetail',
    //       component:bdashdetail,
    //       meta: {requiresAuth: true},
    //     },
    //     {
    //       path:'bsyjsq',
    //       name:'bsyjsq',
    //       component:bsyjsq,
    //       meta: {requiresAuth: true},
    //     },
    //     {
    //       path:'hysytj',
    //       name:'hysytj',
    //       component:hysytj,
    //       meta: {requiresAuth: true},
    //     },
    //     {
    //       path:'keybuy',
    //       name:'keybuy',
    //       component:keybuy,
    //       meta: {requiresAuth: true},
    //     },
    //     {
    //       path:'keyexc',
    //       name:'keyexc',
    //       component:keyexc,
    //       meta: {requiresAuth: true},
    //     },
    //     {
    //       path:'rw',
    //       name:'mbnrw',
    //       component:bnrw,
    //       meta: {requiresAuth: true},
    //     },
    //     {
    //       path:'bdetail',
    //       name:'bdetail',
    //       component:bdetail,
    //       meta: {requiresAuth: true},
    //     },
    //   ]
    // },
    {
      path:'/fws/:id',
      name:'fws',
      component:dothy,
      meta: {requiresAuth: true},
      children: [
        {
          path:'ddash',
          name:'ddash',
          component:ddash,
          meta: {requiresAuth: true},
        },
        {
          path:'dashdetail',
          name:'dashdetail',
          component:dashdetail,
          meta: {requiresAuth: true},
        },
        {
          path:'hysj',
          name:'hysj',
          component:hysj,
          meta: {requiresAuth: true},
        },
        {
          path:'syjsq',
          name:'syjsq',
          component:syjsq,
          meta: {requiresAuth: true},
        },
        {
          path:'hysyjl',
          name:'hysyjl',
          component:hysyjl,
          meta: {requiresAuth: true},
        },
        {
          path:'hytxjl',
          name:'hytxjl',
          component:hytxjl,
          meta: {requiresAuth: true},
        },
        {
          path:'txcheck',
          name:'txcheck',
          component: txcheck,
          meta: {requiresAuth: true},
        },
        {
          path:'cznl',
          name:'cznl',
          component:cznl,
          meta: {requiresAuth: true},
        },
        {
          path:'czjl',
          name:'czjl',
          component:czjl,
          meta: {requiresAuth: true},
        },
        {
          path:'xmyj',
          name:'xmyj',
          component:xmyj,
          meta: {requiresAuth: true},
        },
        //rw
        {
          path:'rw',
          name:'mdotrw',
          component:dotrw,
          meta: {requiresAuth: true},
        },
        {
          path:'ddetail',
          name:'ddetail',
          component:ddetail,
          meta: {requiresAuth: true},
        },
      ]
    },
    {
      path:'/bs/:id',
      name:'bs',
      component:bshy,
      meta: {requiresAuth: true},
      children: [
        {
          path:'bsrw',
          name:'mbsrw',
          component:bsrm,
          meta: {requiresAuth: true},
        },
        {
          path:'hyybj',
          name:'hyybj',
          component:hyybj,
          meta: {requiresAuth: true},
        },
        {
          path:'bsbuyjl',
          name:'bsbuyjl',
          component:bsbuyjl,
          meta: {requiresAuth: true},
        },
        {
          path:'bsexjl',
          name:'bsexjl',
          component:bsexjl,
          meta: {requiresAuth: true},
        },
        {
          path:'sgjl',
          name:'sgjl',
          component:sgjl,
          meta: {requiresAuth: true},
        },
        {
          path:'bstj',
          name:'bstj',
          component:bstj,
          meta: {requiresAuth: true},
        },
        {
          path:'dash',
          name:'bsdash',
          component:bsdash,
          meta: {requiresAuth: true},
        },
        {
          path:'bsdetail',
          name:'bsdetail',
          component:bsdetail,
          meta: {requiresAuth: true},
        },
        {
          path:'bsddetail',
          name:'bsddetail',
          component:bsddetail,
          meta: {requiresAuth: true},
        },
        {
          path:'sgtd',
          name:'sgtd',
          component:sgtd,
          meta: {requiresAuth: true},
        },
      ]
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
      component:  () => import(/* webpackChunkName: "login" */ './components/login/index'),
      children: [
        {
          path:'login',
          name:'login',
          component:  () => import(/* webpackChunkName: "login" */ './components/login/login'),

          // component:login,
        },
        {
          path:'registar',
          name:'registar',
          component:  () => import(/* webpackChunkName: "login" */ './components/login/registar'),

          // component:login,
        },
        {
          path:'fixpass',
          name:'fixpass',
          component:  () => import(/* webpackChunkName: "login" */ './components/login/fixpass'),

          // component:login,
        },
        {
          path:'agreement',
          name:'agreement',
          // component:news,
          component:  () => import(/* webpackChunkName: "login" */ './components/agreement/index'),
    
        },
      ]
    },

  ]
});



router.beforeEach((to, from, next) => {
  let t = localStorage.getItem('login') || '{}';
  t = JSON.parse(t);
  if (!to.matched.length) {
    next("/index");
  }
  else if(to.matched.some(record => record.meta.requiresAuth)) {
    if(!t.token) {
      next('/lg/login')
    }
    else {
      next();
    }
  }
  else if(['login'].includes(to.name)) {
    if(t.token) {
      //不允许已经登录了的 进入登录注册页面
      next(from.name)
    }
    else {
      next()
    }
  }
  else {
    next()
  }
});

export default router;