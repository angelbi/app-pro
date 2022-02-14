import { RouteConfig } from 'vue-router';
export const smsMessageRoutes: RouteConfig[] = [
  {
    path: '',
    name: 'system-sms-message-list',
    component: () => import('./sms-message.vue'),
    meta: { authorities: ['ROLE_USER'], title: 'Sms Message列表' },
  },
  {
    path: 'new',
    name: 'system-sms-message-new',
    component: () => import('./sms-message-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '新建Sms Message' },
  },
  {
    path: ':smsMessageId/edit',
    name: 'system-sms-message-edit',
    component: () => import('./sms-message-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '编辑Sms Message' },
  },
  {
    path: ':smsMessageId/detail',
    name: 'system-sms-message-detail',
    component: () => import('./sms-message-details.vue'),
    meta: { authorities: ['ROLE_USER'], title: '查看Sms Message' },
  },
];
