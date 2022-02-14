import SysLogComponent from './sys-log.vue';
import SysLogCompactComponent from './sys-log-compact.vue';
import SysLogUpdateTemplate from './sys-log-update-template.vue';
const SysLog = {
  install: function (Vue: any) {
    Vue.component('jhi-sys-log', SysLogComponent);
    Vue.component('jhi-sys-log-compact', SysLogCompactComponent);
    Vue.component('jhi-sys-log-update', SysLogUpdateTemplate);
  },
};

export default SysLog;
