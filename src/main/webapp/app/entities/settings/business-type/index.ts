import BusinessTypeComponent from './business-type.vue';
import BusinessTypeCompactComponent from './business-type-compact.vue';
import BusinessTypeUpdateTemplate from './business-type-update-template.vue';
const BusinessType = {
  install: function (Vue: any) {
    Vue.component('jhi-business-type', BusinessTypeComponent);
    Vue.component('jhi-business-type-compact', BusinessTypeCompactComponent);
    Vue.component('jhi-business-type-update', BusinessTypeUpdateTemplate);
  },
};

export default BusinessType;
