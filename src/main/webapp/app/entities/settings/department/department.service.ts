import axios from 'axios';
import qs from 'qs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { map } from 'rxjs/operators';
import buildPaginationQueryOpts from '@/shared/sort/sorts';
import { IDepartment } from '@/shared/model/settings/department.model';
import { AxiosResponse } from 'axios';

const baseApiUrl = 'api/departments';
type EntityResponseType = AxiosResponse<IDepartment>;
type EntityArrayResponseType = AxiosResponse<IDepartment[]>;

export default class DepartmentService {
  public find(id: number): Promise<IDepartment> {
    return new Promise<IDepartment>((resolve, reject) => {
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

  tree(): Promise<AxiosResponse<IDepartment[]>> {
    return new Promise<AxiosResponse<IDepartment[]>>((resolve, reject) => {
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

  treeByParentId(parentId: number): Promise<AxiosResponse<IDepartment[]>> {
    return new Promise<AxiosResponse<IDepartment[]>>((resolve, reject) => {
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

  public create(entity: IDepartment): Promise<IDepartment> {
    return new Promise<IDepartment>((resolve, reject) => {
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

  public update(entity: IDepartment): Promise<IDepartment> {
    return new Promise<IDepartment>((resolve, reject) => {
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

  updateBySpecifiedFields(department: IDepartment, specifiedFields: String[]): Promise<IDepartment> {
    return new Promise<IDepartment>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/specified-fields`, { department, specifiedFields })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  updateBySpecifiedField(department: IDepartment, specifiedField: String, paginationQuery?: any): Promise<IDepartment> {
    return new Promise<IDepartment>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/specified-field`, { department, specifiedField })
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
