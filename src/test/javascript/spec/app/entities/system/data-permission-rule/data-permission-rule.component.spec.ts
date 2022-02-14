/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import DataPermissionRuleComponent from '@/entities/system/data-permission-rule/data-permission-rule.vue';
import DataPermissionRuleClass from '@/entities/system/data-permission-rule/data-permission-rule.component';
import DataPermissionRuleService from '@/entities/system/data-permission-rule/data-permission-rule.service';
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
  describe('DataPermissionRule Management Component', () => {
    let wrapper: Wrapper<DataPermissionRuleClass>;
    let comp: DataPermissionRuleClass;
    let dataPermissionRuleServiceStub: SinonStubbedInstance<DataPermissionRuleService>;

    beforeEach(() => {
      dataPermissionRuleServiceStub = sinon.createStubInstance<DataPermissionRuleService>(DataPermissionRuleService);
      // @ts-ignore
      dataPermissionRuleServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<DataPermissionRuleClass>(DataPermissionRuleComponent, {
        store,
        localVue,
        stubs: { jhiItemCount: true, bPagination: true, bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          dataPermissionRuleService: () => dataPermissionRuleServiceStub,
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
      dataPermissionRuleServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.loadAll();
      await comp.$nextTick();

      // THEN
      expect(dataPermissionRuleServiceStub.retrieve.called).toBeTruthy();
      expect(comp.dataPermissionRules[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', async () => {
      // GIVEN
      // @ts-ignore
      dataPermissionRuleServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });
      comp.previousPage = 1;

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();

      // THEN
      expect(dataPermissionRuleServiceStub.retrieve.called).toBeTruthy();
      expect(comp.dataPermissionRules[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should not load a page if the page is the same as the previous page', () => {
      // GIVEN
      dataPermissionRuleServiceStub.retrieve.reset();
      comp.previousPage = 1;

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(dataPermissionRuleServiceStub.retrieve.called).toBeFalsy();
    });

    it('should re-initialize the page', async () => {
      // GIVEN
      dataPermissionRuleServiceStub.retrieve.reset();
      // @ts-ignore
      dataPermissionRuleServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();
      comp.clear();
      await comp.$nextTick();

      // THEN
      expect(dataPermissionRuleServiceStub.retrieve.callCount).toEqual(3);
      expect(comp.page).toEqual(1);
      expect(comp.dataPermissionRules[0]).toEqual(jasmine.objectContaining({ id: 123 }));
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
      dataPermissionRuleServiceStub.delete.resolves({});

      // WHEN
      comp.removeById(123);
      await comp.$nextTick();

      // THEN
      expect(dataPermissionRuleServiceStub.delete.called).toBeTruthy();
      expect(dataPermissionRuleServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
