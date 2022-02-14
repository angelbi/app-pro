/* tslint:disable max-line-length */
import axios from 'axios';

import * as config from '@/shared/config/config';
import {} from '@/shared/date/filters';
import SmsTemplateService from '@/entities/system/sms-template/sms-template.service';
import { SmsTemplate } from '@/shared/model/system/sms-template.model';
import { MessageSendType } from '@/shared/model/enumerations/message-send-type.model';

const mockedAxios: any = axios;
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

describe('Service Tests', () => {
  describe('SmsTemplate Service', () => {
    let service: SmsTemplateService;
    let elemDefault;
    beforeEach(() => {
      service = new SmsTemplateService();

      elemDefault = new SmsTemplate(0, 'AAAAAAA', 'AAAAAAA', MessageSendType.EMAIL, 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign({}, elemDefault);
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        return service.find(123).then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });
      it('should create a SmsTemplate', async () => {
        const returnedFromService = Object.assign({}, elemDefault);
        const expected = Object.assign({}, returnedFromService);

        mockedAxios.post.mockReturnValue(Promise.resolve({ data: returnedFromService }));
        return service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should update a SmsTemplate', async () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            name: 'BBBBBB',
            code: 'BBBBBB',
            type: 'BBBBBB',
            content: 'BBBBBB',
            testJson: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        mockedAxios.put.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        return service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });
      it('should return a list of SmsTemplate', async () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            name: 'BBBBBB',
            code: 'BBBBBB',
            type: 'BBBBBB',
            content: 'BBBBBB',
            testJson: 'BBBBBB',
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        mockedAxios.get.mockReturnValue(Promise.resolve([returnedFromService]));
        return service.retrieve({ sort: {}, page: 0, size: 10 }).then(res => {
          expect(res).toContainEqual(expected);
        });
      });
      it('should delete a SmsTemplate', async () => {
        mockedAxios.delete.mockReturnValue(Promise.resolve({ ok: true }));
        return service.delete(123).then(res => {
          expect(res.data.ok).toBeTruthy();
        });
      });
    });
  });
});
