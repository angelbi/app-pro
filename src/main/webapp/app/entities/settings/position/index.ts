import PositionComponent from './position.vue';
import PositionCompactComponent from './position-compact.vue';
import PositionUpdateTemplate from './position-update-template.vue';
const Position = {
  install: function (Vue: any) {
    Vue.component('jhi-position', PositionComponent);
    Vue.component('jhi-position-compact', PositionCompactComponent);
    Vue.component('jhi-position-update', PositionUpdateTemplate);
  },
};

export default Position;
