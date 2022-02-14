import { Component, Vue, Inject } from 'vue-property-decorator';
import { IRegionCode } from '@/shared/model/settings/region-code.model';
import RegionCodeService from './region-code.service';

@Component
export default class RegionCodeDetails extends Vue {
  @Inject('regionCodeService') private regionCodeService: () => RegionCodeService;
  public regionCode: IRegionCode = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.regionCodeId) {
        vm.retrieveRegionCode(to.params.regionCodeId);
      }
    });
  }

  public retrieveRegionCode(regionCodeId) {
    this.regionCodeService()
      .find(regionCodeId)
      .then(res => {
        this.regionCode = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
