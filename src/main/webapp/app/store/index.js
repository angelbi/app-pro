import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';
import permission from './modules/permission';
import enhance from './modules/enhance';
import online from './modules/online';
import { translationStore } from '@/store/modules/translation-store';
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    enhance,
    online,
    translationStore,
  },
  state: {},
  mutations: {},
  actions: {},
  getters,
});
