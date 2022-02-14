/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import UserDetailComponent from '@/entities/system/user/user-details.vue';
import UserClass from '@/entities/system/user/user-details.component';
import UserService from '@/entities/system/user/user.service';
import store from '@/store';

const localVue = createLocalVue();

config.initVueApp(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('User Management Detail Component', () => {
    let wrapper: Wrapper<UserClass>;
    let comp: UserClass;
    let userServiceStub: SinonStubbedInstance<UserService>;

    beforeEach(() => {
      userServiceStub = sinon.createStubInstance<UserService>(UserService);

      wrapper = shallowMount<UserClass>(UserDetailComponent, { store, localVue, provide: { userService: () => userServiceStub } });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundUser = { id: 123 };
        // @ts-ignore
        userServiceStub.find.resolves(foundUser);

        // WHEN
        comp.retrieveUser(123);
        await comp.$nextTick();

        // THEN
        expect(comp.user).toBe(foundUser);
      });
    });
  });
});
