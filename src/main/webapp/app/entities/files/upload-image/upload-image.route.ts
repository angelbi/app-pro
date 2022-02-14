import { RouteConfig } from 'vue-router';
export const uploadImageRoutes: RouteConfig[] = [
  {
    path: '',
    name: 'files-upload-image-list',
    component: () => import('./upload-image.vue'),
    meta: { authorities: ['ROLE_USER'], title: 'Upload Image列表' },
  },
  {
    path: 'new',
    name: 'files-upload-image-new',
    component: () => import('./upload-image-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '新建Upload Image' },
  },
  {
    path: ':uploadImageId/edit',
    name: 'files-upload-image-edit',
    component: () => import('./upload-image-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '编辑Upload Image' },
  },
  {
    path: ':uploadImageId/detail',
    name: 'files-upload-image-detail',
    component: () => import('./upload-image-details.vue'),
    meta: { authorities: ['ROLE_USER'], title: '查看Upload Image' },
  },
];
