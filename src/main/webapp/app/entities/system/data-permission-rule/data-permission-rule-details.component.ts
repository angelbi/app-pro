import { Component, Vue, Inject } from 'vue-property-decorator';
import { IDataPermissionRule } from '@/shared/model/system/data-permission-rule.model';
import DataPermissionRuleService from './data-permission-rule.service';

@Component
export default class DataPermissionRuleDetails extends Vue {
  @Inject('dataPermissionRuleService') private dataPermissionRuleService: () => DataPermissionRuleService;
  public dataPermissionRule: IDataPermissionRule = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.dataPermissionRuleId) {
        vm.retrieveDataPermissionRule(to.params.dataPermissionRuleId);
      }
    });
  }

  public retrieveDataPermissionRule(dataPermissionRuleId) {
    this.dataPermissionRuleService()
      .find(dataPermissionRuleId)
      .then(res => {
        this.dataPermissionRule = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
