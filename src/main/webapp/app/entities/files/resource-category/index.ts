import ResourceCategoryComponent from './resource-category.vue';
import ResourceCategoryCompactComponent from './resource-category-compact.vue';
import ResourceCategoryUpdateTemplate from './resource-category-update-template.vue';
const ResourceCategory = {
  install: function (Vue: any) {
    Vue.component('jhi-resource-category', ResourceCategoryComponent);
    Vue.component('jhi-resource-category-compact', ResourceCategoryCompactComponent);
    Vue.component('jhi-resource-category-update', ResourceCategoryUpdateTemplate);
  },
};

export default ResourceCategory;
