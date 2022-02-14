/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import AnnouncementDetailComponent from '@/entities/system/announcement/announcement-details.vue';
import AnnouncementClass from '@/entities/system/announcement/announcement-details.component';
import AnnouncementService from '@/entities/system/announcement/announcement.service';
import store from '@/store';

const localVue = createLocalVue();

config.initVueApp(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Announcement Management Detail Component', () => {
    let wrapper: Wrapper<AnnouncementClass>;
    let comp: AnnouncementClass;
    let announcementServiceStub: SinonStubbedInstance<AnnouncementService>;

    beforeEach(() => {
      announcementServiceStub = sinon.createStubInstance<AnnouncementService>(AnnouncementService);

      wrapper = shallowMount<AnnouncementClass>(AnnouncementDetailComponent, {
        store,
        localVue,
        provide: { announcementService: () => announcementServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundAnnouncement = { id: 123 };
        // @ts-ignore
        announcementServiceStub.find.resolves(foundAnnouncement);

        // WHEN
        comp.retrieveAnnouncement(123);
        await comp.$nextTick();

        // THEN
        expect(comp.announcement).toBe(foundAnnouncement);
      });
    });
  });
});
