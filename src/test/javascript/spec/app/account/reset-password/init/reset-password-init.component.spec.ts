import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import axios from 'axios';
import * as config from '@/shared/config/config';
import ResetPasswordInit from '@/account/reset-password/init/reset-password-init.vue';
import ResetPasswordInitClass from '@/account/reset-password/init/reset-password-init.component';
import { EMAIL_NOT_FOUND_TYPE } from '@/constants';

const localVue = createLocalVue();
const mockedAxios: any = axios;

config.initVueApp(localVue);

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

describe('Reset Component Init', () => {
  let wrapper: Wrapper<ResetPasswordInitClass>;
  let resetPasswordInit: ResetPasswordInitClass;

  beforeEach(() => {
    mockedAxios.post.mockReset();
    wrapper = shallowMount<ResetPasswordInitClass>(ResetPasswordInit, {
      localVue,
    });
    resetPasswordInit = wrapper.vm;
  });

  it('should be a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('should reset request be a success', async () => {
    // Given
    mockedAxios.post.mockReturnValue(Promise.resolve());

    // When
    await resetPasswordInit.requestReset();

    // Then
    expect(resetPasswordInit.success).toBeTruthy();
  });

  it('should reset request fail as an error', async () => {
    // Given
    mockedAxios.post.mockReturnValue(
      Promise.reject({
        response: {
          status: null,
          data: {
            type: null,
          },
        },
      })
    );

    // When
    resetPasswordInit.requestReset();
    await resetPasswordInit.$nextTick();

    // Then
    expect(resetPasswordInit.success).toBeNull();
    expect(resetPasswordInit.error).toEqual('ERROR');
  });

  it('should reset request fail as an email not existing error', async () => {
    // Given
    mockedAxios.post.mockReturnValue(
      Promise.reject({
        response: {
          status: 400,
          data: {
            type: EMAIL_NOT_FOUND_TYPE,
          },
        },
      })
    );

    // When
    resetPasswordInit.requestReset();
    await resetPasswordInit.$nextTick();

    // Then
    expect(resetPasswordInit.success).toBeNull();
    expect(resetPasswordInit.errorEmailNotExists).toEqual('ERROR');
  });
});
