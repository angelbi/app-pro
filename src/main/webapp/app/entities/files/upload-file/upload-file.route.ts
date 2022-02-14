import { RouteConfig } from 'vue-router';
export const uploadFileRoutes: RouteConfig[] = [
  {
    path: '',
    name: 'files-upload-file-list',
    component: () => import('./upload-file.vue'),
    meta: { authorities: ['ROLE_USER'], title: 'Upload File列表' },
  },
  {
    path: 'new',
    name: 'files-upload-file-new',
    component: () => import('./upload-file-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '新建Upload File' },
  },
  {
    path: ':uploadFileId/edit',
    name: 'files-upload-file-edit',
    component: () => import('./upload-file-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '编辑Upload File' },
  },
  {
    path: ':uploadFileId/detail',
    name: 'files-upload-file-detail',
    component: () => import('./upload-file-details.vue'),
    meta: { authorities: ['ROLE_USER'], title: '查看Upload File' },
  },
];
