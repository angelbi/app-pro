import { Component, Vue, Inject, Prop, Watch } from 'vue-property-decorator';
import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';
import moment from 'moment';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';
import { ISmsMessage, SmsMessage } from '@/shared/model/system/sms-message.model';
import SmsMessageService from './sms-message.service';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';
import { UPLOAD_IMAGE_URL } from '@/constants';

const validations: any = {
  smsMessage: {
    id: {},
    title: {},
    sendType: {},
    receiver: {},
    params: {},
    content: {},
    sendTime: {},
    sendStatus: {},
    retryNum: {},
    failResult: {},
    remark: {},
  },
};

@Component({
  validations,
  components: {
    'jhi-quill-editor': quillEditor,
  },
})
export default class SmsMessageUpdateTemplate extends Vue {
  @Inject('smsMessageService') private smsMessageService: () => SmsMessageService;
  public smsMessage: ISmsMessage = new SmsMessage();
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
  public smsMessageId = null;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.smsMessageId) {
        vm.retrieveSmsMessage(to.params.smsMessageId);
      }
    });
  }
  created(): void {}

  public mounted(): void {}

  public save(): void {
    this.isSaving = true;
    if (this.smsMessage.id) {
      this.smsMessageService()
        .update(this.smsMessage)
        .then(param => {
          this.isSaving = false;
          const message = 'A SmsMessage is updated with identifier ' + param.id;
          this.$message.info(message);
          this.$router.go(-1);
        });
    } else {
      this.smsMessageService()
        .create(this.smsMessage)
        .then(param => {
          this.isSaving = false;
          const message = 'A SmsMessage is created with identifier ' + param.id;
          this.$message.success(message);
          this.$router.go(-1);
        });
    }
  }

  public retrieveSmsMessage(smsMessageId): void {
    this.smsMessageService()
      .find(smsMessageId)
      .then(res => {
        this.smsMessage = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}

  // 有一问题要注意，我不能选择已经是我下级的节点做我的上级节点。
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
        disabled: disabledParent, // 树形关系中自己不能选择自己做为上级对象。
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
