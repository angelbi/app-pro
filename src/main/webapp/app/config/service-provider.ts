import AuthorityService from '@/entities/system/authority/authority.service';
import DashboardService from '@/views/dashboard/dashboard.service';
import DepartmentAuthorityService from '@/entities/settings/department-authority/department-authority.service';
import SmsMessageService from '@/entities/system/sms-message/sms-message.service';
import OssConfigService from '@/entities/files/oss-config/oss-config.service';
import ApiPermissionService from '@/entities/system/api-permission/api-permission.service';
import UploadImageService from '@/entities/files/upload-image/upload-image.service';
import SmsConfigService from '@/entities/files/sms-config/sms-config.service';
import UReportFileService from '@/entities/report/u-report-file/u-report-file.service';
import AnnouncementRecordService from '@/entities/system/announcement-record/announcement-record.service';
import DepartmentService from '@/entities/settings/department/department.service';
import SmsTemplateService from '@/entities/system/sms-template/sms-template.service';
import SiteConfigService from '@/entities/system/site-config/site-config.service';
import AnnouncementService from '@/entities/system/announcement/announcement.service';
import BusinessTypeService from '@/entities/settings/business-type/business-type.service';
import SysLogService from '@/entities/system/sys-log/sys-log.service';
import ViewPermissionService from '@/entities/system/view-permission/view-permission.service';
import UserService from '@/entities/system/user/user.service';
import DataPermissionRuleService from '@/entities/system/data-permission-rule/data-permission-rule.service';
import SysFillRuleService from '@/entities/settings/sys-fill-rule/sys-fill-rule.service';
import ResourceCategoryService from '@/entities/files/resource-category/resource-category.service';
import UploadFileService from '@/entities/files/upload-file/upload-file.service';
import PositionService from '@/entities/settings/position/position.service';
import DataDictionaryService from '@/entities/settings/data-dictionary/data-dictionary.service';
import RegionCodeService from '@/entities/settings/region-code/region-code.service';
// jhipster-needle-add-entity-service-to-main-import - JHipster will import entities services here

export const serviers = {
  authorityService: () => new AuthorityService(),
  dashboardService: () => new DashboardService(),
  departmentAuthorityService: () => new DepartmentAuthorityService(),
  smsMessageService: () => new SmsMessageService(),
  ossConfigService: () => new OssConfigService(),
  apiPermissionService: () => new ApiPermissionService(),
  uploadImageService: () => new UploadImageService(),
  smsConfigService: () => new SmsConfigService(),
  uReportFileService: () => new UReportFileService(),
  announcementRecordService: () => new AnnouncementRecordService(),
  departmentService: () => new DepartmentService(),
  smsTemplateService: () => new SmsTemplateService(),
  siteConfigService: () => new SiteConfigService(),
  announcementService: () => new AnnouncementService(),
  businessTypeService: () => new BusinessTypeService(),
  sysLogService: () => new SysLogService(),
  viewPermissionService: () => new ViewPermissionService(),
  userService: () => new UserService(),
  dataPermissionRuleService: () => new DataPermissionRuleService(),
  sysFillRuleService: () => new SysFillRuleService(),
  resourceCategoryService: () => new ResourceCategoryService(),
  uploadFileService: () => new UploadFileService(),
  positionService: () => new PositionService(),
  dataDictionaryService: () => new DataDictionaryService(),
  regionCodeService: () => new RegionCodeService(),
  // jhipster-needle-add-entity-service-to-main - JHipster will import entities services here
};
