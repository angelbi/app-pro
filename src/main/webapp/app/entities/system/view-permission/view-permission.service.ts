import axios from 'axios';
import qs from 'qs';
import buildPaginationQueryOpts from '@/shared/sort/sorts';
import { IViewPermission } from '@/shared/model/system/view-permission.model';
import { AxiosResponse } from 'axios';

const baseApiUrl = 'api/view-permissions';
type EntityResponseType = AxiosResponse<IViewPermission>;
type EntityArrayResponseType = AxiosResponse<IViewPermission[]>;

export default class ViewPermissionService {
  public find(id: number): Promise<IViewPermission> {
    return new Promise<IViewPermission>((resolve, reject) => {
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

  tree(): Promise<AxiosResponse<IViewPermission[]>> {
    return new Promise<AxiosResponse<IViewPermission[]>>((resolve, reject) => {
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

  treeByParentId(parentId: number): Promise<AxiosResponse<IViewPermission[]>> {
    return new Promise<AxiosResponse<IViewPermission[]>>((resolve, reject) => {
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

  public create(entity: IViewPermission): Promise<IViewPermission> {
    return new Promise<IViewPermission>((resolve, reject) => {
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

  public update(entity: IViewPermission): Promise<IViewPermission> {
    return new Promise<IViewPermission>((resolve, reject) => {
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
  public treeByLogin(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios.get(`${baseApiUrl}/current-user`)
           .then(res => { resolve(res); })
           .catch(err => { reject(err);});
    });
  }

  updateBySpecifiedFields(viewPermission: IViewPermission, specifiedFields: String[]): Promise<IViewPermission> {
    return new Promise<IViewPermission>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/specified-fields`, { viewPermission, specifiedFields })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  updateBySpecifiedField(viewPermission: IViewPermission, specifiedField: String, paginationQuery?: any): Promise<IViewPermission> {
    return new Promise<IViewPermission>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/specified-field`, { viewPermission, specifiedField })
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
