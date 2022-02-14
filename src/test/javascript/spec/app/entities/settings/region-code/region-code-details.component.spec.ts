/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import RegionCodeDetailComponent from '@/entities/settings/region-code/region-code-details.vue';
import RegionCodeClass from '@/entities/settings/region-code/region-code-details.component';
import RegionCodeService from '@/entities/settings/region-code/region-code.service';
import store from '@/store';

const localVue = createLocalVue();

config.initVueApp(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('RegionCode Management Detail Component', () => {
    let wrapper: Wrapper<RegionCodeClass>;
    let comp: RegionCodeClass;
    let regionCodeServiceStub: SinonStubbedInstance<RegionCodeService>;

    beforeEach(() => {
      regionCodeServiceStub = sinon.createStubInstance<RegionCodeService>(RegionCodeService);

      wrapper = shallowMount<RegionCodeClass>(RegionCodeDetailComponent, {
        store,
        localVue,
        provide: { regionCodeService: () => regionCodeServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundRegionCode = { id: 123 };
        // @ts-ignore
        regionCodeServiceStub.find.resolves(foundRegionCode);

        // WHEN
        comp.retrieveRegionCode(123);
        await comp.$nextTick();

        // THEN
        expect(comp.regionCode).toBe(foundRegionCode);
      });
    });
  });
});
