import { Component, Vue, Inject } from 'vue-property-decorator';
import { IAnnouncementRecord } from '@/shared/model/system/announcement-record.model';
import AnnouncementRecordService from './announcement-record.service';

@Component
export default class AnnouncementRecordDetails extends Vue {
  @Inject('announcementRecordService') private announcementRecordService: () => AnnouncementRecordService;
  public announcementRecord: IAnnouncementRecord = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.announcementRecordId) {
        vm.retrieveAnnouncementRecord(to.params.announcementRecordId);
      }
    });
  }

  public retrieveAnnouncementRecord(announcementRecordId) {
    this.announcementRecordService()
      .find(announcementRecordId)
      .then(res => {
        this.announcementRecord = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
