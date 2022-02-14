import { Component, Vue, Inject } from 'vue-property-decorator';
import { ISmsMessage } from '@/shared/model/system/sms-message.model';
import SmsMessageService from './sms-message.service';

@Component
export default class SmsMessageDetails extends Vue {
  @Inject('smsMessageService') private smsMessageService: () => SmsMessageService;
  public smsMessage: ISmsMessage = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.smsMessageId) {
        vm.retrieveSmsMessage(to.params.smsMessageId);
      }
    });
  }

  public retrieveSmsMessage(smsMessageId) {
    this.smsMessageService()
      .find(smsMessageId)
      .then(res => {
        this.smsMessage = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
