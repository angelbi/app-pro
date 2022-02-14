/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import BusinessTypeDetailComponent from '@/entities/settings/business-type/business-type-details.vue';
import BusinessTypeClass from '@/entities/settings/business-type/business-type-details.component';
import BusinessTypeService from '@/entities/settings/business-type/business-type.service';
import store from '@/store';

const localVue = createLocalVue();

config.initVueApp(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('BusinessType Management Detail Component', () => {
    let wrapper: Wrapper<BusinessTypeClass>;
    let comp: BusinessTypeClass;
    let businessTypeServiceStub: SinonStubbedInstance<BusinessTypeService>;

    beforeEach(() => {
      businessTypeServiceStub = sinon.createStubInstance<BusinessTypeService>(BusinessTypeService);

      wrapper = shallowMount<BusinessTypeClass>(BusinessTypeDetailComponent, {
        store,
        localVue,
        provide: { businessTypeService: () => businessTypeServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundBusinessType = { id: 123 };
        // @ts-ignore
        businessTypeServiceStub.find.resolves(foundBusinessType);

        // WHEN
        comp.retrieveBusinessType(123);
        await comp.$nextTick();

        // THEN
        expect(comp.businessType).toBe(foundBusinessType);
      });
    });
  });
});
