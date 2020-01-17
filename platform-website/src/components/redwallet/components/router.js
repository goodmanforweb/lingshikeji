import VueRouter from "vue-router";
import util from '../util/util';

import index from './index';
import shake from './shake';
import reward from './reward';
import wish from './wish';
import dash from './dash/dash.vue';
import yd from './dash/yd';
import fc from './dash/fc';
import yq from './dash/yq';
import gl from './gl';
import award from './award';
import vip from './vip/index';
import detail from './mall/detail';
import lj from './mall/index';


const router = new VueRouter({
  routes: [
    {
      path:'/index',
      name:'index',
      component: index,
      meta: {requiresAuth: true},
    },
    {
      path:'/shake',
      name:'shake',
      component: shake,
      meta: {requiresAuth: true},
    },
    {
      path:'/reward/:id',
      name:'reward',
      component: reward,
      props: true,
      meta: {requiresAuth: true},
    },
    {
      path:'/wish',
      name:'wish',
      component: wish,
      meta: {requiresAuth: true},
    },
    {
      path:'/gl',
      name:'gl',
      component: gl,
      // meta: {requiresAuth: true},
    },
    {
      path:'/award/:id',
      name:'award',
      component: award,
      meta: {requiresAuth: true},
    },
    {
      path:'/vip',
      name:'vip',
      component: vip,
      meta: {requiresAuth: true},
    },
    {
      path:'/detail',
      name:'detail',
      component: detail,
      meta: {requiresAuth: true},
    },
    {
      path:'/lj',
      name:'lj',
      component: lj,
      meta: {requiresAuth: true},
    },
    {
      path:'/dash',
      name:'dash',
      component: dash,
      meta: {requiresAuth: true},
      children: [
        {
          path:'yd',
          name:'yd',
          component: yd,
        },
        {
          path:'fc',
          name:'fc',
          component: fc,
        },
        {
          path:'yq',
          name:'yq',
          component: yq,
        },
      ]
    },
    
  ]
});



router.beforeEach((to, from, next) => {
  if (!to.matched.length) {
    next("/index");
  }
  else if(to.matched.some(record => record.meta.requiresAuth)) {
    let t = localStorage.getItem('login') || '{}';
    t = JSON.parse(t);
    if(!t.token) {
      window.location.href = `./#/logintab/login?redirect=${location.origin+location.pathname}&hashuri=${to.name}`
    }
    else {
      next();
    }
  }
  else {
    next();
  }
});

export default router;