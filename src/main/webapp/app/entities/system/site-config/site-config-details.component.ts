import { Component, Vue, Inject } from 'vue-property-decorator';
import { ISiteConfig } from '@/shared/model/system/site-config.model';
import SiteConfigService from './site-config.service';

@Component
export default class SiteConfigDetails extends Vue {
  @Inject('siteConfigService') private siteConfigService: () => SiteConfigService;
  public siteConfig: ISiteConfig = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.siteConfigId) {
        vm.retrieveSiteConfig(to.params.siteConfigId);
      }
    });
  }

  public retrieveSiteConfig(siteConfigId) {
    this.siteConfigService()
      .find(siteConfigId)
      .then(res => {
        this.siteConfig = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
