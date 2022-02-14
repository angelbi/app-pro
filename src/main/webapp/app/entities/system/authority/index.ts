import AuthorityComponent from './authority.vue';
import AuthorityCompactComponent from './authority-compact.vue';
import AuthorityUpdateTemplate from './authority-update-template.vue';
const Authority = {
  install: function (Vue: any) {
    Vue.component('jhi-authority', AuthorityComponent);
    Vue.component('jhi-authority-compact', AuthorityCompactComponent);
    Vue.component('jhi-authority-update', AuthorityUpdateTemplate);
  },
};

export default Authority;
