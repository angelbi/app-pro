import { RouteConfig } from 'vue-router';
export const smsConfigRoutes: RouteConfig[] = [
  {
    path: '',
    name: 'files-sms-config-list',
    component: () => import('./sms-config.vue'),
    meta: { authorities: ['ROLE_USER'], title: 'Sms Config列表' },
  },
  {
    path: 'new',
    name: 'files-sms-config-new',
    component: () => import('./sms-config-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '新建Sms Config' },
  },
  {
    path: ':smsConfigId/edit',
    name: 'files-sms-config-edit',
    component: () => import('./sms-config-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '编辑Sms Config' },
  },
  {
    path: ':smsConfigId/detail',
    name: 'files-sms-config-detail',
    component: () => import('./sms-config-details.vue'),
    meta: { authorities: ['ROLE_USER'], title: '查看Sms Config' },
  },
];
