import { RouteConfig } from 'vue-router';
export const userRoutes: RouteConfig[] = [
  {
    path: '',
    name: 'system-user-list',
    component: () => import('./user.vue'),
    meta: { authorities: ['ROLE_USER'], title: 'User列表' },
  },
  {
    path: 'new',
    name: 'system-user-new',
    component: () => import('./user-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '新建User' },
  },
  {
    path: ':userId/edit',
    name: 'system-user-edit',
    component: () => import('./user-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '编辑User' },
  },
  {
    path: ':userId/detail',
    name: 'system-user-detail',
    component: () => import('./user-details.vue'),
    meta: { authorities: ['ROLE_USER'], title: '查看User' },
  },
];
