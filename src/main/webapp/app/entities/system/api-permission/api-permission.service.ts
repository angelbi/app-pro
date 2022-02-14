import axios from 'axios';
import qs from 'qs';
import buildPaginationQueryOpts from '@/shared/sort/sorts';
import { IApiPermission } from '@/shared/model/system/api-permission.model';
import { AxiosResponse } from 'axios';

const baseApiUrl = 'api/api-permissions';
type EntityResponseType = AxiosResponse<IApiPermission>;
type EntityArrayResponseType = AxiosResponse<IApiPermission[]>;

export default class ApiPermissionService {
  public find(id: number): Promise<IApiPermission> {
    return new Promise<IApiPermission>((resolve, reject) => {
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

  tree(): Promise<AxiosResponse<IApiPermission[]>> {
    return new Promise<AxiosResponse<IApiPermission[]>>((resolve, reject) => {
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

  treeByParentId(parentId: number): Promise<AxiosResponse<IApiPermission[]>> {
    return new Promise<AxiosResponse<IApiPermission[]>>((resolve, reject) => {
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

  public create(entity: IApiPermission): Promise<IApiPermission> {
    return new Promise<IApiPermission>((resolve, reject) => {
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

  public update(entity: IApiPermission): Promise<IApiPermission> {
    return new Promise<IApiPermission>((resolve, reject) => {
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

  // prettier-ignore
  public generate(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios.get(`${baseApiUrl}/generate`)
           .then(res => { resolve(res); })
           .catch(err => { reject(err);});
    });
  }

  updateBySpecifiedFields(apiPermission: IApiPermission, specifiedFields: String[]): Promise<IApiPermission> {
    return new Promise<IApiPermission>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/specified-fields`, { apiPermission, specifiedFields })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  updateBySpecifiedField(apiPermission: IApiPermission, specifiedField: String, paginationQuery?: any): Promise<IApiPermission> {
    return new Promise<IApiPermission>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/specified-field`, { apiPermission, specifiedField })
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
