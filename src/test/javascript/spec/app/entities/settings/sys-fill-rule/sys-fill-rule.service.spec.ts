/* tslint:disable max-line-length */
import axios from 'axios';

import * as config from '@/shared/config/config';
import {} from '@/shared/date/filters';
import SysFillRuleService from '@/entities/settings/sys-fill-rule/sys-fill-rule.service';
import { SysFillRule } from '@/shared/model/settings/sys-fill-rule.model';

const mockedAxios: any = axios;
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

describe('Service Tests', () => {
  describe('SysFillRule Service', () => {
    let service: SysFillRuleService;
    let elemDefault;
    beforeEach(() => {
      service = new SysFillRuleService();

      elemDefault = new SysFillRule(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign({}, elemDefault);
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        return service.find(123).then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });
      it('should create a SysFillRule', async () => {
        const returnedFromService = Object.assign({}, elemDefault);
        const expected = Object.assign({}, returnedFromService);

        mockedAxios.post.mockReturnValue(Promise.resolve({ data: returnedFromService }));
        return service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should update a SysFillRule', async () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            name: 'BBBBBB',
            code: 'BBBBBB',
            implClass: 'BBBBBB',
            params: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        mockedAxios.put.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        return service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });
      it('should return a list of SysFillRule', async () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            name: 'BBBBBB',
            code: 'BBBBBB',
            implClass: 'BBBBBB',
            params: 'BBBBBB',
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        mockedAxios.get.mockReturnValue(Promise.resolve([returnedFromService]));
        return service.retrieve({ sort: {}, page: 0, size: 10 }).then(res => {
          expect(res).toContainEqual(expected);
        });
      });
      it('should delete a SysFillRule', async () => {
        mockedAxios.delete.mockReturnValue(Promise.resolve({ ok: true }));
        return service.delete(123).then(res => {
          expect(res.data.ok).toBeTruthy();
        });
      });
    });
  });
});
