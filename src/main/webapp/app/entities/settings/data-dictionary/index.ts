import DataDictionaryComponent from './data-dictionary.vue';
import DataDictionaryCompactComponent from './data-dictionary-compact.vue';
import DataDictionaryUpdateTemplate from './data-dictionary-update-template.vue';
const DataDictionary = {
  install: function (Vue: any) {
    Vue.component('jhi-data-dictionary', DataDictionaryComponent);
    Vue.component('jhi-data-dictionary-compact', DataDictionaryCompactComponent);
    Vue.component('jhi-data-dictionary-update', DataDictionaryUpdateTemplate);
  },
};

export default DataDictionary;
