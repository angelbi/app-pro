import { RouteConfig } from 'vue-router';
export const businessTypeRoutes: RouteConfig[] = [
  {
    path: '',
    name: 'settings-business-type-list',
    component: () => import('./business-type.vue'),
    meta: { authorities: ['ROLE_USER'], title: 'Business Type列表' },
  },
  {
    path: 'new',
    name: 'settings-business-type-new',
    component: () => import('./business-type-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '新建Business Type' },
  },
  {
    path: ':businessTypeId/edit',
    name: 'settings-business-type-edit',
    component: () => import('./business-type-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '编辑Business Type' },
  },
  {
    path: ':businessTypeId/detail',
    name: 'settings-business-type-detail',
    component: () => import('./business-type-details.vue'),
    meta: { authorities: ['ROLE_USER'], title: '查看Business Type' },
  },
];
