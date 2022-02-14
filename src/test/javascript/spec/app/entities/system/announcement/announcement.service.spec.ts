/* tslint:disable max-line-length */
import axios from 'axios';
// import { format } from 'date-fns';
import moment, { Moment } from 'moment';

import * as config from '@/shared/config/config';
import { DATE_TIME_FORMAT } from '@/shared/date/filters';
import AnnouncementService from '@/entities/system/announcement/announcement.service';
import { Announcement } from '@/shared/model/system/announcement.model';
import { PriorityLevel } from '@/shared/model/enumerations/priority-level.model';
import { AnnoCategory } from '@/shared/model/enumerations/anno-category.model';
import { ReceiverType } from '@/shared/model/enumerations/receiver-type.model';
import { AnnoSendStatus } from '@/shared/model/enumerations/anno-send-status.model';
import { AnnoBusinessType } from '@/shared/model/enumerations/anno-business-type.model';
import { AnnoOpenType } from '@/shared/model/enumerations/anno-open-type.model';

const mockedAxios: any = axios;
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

describe('Service Tests', () => {
  describe('Announcement Service', () => {
    let service: AnnouncementService;
    let elemDefault;
    let currentDate: Moment;
    beforeEach(() => {
      service = new AnnouncementService();
      currentDate = moment(Date.now());

      elemDefault = new Announcement(
        0,
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        currentDate,
        0,
        PriorityLevel.HIGH,
        AnnoCategory.SYSTEM_INFO,
        ReceiverType.USER,
        AnnoSendStatus.NOT_RELEASE,
        currentDate,
        currentDate,
        AnnoBusinessType.EMAIL,
        0,
        AnnoOpenType.URL,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            startTime: currentDate,
            endTime: currentDate,
            sendTime: currentDate,
            cancelTime: currentDate,
          },
          elemDefault
        );
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        return service.find(123).then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });
      it('should create a Announcement', async () => {
        const returnedFromService = Object.assign(
          {
            startTime: currentDate,
            endTime: currentDate,
            sendTime: currentDate,
            cancelTime: currentDate,
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            startTime: currentDate,
            endTime: currentDate,
            sendTime: currentDate,
            cancelTime: currentDate,
          },
          returnedFromService
        );

        mockedAxios.post.mockReturnValue(Promise.resolve({ data: returnedFromService }));
        return service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should update a Announcement', async () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            titile: 'BBBBBB',
            content: 'BBBBBB',
            startTime: currentDate,
            endTime: currentDate,
            senderId: 1,
            priority: 'BBBBBB',
            category: 'BBBBBB',
            receiverType: 'BBBBBB',
            sendStatus: 'BBBBBB',
            sendTime: currentDate,
            cancelTime: currentDate,
            businessType: 'BBBBBB',
            businessId: 1,
            openType: 'BBBBBB',
            openPage: 'BBBBBB',
            receiverIds: 'BBBBBB',
            summary: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            startTime: currentDate,
            endTime: currentDate,
            sendTime: currentDate,
            cancelTime: currentDate,
          },
          returnedFromService
        );
        mockedAxios.put.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        return service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });
      it('should return a list of Announcement', async () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            titile: 'BBBBBB',
            content: 'BBBBBB',
            startTime: currentDate,
            endTime: currentDate,
            senderId: 1,
            priority: 'BBBBBB',
            category: 'BBBBBB',
            receiverType: 'BBBBBB',
            sendStatus: 'BBBBBB',
            sendTime: currentDate,
            cancelTime: currentDate,
            businessType: 'BBBBBB',
            businessId: 1,
            openType: 'BBBBBB',
            openPage: 'BBBBBB',
            receiverIds: 'BBBBBB',
            summary: 'BBBBBB',
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            startTime: currentDate,
            endTime: currentDate,
            sendTime: currentDate,
            cancelTime: currentDate,
          },
          returnedFromService
        );
        mockedAxios.get.mockReturnValue(Promise.resolve([returnedFromService]));
        return service.retrieve({ sort: {}, page: 0, size: 10 }).then(res => {
          expect(res).toContainEqual(expected);
        });
      });
      it('should delete a Announcement', async () => {
        mockedAxios.delete.mockReturnValue(Promise.resolve({ ok: true }));
        return service.delete(123).then(res => {
          expect(res.data.ok).toBeTruthy();
        });
      });
    });
  });
});
