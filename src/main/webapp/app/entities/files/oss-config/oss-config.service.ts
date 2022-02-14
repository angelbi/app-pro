import axios from 'axios';
import qs from 'qs';
import buildPaginationQueryOpts from '@/shared/sort/sorts';
import { IOssConfig } from '@/shared/model/files/oss-config.model';
import { AxiosResponse } from 'axios';

const baseApiUrl = 'api/oss-configs';
type EntityResponseType = AxiosResponse<IOssConfig>;
type EntityArrayResponseType = AxiosResponse<IOssConfig[]>;

export default class OssConfigService {
  public find(id: number): Promise<IOssConfig> {
    return new Promise<IOssConfig>((resolve, reject) => {
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

  public create(entity: IOssConfig): Promise<IOssConfig> {
    return new Promise<IOssConfig>((resolve, reject) => {
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

  public update(entity: IOssConfig): Promise<IOssConfig> {
    return new Promise<IOssConfig>((resolve, reject) => {
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

  updateBySpecifiedFields(ossConfig: IOssConfig, specifiedFields: String[]): Promise<IOssConfig> {
    return new Promise<IOssConfig>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/specified-fields`, { ossConfig, specifiedFields })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  updateBySpecifiedField(ossConfig: IOssConfig, specifiedField: String, paginationQuery?: any): Promise<IOssConfig> {
    return new Promise<IOssConfig>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/specified-field`, { ossConfig, specifiedField })
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
