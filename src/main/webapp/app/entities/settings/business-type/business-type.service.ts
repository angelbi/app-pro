import axios from 'axios';
import qs from 'qs';
import buildPaginationQueryOpts from '@/shared/sort/sorts';
import { IBusinessType } from '@/shared/model/settings/business-type.model';
import { AxiosResponse } from 'axios';

const baseApiUrl = 'api/business-types';
type EntityResponseType = AxiosResponse<IBusinessType>;
type EntityArrayResponseType = AxiosResponse<IBusinessType[]>;

export default class BusinessTypeService {
  public find(id: number): Promise<IBusinessType> {
    return new Promise<IBusinessType>((resolve, reject) => {
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

  public create(entity: IBusinessType): Promise<IBusinessType> {
    return new Promise<IBusinessType>((resolve, reject) => {
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

  public update(entity: IBusinessType): Promise<IBusinessType> {
    return new Promise<IBusinessType>((resolve, reject) => {
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

  updateBySpecifiedFields(businessType: IBusinessType, specifiedFields: String[]): Promise<IBusinessType> {
    return new Promise<IBusinessType>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/specified-fields`, { businessType, specifiedFields })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  updateBySpecifiedField(businessType: IBusinessType, specifiedField: String, paginationQuery?: any): Promise<IBusinessType> {
    return new Promise<IBusinessType>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/specified-field`, { businessType, specifiedField })
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
