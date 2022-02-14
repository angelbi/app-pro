import { RouteConfig } from 'vue-router';
import PageView from '@/components/layouts/PageView.vue';
import { userRoutes } from '@/entities/system/user/user.route';
import { authorityRoutes } from '@/entities/system/authority/authority.route';
import { cacheManageRoute } from '@/entities/system/cache-manage/cache-manage.route';
import { smsMessageRoutes } from '@/entities/system/sms-message/sms-message.route';
import { apiPermissionRoutes } from '@/entities/system/api-permission/api-permission.route';
import { announcementRecordRoutes } from '@/entities/system/announcement-record/announcement-record.route';
import { smsTemplateRoutes } from '@/entities/system/sms-template/sms-template.route';
import { siteConfigRoutes } from '@/entities/system/site-config/site-config.route';
import { announcementRoutes } from '@/entities/system/announcement/announcement.route';
import { sysLogRoutes } from '@/entities/system/sys-log/sys-log.route';
import { viewPermissionRoutes } from '@/entities/system/view-permission/view-permission.route';
import { dataPermissionRuleRoutes } from '@/entities/system/data-permission-rule/data-permission-rule.route';
// jhipster-needle-add-entity-to-client-root-folder-router-import - JHipster will import entities to the client root folder router here

export const systemRoute: RouteConfig = {
  path: 'system',
  name: 'system',
  component: PageView,
  meta: { authorities: ['ROLE_USER'], title: '系统设置' },
  children: [
    cacheManageRoute,
    ...userRoutes,
    ...authorityRoutes,
    ...smsMessageRoutes,
    ...apiPermissionRoutes,
    ...announcementRecordRoutes,
    ...smsTemplateRoutes,
    ...siteConfigRoutes,
    ...announcementRoutes,
    ...sysLogRoutes,
    ...viewPermissionRoutes,
    ...dataPermissionRuleRoutes,
    // jhipster-needle-add-entity-to-client-root-folder-router - JHipster will add entities to the client root folder router here
  ],
};
