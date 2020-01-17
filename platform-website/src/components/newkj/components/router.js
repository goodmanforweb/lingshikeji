import VueRouter from "vue-router";
import index from './Index';
import mall from './mall';
import exchange from './exchange';
import record from './record';
import power from './power';
import buyrecord from './buyrecord';
import jz from './jz';
import poster from './Poster';
const router = [
    {
      name:'kjindex',
      path: '/kjindex',
      component: index
      // component:  () => import(/* webpackChunkName: "kj" */ './Index.vue')
    },
    {
      name:'kjposter',
      path: '/kjposter',
      component: poster,
      // component:  () => import(/* webpackChunkName: "kj" */ './Poster.vue')
    },
    {
      name:'kjmall',
      path: '/kjmall',
      component: mall,
      // component:  () => import(/* webpackChunkName: "kj" */ './mall.vue')
    },
    {
      name:'kjexchange',
      path: '/kjexchange',
      component:exchange,
      // component:  () => import(/* webpackChunkName: "kj" */ './exchange.vue')
    },
    {
      name:'kjrecord',
      path: '/kjrecord',
      component: record,
      // component:  () => import(/* webpackChunkName: "kj" */ './record.vue')
    },
    {
      name:'kjpower',
      path: '/kjpower',
      component: power,
      // component:  () => import(/* webpackChunkName: "kj" */ './power.vue')
    },
    {
      name:'kjbuyrecord',
      path: '/kjbuyrecord',
      component: buyrecord,
      // component:  () => import(/* webpackChunkName: "kj" */ './buyrecord.vue')
    },
    {
      name:'kjjz',
      path: '/kjjz',
      component: jz
      // component:  () => import(/* webpackChunkName: "kj" */ './jz.vue')
    }
  ];


export default router;