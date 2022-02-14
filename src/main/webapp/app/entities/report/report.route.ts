import { RouteConfig } from 'vue-router';
import PageView from '@/components/layouts/PageView.vue';
import { uReportFileRoutes } from '@/entities/report/u-report-file/u-report-file.route';
// jhipster-needle-add-entity-to-client-root-folder-router-import - JHipster will import entities to the client root folder router here

export const reportRoute: RouteConfig = {
  path: 'report',
  component: PageView,
  name: 'report',
  meta: { authorities: ['ROLE_USER'], title: '数据可视' },
  children: [
    ...uReportFileRoutes,
    // jhipster-needle-add-entity-to-client-root-folder-router - JHipster will add entities to the client root folder router here
  ],
};
