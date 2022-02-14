import { Component, Vue, Inject, Prop, Watch } from 'vue-property-decorator';
import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import { IRegionCode, RegionCode } from '@/shared/model/settings/region-code.model';
import RegionCodeService from './region-code.service';

const validations: any = {
  regionCode: {
    id: {},
    name: {},
    areaCode: {},
    cityCode: {},
    mergerName: {},
    shortName: {},
    zipCode: {},
    level: {},
    lng: {},
    lat: {},
  },
};

@Component({
  validations,
  components: {},
})
export default class RegionCodeUpdateTemplate extends Vue {
  @Inject('regionCodeService') private regionCodeService: () => RegionCodeService;
  public regionCode: IRegionCode = new RegionCode();

  public regionCodes: IRegionCode[] = [];
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
  public regionCodeId = null;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.initRelationships();
      if (to.params.regionCodeId) {
        vm.retrieveRegionCode(to.params.regionCodeId);
      }
    });
  }
  created(): void {
    this.initRelationships();
  }

  public mounted(): void {}

  public save(): void {
    this.isSaving = true;
    if (this.regionCode.id) {
      this.regionCodeService()
        .update(this.regionCode)
        .then(param => {
          this.isSaving = false;
          const message = 'A RegionCode is updated with identifier ' + param.id;
          this.$message.info(message);
          this.$router.go(-1);
        });
    } else {
      this.regionCodeService()
        .create(this.regionCode)
        .then(param => {
          this.isSaving = false;
          const message = 'A RegionCode is created with identifier ' + param.id;
          this.$message.success(message);
          this.$router.go(-1);
        });
    }
  }

  public retrieveRegionCode(regionCodeId): void {
    this.regionCodeService()
      .find(regionCodeId)
      .then(res => {
        this.regionCode = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.regionCodeService()
      .tree()
      .then(res => {
        this.regionCodes = res.data;
      });
    this.regionCodeService()
      .tree()
      .then(res => {
        this.regionCodes = res.data;
      });
  }

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
