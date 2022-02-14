/* tslint:disable max-line-length */
import axios from 'axios';

import * as config from '@/shared/config/config';
import {} from '@/shared/date/filters';
import DataDictionaryService from '@/entities/settings/data-dictionary/data-dictionary.service';
import { DataDictionary } from '@/shared/model/settings/data-dictionary.model';
import { DictType } from '@/shared/model/enumerations/dict-type.model';

const mockedAxios: any = axios;
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

describe('Service Tests', () => {
  describe('DataDictionary Service', () => {
    let service: DataDictionaryService;
    let elemDefault;
    beforeEach(() => {
      service = new DataDictionaryService();

      elemDefault = new DataDictionary(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0,
        false,
        'AAAAAAA',
        DictType.NUMBER,
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign({}, elemDefault);
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        return service.find(123).then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });
      it('should create a DataDictionary', async () => {
        const returnedFromService = Object.assign({}, elemDefault);
        const expected = Object.assign({}, returnedFromService);

        mockedAxios.post.mockReturnValue(Promise.resolve({ data: returnedFromService }));
        return service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should update a DataDictionary', async () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            name: 'BBBBBB',
            code: 'BBBBBB',
            title: 'BBBBBB',
            value: 'BBBBBB',
            description: 'BBBBBB',
            sortOrder: 1,
            disabled: true,
            fontColor: 'BBBBBB',
            valueType: 'BBBBBB',
            backgroundColor: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        mockedAxios.put.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        return service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });
      it('should return a list of DataDictionary', async () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            name: 'BBBBBB',
            code: 'BBBBBB',
            title: 'BBBBBB',
            value: 'BBBBBB',
            description: 'BBBBBB',
            sortOrder: 1,
            disabled: true,
            fontColor: 'BBBBBB',
            valueType: 'BBBBBB',
            backgroundColor: 'BBBBBB',
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        mockedAxios.get.mockReturnValue(Promise.resolve([returnedFromService]));
        return service.retrieve({ sort: {}, page: 0, size: 10 }).then(res => {
          expect(res).toContainEqual(expected);
        });
      });
      it('should delete a DataDictionary', async () => {
        mockedAxios.delete.mockReturnValue(Promise.resolve({ ok: true }));
        return service.delete(123).then(res => {
          expect(res.data.ok).toBeTruthy();
        });
      });
    });
  });
});
