import OssConfigComponent from './oss-config.vue';
import OssConfigCompactComponent from './oss-config-compact.vue';
import OssConfigUpdateTemplate from './oss-config-update-template.vue';
const OssConfig = {
  install: function (Vue: any) {
    Vue.component('jhi-oss-config', OssConfigComponent);
    Vue.component('jhi-oss-config-compact', OssConfigCompactComponent);
    Vue.component('jhi-oss-config-update', OssConfigUpdateTemplate);
  },
};

export default OssConfig;
