import { RouteConfig } from 'vue-router';
export const dataPermissionRuleRoutes: RouteConfig[] = [
  {
    path: '',
    name: 'system-data-permission-rule-list',
    component: () => import('./data-permission-rule.vue'),
    meta: { authorities: ['ROLE_USER'], title: 'Data Permission Rule列表' },
  },
  {
    path: 'new',
    name: 'system-data-permission-rule-new',
    component: () => import('./data-permission-rule-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '新建Data Permission Rule' },
  },
  {
    path: ':dataPermissionRuleId/edit',
    name: 'system-data-permission-rule-edit',
    component: () => import('./data-permission-rule-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '编辑Data Permission Rule' },
  },
  {
    path: ':dataPermissionRuleId/detail',
    name: 'system-data-permission-rule-detail',
    component: () => import('./data-permission-rule-details.vue'),
    meta: { authorities: ['ROLE_USER'], title: '查看Data Permission Rule' },
  },
];
