import UserComponent from './user.vue';
import UserCompactComponent from './user-compact.vue';
import UserUpdateTemplate from './user-update-template.vue';
const User = {
  install: function (Vue: any) {
    Vue.component('jhi-user', UserComponent);
    Vue.component('jhi-user-compact', UserCompactComponent);
    Vue.component('jhi-user-update', UserUpdateTemplate);
  },
};

export default User;
