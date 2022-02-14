import { RouteConfig } from 'vue-router';
export const resourceCategoryRoutes: RouteConfig[] = [
  {
    path: '',
    name: 'files-resource-category-list',
    component: () => import('./resource-category.vue'),
    meta: { authorities: ['ROLE_USER'], title: 'Resource Category列表' },
  },
  {
    path: 'new',
    name: 'files-resource-category-new',
    component: () => import('./resource-category-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '新建Resource Category' },
  },
  {
    path: ':resourceCategoryId/edit',
    name: 'files-resource-category-edit',
    component: () => import('./resource-category-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '编辑Resource Category' },
  },
  {
    path: ':resourceCategoryId/detail',
    name: 'files-resource-category-detail',
    component: () => import('./resource-category-details.vue'),
    meta: { authorities: ['ROLE_USER'], title: '查看Resource Category' },
  },
];
