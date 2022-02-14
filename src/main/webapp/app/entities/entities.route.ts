import BasicLayout from '@/components/layouts/BasicLayout.vue';
import { RouteConfig } from 'vue-router';
import { settingsRoute } from '@/entities/settings/settings.route';
import { systemRoute } from '@/entities/system/system.route';
import { filesRoute } from '@/entities/files/files.route';
import { reportRoute } from '@/entities/report/report.route';
// jhipster-needle-add-client-root-folder-router-to-business-router-import - JHipster will import entities to the client root folder router here

export const entitiesRoute: RouteConfig = {
  path: '/entities',
  name: 'entities',
  component: BasicLayout,
  meta: { authorities: ['ROLE_ADMIN'], title: '业务' },
  children: [
    settingsRoute,
    systemRoute,
    filesRoute,
    reportRoute,
    // jhipster-needle-add-client-root-folder-router-to-business-router - JHipster will import entities to the client root folder router here
  ],
};
