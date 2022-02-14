import { Component, Vue, Inject, Prop, Watch } from 'vue-property-decorator';
import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import { IDataDictionary, DataDictionary } from '@/shared/model/settings/data-dictionary.model';
import DataDictionaryService from './data-dictionary.service';

const validations: any = {
  dataDictionary: {
    id: {},
    name: {},
    code: {},
    title: {},
    value: {},
    description: {},
    sortOrder: {},
    disabled: {},
    fontColor: {},
    valueType: {},
    backgroundColor: {},
  },
};

@Component({
  validations,
  components: {},
})
export default class DataDictionaryUpdateTemplate extends Vue {
  @Inject('dataDictionaryService') private dataDictionaryService: () => DataDictionaryService;
  public dataDictionary: IDataDictionary = new DataDictionary();

  public dataDictionaries: IDataDictionary[] = [];
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
  public dataDictionaryId = null;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.initRelationships();
      if (to.params.dataDictionaryId) {
        vm.retrieveDataDictionary(to.params.dataDictionaryId);
      }
    });
  }
  created(): void {
    this.initRelationships();
  }

  public mounted(): void {}

  public save(): void {
    this.isSaving = true;
    if (this.dataDictionary.id) {
      this.dataDictionaryService()
        .update(this.dataDictionary)
        .then(param => {
          this.isSaving = false;
          const message = 'A DataDictionary is updated with identifier ' + param.id;
          this.$message.info(message);
          this.$router.go(-1);
        });
    } else {
      this.dataDictionaryService()
        .create(this.dataDictionary)
        .then(param => {
          this.isSaving = false;
          const message = 'A DataDictionary is created with identifier ' + param.id;
          this.$message.success(message);
          this.$router.go(-1);
        });
    }
  }

  public retrieveDataDictionary(dataDictionaryId): void {
    this.dataDictionaryService()
      .find(dataDictionaryId)
      .then(res => {
        this.dataDictionary = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.dataDictionaryService()
      .tree()
      .then(res => {
        this.dataDictionaries = res.data;
      });
    this.dataDictionaryService()
      .tree()
      .then(res => {
        this.dataDictionaries = res.data;
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
