import SmsTemplateComponent from './sms-template.vue';
import SmsTemplateCompactComponent from './sms-template-compact.vue';
import SmsTemplateUpdateTemplate from './sms-template-update-template.vue';
const SmsTemplate = {
  install: function (Vue: any) {
    Vue.component('jhi-sms-template', SmsTemplateComponent);
    Vue.component('jhi-sms-template-compact', SmsTemplateCompactComponent);
    Vue.component('jhi-sms-template-update', SmsTemplateUpdateTemplate);
  },
};

export default SmsTemplate;
