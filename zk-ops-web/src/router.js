import VueRouter from "vue-router";
import login from './components/index/index';
// import dash from './components/dash/index';
// import userpanel from './components/dash/userpanel';
// import manmaneger from './components/man/manmaneger'
// import blacklist from './components/man/blacklist'
// import addblacklist from './components/man/blacklist-panel'


// import viplist from './components/man/viplist'
// import addvip from './components/man/blacklist-panel-add'
// import ajustrights from './components/man/blacklist-panel-ajust'
// import checkrights from './components/man/blacklist-panel-check'

// import vipsetting from './components/man/vipsetting'
// import vipsettingpanel from './components/man/vipsetting-panel'


// import prohub from './components/tool/prohub'
// import pkjlists from './components/tool/prohub-kjlists'
// import pchecksale from './components/tool/prohub-checksale'
// import pcheckpool from './components/tool/prohub-checkpool'
// import ppanel from './components/tool/prohub-panel'
// import preport from './components/tool/prohub-panel-dash-report'
// import pdash from './components/tool/prohub-panel-dash'
// import pdetail from './components/tool/prohub-panel-detail'
// import prwdetail from './components/tool/prohub-panel-rw-detail'
// import prw from './components/tool/prohub-panel-rw'
// import pstate from './components/tool/prohub-panel-state'

// import kjguide from './components/tool/kjguide'
// import addguide from './components/guide/guide-panel-add'
// import editguide from './components/guide/guide-panel-edit'
// import addkjguide from './components/guide/prohub-panel-addkj'

// import adavail from './components/monitor/adavail'
// import report from './components/monitor/report'
// import adavailpanel from './components/monitor/adavail-panel'
// import reportpanel from './components/monitor/report-panel'

// import sysconfig from './components/setting/sysconfig'
// import monitoraddress from './components/setting/monitoraddress'
// import settingpanel from './components/setting/monitoraddress-panel'
// import itoper from './components/setting/itoper'
// import tranoper from './components/setting/tranoper'

import wallet from './components/wallet/wallet';
import fabi from './components/fabi/index';
import fabip from './components/fabi/panel';
import dofabi from './components/fabi/fabi';


