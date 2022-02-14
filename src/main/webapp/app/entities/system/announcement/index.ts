import AnnouncementComponent from './announcement.vue';
import AnnouncementCompactComponent from './announcement-compact.vue';
import AnnouncementUpdateTemplate from './announcement-update-template.vue';
const Announcement = {
  install: function (Vue: any) {
    Vue.component('jhi-announcement', AnnouncementComponent);
    Vue.component('jhi-announcement-compact', AnnouncementCompactComponent);
    Vue.component('jhi-announcement-update', AnnouncementUpdateTemplate);
  },
};

export default Announcement;
