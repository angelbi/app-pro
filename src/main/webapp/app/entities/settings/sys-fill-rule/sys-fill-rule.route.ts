import { RouteConfig } from 'vue-router';
export const sysFillRuleRoutes: RouteConfig[] = [
  {
    path: '',
    name: 'settings-sys-fill-rule-list',
    component: () => import('./sys-fill-rule.vue'),
    meta: { authorities: ['ROLE_USER'], title: 'Sys Fill Rule列表' },
  },
  {
    path: 'new',
    name: 'settings-sys-fill-rule-new',
    component: () => import('./sys-fill-rule-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '新建Sys Fill Rule' },
  },
  {
    path: ':sysFillRuleId/edit',
    name: 'settings-sys-fill-rule-edit',
    component: () => import('./sys-fill-rule-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '编辑Sys Fill Rule' },
  },
  {
    path: ':sysFillRuleId/detail',
    name: 'settings-sys-fill-rule-detail',
    component: () => import('./sys-fill-rule-details.vue'),
    meta: { authorities: ['ROLE_USER'], title: '查看Sys Fill Rule' },
  },
];
