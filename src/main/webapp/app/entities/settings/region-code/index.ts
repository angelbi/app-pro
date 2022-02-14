import RegionCodeComponent from './region-code.vue';
import RegionCodeCompactComponent from './region-code-compact.vue';
import RegionCodeUpdateTemplate from './region-code-update-template.vue';
const RegionCode = {
  install: function (Vue: any) {
    Vue.component('jhi-region-code', RegionCodeComponent);
    Vue.component('jhi-region-code-compact', RegionCodeCompactComponent);
    Vue.component('jhi-region-code-update', RegionCodeUpdateTemplate);
  },
};

export default RegionCode;
