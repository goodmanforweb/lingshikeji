import VueRouter from "vue-router";
import Board from '../components/Board';
import Game from '../components/widget/xtabs/game';
import SGame from './Game';
import Rule from '../components/widget/xtabs/Rule';
import Record from '../components/Record';
import KRecord from '../components/KRecord';

import SRecord from '../components/SRecord';
import MRecord from '../components/MRecord';
import Index from '../components/Index';


import Trend from '../components/trend/index';
import Normal from '../components/trend/normal';
import Mega from '../components/trend/mega';
import Freq from '../components/trend/freq';


import Exchange from '../components/widget/exchange/index';
import Store from './vuex';
const router = new VueRouter({
  routes: [
    {
      path:'/index',
      name:'index',
      component: Index
    },
    {
      path:'/board',
      name:'board',
      component: Board,
      meta: {requiresAuth: true},
      children: [
        {
          path:':id/game',
          name:'game',
          component:Game
        },
        {
          path:':id/rule',
          name:'rule',
          component: Rule
        }
      ]
    },
    {
      path:'/rule/:id',
      name:'mrule',
      meta: {requiresAuth: true},
      component: Rule
    },
    {
      path:'/record',
      name:'record',
      meta: {requiresAuth: true},
      component: Record
    },
    {
      path:'/exchange',
      name:'exchange',
      meta: {requiresAuth: true},
      component: Exchange
    },
    {
      path:'/game/:id',
      name:'sgame',
      meta: {requiresAuth: true},
      component: SGame
    },
    {
      path:'/krecord',
      name:'krecord',
      meta: {requiresAuth: true},
      component: KRecord
    },
    {
      path:'/srecord',
      name:'srecord',
      meta: {requiresAuth: true},
      component: SRecord
    },
    {
      path:'/mrecord',
      name:'mrecord',
      meta: {requiresAuth: true},
      component: MRecord
    },
    {
      path:'/trend',
      name:'trend',
      meta: {requiresAuth: true},
      component: Trend,
      children: [
        {
          path:'normal',
          name:'normal',
          component: Normal
        },
        {
          path:'mega',
          name:'mega',
          component: Mega
        },
        {
          path:'freq',
          name:'freq',
          component: Freq
        },
      ]
    }
  ]
});


// 
router.beforeEach((to, from, next) => {
  if (!to.matched.length) {
    next("/index");
  }
  else if(to.matched.some(record => record.meta.requiresAuth)) {
    if(!localStorage.getItem('login')) {
      next({name: 'index'});
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