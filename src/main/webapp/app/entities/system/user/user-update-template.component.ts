import { Component, Vue, Inject, Prop, Watch } from 'vue-property-decorator';
import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';
import moment from 'moment';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import DepartmentService from '../../settings//department/department.service';
import { IDepartment } from '@/shared/model/settings/department.model';

import PositionService from '../../settings//position/position.service';
import { IPosition } from '@/shared/model/settings/position.model';

import { IUser, User } from '@/shared/model/system/user.model';
import UserService from './user.service';

const validations: any = {
  user: {
    id: {},
    login: {},
    password: {},
    firstName: {},
    lastName: {},
    email: {},
    mobile: {},
    birthday: {},
    activated: {},
    langKey: {},
    imageUrl: {},
    activationKey: {},
    resetKey: {},
    resetDate: {},
  },
};

@Component({
  validations,
  components: {},
})
export default class UserUpdateTemplate extends Vue {
  @Inject('userService') private userService: () => UserService;
  public user: IUser = new User();

  @Inject('departmentService') private departmentService: () => DepartmentService;

  public departments: IDepartment[] = [];

  @Inject('positionService') private positionService: () => PositionService;

  public positions: IPosition[] = [];
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
  public userId = null;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.initRelationships();
      if (to.params.userId) {
        vm.retrieveUser(to.params.userId);
      }
    });
  }
  created(): void {
    this.initRelationships();
  }

  public mounted(): void {}

  public save(): void {
    this.isSaving = true;
    if (this.user.id) {
      this.userService()
        .update(this.user)
        .then(param => {
          this.isSaving = false;
          const message = 'A User is updated with identifier ' + param.id;
          this.$message.info(message);
          this.$router.go(-1);
        });
    } else {
      this.userService()
        .create(this.user)
        .then(param => {
          this.isSaving = false;
          const message = 'A User is created with identifier ' + param.id;
          this.$message.success(message);
          this.$router.go(-1);
        });
    }
  }

  public retrieveUser(userId): void {
    this.userService()
      .find(userId)
      .then(res => {
        this.user = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.departmentService()
      .tree()
      .then(res => {
        this.departments = res.data;
      });
    this.positionService()
      .retrieve()
      .then(res => {
        this.positions = res.data;
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
