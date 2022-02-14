// with polyfills
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Vue from 'vue';
import App from './App.vue';
import './config';
import Storage from 'vue-ls';
import router from './router';
import store from './store/';
import { VueAxios } from './utils/request';
import Viser from 'viser-vue';
import 'ant-design-vue/dist/antd.less'; // or 'ant-design-vue/dist/antd.less'

import hasPermission from '@/utils/hasPermission';
import vueBus from '@/utils/vueBus';
//表单验证
import { rules } from '@/utils/rules';
Vue.prototype.rules = rules;
Vue.config.productionTip = false;
Vue.use(Storage, config.storageOptions);
Vue.use(Antd);
Vue.use(VueAxios, router);
Vue.use(Viser);
Vue.use(hasPermission);
Vue.use(vueBus);
import KFormDesign from '@/components/jhi-data-form';
import { UPLOAD_IMAGE_URL, UPLOAD_FILE_URL } from '@/constants';
const jwttoken = localStorage.getItem('jhi-authenticationToken') || sessionStorage.getItem('jhi-authenticationToken');
KFormDesign.setConfig({
  uploadFile: UPLOAD_FILE_URL, // 上传文件地址
  uploadImage: UPLOAD_IMAGE_URL, // 上传图片地址
  uploadFileName: 'file',
  uploadImageName: 'image',
  uploadFileHeaders: { Authorization: `Bearer ${jwttoken}` },
  uploadImageHeaders: { Authorization: `Bearer ${jwttoken}` },
});
import Antd from 'ant-design-vue';
import './permission'; // permission control
import '@/utils/filter'; // base filter
import SSO from '@/cas/sso.js';
import { config, refreshConfig } from '@/config/defaultSettings';

import 'xe-utils';
import VXETable from 'vxe-table';
import 'vxe-table/lib/index.css';
import 'vxe-table-plugin-antd/dist/style.css';
Vue.use(VXETable);
import VXETablePluginAntd from 'vxe-table-plugin-antd';
import VXEAntdJhi from '@/components/vxe-select-list-modal';
VXETable.use(VXETablePluginAntd);
VXETable.use(VXEAntdJhi);
Vue.use(KFormDesign);
import vcolorpicker from 'vcolorpicker';
Vue.use(vcolorpicker);
import './core/lazy_use';
import './utils/filter'; // global filter
// @ts-ignore
Vue.component('v-chart', VueECharts);
import UploadPicture from '@/components/uploadPicture/index.vue';
Vue.component('upload-picture', UploadPicture);
import * as jhiConfig from './shared/config/config';
import '@/config/shared-entity-components';
import AccountService from './account/account.service';
import UserService from '@/shared/service/user.service';
import ViewPermissionService from '@/entities/system/view-permission/view-permission.service';

jhiConfig.initVueApp(Vue);
const viewPermissionService = new ViewPermissionService();
const accountService = new AccountService(store, router, viewPermissionService);
import { serviers } from '@/config/service-provider';
Vue.config.productionTip = false;

SSO.init(() => {
  main();
});

function main() {
  new Vue({
    el: '#app',
    components: { App },
    template: '<App/>',
    router,
    store,
    mounted() {
      refreshConfig(store, Vue);
    },
    provide: {
      accountService: () => accountService,
      userService: () => new UserService(),
      ...serviers,
    },
  });
}
