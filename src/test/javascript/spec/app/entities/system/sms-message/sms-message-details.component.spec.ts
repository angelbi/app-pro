/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import SmsMessageDetailComponent from '@/entities/system/sms-message/sms-message-details.vue';
import SmsMessageClass from '@/entities/system/sms-message/sms-message-details.component';
import SmsMessageService from '@/entities/system/sms-message/sms-message.service';
import store from '@/store';

const localVue = createLocalVue();

config.initVueApp(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('SmsMessage Management Detail Component', () => {
    let wrapper: Wrapper<SmsMessageClass>;
    let comp: SmsMessageClass;
    let smsMessageServiceStub: SinonStubbedInstance<SmsMessageService>;

    beforeEach(() => {
      smsMessageServiceStub = sinon.createStubInstance<SmsMessageService>(SmsMessageService);

      wrapper = shallowMount<SmsMessageClass>(SmsMessageDetailComponent, {
        store,
        localVue,
        provide: { smsMessageService: () => smsMessageServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundSmsMessage = { id: 123 };
        // @ts-ignore
        smsMessageServiceStub.find.resolves(foundSmsMessage);

        // WHEN
        comp.retrieveSmsMessage(123);
        await comp.$nextTick();

        // THEN
        expect(comp.smsMessage).toBe(foundSmsMessage);
      });
    });
  });
});
