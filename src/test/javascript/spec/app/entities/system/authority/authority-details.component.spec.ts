/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import AuthorityDetailComponent from '@/entities/system/authority/authority-details.vue';
import AuthorityClass from '@/entities/system/authority/authority-details.component';
import AuthorityService from '@/entities/system/authority/authority.service';
import store from '@/store';

const localVue = createLocalVue();

config.initVueApp(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Authority Management Detail Component', () => {
    let wrapper: Wrapper<AuthorityClass>;
    let comp: AuthorityClass;
    let authorityServiceStub: SinonStubbedInstance<AuthorityService>;

    beforeEach(() => {
      authorityServiceStub = sinon.createStubInstance<AuthorityService>(AuthorityService);

      wrapper = shallowMount<AuthorityClass>(AuthorityDetailComponent, {
        store,
        localVue,
        provide: { authorityService: () => authorityServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundAuthority = { id: 123 };
        // @ts-ignore
        authorityServiceStub.find.resolves(foundAuthority);

        // WHEN
        comp.retrieveAuthority(123);
        await comp.$nextTick();

        // THEN
        expect(comp.authority).toBe(foundAuthority);
      });
    });
  });
});
