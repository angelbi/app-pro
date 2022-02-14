/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import SmsTemplateDetailComponent from '@/entities/system/sms-template/sms-template-details.vue';
import SmsTemplateClass from '@/entities/system/sms-template/sms-template-details.component';
import SmsTemplateService from '@/entities/system/sms-template/sms-template.service';
import store from '@/store';

const localVue = createLocalVue();

config.initVueApp(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('SmsTemplate Management Detail Component', () => {
    let wrapper: Wrapper<SmsTemplateClass>;
    let comp: SmsTemplateClass;
    let smsTemplateServiceStub: SinonStubbedInstance<SmsTemplateService>;

    beforeEach(() => {
      smsTemplateServiceStub = sinon.createStubInstance<SmsTemplateService>(SmsTemplateService);

      wrapper = shallowMount<SmsTemplateClass>(SmsTemplateDetailComponent, {
        store,
        localVue,
        provide: { smsTemplateService: () => smsTemplateServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundSmsTemplate = { id: 123 };
        // @ts-ignore
        smsTemplateServiceStub.find.resolves(foundSmsTemplate);

        // WHEN
        comp.retrieveSmsTemplate(123);
        await comp.$nextTick();

        // THEN
        expect(comp.smsTemplate).toBe(foundSmsTemplate);
      });
    });
  });
});
