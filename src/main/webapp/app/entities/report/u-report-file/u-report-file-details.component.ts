import { Component, Vue, Inject } from 'vue-property-decorator';
import { IUReportFile } from '@/shared/model/report/u-report-file.model';
import UReportFileService from './u-report-file.service';

@Component
export default class UReportFileDetails extends Vue {
  @Inject('uReportFileService') private uReportFileService: () => UReportFileService;
  public uReportFile: IUReportFile = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.uReportFileId) {
        vm.retrieveUReportFile(to.params.uReportFileId);
      }
    });
  }

  public retrieveUReportFile(uReportFileId) {
    this.uReportFileService()
      .find(uReportFileId)
      .then(res => {
        this.uReportFile = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
