import { RouteConfig } from 'vue-router';
export const siteConfigRoutes: RouteConfig[] = [
  {
    path: '',
    name: 'system-site-config-list',
    component: () => import('./site-config.vue'),
    meta: { authorities: ['ROLE_USER'], title: 'Site Config列表' },
  },
  {
    path: 'new',
    name: 'system-site-config-new',
    component: () => import('./site-config-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '新建Site Config' },
  },
  {
    path: ':siteConfigId/edit',
    name: 'system-site-config-edit',
    component: () => import('./site-config-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '编辑Site Config' },
  },
  {
    path: ':siteConfigId/detail',
    name: 'system-site-config-detail',
    component: () => import('./site-config-details.vue'),
    meta: { authorities: ['ROLE_USER'], title: '查看Site Config' },
  },
];
