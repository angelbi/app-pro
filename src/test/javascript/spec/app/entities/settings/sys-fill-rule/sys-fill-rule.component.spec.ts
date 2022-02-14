/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import SysFillRuleComponent from '@/entities/settings/sys-fill-rule/sys-fill-rule.vue';
import SysFillRuleClass from '@/entities/settings/sys-fill-rule/sys-fill-rule.component';
import SysFillRuleService from '@/entities/settings/sys-fill-rule/sys-fill-rule.service';
import store from '@/store';
const localVue = createLocalVue();

config.initVueApp(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-alert', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
  },
};

describe('Component Tests', () => {
  describe('SysFillRule Management Component', () => {
    let wrapper: Wrapper<SysFillRuleClass>;
    let comp: SysFillRuleClass;
    let sysFillRuleServiceStub: SinonStubbedInstance<SysFillRuleService>;

    beforeEach(() => {
      sysFillRuleServiceStub = sinon.createStubInstance<SysFillRuleService>(SysFillRuleService);
      // @ts-ignore
      sysFillRuleServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<SysFillRuleClass>(SysFillRuleComponent, {
        store,
        localVue,
        stubs: { jhiItemCount: true, bPagination: true, bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          sysFillRuleService: () => sysFillRuleServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('should be a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('Should call load all on init', async () => {
      // GIVEN
      // @ts-ignore
      sysFillRuleServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.loadAll();
      await comp.$nextTick();

      // THEN
      expect(sysFillRuleServiceStub.retrieve.called).toBeTruthy();
      expect(comp.sysFillRules[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', async () => {
      // GIVEN
      // @ts-ignore
      sysFillRuleServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });
      comp.previousPage = 1;

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();

      // THEN
      expect(sysFillRuleServiceStub.retrieve.called).toBeTruthy();
      expect(comp.sysFillRules[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should not load a page if the page is the same as the previous page', () => {
      // GIVEN
      sysFillRuleServiceStub.retrieve.reset();
      comp.previousPage = 1;

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(sysFillRuleServiceStub.retrieve.called).toBeFalsy();
    });

    it('should re-initialize the page', async () => {
      // GIVEN
      sysFillRuleServiceStub.retrieve.reset();
      // @ts-ignore
      sysFillRuleServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();
      comp.clear();
      await comp.$nextTick();

      // THEN
      expect(sysFillRuleServiceStub.retrieve.callCount).toEqual(3);
      expect(comp.page).toEqual(1);
      expect(comp.sysFillRules[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,desc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // GIVEN
      comp.propOrder = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,desc', 'id']);
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      // @ts-ignore
      sysFillRuleServiceStub.delete.resolves({});

      // WHEN
      comp.removeById(123);
      await comp.$nextTick();

      // THEN
      expect(sysFillRuleServiceStub.delete.called).toBeTruthy();
      expect(sysFillRuleServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
