import { RouteConfig } from 'vue-router';
export const announcementRoutes: RouteConfig[] = [
  {
    path: '',
    name: 'system-announcement-list',
    component: () => import('./announcement.vue'),
    meta: { authorities: ['ROLE_USER'], title: 'Announcement列表' },
  },
  {
    path: 'new',
    name: 'system-announcement-new',
    component: () => import('./announcement-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '新建Announcement' },
  },
  {
    path: ':announcementId/edit',
    name: 'system-announcement-edit',
    component: () => import('./announcement-update.vue'),
    meta: { authorities: ['ROLE_USER'], title: '编辑Announcement' },
  },
  {
    path: ':announcementId/detail',
    name: 'system-announcement-detail',
    component: () => import('./announcement-details.vue'),
    meta: { authorities: ['ROLE_USER'], title: '查看Announcement' },
  },
];
