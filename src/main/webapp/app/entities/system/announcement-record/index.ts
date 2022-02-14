import AnnouncementRecordComponent from './announcement-record.vue';
import AnnouncementRecordCompactComponent from './announcement-record-compact.vue';
import AnnouncementRecordUpdateTemplate from './announcement-record-update-template.vue';
const AnnouncementRecord = {
  install: function (Vue: any) {
    Vue.component('jhi-announcement-record', AnnouncementRecordComponent);
    Vue.component('jhi-announcement-record-compact', AnnouncementRecordCompactComponent);
    Vue.component('jhi-announcement-record-update', AnnouncementRecordUpdateTemplate);
  },
};

export default AnnouncementRecord;
