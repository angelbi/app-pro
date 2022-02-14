/* tslint:disable max-line-length */
import axios from 'axios';
// import { format } from 'date-fns';
import moment, { Moment } from 'moment';

import * as config from '@/shared/config/config';
import { DATE_TIME_FORMAT } from '@/shared/date/filters';
import AnnouncementRecordService from '@/entities/system/announcement-record/announcement-record.service';
import { AnnouncementRecord } from '@/shared/model/system/announcement-record.model';

const mockedAxios: any = axios;
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

describe('Service Tests', () => {
  describe('AnnouncementRecord Service', () => {
    let service: AnnouncementRecordService;
    let elemDefault;
    let currentDate: Moment;
    beforeEach(() => {
      service = new AnnouncementRecordService();
      currentDate = moment(Date.now());

      elemDefault = new AnnouncementRecord(0, 0, 0, false, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            readTime: currentDate,
          },
          elemDefault
        );
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        return service.find(123).then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });
      it('should create a AnnouncementRecord', async () => {
        const returnedFromService = Object.assign(
          {
            readTime: currentDate,
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            readTime: currentDate,
          },
          returnedFromService
        );

        mockedAxios.post.mockReturnValue(Promise.resolve({ data: returnedFromService }));
        return service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should update a AnnouncementRecord', async () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            anntId: 1,
            userId: 1,
            hasRead: true,
            readTime: currentDate,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            readTime: currentDate,
          },
          returnedFromService
        );
        mockedAxios.put.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        return service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });
      it('should return a list of AnnouncementRecord', async () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            anntId: 1,
            userId: 1,
            hasRead: true,
            readTime: currentDate,
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            readTime: currentDate,
          },
          returnedFromService
        );
        mockedAxios.get.mockReturnValue(Promise.resolve([returnedFromService]));
        return service.retrieve({ sort: {}, page: 0, size: 10 }).then(res => {
          expect(res).toContainEqual(expected);
        });
      });
      it('should delete a AnnouncementRecord', async () => {
        mockedAxios.delete.mockReturnValue(Promise.resolve({ ok: true }));
        return service.delete(123).then(res => {
          expect(res.data.ok).toBeTruthy();
        });
      });
    });
  });
});
