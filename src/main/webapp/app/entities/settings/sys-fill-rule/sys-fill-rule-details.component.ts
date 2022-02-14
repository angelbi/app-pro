import { Component, Vue, Inject } from 'vue-property-decorator';
import { ISysFillRule } from '@/shared/model/settings/sys-fill-rule.model';
import SysFillRuleService from './sys-fill-rule.service';

@Component
export default class SysFillRuleDetails extends Vue {
  @Inject('sysFillRuleService') private sysFillRuleService: () => SysFillRuleService;
  public sysFillRule: ISysFillRule = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.sysFillRuleId) {
        vm.retrieveSysFillRule(to.params.sysFillRuleId);
      }
    });
  }

  public retrieveSysFillRule(sysFillRuleId) {
    this.sysFillRuleService()
      .find(sysFillRuleId)
      .then(res => {
        this.sysFillRule = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
