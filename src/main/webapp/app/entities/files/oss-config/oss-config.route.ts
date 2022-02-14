import { RouteConfig } from 'vue-router';
export const ossConfigRoutes: RouteConfig[] = [
  {
    path: '',
    name: 'files-oss-config-list',
    component: () => import('./oss-config.vue'),
    meta: { authorities: ['ROLE_USER'], title: 'Oss Config列表' },
  },
  {
    path: 'new',
    name: 'files-oss-config-new',
    component: () => import('./oss-config-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '新建Oss Config' },
  },
  {
    path: ':ossConfigId/edit',
    name: 'files-oss-config-edit',
    component: () => import('./oss-config-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '编辑Oss Config' },
  },
  {
    path: ':ossConfigId/detail',
    name: 'files-oss-config-detail',
    component: () => import('./oss-config-details.vue'),
    meta: { authorities: ['ROLE_USER'], title: '查看Oss Config' },
  },
];
