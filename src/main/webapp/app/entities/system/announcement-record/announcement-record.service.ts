import axios from 'axios';
import qs from 'qs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { map } from 'rxjs/operators';
import buildPaginationQueryOpts from '@/shared/sort/sorts';
import { IAnnouncementRecord } from '@/shared/model/system/announcement-record.model';
import { AxiosResponse } from 'axios';

const baseApiUrl = 'api/announcement-records';
type EntityResponseType = AxiosResponse<IAnnouncementRecord>;
type EntityArrayResponseType = AxiosResponse<IAnnouncementRecord[]>;

export default class AnnouncementRecordService {
  public find(id: number): Promise<IAnnouncementRecord> {
    return new Promise<IAnnouncementRecord>((resolve, reject) => {
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

  public create(entity: IAnnouncementRecord): Promise<IAnnouncementRecord> {
    return new Promise<IAnnouncementRecord>((resolve, reject) => {
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

  public update(entity: IAnnouncementRecord): Promise<IAnnouncementRecord> {
    return new Promise<IAnnouncementRecord>((resolve, reject) => {
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

  updateBySpecifiedFields(announcementRecord: IAnnouncementRecord, specifiedFields: String[]): Promise<IAnnouncementRecord> {
    return new Promise<IAnnouncementRecord>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/specified-fields`, { announcementRecord, specifiedFields })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  updateBySpecifiedField(
    announcementRecord: IAnnouncementRecord,
    specifiedField: String,
    paginationQuery?: any
  ): Promise<IAnnouncementRecord> {
    return new Promise<IAnnouncementRecord>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/specified-field`, { announcementRecord, specifiedField })
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
