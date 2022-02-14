import SmsMessageComponent from './sms-message.vue';
import SmsMessageCompactComponent from './sms-message-compact.vue';
import SmsMessageUpdateTemplate from './sms-message-update-template.vue';
const SmsMessage = {
  install: function (Vue: any) {
    Vue.component('jhi-sms-message', SmsMessageComponent);
    Vue.component('jhi-sms-message-compact', SmsMessageCompactComponent);
    Vue.component('jhi-sms-message-update', SmsMessageUpdateTemplate);
  },
};

export default SmsMessage;
