import { RouteConfig } from 'vue-router';
export const departmentRoutes: RouteConfig[] = [
  {
    path: '',
    name: 'settings-department-list',
    component: () => import('./department.vue'),
    meta: { authorities: ['ROLE_USER'], title: 'Department列表' },
  },
  {
    path: 'new',
    name: 'settings-department-new',
    component: () => import('./department-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '新建Department' },
  },
  {
    path: ':departmentId/edit',
    name: 'settings-department-edit',
    component: () => import('./department-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '编辑Department' },
  },
  {
    path: ':departmentId/detail',
    name: 'settings-department-detail',
    component: () => import('./department-details.vue'),
    meta: { authorities: ['ROLE_USER'], title: '查看Department' },
  },
];
