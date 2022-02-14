/* tslint:disable max-line-length */
import axios from 'axios';
// import { format } from 'date-fns';
import moment, { Moment } from 'moment';

import * as config from '@/shared/config/config';
import { DATE_TIME_FORMAT } from '@/shared/date/filters';
import UserService from '@/entities/system/user/user.service';
import { User } from '@/shared/model/system/user.model';

const mockedAxios: any = axios;
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

describe('Service Tests', () => {
  describe('User Service', () => {
    let service: UserService;
    let elemDefault;
    let currentDate: Moment;
    beforeEach(() => {
      service = new UserService();
      currentDate = moment(Date.now());

      elemDefault = new User(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        false,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        currentDate
      );
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            birthday: currentDate,
            resetDate: currentDate,
          },
          elemDefault
        );
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        return service.find(123).then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });
      it('should create a User', async () => {
        const returnedFromService = Object.assign(
          {
            birthday: currentDate,
            resetDate: currentDate,
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            birthday: currentDate,
            resetDate: currentDate,
          },
          returnedFromService
        );

        mockedAxios.post.mockReturnValue(Promise.resolve({ data: returnedFromService }));
        return service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should update a User', async () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            login: 'BBBBBB',
            password: 'BBBBBB',
            firstName: 'BBBBBB',
            lastName: 'BBBBBB',
            email: 'BBBBBB',
            mobile: 'BBBBBB',
            birthday: currentDate,
            activated: true,
            langKey: 'BBBBBB',
            imageUrl: 'BBBBBB',
            activationKey: 'BBBBBB',
            resetKey: 'BBBBBB',
            resetDate: currentDate,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            birthday: currentDate,
            resetDate: currentDate,
          },
          returnedFromService
        );
        mockedAxios.put.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        return service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });
      it('should return a list of User', async () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            login: 'BBBBBB',
            password: 'BBBBBB',
            firstName: 'BBBBBB',
            lastName: 'BBBBBB',
            email: 'BBBBBB',
            mobile: 'BBBBBB',
            birthday: currentDate,
            activated: true,
            langKey: 'BBBBBB',
            imageUrl: 'BBBBBB',
            activationKey: 'BBBBBB',
            resetKey: 'BBBBBB',
            resetDate: currentDate,
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            birthday: currentDate,
            resetDate: currentDate,
          },
          returnedFromService
        );
        mockedAxios.get.mockReturnValue(Promise.resolve([returnedFromService]));
        return service.retrieve({ sort: {}, page: 0, size: 10 }).then(res => {
          expect(res).toContainEqual(expected);
        });
      });
      it('should delete a User', async () => {
        mockedAxios.delete.mockReturnValue(Promise.resolve({ ok: true }));
        return service.delete(123).then(res => {
          expect(res.data.ok).toBeTruthy();
        });
      });
    });
  });
});
