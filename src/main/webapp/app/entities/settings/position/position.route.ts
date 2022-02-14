import { RouteConfig } from 'vue-router';
export const positionRoutes: RouteConfig[] = [
  {
    path: '',
    name: 'settings-position-list',
    component: () => import('./position.vue'),
    meta: { authorities: ['ROLE_USER'], title: 'Position列表' },
  },
  {
    path: 'new',
    name: 'settings-position-new',
    component: () => import('./position-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '新建Position' },
  },
  {
    path: ':positionId/edit',
    name: 'settings-position-edit',
    component: () => import('./position-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '编辑Position' },
  },
  {
    path: ':positionId/detail',
    name: 'settings-position-detail',
    component: () => import('./position-details.vue'),
    meta: { authorities: ['ROLE_USER'], title: '查看Position' },
  },
];
