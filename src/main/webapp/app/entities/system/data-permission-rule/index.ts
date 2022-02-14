import DataPermissionRuleComponent from './data-permission-rule.vue';
import DataPermissionRuleCompactComponent from './data-permission-rule-compact.vue';
import DataPermissionRuleUpdateTemplate from './data-permission-rule-update-template.vue';
const DataPermissionRule = {
  install: function (Vue: any) {
    Vue.component('jhi-data-permission-rule', DataPermissionRuleComponent);
    Vue.component('jhi-data-permission-rule-compact', DataPermissionRuleCompactComponent);
    Vue.component('jhi-data-permission-rule-update', DataPermissionRuleUpdateTemplate);
  },
};

export default DataPermissionRule;
