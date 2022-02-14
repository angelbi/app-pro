/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import SysLogDetailComponent from '@/entities/system/sys-log/sys-log-details.vue';
import SysLogClass from '@/entities/system/sys-log/sys-log-details.component';
import SysLogService from '@/entities/system/sys-log/sys-log.service';
import store from '@/store';

const localVue = createLocalVue();

config.initVueApp(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('SysLog Management Detail Component', () => {
    let wrapper: Wrapper<SysLogClass>;
    let comp: SysLogClass;
    let sysLogServiceStub: SinonStubbedInstance<SysLogService>;

    beforeEach(() => {
      sysLogServiceStub = sinon.createStubInstance<SysLogService>(SysLogService);

      wrapper = shallowMount<SysLogClass>(SysLogDetailComponent, { store, localVue, provide: { sysLogService: () => sysLogServiceStub } });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundSysLog = { id: 123 };
        // @ts-ignore
        sysLogServiceStub.find.resolves(foundSysLog);

        // WHEN
        comp.retrieveSysLog(123);
        await comp.$nextTick();

        // THEN
        expect(comp.sysLog).toBe(foundSysLog);
      });
    });
  });
});
