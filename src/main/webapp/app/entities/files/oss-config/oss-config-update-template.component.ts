import { Component, Vue, Inject, Prop, Watch } from 'vue-property-decorator';
import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';
import { IOssConfig, OssConfig } from '@/shared/model/files/oss-config.model';
import OssConfigService from './oss-config.service';

const validations: any = {
  ossConfig: {
    id: {},
    provider: {},
    ossCode: {},
    endpoint: {},
    accessKey: {},
    secretKey: {},
    bucketName: {},
    appId: {},
    region: {},
    remark: {},
    enabled: {},
  },
};

@Component({
  validations,
  components: {},
})
export default class OssConfigUpdateTemplate extends Vue {
  @Inject('ossConfigService') private ossConfigService: () => OssConfigService;
  public ossConfig: IOssConfig = new OssConfig();
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
  public ossConfigId = null;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.ossConfigId) {
        vm.retrieveOssConfig(to.params.ossConfigId);
      }
    });
  }
  created(): void {}

  public mounted(): void {}

  public save(): void {
    this.isSaving = true;
    if (this.ossConfig.id) {
      this.ossConfigService()
        .update(this.ossConfig)
        .then(param => {
          this.isSaving = false;
          const message = 'A OssConfig is updated with identifier ' + param.id;
          this.$message.info(message);
          this.$router.go(-1);
        });
    } else {
      this.ossConfigService()
        .create(this.ossConfig)
        .then(param => {
          this.isSaving = false;
          const message = 'A OssConfig is created with identifier ' + param.id;
          this.$message.success(message);
          this.$router.go(-1);
        });
    }
  }

  public retrieveOssConfig(ossConfigId): void {
    this.ossConfigService()
      .find(ossConfigId)
      .then(res => {
        this.ossConfig = res;
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
