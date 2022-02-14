import { Component, Vue, Inject } from 'vue-property-decorator';
import { ISmsTemplate } from '@/shared/model/system/sms-template.model';
import SmsTemplateService from './sms-template.service';

@Component
export default class SmsTemplateDetails extends Vue {
  @Inject('smsTemplateService') private smsTemplateService: () => SmsTemplateService;
  public smsTemplate: ISmsTemplate = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.smsTemplateId) {
        vm.retrieveSmsTemplate(to.params.smsTemplateId);
      }
    });
  }

  public retrieveSmsTemplate(smsTemplateId) {
    this.smsTemplateService()
      .find(smsTemplateId)
      .then(res => {
        this.smsTemplate = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
