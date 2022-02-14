import { Component, Vue, Inject, Prop, Watch } from 'vue-property-decorator';
import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import DepartmentAuthorityService from '../../settings//department-authority/department-authority.service';
import { IDepartmentAuthority } from '@/shared/model/settings/department-authority.model';

import AuthorityService from '../../system//authority/authority.service';
import { IAuthority } from '@/shared/model/system/authority.model';

import { IApiPermission, ApiPermission } from '@/shared/model/system/api-permission.model';
import ApiPermissionService from './api-permission.service';

const validations: any = {
  apiPermission: {
    id: {},
    serviceName: {},
    name: {},
    code: {},
    description: {},
    type: {},
    method: {},
    url: {},
    status: {},
  },
};

@Component({
  validations,
  components: {},
})
export default class ApiPermissionUpdateTemplate extends Vue {
  @Inject('apiPermissionService') private apiPermissionService: () => ApiPermissionService;
  public apiPermission: IApiPermission = new ApiPermission();

  public apiPermissions: IApiPermission[] = [];

  @Inject('departmentAuthorityService') private departmentAuthorityService: () => DepartmentAuthorityService;

  public departmentAuthorities: IDepartmentAuthority[] = [];

  @Inject('authorityService') private authorityService: () => AuthorityService;

  public authorities: IAuthority[] = [];
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
  public apiPermissionId = null;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.initRelationships();
      if (to.params.apiPermissionId) {
        vm.retrieveApiPermission(to.params.apiPermissionId);
      }
    });
  }
  created(): void {
    this.initRelationships();
  }

  public mounted(): void {}

  public save(): void {
    this.isSaving = true;
    if (this.apiPermission.id) {
      this.apiPermissionService()
        .update(this.apiPermission)
        .then(param => {
          this.isSaving = false;
          const message = 'A ApiPermission is updated with identifier ' + param.id;
          this.$message.info(message);
          this.$router.go(-1);
        });
    } else {
      this.apiPermissionService()
        .create(this.apiPermission)
        .then(param => {
          this.isSaving = false;
          const message = 'A ApiPermission is created with identifier ' + param.id;
          this.$message.success(message);
          this.$router.go(-1);
        });
    }
  }

  public retrieveApiPermission(apiPermissionId): void {
    this.apiPermissionService()
      .find(apiPermissionId)
      .then(res => {
        this.apiPermission = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.apiPermissionService()
      .tree()
      .then(res => {
        this.apiPermissions = res.data;
      });
    this.departmentAuthorityService()
      .retrieve()
      .then(res => {
        this.departmentAuthorities = res.data;
      });
    this.apiPermissionService()
      .tree()
      .then(res => {
        this.apiPermissions = res.data;
      });
    this.authorityService()
      .tree()
      .then(res => {
        this.authorities = res.data;
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
