import { RouteConfig } from 'vue-router';
export const dataDictionaryRoutes: RouteConfig[] = [
  {
    path: '',
    name: 'settings-data-dictionary-list',
    component: () => import('./data-dictionary.vue'),
    meta: { authorities: ['ROLE_USER'], title: 'Data Dictionary列表' },
  },
  {
    path: 'new',
    name: 'settings-data-dictionary-new',
    component: () => import('./data-dictionary-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '新建Data Dictionary' },
  },
  {
    path: ':dataDictionaryId/edit',
    name: 'settings-data-dictionary-edit',
    component: () => import('./data-dictionary-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '编辑Data Dictionary' },
  },
  {
    path: ':dataDictionaryId/detail',
    name: 'settings-data-dictionary-detail',
    component: () => import('./data-dictionary-details.vue'),
    meta: { authorities: ['ROLE_USER'], title: '查看Data Dictionary' },
  },
];
