import ViewPermissionComponent from './view-permission.vue';
import ViewPermissionCompactComponent from './view-permission-compact.vue';
import ViewPermissionUpdateTemplate from './view-permission-update-template.vue';
const ViewPermission = {
  install: function (Vue: any) {
    Vue.component('jhi-view-permission', ViewPermissionComponent);
    Vue.component('jhi-view-permission-compact', ViewPermissionCompactComponent);
    Vue.component('jhi-view-permission-update', ViewPermissionUpdateTemplate);
  },
};

export default ViewPermission;
