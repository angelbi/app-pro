/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import DataPermissionRuleDetailComponent from '@/entities/system/data-permission-rule/data-permission-rule-details.vue';
import DataPermissionRuleClass from '@/entities/system/data-permission-rule/data-permission-rule-details.component';
import DataPermissionRuleService from '@/entities/system/data-permission-rule/data-permission-rule.service';
import store from '@/store';

const localVue = createLocalVue();

config.initVueApp(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('DataPermissionRule Management Detail Component', () => {
    let wrapper: Wrapper<DataPermissionRuleClass>;
    let comp: DataPermissionRuleClass;
    let dataPermissionRuleServiceStub: SinonStubbedInstance<DataPermissionRuleService>;

    beforeEach(() => {
      dataPermissionRuleServiceStub = sinon.createStubInstance<DataPermissionRuleService>(DataPermissionRuleService);

      wrapper = shallowMount<DataPermissionRuleClass>(DataPermissionRuleDetailComponent, {
        store,
        localVue,
        provide: { dataPermissionRuleService: () => dataPermissionRuleServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundDataPermissionRule = { id: 123 };
        // @ts-ignore
        dataPermissionRuleServiceStub.find.resolves(foundDataPermissionRule);

        // WHEN
        comp.retrieveDataPermissionRule(123);
        await comp.$nextTick();

        // THEN
        expect(comp.dataPermissionRule).toBe(foundDataPermissionRule);
      });
    });
  });
});
