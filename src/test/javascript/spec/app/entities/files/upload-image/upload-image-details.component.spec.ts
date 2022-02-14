/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import UploadImageDetailComponent from '@/entities/files/upload-image/upload-image-details.vue';
import UploadImageClass from '@/entities/files/upload-image/upload-image-details.component';
import UploadImageService from '@/entities/files/upload-image/upload-image.service';
import store from '@/store';

const localVue = createLocalVue();

config.initVueApp(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('UploadImage Management Detail Component', () => {
    let wrapper: Wrapper<UploadImageClass>;
    let comp: UploadImageClass;
    let uploadImageServiceStub: SinonStubbedInstance<UploadImageService>;

    beforeEach(() => {
      uploadImageServiceStub = sinon.createStubInstance<UploadImageService>(UploadImageService);

      wrapper = shallowMount<UploadImageClass>(UploadImageDetailComponent, {
        store,
        localVue,
        provide: { uploadImageService: () => uploadImageServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundUploadImage = { id: 123 };
        // @ts-ignore
        uploadImageServiceStub.find.resolves(foundUploadImage);

        // WHEN
        comp.retrieveUploadImage(123);
        await comp.$nextTick();

        // THEN
        expect(comp.uploadImage).toBe(foundUploadImage);
      });
    });
  });
});
