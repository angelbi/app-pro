import Vue from 'vue';
import Router from 'vue-router';
import { constantRouterMap } from '@/config/router.config';
import { Component } from 'vue-property-decorator';

Vue.use(Router);

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate', // for vue-router 2.2+
]);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
});
