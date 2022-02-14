import axios from 'axios';
import qs from 'qs';
import buildPaginationQueryOpts from '@/shared/sort/sorts';
import { ISmsConfig } from '@/shared/model/files/sms-config.model';
import { AxiosResponse } from 'axios';

const baseApiUrl = 'api/sms-configs';
type EntityResponseType = AxiosResponse<ISmsConfig>;
type EntityArrayResponseType = AxiosResponse<ISmsConfig[]>;

export default class SmsConfigService {
  public find(id: number): Promise<ISmsConfig> {
    return new Promise<ISmsConfig>((resolve, reject) => {
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

  public create(entity: ISmsConfig): Promise<ISmsConfig> {
    return new Promise<ISmsConfig>((resolve, reject) => {
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

  public update(entity: ISmsConfig): Promise<ISmsConfig> {
    return new Promise<ISmsConfig>((resolve, reject) => {
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

  updateBySpecifiedFields(smsConfig: ISmsConfig, specifiedFields: String[]): Promise<ISmsConfig> {
    return new Promise<ISmsConfig>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/specified-fields`, { smsConfig, specifiedFields })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  updateBySpecifiedField(smsConfig: ISmsConfig, specifiedField: String, paginationQuery?: any): Promise<ISmsConfig> {
    return new Promise<ISmsConfig>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/specified-field`, { smsConfig, specifiedField })
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
