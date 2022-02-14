import UploadFileComponent from './upload-file.vue';
import UploadFileCompactComponent from './upload-file-compact.vue';
import UploadFileUpdateTemplate from './upload-file-update-template.vue';
const UploadFile = {
  install: function (Vue: any) {
    Vue.component('jhi-upload-file', UploadFileComponent);
    Vue.component('jhi-upload-file-compact', UploadFileCompactComponent);
    Vue.component('jhi-upload-file-update', UploadFileUpdateTemplate);
  },
};

export default UploadFile;
