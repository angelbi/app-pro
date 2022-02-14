import { RouteConfig } from 'vue-router';
export const sysLogRoutes: RouteConfig[] = [
  {
    path: '',
    name: 'system-sys-log-list',
    component: () => import('./sys-log.vue'),
    meta: { authorities: ['ROLE_USER'], title: 'Sys Log列表' },
  },
  {
    path: 'new',
    name: 'system-sys-log-new',
    component: () => import('./sys-log-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '新建Sys Log' },
  },
  {
    path: ':sysLogId/edit',
    name: 'system-sys-log-edit',
    component: () => import('./sys-log-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '编辑Sys Log' },
  },
  {
    path: ':sysLogId/detail',
    name: 'system-sys-log-detail',
    component: () => import('./sys-log-details.vue'),
    meta: { authorities: ['ROLE_USER'], title: '查看Sys Log' },
  },
];
