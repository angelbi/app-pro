import axios from 'axios';
import qs from 'qs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { map } from 'rxjs/operators';
import buildPaginationQueryOpts from '@/shared/sort/sorts';
import { IDepartmentAuthority } from '@/shared/model/settings/department-authority.model';
import { AxiosResponse } from 'axios';

const baseApiUrl = 'api/department-authorities';
type EntityResponseType = AxiosResponse<IDepartmentAuthority>;
type EntityArrayResponseType = AxiosResponse<IDepartmentAuthority[]>;

export default class DepartmentAuthorityService {
  public find(id: number): Promise<IDepartmentAuthority> {
    return new Promise<IDepartmentAuthority>((resolve, reject) => {
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

  public create(entity: IDepartmentAuthority): Promise<IDepartmentAuthority> {
    return new Promise<IDepartmentAuthority>((resolve, reject) => {
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

  public update(entity: IDepartmentAuthority): Promise<IDepartmentAuthority> {
    return new Promise<IDepartmentAuthority>((resolve, reject) => {
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

  updateBySpecifiedFields(departmentAuthority: IDepartmentAuthority, specifiedFields: String[]): Promise<IDepartmentAuthority> {
    return new Promise<IDepartmentAuthority>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/specified-fields`, { departmentAuthority, specifiedFields })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  updateBySpecifiedField(
    departmentAuthority: IDepartmentAuthority,
    specifiedField: String,
    paginationQuery?: any
  ): Promise<IDepartmentAuthority> {
    return new Promise<IDepartmentAuthority>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/specified-field`, { departmentAuthority, specifiedField })
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
