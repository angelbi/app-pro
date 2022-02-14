import { RouteConfig } from 'vue-router';
import PageView from '@/components/layouts/PageView.vue';
import { departmentAuthorityRoutes } from '@/entities/settings/department-authority/department-authority.route';
import { departmentRoutes } from '@/entities/settings/department/department.route';
import { businessTypeRoutes } from '@/entities/settings/business-type/business-type.route';
import { sysFillRuleRoutes } from '@/entities/settings/sys-fill-rule/sys-fill-rule.route';
import { positionRoutes } from '@/entities/settings/position/position.route';
import { dataDictionaryRoutes } from '@/entities/settings/data-dictionary/data-dictionary.route';
import { regionCodeRoutes } from '@/entities/settings/region-code/region-code.route';
// jhipster-needle-add-entity-to-client-root-folder-router-import - JHipster will import entities to the client root folder router here

export const settingsRoute: RouteConfig = {
  path: 'settings',
  component: PageView,
  name: 'settings',
  meta: { authorities: ['ROLE_USER'], title: '配置管理' },
  children: [
    ...departmentAuthorityRoutes,
    ...departmentRoutes,
    ...businessTypeRoutes,
    ...sysFillRuleRoutes,
    ...positionRoutes,
    ...dataDictionaryRoutes,
    ...regionCodeRoutes,
    // jhipster-needle-add-entity-to-client-root-folder-router - JHipster will add entities to the client root folder router here
  ],
};
