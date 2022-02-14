/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import AnnouncementRecordDetailComponent from '@/entities/system/announcement-record/announcement-record-details.vue';
import AnnouncementRecordClass from '@/entities/system/announcement-record/announcement-record-details.component';
import AnnouncementRecordService from '@/entities/system/announcement-record/announcement-record.service';
import store from '@/store';

const localVue = createLocalVue();

config.initVueApp(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('AnnouncementRecord Management Detail Component', () => {
    let wrapper: Wrapper<AnnouncementRecordClass>;
    let comp: AnnouncementRecordClass;
    let announcementRecordServiceStub: SinonStubbedInstance<AnnouncementRecordService>;

    beforeEach(() => {
      announcementRecordServiceStub = sinon.createStubInstance<AnnouncementRecordService>(AnnouncementRecordService);

      wrapper = shallowMount<AnnouncementRecordClass>(AnnouncementRecordDetailComponent, {
        store,
        localVue,
        provide: { announcementRecordService: () => announcementRecordServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundAnnouncementRecord = { id: 123 };
        // @ts-ignore
        announcementRecordServiceStub.find.resolves(foundAnnouncementRecord);

        // WHEN
        comp.retrieveAnnouncementRecord(123);
        await comp.$nextTick();

        // THEN
        expect(comp.announcementRecord).toBe(foundAnnouncementRecord);
      });
    });
  });
});
