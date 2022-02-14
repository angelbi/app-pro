import ApiPermissionComponent from './api-permission.vue';
import ApiPermissionCompactComponent from './api-permission-compact.vue';
import ApiPermissionUpdateTemplate from './api-permission-update-template.vue';
const ApiPermission = {
  install: function (Vue: any) {
    Vue.component('jhi-api-permission', ApiPermissionComponent);
    Vue.component('jhi-api-permission-compact', ApiPermissionCompactComponent);
    Vue.component('jhi-api-permission-update', ApiPermissionUpdateTemplate);
  },
};

export default ApiPermission;
