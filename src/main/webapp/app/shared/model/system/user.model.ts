import { IDepartment } from '@/shared/model/settings/department.model';
import { IPosition } from '@/shared/model/settings/position.model';
import { Moment } from 'moment';

export interface IUser {
  id?: number;
  login?: string | null;
  password?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  mobile?: string | null;
  birthday?: Moment | null;
  activated?: boolean | null;
  langKey?: string | null;
  imageUrl?: string | null;
  activationKey?: string | null;
  resetKey?: string | null;
  resetDate?: Moment | null;
  department?: IDepartment | null;
  position?: IPosition | null;
}

export class User implements IUser {
  constructor(
    public id?: number,
    public login?: string | null,
    public password?: string | null,
    public firstName?: string | null,
    public lastName?: string | null,
    public email?: string | null,
    public mobile?: string | null,
    public birthday?: Moment | null,
    public activated?: boolean | null,
    public langKey?: string | null,
    public imageUrl?: string | null,
    public activationKey?: string | null,
    public resetKey?: string | null,
    public resetDate?: Moment | null,
    public department?: IDepartment | null,
    public position?: IPosition | null
  ) {
    this.activated = this.activated ?? false;
  }
}
