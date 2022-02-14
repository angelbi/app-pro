import axios from 'axios';
import qs from 'qs';
import buildPaginationQueryOpts from '@/shared/sort/sorts';
import { ISmsTemplate } from '@/shared/model/system/sms-template.model';
import { AxiosResponse } from 'axios';

const baseApiUrl = 'api/sms-templates';
type EntityResponseType = AxiosResponse<ISmsTemplate>;
type EntityArrayResponseType = AxiosResponse<ISmsTemplate[]>;

export default class SmsTemplateService {
  public find(id: number): Promise<ISmsTemplate> {
    return new Promise<ISmsTemplate>((resolve, reject) => {
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

  public create(entity: ISmsTemplate): Promise<ISmsTemplate> {
    return new Promise<ISmsTemplate>((resolve, reject) => {
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

  public update(entity: ISmsTemplate): Promise<ISmsTemplate> {
    return new Promise<ISmsTemplate>((resolve, reject) => {
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

  updateBySpecifiedFields(smsTemplate: ISmsTemplate, specifiedFields: String[]): Promise<ISmsTemplate> {
    return new Promise<ISmsTemplate>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/specified-fields`, { smsTemplate, specifiedFields })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  updateBySpecifiedField(smsTemplate: ISmsTemplate, specifiedField: String, paginationQuery?: any): Promise<ISmsTemplate> {
    return new Promise<ISmsTemplate>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/specified-field`, { smsTemplate, specifiedField })
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
