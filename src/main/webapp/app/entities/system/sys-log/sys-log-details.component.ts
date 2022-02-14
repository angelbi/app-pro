import { Component, Vue, Inject } from 'vue-property-decorator';
import { ISysLog } from '@/shared/model/system/sys-log.model';
import SysLogService from './sys-log.service';

@Component
export default class SysLogDetails extends Vue {
  @Inject('sysLogService') private sysLogService: () => SysLogService;
  public sysLog: ISysLog = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.sysLogId) {
        vm.retrieveSysLog(to.params.sysLogId);
      }
    });
  }

  public retrieveSysLog(sysLogId) {
    this.sysLogService()
      .find(sysLogId)
      .then(res => {
        this.sysLog = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
