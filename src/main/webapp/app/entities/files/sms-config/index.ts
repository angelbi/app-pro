import SmsConfigComponent from './sms-config.vue';
import SmsConfigCompactComponent from './sms-config-compact.vue';
import SmsConfigUpdateTemplate from './sms-config-update-template.vue';
const SmsConfig = {
  install: function (Vue: any) {
    Vue.component('jhi-sms-config', SmsConfigComponent);
    Vue.component('jhi-sms-config-compact', SmsConfigCompactComponent);
    Vue.component('jhi-sms-config-update', SmsConfigUpdateTemplate);
  },
};

export default SmsConfig;
