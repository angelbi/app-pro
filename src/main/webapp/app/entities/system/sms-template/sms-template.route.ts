import { RouteConfig } from 'vue-router';
export const smsTemplateRoutes: RouteConfig[] = [
  {
    path: '',
    name: 'system-sms-template-list',
    component: () => import('./sms-template.vue'),
    meta: { authorities: ['ROLE_USER'], title: 'Sms Template列表' },
  },
  {
    path: 'new',
    name: 'system-sms-template-new',
    component: () => import('./sms-template-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '新建Sms Template' },
  },
  {
    path: ':smsTemplateId/edit',
    name: 'system-sms-template-edit',
    component: () => import('./sms-template-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '编辑Sms Template' },
  },
  {
    path: ':smsTemplateId/detail',
    name: 'system-sms-template-detail',
    component: () => import('./sms-template-details.vue'),
    meta: { authorities: ['ROLE_USER'], title: '查看Sms Template' },
  },
];
