import { RouteConfig } from 'vue-router';
import RouteView from '@/components/layouts/RouteView.vue';
import Exception403 from '@/views/exception/403.vue';
import Exception404 from '@/views/exception/404.vue';
import Exception500 from '@/views/exception/500.vue';

export const exceptionRoutes: RouteConfig = {
  path: '/exception',
  name: 'jeecg-exception',
  component: RouteView,
  meta: { authorities: ['ROLE_ADMIN'], title: '异常页', icon: 'warning' },
  children: [
    {
      path: '403',
      name: 'jeecg-exception-403',
      component: Exception403,
      meta: { authorities: ['ROLE_ADMIN'], title: '403' },
    },
    {
      path: '404',
      name: 'jeecg-exception-404',
      component: Exception404,
      meta: { authorities: ['ROLE_ADMIN'], title: '404' },
    },
    {
      path: '500',
      name: 'jeecg-exception-500',
      component: Exception500,
      meta: { authorities: ['ROLE_ADMIN'], title: '500' },
    },
  ],
};
