import { Component, Vue, Inject, Prop, Watch } from 'vue-property-decorator';
import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';
import moment from 'moment';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import AuthorityService from '../../system//authority/authority.service';
import { IAuthority } from '@/shared/model/system/authority.model';

import UserService from '@/shared/service/user.service';

import DepartmentAuthorityService from '../../settings//department-authority/department-authority.service';
import { IDepartmentAuthority } from '@/shared/model/settings/department-authority.model';

import { IDepartment, Department } from '@/shared/model/settings/department.model';
import DepartmentService from './department.service';

const validations: any = {
  department: {
    id: {},
    name: {},
    code: {},
    address: {},
    phoneNum: {},
    logo: {},
    contact: {},
    createUserId: {},
    createTime: {},
  },
};

@Component({
  validations,
  components: {},
})
export default class DepartmentUpdateTemplate extends Vue {
  @Inject('departmentService') private departmentService: () => DepartmentService;
  public department: IDepartment = new Department();

  public departments: IDepartment[] = [];

  @Inject('authorityService') private authorityService: () => AuthorityService;

  public authorities: IAuthority[] = [];

  @Inject('userService') private userService: () => UserService;

  public users: Array<any> = [];

  @Inject('departmentAuthorityService') private departmentAuthorityService: () => DepartmentAuthorityService;

  public departmentAuthorities: IDepartmentAuthority[] = [];
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
  public departmentId = null;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.initRelationships();
      if (to.params.departmentId) {
        vm.retrieveDepartment(to.params.departmentId);
      }
    });
  }
  created(): void {
    this.initRelationships();
    this.department.authorities = [];
  }

  public mounted(): void {}

  public save(): void {
    this.isSaving = true;
    if (this.department.id) {
      this.departmentService()
        .update(this.department)
        .then(param => {
          this.isSaving = false;
          const message = 'A Department is updated with identifier ' + param.id;
          this.$message.info(message);
          this.$router.go(-1);
        });
    } else {
      this.departmentService()
        .create(this.department)
        .then(param => {
          this.isSaving = false;
          const message = 'A Department is created with identifier ' + param.id;
          this.$message.success(message);
          this.$router.go(-1);
        });
    }
  }

  public retrieveDepartment(departmentId): void {
    this.departmentService()
      .find(departmentId)
      .then(res => {
        this.department = res;
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
    this.authorityService()
      .tree()
      .then(res => {
        this.authorities = res.data;
      });
    this.departmentService()
      .tree()
      .then(res => {
        this.departments = res.data;
      });
    this.userService()
      .retrieve()
      .then(res => {
        this.users = res.data;
      });
    this.departmentAuthorityService()
      .retrieve()
      .then(res => {
        this.departmentAuthorities = res.data;
      });
  }

  public getSelected(selectedVals, option): any {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
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
