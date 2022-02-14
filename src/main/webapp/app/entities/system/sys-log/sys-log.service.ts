import axios from 'axios';
import qs from 'qs';
import buildPaginationQueryOpts from '@/shared/sort/sorts';
import { ISysLog } from '@/shared/model/system/sys-log.model';
import { AxiosResponse } from 'axios';

const baseApiUrl = 'api/sys-logs';
type EntityResponseType = AxiosResponse<ISysLog>;
type EntityArrayResponseType = AxiosResponse<ISysLog[]>;

export default class SysLogService {
  public find(id: number): Promise<ISysLog> {
    return new Promise<ISysLog>((resolve, reject) => {
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

  public create(entity: ISysLog): Promise<ISysLog> {
    return new Promise<ISysLog>((resolve, reject) => {
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

  public update(entity: ISysLog): Promise<ISysLog> {
    return new Promise<ISysLog>((resolve, reject) => {
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

  updateBySpecifiedFields(sysLog: ISysLog, specifiedFields: String[]): Promise<ISysLog> {
    return new Promise<ISysLog>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/specified-fields`, { sysLog, specifiedFields })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  updateBySpecifiedField(sysLog: ISysLog, specifiedField: String, paginationQuery?: any): Promise<ISysLog> {
    return new Promise<ISysLog>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/specified-field`, { sysLog, specifiedField })
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
