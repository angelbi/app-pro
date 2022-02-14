/* tslint:disable max-line-length */
import axios from 'axios';

import * as config from '@/shared/config/config';
import {} from '@/shared/date/filters';
import DataPermissionRuleService from '@/entities/system/data-permission-rule/data-permission-rule.service';
import { DataPermissionRule } from '@/shared/model/system/data-permission-rule.model';

const mockedAxios: any = axios;
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

describe('Service Tests', () => {
  describe('DataPermissionRule Service', () => {
    let service: DataPermissionRuleService;
    let elemDefault;
    beforeEach(() => {
      service = new DataPermissionRuleService();

      elemDefault = new DataPermissionRule(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', false);
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign({}, elemDefault);
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        return service.find(123).then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });
      it('should create a DataPermissionRule', async () => {
        const returnedFromService = Object.assign({}, elemDefault);
        const expected = Object.assign({}, returnedFromService);

        mockedAxios.post.mockReturnValue(Promise.resolve({ data: returnedFromService }));
        return service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should update a DataPermissionRule', async () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            permissionId: 'BBBBBB',
            name: 'BBBBBB',
            column: 'BBBBBB',
            conditions: 'BBBBBB',
            value: 'BBBBBB',
            disabled: true,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        mockedAxios.put.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        return service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });
      it('should return a list of DataPermissionRule', async () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            permissionId: 'BBBBBB',
            name: 'BBBBBB',
            column: 'BBBBBB',
            conditions: 'BBBBBB',
            value: 'BBBBBB',
            disabled: true,
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        mockedAxios.get.mockReturnValue(Promise.resolve([returnedFromService]));
        return service.retrieve({ sort: {}, page: 0, size: 10 }).then(res => {
          expect(res).toContainEqual(expected);
        });
      });
      it('should delete a DataPermissionRule', async () => {
        mockedAxios.delete.mockReturnValue(Promise.resolve({ ok: true }));
        return service.delete(123).then(res => {
          expect(res.data.ok).toBeTruthy();
        });
      });
    });
  });
});
