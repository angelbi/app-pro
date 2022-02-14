import { Component, Vue, Inject, Prop, Watch } from 'vue-property-decorator';
import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import DepartmentAuthorityService from '../../settings//department-authority/department-authority.service';
import { IDepartmentAuthority } from '@/shared/model/settings/department-authority.model';

import AuthorityService from '../../system//authority/authority.service';
import { IAuthority } from '@/shared/model/system/authority.model';

import { IViewPermission, ViewPermission } from '@/shared/model/system/view-permission.model';
import ViewPermissionService from './view-permission.service';

const validations: any = {
  viewPermission: {
    id: {},
    text: {},
    i18n: {},
    group: {},
    link: {},
    externalLink: {},
    target: {},
    icon: {},
    disabled: {},
    hide: {},
    hideInBreadcrumb: {},
    shortcut: {},
    shortcutRoot: {},
    reuse: {},
    code: {},
    description: {},
    type: {},
    order: {},
    apiPermissionCodes: {},
    componentFile: {},
    redirect: {},
  },
};

@Component({
  validations,
  components: {},
})
export default class ViewPermissionUpdateTemplate extends Vue {
  @Inject('viewPermissionService') private viewPermissionService: () => ViewPermissionService;
  public viewPermission: IViewPermission = new ViewPermission();

  public viewPermissions: IViewPermission[] = [];

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
  public viewPermissionId = null;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.initRelationships();
      if (to.params.viewPermissionId) {
        vm.retrieveViewPermission(to.params.viewPermissionId);
      }
    });
  }
  created(): void {
    this.initRelationships();
  }

  public mounted(): void {}

  public save(): void {
    this.isSaving = true;
    if (this.viewPermission.id) {
      this.viewPermissionService()
        .update(this.viewPermission)
        .then(param => {
          this.isSaving = false;
          const message = 'A ViewPermission is updated with identifier ' + param.id;
          this.$message.info(message);
          this.$router.go(-1);
        });
    } else {
      this.viewPermissionService()
        .create(this.viewPermission)
        .then(param => {
          this.isSaving = false;
          const message = 'A ViewPermission is created with identifier ' + param.id;
          this.$message.success(message);
          this.$router.go(-1);
        });
    }
  }

  public retrieveViewPermission(viewPermissionId): void {
    this.viewPermissionService()
      .find(viewPermissionId)
      .then(res => {
        this.viewPermission = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.viewPermissionService()
      .tree()
      .then(res => {
        this.viewPermissions = res.data;
      });
    this.departmentAuthorityService()
      .retrieve()
      .then(res => {
        this.departmentAuthorities = res.data;
      });
    this.viewPermissionService()
      .tree()
      .then(res => {
        this.viewPermissions = res.data;
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
