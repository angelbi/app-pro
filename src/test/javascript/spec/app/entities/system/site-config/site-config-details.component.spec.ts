/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import SiteConfigDetailComponent from '@/entities/system/site-config/site-config-details.vue';
import SiteConfigClass from '@/entities/system/site-config/site-config-details.component';
import SiteConfigService from '@/entities/system/site-config/site-config.service';
import store from '@/store';

const localVue = createLocalVue();

config.initVueApp(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('SiteConfig Management Detail Component', () => {
    let wrapper: Wrapper<SiteConfigClass>;
    let comp: SiteConfigClass;
    let siteConfigServiceStub: SinonStubbedInstance<SiteConfigService>;

    beforeEach(() => {
      siteConfigServiceStub = sinon.createStubInstance<SiteConfigService>(SiteConfigService);

      wrapper = shallowMount<SiteConfigClass>(SiteConfigDetailComponent, {
        store,
        localVue,
        provide: { siteConfigService: () => siteConfigServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundSiteConfig = { id: 123 };
        // @ts-ignore
        siteConfigServiceStub.find.resolves(foundSiteConfig);

        // WHEN
        comp.retrieveSiteConfig(123);
        await comp.$nextTick();

        // THEN
        expect(comp.siteConfig).toBe(foundSiteConfig);
      });
    });
  });
});
