import DepartmentComponent from './department.vue';
import DepartmentCompactComponent from './department-compact.vue';
import DepartmentUpdateTemplate from './department-update-template.vue';
const Department = {
  install: function (Vue: any) {
    Vue.component('jhi-department', DepartmentComponent);
    Vue.component('jhi-department-compact', DepartmentCompactComponent);
    Vue.component('jhi-department-update', DepartmentUpdateTemplate);
  },
};

export default Department;