const router = new VueRouter({
  routes: [
    {
      path:'/login',
      name:'login',
      component: login,
    },
    {
      path:'/wallet',
      name:'wallet',
      component: wallet,
      meta: {requiresAuth: true},
    },
    {
      path:'/fabi',
      name:'fabi',
      component: fabi,
      meta: {requiresAuth: true},
    },
    {
      path:'/fabip',
      name:'fabip',
      component: fabip,
      meta: {requiresAuth: true},
    },
    {
      path:'/dofabi',
      name:'dofabi',
      component: dofabi,
      meta: {requiresAuth: true},
    },
    
    // {
    //   path:'/index',
    //   name:'dash',
    //   component: dash,
    //   meta: {requiresAuth: true},
    // },
    // {
    //   path:'/userpanel',
    //   name:'userpanel',
    //   component: userpanel,
    // },
    // {
    //   path:'/manmaneger',
    //   name:'manmaneger',
    //   component: manmaneger,
    //   meta: {requiresAuth: true},
    // },
    // {
    //   path:'/blacklist',
    //   name:'blacklist',
    //   component: blacklist,
    //   meta: {requiresAuth: true},
    // },
    // {
    //   path:'/addblacklist',
    //   name:'addblacklist',
    //   component: addblacklist,
    //   meta: {requiresAuth: true},
    // },
    // {
    //   path:'/viplist',
    //   name:'viplist',
    //   component: viplist,
    //   meta: {requiresAuth: true},
    // },
    // {
    //   path:'/addvip',
    //   name:'addvip',
    //   component: addvip,
    //   meta: {requiresAuth: true},
    // },
    // {
    //   path:'/ajustrights',
    //   name:'ajustrights',
    //   component: ajustrights,
    //   meta: {requiresAuth: true},
    // },
    // {
    //   path:'/checkrights',
    //   name:'checkrights',
    //   component: checkrights,
    //   meta: {requiresAuth: true},
    // },
    // {
    //   path:'/vipsetting',
    //   name:'vipsetting',
    //   component: vipsetting,
    //   meta: {requiresAuth: true},
    // },
    // {
    //   path:'/vipsettingpanel',
    //   name:'vipsettingpanel',
    //   component: vipsettingpanel,
    //   meta: {requiresAuth: true},
    // },
    // {
    //   path:'/prohub',
    //   name:'prohub',
    //   component: prohub,
    //   meta: {requiresAuth: true},
    // },
    // {
    //   path:'/pkjlists',
    //   name:'pkjlists',
    //   component: pkjlists,
    //   meta: {requiresAuth: true},
    // },
    // {
    //   path:'/pchecksale',
    //   name:'pchecksale',
    //   component: pchecksale,
    //   meta: {requiresAuth: true},
    // },
    // {
    //   path:'/pcheckpool',
    //   name:'pcheckpool',
    //   component: pcheckpool,
    //   meta: {requiresAuth: true},
    // },
    // {
    //   path:'/ppanel',
    //   name:'ppanel',
    //   component: ppanel,
    //   meta: {requiresAuth: true},
    // },
    // {
    //   path:'/preport',
    //   name:'preport',
    //   component: preport,
    //   meta: {requiresAuth: true},
    // },
    // {
    //   path:'/pdash',
    //   name:'pdash',
    //   component: pdash,
    //   meta: {requiresAuth: true},
    // },
    // {
    //   path:'/pdetail',
    //   name:'pdetail',
    //   component: pdetail,
    //   meta: {requiresAuth: true},
    // },
    // {
    //   path:'/prwdetail',
    //   name:'prwdetail',
    //   component: prwdetail,
    //   meta: {requiresAuth: true},
    // },
    // {
    //   path:'/prw',
    //   name:'prw',
    //   component: prw,
    //   meta: {requiresAuth: true},
    // },
    // {
    //   path:'/pstate',
    //   name:'pstate',
    //   component: pstate,
    //   meta: {requiresAuth: true},
    // },
    // {
    //   path:'/kjguide',
    //   name:'kjguide',
    //   component: kjguide,
    //   meta: {requiresAuth: true},
    // },
    // {
    //   path:'/addguide',
    //   name:'addguide',
    //   component: addguide,
    //   meta: {requiresAuth: true},
    // },
    // {
    //   path:'/editguide',
    //   name:'editguide',
    //   component: editguide,
    //   meta: {requiresAuth: true},
    // },
    // {
    //   path:'/addkjguide',
    //   name:'addkjguide',
    //   component: addkjguide,
    //   meta: {requiresAuth: true},
    // },
    // {
    //   path:'/adavail',
    //   name:'adavail',
    //   component: adavail,
    //   meta: {requiresAuth: true},
    // },
    // {
    //   path:'/report',
    //   name:'report',
    //   component: report,
    //   meta: {requiresAuth: true},
    // },
    // {
    //   path:'/adavailpanel',
    //   name:'adavailpanel',
    //   component: adavailpanel,
    //   meta: {requiresAuth: true},
    // },
    // {
    //   path:'/reportpanel',
    //   name:'reportpanel',
    //   component: reportpanel,
    //   meta: {requiresAuth: true},
    // },
    // {
    //   path:'/sysconfig',
    //   name:'sysconfig',
    //   component: sysconfig,
    //   meta: {requiresAuth: true},
    // },
    // {
    //   path:'/monitoraddress',
    //   name:'monitoraddress',
    //   component: monitoraddress,
    //   meta: {requiresAuth: true},
    // },
    // {
    //   path:'/itoper',
    //   name:'itoper',
    //   component: itoper,
    //   meta: {requiresAuth: true},
    // },
    // {
    //   path:'/tranoper',
    //   name:'tranoper',
    //   component: tranoper,
    //   meta: {requiresAuth: true},
    // },
    // {
    //   path:'/settingpanel',
    //   name:'settingpanel',
    //   component: settingpanel,
    //   meta: {requiresAuth: true},
    // }
  ]
});



router.beforeEach((to, from, next) => {
  if (!to.matched.length) {
    next("/wallet");
  }
  else if(to.matched.some(record => record.meta.requiresAuth)) {
    let t = localStorage.getItem('login') || '{}';
    t = JSON.parse(t);
    if(!t.token) {
      next('/login')
    }
    else {
      next();
    }
  }
  else {
    next();
  }
  // next()
});

export default router;