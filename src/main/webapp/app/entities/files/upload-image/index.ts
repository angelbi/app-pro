import UploadImageComponent from './upload-image.vue';
import UploadImageCompactComponent from './upload-image-compact.vue';
import UploadImageUpdateTemplate from './upload-image-update-template.vue';
const UploadImage = {
  install: function (Vue: any) {
    Vue.component('jhi-upload-image', UploadImageComponent);
    Vue.component('jhi-upload-image-compact', UploadImageCompactComponent);
    Vue.component('jhi-upload-image-update', UploadImageUpdateTemplate);
  },
};

export default UploadImage;
