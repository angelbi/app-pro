import { Component, Vue, Inject } from 'vue-property-decorator';
import { IDepartmentAuthority } from '@/shared/model/settings/department-authority.model';
import DepartmentAuthorityService from './department-authority.service';

@Component
export default class DepartmentAuthorityDetails extends Vue {
  @Inject('departmentAuthorityService') private departmentAuthorityService: () => DepartmentAuthorityService;
  public departmentAuthority: IDepartmentAuthority = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.departmentAuthorityId) {
        vm.retrieveDepartmentAuthority(to.params.departmentAuthorityId);
      }
    });
  }

  public retrieveDepartmentAuthority(departmentAuthorityId) {
    this.departmentAuthorityService()
      .find(departmentAuthorityId)
      .then(res => {
        this.departmentAuthority = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
