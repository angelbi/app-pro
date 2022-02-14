import { RouteConfig } from 'vue-router';
export const viewPermissionRoutes: RouteConfig[] = [
  {
    path: '',
    name: 'system-view-permission-list',
    component: () => import('./view-permission.vue'),
    meta: { authorities: ['ROLE_USER'], title: 'View Permission列表' },
  },
  {
    path: 'new',
    name: 'system-view-permission-new',
    component: () => import('./view-permission-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '新建View Permission' },
  },
  {
    path: ':viewPermissionId/edit',
    name: 'system-view-permission-edit',
    component: () => import('./view-permission-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '编辑View Permission' },
  },
  {
    path: ':viewPermissionId/detail',
    name: 'system-view-permission-detail',
    component: () => import('./view-permission-details.vue'),
    meta: { authorities: ['ROLE_USER'], title: '查看View Permission' },
  },
];
