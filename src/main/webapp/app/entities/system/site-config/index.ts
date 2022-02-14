import SiteConfigComponent from './site-config.vue';
import SiteConfigCompactComponent from './site-config-compact.vue';
import SiteConfigUpdateTemplate from './site-config-update-template.vue';
const SiteConfig = {
  install: function (Vue: any) {
    Vue.component('jhi-site-config', SiteConfigComponent);
    Vue.component('jhi-site-config-compact', SiteConfigCompactComponent);
    Vue.component('jhi-site-config-update', SiteConfigUpdateTemplate);
  },
};

export default SiteConfig;
