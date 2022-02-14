import { Component, Vue, Inject } from 'vue-property-decorator';
import { IAnnouncement } from '@/shared/model/system/announcement.model';
import AnnouncementService from './announcement.service';

@Component
export default class AnnouncementDetails extends Vue {
  @Inject('announcementService') private announcementService: () => AnnouncementService;
  public announcement: IAnnouncement = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.announcementId) {
        vm.retrieveAnnouncement(to.params.announcementId);
      }
    });
  }

  public retrieveAnnouncement(announcementId) {
    this.announcementService()
      .find(announcementId)
      .then(res => {
        this.announcement = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
