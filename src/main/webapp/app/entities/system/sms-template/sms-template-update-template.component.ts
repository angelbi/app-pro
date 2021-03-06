import { Component, Vue, Inject, Prop, Watch } from 'vue-property-decorator';
import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';
import { ISmsTemplate, SmsTemplate } from '@/shared/model/system/sms-template.model';
import SmsTemplateService from './sms-template.service';

const validations: any = {
  smsTemplate: {
    id: {},
    name: {},
    code: {},
    type: {},
    content: {},
    testJson: {},
  },
};

@Component({
  validations,
  components: {},
})
export default class SmsTemplateUpdateTemplate extends Vue {
  @Inject('smsTemplateService') private smsTemplateService: () => SmsTemplateService;
  public smsTemplate: ISmsTemplate = new SmsTemplate();
  public isSaving = false;
  public loading = false;
  public formJsonData = {
    list: [],
    config: {
      layout: 'horizontal',
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      hideRequiredMark: false,
      customStyle: '',
    },
  };
  public dataFormContent = [];
  public smsTemplateId = null;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.smsTemplateId) {
        vm.retrieveSmsTemplate(to.params.smsTemplateId);
      }
    });
  }
  created(): void {}

  public mounted(): void {}

  public save(): void {
    this.isSaving = true;
    if (this.smsTemplate.id) {
      this.smsTemplateService()
        .update(this.smsTemplate)
        .then(param => {
          this.isSaving = false;
          const message = 'A SmsTemplate is updated with identifier ' + param.id;
          this.$message.info(message);
          this.$router.go(-1);
        });
    } else {
      this.smsTemplateService()
        .create(this.smsTemplate)
        .then(param => {
          this.isSaving = false;
          const message = 'A SmsTemplate is created with identifier ' + param.id;
          this.$message.success(message);
          this.$router.go(-1);
        });
    }
  }

  public retrieveSmsTemplate(smsTemplateId): void {
    this.smsTemplateService()
      .find(smsTemplateId)
      .then(res => {
        this.smsTemplate = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}

  // ??????????????????????????????????????????????????????????????????????????????????????????
  public toTreeNode(items: any, valueFieldName: string, labelFieldName: string, currentId?: any, disabledParent: boolean = false) {
    const nzTreeNode = [];
    if (!items) {
      return nzTreeNode;
    }
    items.forEach(item => {
      let disabledChildren = false;
      const option = {
        value: item[valueFieldName],
        label: item[labelFieldName],
        disabled: disabledParent, // ????????????????????????????????????????????????????????????
        children: undefined,
      };
      if (item[valueFieldName] === currentId) {
        option.disabled = true;
        disabledChildren = true;
      }
      if (item.children && item.children.length > 0) {
        option.children = this.toTreeNode(item.children, valueFieldName, labelFieldName, currentId, disabledChildren);
      }
      nzTreeNode.push(option);
    });
    console.log(nzTreeNode);
    return nzTreeNode;
  }
}
