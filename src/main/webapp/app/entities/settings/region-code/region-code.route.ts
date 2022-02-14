import { RouteConfig } from 'vue-router';
export const regionCodeRoutes: RouteConfig[] = [
  {
    path: '',
    name: 'settings-region-code-list',
    component: () => import('./region-code.vue'),
    meta: { authorities: ['ROLE_USER'], title: 'Region Code列表' },
  },
  {
    path: 'new',
    name: 'settings-region-code-new',
    component: () => import('./region-code-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '新建Region Code' },
  },
  {
    path: ':regionCodeId/edit',
    name: 'settings-region-code-edit',
    component: () => import('./region-code-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '编辑Region Code' },
  },
  {
    path: ':regionCodeId/detail',
    name: 'settings-region-code-detail',
    component: () => import('./region-code-details.vue'),
    meta: { authorities: ['ROLE_USER'], title: '查看Region Code' },
  },
];
