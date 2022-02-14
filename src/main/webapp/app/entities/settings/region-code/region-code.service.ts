import axios from 'axios';
import qs from 'qs';
import buildPaginationQueryOpts from '@/shared/sort/sorts';
import { IRegionCode } from '@/shared/model/settings/region-code.model';
import { AxiosResponse } from 'axios';

const baseApiUrl = 'api/region-codes';
type EntityResponseType = AxiosResponse<IRegionCode>;
type EntityArrayResponseType = AxiosResponse<IRegionCode[]>;

export default class RegionCodeService {
  public find(id: number): Promise<IRegionCode> {
    return new Promise<IRegionCode>((resolve, reject) => {
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

  tree(): Promise<AxiosResponse<IRegionCode[]>> {
    return new Promise<AxiosResponse<IRegionCode[]>>((resolve, reject) => {
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

  treeByParentId(parentId: number): Promise<AxiosResponse<IRegionCode[]>> {
    return new Promise<AxiosResponse<IRegionCode[]>>((resolve, reject) => {
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

  public create(entity: IRegionCode): Promise<IRegionCode> {
    return new Promise<IRegionCode>((resolve, reject) => {
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

  public update(entity: IRegionCode): Promise<IRegionCode> {
    return new Promise<IRegionCode>((resolve, reject) => {
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

  updateBySpecifiedFields(regionCode: IRegionCode, specifiedFields: String[]): Promise<IRegionCode> {
    return new Promise<IRegionCode>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/specified-fields`, { regionCode, specifiedFields })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  updateBySpecifiedField(regionCode: IRegionCode, specifiedField: String, paginationQuery?: any): Promise<IRegionCode> {
    return new Promise<IRegionCode>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/specified-field`, { regionCode, specifiedField })
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
