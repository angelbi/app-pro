import axios from 'axios';
import qs from 'qs';
import buildPaginationQueryOpts from '@/shared/sort/sorts';
import { ISysFillRule } from '@/shared/model/settings/sys-fill-rule.model';
import { AxiosResponse } from 'axios';

const baseApiUrl = 'api/sys-fill-rules';
type EntityResponseType = AxiosResponse<ISysFillRule>;
type EntityArrayResponseType = AxiosResponse<ISysFillRule[]>;

export default class SysFillRuleService {
  public find(id: number): Promise<ISysFillRule> {
    return new Promise<ISysFillRule>((resolve, reject) => {
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

  public create(entity: ISysFillRule): Promise<ISysFillRule> {
    return new Promise<ISysFillRule>((resolve, reject) => {
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

  public update(entity: ISysFillRule): Promise<ISysFillRule> {
    return new Promise<ISysFillRule>((resolve, reject) => {
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

  updateBySpecifiedFields(sysFillRule: ISysFillRule, specifiedFields: String[]): Promise<ISysFillRule> {
    return new Promise<ISysFillRule>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/specified-fields`, { sysFillRule, specifiedFields })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  updateBySpecifiedField(sysFillRule: ISysFillRule, specifiedField: String, paginationQuery?: any): Promise<ISysFillRule> {
    return new Promise<ISysFillRule>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/specified-field`, { sysFillRule, specifiedField })
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
