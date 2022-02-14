import DepartmentAuthorityComponent from './department-authority.vue';
import DepartmentAuthorityCompactComponent from './department-authority-compact.vue';
import DepartmentAuthorityUpdateTemplate from './department-authority-update-template.vue';
const DepartmentAuthority = {
  install: function (Vue: any) {
    Vue.component('jhi-department-authority', DepartmentAuthorityComponent);
    Vue.component('jhi-department-authority-compact', DepartmentAuthorityCompactComponent);
    Vue.component('jhi-department-authority-update', DepartmentAuthorityUpdateTemplate);
  },
};

export default DepartmentAuthority;
