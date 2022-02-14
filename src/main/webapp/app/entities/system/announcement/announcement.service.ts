import axios from 'axios';
import qs from 'qs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { map } from 'rxjs/operators';
import buildPaginationQueryOpts from '@/shared/sort/sorts';
import { IAnnouncement } from '@/shared/model/system/announcement.model';
import { AxiosResponse } from 'axios';
import { AnnoCategory } from '@/shared/model/enumerations/anno-category.model';

const baseApiUrl = 'api/announcements';
type EntityResponseType = AxiosResponse<IAnnouncement>;
type EntityArrayResponseType = AxiosResponse<IAnnouncement[]>;

export default class AnnouncementService {
  public find(id: number): Promise<IAnnouncement> {
    return new Promise<IAnnouncement>((resolve, reject) => {
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

  public create(entity: IAnnouncement): Promise<IAnnouncement> {
    return new Promise<IAnnouncement>((resolve, reject) => {
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

  public update(entity: IAnnouncement): Promise<IAnnouncement> {
    return new Promise<IAnnouncement>((resolve, reject) => {
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

  public retrieveUnread(category: AnnoCategory): Promise<any> {
    const paginationQuery = {
      page: 0,
      size: 5,
    };
    const options = buildPaginationQueryOpts(paginationQuery);
    return new Promise<any>((resolve, reject) => {
      axios
        .get(baseApiUrl + '/current-user/unread/' + category + `?${qs.stringify(options, { arrayFormat: 'repeat' })}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public release(id: number): Promise<IAnnouncement> {
    return new Promise<IAnnouncement>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/${id}/release`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public read(id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/${id}/read`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  updateBySpecifiedFields(announcement: IAnnouncement, specifiedFields: String[]): Promise<IAnnouncement> {
    return new Promise<IAnnouncement>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/specified-fields`, { announcement, specifiedFields })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  updateBySpecifiedField(announcement: IAnnouncement, specifiedField: String, paginationQuery?: any): Promise<IAnnouncement> {
    return new Promise<IAnnouncement>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/specified-field`, { announcement, specifiedField })
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
