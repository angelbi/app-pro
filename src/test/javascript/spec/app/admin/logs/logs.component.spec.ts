import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';
import Logs from '@/admin/logs/logs.vue';
import LogsClass from '@/admin/logs/logs.component';
import LogsService from '@/admin/logs/logs.service';

import * as config from '@/shared/config/config';
import store from '@/store';

const localVue = createLocalVue();
const mockedAxios: any = axios;

config.initVueApp(localVue);

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

describe('Logs Component', () => {
  let wrapper: Wrapper<LogsClass>;
  let logs: LogsClass;

  beforeEach(() => {
    mockedAxios.get.mockReturnValue(Promise.resolve({}));
    wrapper = shallowMount<LogsClass>(Logs, { store, localVue, provide: { logsService: () => new LogsService() } });
    logs = wrapper.vm;
  });

  it('should be a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  describe('OnInit', () => {
    it('should set all default values correctly', () => {
      expect(logs.filtered).toBe('');
      expect(logs.orderProp).toBe('name');
      expect(logs.reverse).toBe(false);
    });

    it('Should call load all on init', async () => {
      // WHEN
      logs.init();
      await logs.$nextTick();

      // THEN
      expect(mockedAxios.get).toHaveBeenCalledWith('management/loggers');
    });
  });

  describe('change log level', () => {
    it('should change log level correctly', async () => {
      mockedAxios.post.mockReturnValue(Promise.resolve({}));

      // WHEN
      logs.updateLevel('main', 'ERROR');
      await logs.$nextTick();

      // THEN
      expect(mockedAxios.post).toHaveBeenCalledWith('management/loggers/main', { configuredLevel: 'ERROR' });
      expect(mockedAxios.get).toHaveBeenCalledWith('management/loggers');
    });
  });

  describe('change order', () => {
    it('should change order and invert reverse', () => {
      // WHEN
      logs.changeOrder('dummy-order');

      // THEN
      expect(logs.orderProp).toEqual('dummy-order');
      expect(logs.reverse).toBe(true);
    });
  });
});
