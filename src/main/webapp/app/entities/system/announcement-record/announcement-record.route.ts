import { RouteConfig } from 'vue-router';
export const announcementRecordRoutes: RouteConfig[] = [
  {
    path: '',
    name: 'system-announcement-record-list',
    component: () => import('./announcement-record.vue'),
    meta: { authorities: ['ROLE_USER'], title: 'Announcement Record列表' },
  },
  {
    path: 'new',
    name: 'system-announcement-record-new',
    component: () => import('./announcement-record-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '新建Announcement Record' },
  },
  {
    path: ':announcementRecordId/edit',
    name: 'system-announcement-record-edit',
    component: () => import('./announcement-record-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '编辑Announcement Record' },
  },
  {
    path: ':announcementRecordId/detail',
    name: 'system-announcement-record-detail',
    component: () => import('./announcement-record-details.vue'),
    meta: { authorities: ['ROLE_USER'], title: '查看Announcement Record' },
  },
];
