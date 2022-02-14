import axios from 'axios';
import qs from 'qs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { map } from 'rxjs/operators';
import buildPaginationQueryOpts from '@/shared/sort/sorts';
import { IUploadImage } from '@/shared/model/files/upload-image.model';
import { AxiosResponse } from 'axios';

const baseApiUrl = 'api/upload-images';
type EntityResponseType = AxiosResponse<IUploadImage>;
type EntityArrayResponseType = AxiosResponse<IUploadImage[]>;

export default class UploadImageService {
  public find(id: number): Promise<IUploadImage> {
    return new Promise<IUploadImage>((resolve, reject) => {
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

  public create(entity: IUploadImage): Promise<IUploadImage> {
    return new Promise<IUploadImage>((resolve, reject) => {
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

  public update(entity: IUploadImage): Promise<IUploadImage> {
    return new Promise<IUploadImage>((resolve, reject) => {
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

  updateBySpecifiedFields(uploadImage: IUploadImage, specifiedFields: String[]): Promise<IUploadImage> {
    return new Promise<IUploadImage>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/specified-fields`, { uploadImage, specifiedFields })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  updateBySpecifiedField(uploadImage: IUploadImage, specifiedField: String, paginationQuery?: any): Promise<IUploadImage> {
    return new Promise<IUploadImage>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/specified-field`, { uploadImage, specifiedField })
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
