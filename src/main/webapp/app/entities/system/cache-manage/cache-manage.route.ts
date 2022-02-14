import { RouteConfig } from 'vue-router';
import RouteView from '@/components/layouts/RouteView.vue';
export const cacheManageRoute: RouteConfig = {
  path: 'cache-manage',
  component: RouteView,
  meta: { authorities: ['ROLE_USER'], title: '缓存信息' },
  children: [
    {
      path: '',
      name: 'system-cache-manage',
      component: () => import('./cache-manage.vue'),
      meta: { authorities: ['ROLE_USER'], title: '列表' },
    },
  ],
};
