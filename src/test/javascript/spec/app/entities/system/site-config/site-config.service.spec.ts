/* tslint:disable max-line-length */
import axios from 'axios';

import * as config from '@/shared/config/config';
import {} from '@/shared/date/filters';
import SiteConfigService from '@/entities/system/site-config/site-config.service';
import { SiteConfig } from '@/shared/model/system/site-config.model';
import { CommonFieldType } from '@/shared/model/enumerations/common-field-type.model';

const mockedAxios: any = axios;
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

describe('Service Tests', () => {
  describe('SiteConfig Service', () => {
    let service: SiteConfigService;
    let elemDefault;
    beforeEach(() => {
      service = new SiteConfigService();

      elemDefault = new SiteConfig(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', CommonFieldType.INTEGER);
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign({}, elemDefault);
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        return service.find(123).then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });
      it('should create a SiteConfig', async () => {
        const returnedFromService = Object.assign({}, elemDefault);
        const expected = Object.assign({}, returnedFromService);

        mockedAxios.post.mockReturnValue(Promise.resolve({ data: returnedFromService }));
        return service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should update a SiteConfig', async () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            title: 'BBBBBB',
            remark: 'BBBBBB',
            fieldName: 'BBBBBB',
            fieldValue: 'BBBBBB',
            fieldType: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        mockedAxios.put.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        return service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });
      it('should return a list of SiteConfig', async () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            title: 'BBBBBB',
            remark: 'BBBBBB',
            fieldName: 'BBBBBB',
            fieldValue: 'BBBBBB',
            fieldType: 'BBBBBB',
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        mockedAxios.get.mockReturnValue(Promise.resolve([returnedFromService]));
        return service.retrieve({ sort: {}, page: 0, size: 10 }).then(res => {
          expect(res).toContainEqual(expected);
        });
      });
      it('should delete a SiteConfig', async () => {
        mockedAxios.delete.mockReturnValue(Promise.resolve({ ok: true }));
        return service.delete(123).then(res => {
          expect(res.data.ok).toBeTruthy();
        });
      });
    });
  });
});
