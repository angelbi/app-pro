import { RouteConfig } from 'vue-router';
export const authorityRoutes: RouteConfig[] = [
  {
    path: '',
    name: 'system-authority-list',
    component: () => import('./authority.vue'),
    meta: { authorities: ['ROLE_USER'], title: 'Authority列表' },
  },
  {
    path: 'new',
    name: 'system-authority-new',
    component: () => import('./authority-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '新建Authority' },
  },
  {
    path: ':authorityId/edit',
    name: 'system-authority-edit',
    component: () => import('./authority-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '编辑Authority' },
  },
  {
    path: ':authorityId/detail',
    name: 'system-authority-detail',
    component: () => import('./authority-details.vue'),
    meta: { authorities: ['ROLE_USER'], title: '查看Authority' },
  },
];
