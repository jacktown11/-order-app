import Vue from 'vue';
import VueRouter from 'vue-router';
import OGoods from '@comp/o-goods/o-goods';
import ORatings from '@comp/o-ratings/o-ratings';
import OSeller from '@comp/o-seller/o-seller';

Vue.use(VueRouter);

let routesConfig = [
  {
    path: '/',
    redirect: '/goods'
  },
  {
    path: '/goods',
    component: OGoods
  },
  {
    path: '/ratings',
    component: ORatings
  },
  {
    path: '/seller',
    component: OSeller
  }
];

export default new VueRouter({
  routes: routesConfig,
  linkActiveClass: 'active-link'
});
