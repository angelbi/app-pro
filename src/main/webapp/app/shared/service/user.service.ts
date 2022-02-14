import axios from 'axios';
import qs from 'qs';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import buildPaginationQueryOpts from '@/shared/sort/sorts';
import { IUser } from '@/shared/model/user.model';

const baseApiUrl = 'api/admin/users';

export default class UserService {
  public get(userId: number): Promise<any> {
    return axios.get(`${baseApiUrl}/${userId}`);
  }

  public create(user): Promise<any> {
    return axios.post(`${baseApiUrl}`, user);
  }

  public update(user): Promise<any> {
    return axios.put(`${baseApiUrl}/${user.id}`, user);
  }

  public remove(userId: number): Promise<any> {
    return axios.delete(`${baseApiUrl}/${userId}`);
  }

  public deleteByIds(ids: string[]): Promise<any> {
    return axios.delete(`${baseApiUrl}`, {
      params: { ids },
      paramsSerializer: function (params) {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      },
    });
  }

  public retrieve(req?: any): Promise<any> {
    const options = buildPaginationQueryOpts(req);
    return axios.get(baseApiUrl, {
      params: options,
      paramsSerializer: function (params) {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      },
    });
  }

  public retrieveAuthorities(): Promise<any> {
    return axios.get('api/users/authorities');
  }
}
