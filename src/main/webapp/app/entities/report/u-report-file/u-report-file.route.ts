import { RouteConfig } from 'vue-router';
export const uReportFileRoutes: RouteConfig[] = [
  {
    path: '',
    name: 'report-u-report-file-list',
    component: () => import('./u-report-file.vue'),
    meta: { authorities: ['ROLE_USER'], title: 'U Report File列表' },
  },
  {
    path: 'new',
    name: 'report-u-report-file-new',
    component: () => import('./u-report-file-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '新建U Report File' },
  },
  {
    path: ':uReportFileId/edit',
    name: 'report-u-report-file-edit',
    component: () => import('./u-report-file-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '编辑U Report File' },
  },
  {
    path: ':uReportFileId/detail',
    name: 'report-u-report-file-detail',
    component: () => import('./u-report-file-details.vue'),
    meta: { authorities: ['ROLE_USER'], title: '查看U Report File' },
  },
];
