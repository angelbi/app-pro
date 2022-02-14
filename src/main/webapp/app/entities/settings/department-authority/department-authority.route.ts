import { RouteConfig } from 'vue-router';
export const departmentAuthorityRoutes: RouteConfig[] = [
  {
    path: '',
    name: 'settings-department-authority-list',
    component: () => import('./department-authority.vue'),
    meta: { authorities: ['ROLE_USER'], title: 'Department Authority列表' },
  },
  {
    path: 'new',
    name: 'settings-department-authority-new',
    component: () => import('./department-authority-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '新建Department Authority' },
  },
  {
    path: ':departmentAuthorityId/edit',
    name: 'settings-department-authority-edit',
    component: () => import('./department-authority-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '编辑Department Authority' },
  },
  {
    path: ':departmentAuthorityId/detail',
    name: 'settings-department-authority-detail',
    component: () => import('./department-authority-details.vue'),
    meta: { authorities: ['ROLE_USER'], title: '查看Department Authority' },
  },
];
