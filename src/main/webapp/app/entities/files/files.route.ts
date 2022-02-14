import { RouteConfig } from 'vue-router';
import PageView from '@/components/layouts/PageView.vue';
import { ossConfigRoutes } from '@/entities/files/oss-config/oss-config.route';
import { uploadImageRoutes } from '@/entities/files/upload-image/upload-image.route';
import { smsConfigRoutes } from '@/entities/files/sms-config/sms-config.route';
import { resourceCategoryRoutes } from '@/entities/files/resource-category/resource-category.route';
import { uploadFileRoutes } from '@/entities/files/upload-file/upload-file.route';
// jhipster-needle-add-entity-to-client-root-folder-router-import - JHipster will import entities to the client root folder router here

export const filesRoute: RouteConfig = {
  path: 'files',
  component: PageView,
  name: 'files',
  meta: { authorities: ['ROLE_USER'], title: '文件管理' },
  children: [
    ...ossConfigRoutes,
    ...uploadImageRoutes,
    ...smsConfigRoutes,
    ...resourceCategoryRoutes,
    ...uploadFileRoutes,
    // jhipster-needle-add-entity-to-client-root-folder-router - JHipster will add entities to the client root folder router here
  ],
};
