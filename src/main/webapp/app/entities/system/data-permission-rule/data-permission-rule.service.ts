import axios from 'axios';
import qs from 'qs';
import buildPaginationQueryOpts from '@/shared/sort/sorts';
import { IDataPermissionRule } from '@/shared/model/system/data-permission-rule.model';
import { AxiosResponse } from 'axios';

const baseApiUrl = 'api/data-permission-rules';
type EntityResponseType = AxiosResponse<IDataPermissionRule>;
type EntityArrayResponseType = AxiosResponse<IDataPermissionRule[]>;

export default class DataPermissionRuleService {
  public find(id: number): Promise<IDataPermissionRule> {
    return new Promise<IDataPermissionRule>((resolve, reject) => {
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

  public create(entity: IDataPermissionRule): Promise<IDataPermissionRule> {
    return new Promise<IDataPermissionRule>((resolve, reject) => {
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

  public update(entity: IDataPermissionRule): Promise<IDataPermissionRule> {
    return new Promise<IDataPermissionRule>((resolve, reject) => {
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

  updateBySpecifiedFields(dataPermissionRule: IDataPermissionRule, specifiedFields: String[]): Promise<IDataPermissionRule> {
    return new Promise<IDataPermissionRule>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/specified-fields`, { dataPermissionRule, specifiedFields })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  updateBySpecifiedField(
    dataPermissionRule: IDataPermissionRule,
    specifiedField: String,
    paginationQuery?: any
  ): Promise<IDataPermissionRule> {
    return new Promise<IDataPermissionRule>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/specified-field`, { dataPermissionRule, specifiedField })
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
