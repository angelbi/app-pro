import { Component, Vue, Inject, Prop, Watch } from 'vue-property-decorator';
import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';
import { ISiteConfig, SiteConfig } from '@/shared/model/system/site-config.model';
import SiteConfigService from './site-config.service';

const validations: any = {
  siteConfig: {
    id: {},
    title: {},
    remark: {},
    fieldName: {},
    fieldValue: {},
    fieldType: {},
  },
};

@Component({
  validations,
  components: {},
})
export default class SiteConfigUpdateTemplate extends Vue {
  @Inject('siteConfigService') private siteConfigService: () => SiteConfigService;
  public siteConfig: ISiteConfig = new SiteConfig();
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
  public siteConfigId = null;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.siteConfigId) {
        vm.retrieveSiteConfig(to.params.siteConfigId);
      }
    });
  }
  created(): void {}

  public mounted(): void {}

  public save(): void {
    this.isSaving = true;
    if (this.siteConfig.id) {
      this.siteConfigService()
        .update(this.siteConfig)
        .then(param => {
          this.isSaving = false;
          const message = 'A SiteConfig is updated with identifier ' + param.id;
          this.$message.info(message);
          this.$router.go(-1);
        });
    } else {
      this.siteConfigService()
        .create(this.siteConfig)
        .then(param => {
          this.isSaving = false;
          const message = 'A SiteConfig is created with identifier ' + param.id;
          this.$message.success(message);
          this.$router.go(-1);
        });
    }
  }

  public retrieveSiteConfig(siteConfigId): void {
    this.siteConfigService()
      .find(siteConfigId)
      .then(res => {
        this.siteConfig = res;
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
