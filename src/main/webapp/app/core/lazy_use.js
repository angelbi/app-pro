import Vue from 'vue';
import VueStorage from 'vue-ls';
// base library
import '@/core/lazy_lib/components_use';
import VueCropper from 'vue-cropper';

// ext library
import VueClipboard from 'vue-clipboard2';
import './directives/action';

VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);
Vue.use(VueCropper);
