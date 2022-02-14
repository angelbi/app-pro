import axios from 'axios';
import qs from 'qs';
import buildPaginationQueryOpts from '@/shared/sort/sorts';
import { IDataDictionary } from '@/shared/model/settings/data-dictionary.model';
import { AxiosResponse } from 'axios';

const baseApiUrl = 'api/data-dictionaries';
type EntityResponseType = AxiosResponse<IDataDictionary>;
type EntityArrayResponseType = AxiosResponse<IDataDictionary[]>;

export default class DataDictionaryService {
  public find(id: number): Promise<IDataDictionary> {
    return new Promise<IDataDictionary>((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/${id}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public retrieve(paginationQuery?: any): Promise<any> {
    const options = buildPaginationQueryOpts(paginationQuery);
    return new Promise<any>((resolve, reject) => {
      axios
        .get(baseApiUrl + `?${qs.stringify(options, { arrayFormat: 'repeat' })}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public delete(id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .delete(`${baseApiUrl}/${id}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public deleteByIds(ids: number[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .delete(`${baseApiUrl}` + `?${qs.stringify({ ids }, { arrayFormat: 'repeat' })}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  tree(): Promise<AxiosResponse<IDataDictionary[]>> {
    return new Promise<AxiosResponse<IDataDictionary[]>>((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/tree`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  treeByParentId(parentId: number): Promise<AxiosResponse<IDataDictionary[]>> {
    return new Promise<AxiosResponse<IDataDictionary[]>>((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/${parentId}/tree`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public create(entity: IDataDictionary): Promise<IDataDictionary> {
    return new Promise<IDataDictionary>((resolve, reject) => {
      axios
        .post(`${baseApiUrl}`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public update(entity: IDataDictionary): Promise<IDataDictionary> {
    return new Promise<IDataDictionary>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/${entity.id}`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  updateBySpecifiedFields(dataDictionary: IDataDictionary, specifiedFields: String[]): Promise<IDataDictionary> {
    return new Promise<IDataDictionary>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/specified-fields`, { dataDictionary, specifiedFields })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  updateBySpecifiedField(dataDictionary: IDataDictionary, specifiedField: String, paginationQuery?: any): Promise<IDataDictionary> {
    return new Promise<IDataDictionary>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/specified-field`, { dataDictionary, specifiedField })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  // jhipster-needle-service-add-method - JHipster will add getters and setters here, do not remove
}
