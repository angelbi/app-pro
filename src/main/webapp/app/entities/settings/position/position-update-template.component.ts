import { Component, Vue, Inject, Prop, Watch } from 'vue-property-decorator';
import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import UserService from '@/shared/service/user.service';

import { IPosition, Position } from '@/shared/model/settings/position.model';
import PositionService from './position.service';

const validations: any = {
  position: {
    id: {},
    code: {
      required,
      maxLength: maxLength(50),
    },
    name: {
      required,
      maxLength: maxLength(50),
    },
    sortNo: {},
    description: {
      maxLength: maxLength(200),
    },
  },
};

@Component({
  validations,
  components: {},
})
export default class PositionUpdateTemplate extends Vue {
  @Inject('positionService') private positionService: () => PositionService;
  public position: IPosition = new Position();

  @Inject('userService') private userService: () => UserService;

  public users: Array<any> = [];
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
  public positionId = null;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.initRelationships();
      if (to.params.positionId) {
        vm.retrievePosition(to.params.positionId);
      }
    });
  }
  created(): void {
    this.initRelationships();
  }

  public mounted(): void {}

  public save(): void {
    this.isSaving = true;
    if (this.position.id) {
      this.positionService()
        .update(this.position)
        .then(param => {
          this.isSaving = false;
          const message = 'A Position is updated with identifier ' + param.id;
          this.$message.info(message);
          this.$router.go(-1);
        });
    } else {
      this.positionService()
        .create(this.position)
        .then(param => {
          this.isSaving = false;
          const message = 'A Position is created with identifier ' + param.id;
          this.$message.success(message);
          this.$router.go(-1);
        });
    }
  }

  public retrievePosition(positionId): void {
    this.positionService()
      .find(positionId)
      .then(res => {
        this.position = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.userService()
      .retrieve()
      .then(res => {
        this.users = res.data;
      });
  }

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
