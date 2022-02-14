import axios from 'axios';
import qs from 'qs';
import buildPaginationQueryOpts from '@/shared/sort/sorts';
import { ISiteConfig } from '@/shared/model/system/site-config.model';
import { AxiosResponse } from 'axios';

const baseApiUrl = 'api/site-configs';
type EntityResponseType = AxiosResponse<ISiteConfig>;
type EntityArrayResponseType = AxiosResponse<ISiteConfig[]>;

export default class SiteConfigService {
  public find(id: number): Promise<ISiteConfig> {
    return new Promise<ISiteConfig>((resolve, reject) => {
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

  public create(entity: ISiteConfig): Promise<ISiteConfig> {
    return new Promise<ISiteConfig>((resolve, reject) => {
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

  public update(entity: ISiteConfig): Promise<ISiteConfig> {
    return new Promise<ISiteConfig>((resolve, reject) => {
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

  updateBySpecifiedFields(siteConfig: ISiteConfig, specifiedFields: String[]): Promise<ISiteConfig> {
    return new Promise<ISiteConfig>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/specified-fields`, { siteConfig, specifiedFields })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  updateBySpecifiedField(siteConfig: ISiteConfig, specifiedField: String, paginationQuery?: any): Promise<ISiteConfig> {
    return new Promise<ISiteConfig>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/specified-field`, { siteConfig, specifiedField })
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
