import { Component, Vue, Inject, Prop, Watch } from 'vue-property-decorator';
import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';
import moment from 'moment';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import UserService from '@/shared/service/user.service';

import ApiPermissionService from '../../system//api-permission/api-permission.service';
import { IApiPermission } from '@/shared/model/system/api-permission.model';

import ViewPermissionService from '../../system//view-permission/view-permission.service';
import { IViewPermission } from '@/shared/model/system/view-permission.model';

import DepartmentService from '../../settings//department/department.service';
import { IDepartment } from '@/shared/model/settings/department.model';

import { IDepartmentAuthority, DepartmentAuthority } from '@/shared/model/settings/department-authority.model';
import DepartmentAuthorityService from './department-authority.service';

const validations: any = {
  departmentAuthority: {
    id: {},
    name: {},
    code: {},
    description: {},
    createUserId: {},
    createTime: {},
  },
};

@Component({
  validations,
  components: {},
})
export default class DepartmentAuthorityUpdateTemplate extends Vue {
  @Inject('departmentAuthorityService') private departmentAuthorityService: () => DepartmentAuthorityService;
  public departmentAuthority: IDepartmentAuthority = new DepartmentAuthority();

  @Inject('userService') private userService: () => UserService;

  public users: Array<any> = [];

  @Inject('apiPermissionService') private apiPermissionService: () => ApiPermissionService;

  public apiPermissions: IApiPermission[] = [];

  @Inject('viewPermissionService') private viewPermissionService: () => ViewPermissionService;

  public viewPermissions: IViewPermission[] = [];

  @Inject('departmentService') private departmentService: () => DepartmentService;

  public departments: IDepartment[] = [];
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
  public departmentAuthorityId = null;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.initRelationships();
      if (to.params.departmentAuthorityId) {
        vm.retrieveDepartmentAuthority(to.params.departmentAuthorityId);
      }
    });
  }
  created(): void {
    this.initRelationships();
  }

  public mounted(): void {}

  public save(): void {
    this.isSaving = true;
    if (this.departmentAuthority.id) {
      this.departmentAuthorityService()
        .update(this.departmentAuthority)
        .then(param => {
          this.isSaving = false;
          const message = 'A DepartmentAuthority is updated with identifier ' + param.id;
          this.$message.info(message);
          this.$router.go(-1);
        });
    } else {
      this.departmentAuthorityService()
        .create(this.departmentAuthority)
        .then(param => {
          this.isSaving = false;
          const message = 'A DepartmentAuthority is created with identifier ' + param.id;
          this.$message.success(message);
          this.$router.go(-1);
        });
    }
  }

  public retrieveDepartmentAuthority(departmentAuthorityId): void {
    this.departmentAuthorityService()
      .find(departmentAuthorityId)
      .then(res => {
        this.departmentAuthority = res;
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
    this.apiPermissionService()
      .tree()
      .then(res => {
        this.apiPermissions = res.data;
      });
    this.viewPermissionService()
      .tree()
      .then(res => {
        this.viewPermissions = res.data;
      });
    this.departmentService()
      .tree()
      .then(res => {
        this.departments = res.data;
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
