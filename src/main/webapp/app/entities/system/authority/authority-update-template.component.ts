import { Component, Vue, Inject, Prop, Watch } from 'vue-property-decorator';
import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import DepartmentService from '../../settings//department/department.service';
import { IDepartment } from '@/shared/model/settings/department.model';

import ApiPermissionService from '../../system//api-permission/api-permission.service';
import { IApiPermission } from '@/shared/model/system/api-permission.model';

import ViewPermissionService from '../../system//view-permission/view-permission.service';
import { IViewPermission } from '@/shared/model/system/view-permission.model';

import { IAuthority, Authority } from '@/shared/model/system/authority.model';
import AuthorityService from './authority.service';

const validations: any = {
  authority: {
    id: {},
    name: {},
    code: {},
    info: {},
    order: {},
    display: {},
  },
};

@Component({
  validations,
  components: {},
})
export default class AuthorityUpdateTemplate extends Vue {
  @Inject('authorityService') private authorityService: () => AuthorityService;
  public authority: IAuthority = new Authority();

  public authorities: IAuthority[] = [];

  @Inject('departmentService') private departmentService: () => DepartmentService;

  public departments: IDepartment[] = [];

  @Inject('apiPermissionService') private apiPermissionService: () => ApiPermissionService;

  public apiPermissions: IApiPermission[] = [];

  @Inject('viewPermissionService') private viewPermissionService: () => ViewPermissionService;

  public viewPermissions: IViewPermission[] = [];
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
  public authorityId = null;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.initRelationships();
      if (to.params.authorityId) {
        vm.retrieveAuthority(to.params.authorityId);
      }
    });
  }
  created(): void {
    this.initRelationships();
    this.authority.apiPermissions = [];
    this.authority.viewPermissions = [];
  }

  public mounted(): void {}

  public save(): void {
    this.isSaving = true;
    if (this.authority.id) {
      this.authorityService()
        .update(this.authority)
        .then(param => {
          this.isSaving = false;
          const message = 'A Authority is updated with identifier ' + param.id;
          this.$message.info(message);
          this.$router.go(-1);
        });
    } else {
      this.authorityService()
        .create(this.authority)
        .then(param => {
          this.isSaving = false;
          const message = 'A Authority is created with identifier ' + param.id;
          this.$message.success(message);
          this.$router.go(-1);
        });
    }
  }

  public retrieveAuthority(authorityId): void {
    this.authorityService()
      .find(authorityId)
      .then(res => {
        this.authority = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.authorityService()
      .tree()
      .then(res => {
        this.authorities = res.data;
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
