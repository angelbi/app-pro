import { Component, Vue, Inject, Prop, Watch } from 'vue-property-decorator';
import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';
import { ISysLog, SysLog } from '@/shared/model/system/sys-log.model';
import SysLogService from './sys-log.service';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';
import { UPLOAD_IMAGE_URL } from '@/constants';

const validations: any = {
  sysLog: {
    id: {},
    logType: {},
    logContent: {},
    operateType: {},
    userid: {},
    username: {},
    ip: {},
    method: {},
    requestUrl: {},
    requestParam: {},
    requestType: {},
    costTime: {},
  },
};

@Component({
  validations,
  components: {
    'jhi-quill-editor': quillEditor,
  },
})
export default class SysLogUpdateTemplate extends Vue {
  @Inject('sysLogService') private sysLogService: () => SysLogService;
  public sysLog: ISysLog = new SysLog();
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
  public sysLogId = null;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.sysLogId) {
        vm.retrieveSysLog(to.params.sysLogId);
      }
    });
  }
  created(): void {}

  public mounted(): void {}

  public save(): void {
    this.isSaving = true;
    if (this.sysLog.id) {
      this.sysLogService()
        .update(this.sysLog)
        .then(param => {
          this.isSaving = false;
          const message = 'A SysLog is updated with identifier ' + param.id;
          this.$message.info(message);
          this.$router.go(-1);
        });
    } else {
      this.sysLogService()
        .create(this.sysLog)
        .then(param => {
          this.isSaving = false;
          const message = 'A SysLog is created with identifier ' + param.id;
          this.$message.success(message);
          this.$router.go(-1);
        });
    }
  }

  public retrieveSysLog(sysLogId): void {
    this.sysLogService()
      .find(sysLogId)
      .then(res => {
        this.sysLog = res;
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
