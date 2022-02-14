import { RouteConfig } from 'vue-router';
export const apiPermissionRoutes: RouteConfig[] = [
  {
    path: '',
    name: 'system-api-permission-list',
    component: () => import('./api-permission.vue'),
    meta: { authorities: ['ROLE_USER'], title: 'Api Permission列表' },
  },
  {
    path: 'new',
    name: 'system-api-permission-new',
    component: () => import('./api-permission-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '新建Api Permission' },
  },
  {
    path: ':apiPermissionId/edit',
    name: 'system-api-permission-edit',
    component: () => import('./api-permission-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '编辑Api Permission' },
  },
  {
    path: ':apiPermissionId/detail',
    name: 'system-api-permission-detail',
    component: () => import('./api-permission-details.vue'),
    meta: { authorities: ['ROLE_USER'], title: '查看Api Permission' },
  },
];
