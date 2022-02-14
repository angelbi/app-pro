/* tslint:disable max-line-length */
import axios from 'axios';
// import { format } from 'date-fns';
import moment, { Moment } from 'moment';

import * as config from '@/shared/config/config';
import { DATE_TIME_FORMAT } from '@/shared/date/filters';
import SmsMessageService from '@/entities/system/sms-message/sms-message.service';
import { SmsMessage } from '@/shared/model/system/sms-message.model';
import { MessageSendType } from '@/shared/model/enumerations/message-send-type.model';
import { SendStatus } from '@/shared/model/enumerations/send-status.model';

const mockedAxios: any = axios;
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

describe('Service Tests', () => {
  describe('SmsMessage Service', () => {
    let service: SmsMessageService;
    let elemDefault;
    let currentDate: Moment;
    beforeEach(() => {
      service = new SmsMessageService();
      currentDate = moment(Date.now());

      elemDefault = new SmsMessage(
        0,
        'AAAAAAA',
        MessageSendType.EMAIL,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        SendStatus.WAITING,
        0,
        'AAAAAAA',
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            sendTime: currentDate,
          },
          elemDefault
        );
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        return service.find(123).then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });
      it('should create a SmsMessage', async () => {
        const returnedFromService = Object.assign(
          {
            sendTime: currentDate,
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            sendTime: currentDate,
          },
          returnedFromService
        );

        mockedAxios.post.mockReturnValue(Promise.resolve({ data: returnedFromService }));
        return service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should update a SmsMessage', async () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            title: 'BBBBBB',
            sendType: 'BBBBBB',
            receiver: 'BBBBBB',
            params: 'BBBBBB',
            content: 'BBBBBB',
            sendTime: currentDate,
            sendStatus: 'BBBBBB',
            retryNum: 1,
            failResult: 'BBBBBB',
            remark: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            sendTime: currentDate,
          },
          returnedFromService
        );
        mockedAxios.put.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        return service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });
      it('should return a list of SmsMessage', async () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            title: 'BBBBBB',
            sendType: 'BBBBBB',
            receiver: 'BBBBBB',
            params: 'BBBBBB',
            content: 'BBBBBB',
            sendTime: currentDate,
            sendStatus: 'BBBBBB',
            retryNum: 1,
            failResult: 'BBBBBB',
            remark: 'BBBBBB',
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            sendTime: currentDate,
          },
          returnedFromService
        );
        mockedAxios.get.mockReturnValue(Promise.resolve([returnedFromService]));
        return service.retrieve({ sort: {}, page: 0, size: 10 }).then(res => {
          expect(res).toContainEqual(expected);
        });
      });
      it('should delete a SmsMessage', async () => {
        mockedAxios.delete.mockReturnValue(Promise.resolve({ ok: true }));
        return service.delete(123).then(res => {
          expect(res.data.ok).toBeTruthy();
        });
      });
    });
  });
});
