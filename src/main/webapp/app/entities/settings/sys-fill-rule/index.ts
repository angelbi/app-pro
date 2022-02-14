import SysFillRuleComponent from './sys-fill-rule.vue';
import SysFillRuleCompactComponent from './sys-fill-rule-compact.vue';
import SysFillRuleUpdateTemplate from './sys-fill-rule-update-template.vue';
const SysFillRule = {
  install: function (Vue: any) {
    Vue.component('jhi-sys-fill-rule', SysFillRuleComponent);
    Vue.component('jhi-sys-fill-rule-compact', SysFillRuleCompactComponent);
    Vue.component('jhi-sys-fill-rule-update', SysFillRuleUpdateTemplate);
  },
};

export default SysFillRule;
