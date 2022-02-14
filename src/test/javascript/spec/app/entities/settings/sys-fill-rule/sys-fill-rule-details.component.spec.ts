/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import SysFillRuleDetailComponent from '@/entities/settings/sys-fill-rule/sys-fill-rule-details.vue';
import SysFillRuleClass from '@/entities/settings/sys-fill-rule/sys-fill-rule-details.component';
import SysFillRuleService from '@/entities/settings/sys-fill-rule/sys-fill-rule.service';
import store from '@/store';

const localVue = createLocalVue();

config.initVueApp(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('SysFillRule Management Detail Component', () => {
    let wrapper: Wrapper<SysFillRuleClass>;
    let comp: SysFillRuleClass;
    let sysFillRuleServiceStub: SinonStubbedInstance<SysFillRuleService>;

    beforeEach(() => {
      sysFillRuleServiceStub = sinon.createStubInstance<SysFillRuleService>(SysFillRuleService);

      wrapper = shallowMount<SysFillRuleClass>(SysFillRuleDetailComponent, {
        store,
        localVue,
        provide: { sysFillRuleService: () => sysFillRuleServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundSysFillRule = { id: 123 };
        // @ts-ignore
        sysFillRuleServiceStub.find.resolves(foundSysFillRule);

        // WHEN
        comp.retrieveSysFillRule(123);
        await comp.$nextTick();

        // THEN
        expect(comp.sysFillRule).toBe(foundSysFillRule);
      });
    });
  });
});
