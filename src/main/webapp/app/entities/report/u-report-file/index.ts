import UReportFileComponent from './u-report-file.vue';
import UReportFileCompactComponent from './u-report-file-compact.vue';
import UReportFileUpdateTemplate from './u-report-file-update-template.vue';
const UReportFile = {
  install: function (Vue: any) {
    Vue.component('jhi-u-report-file', UReportFileComponent);
    Vue.component('jhi-u-report-file-compact', UReportFileCompactComponent);
    Vue.component('jhi-u-report-file-update', UReportFileUpdateTemplate);
  },
};

export default UReportFile;
