import { IUser } from '@/shared/model/user.model';
import { IApiPermission } from '@/shared/model/system/api-permission.model';
import { IViewPermission } from '@/shared/model/system/view-permission.model';
import { IDepartment } from '@/shared/model/settings/department.model';
import { Moment } from 'moment';

export interface IDepartmentAuthority {
  id?: number;
  name?: string | null;
  code?: string | null;
  description?: string | null;
  createUserId?: number | null;
  createTime?: Moment | null;
  users?: IUser[] | null;
  apiPermissions?: IApiPermission[] | null;
  viewPermissions?: IViewPermission[] | null;
  department?: IDepartment | null;
}

export class DepartmentAuthority implements IDepartmentAuthority {
  constructor(
    public id?: number,
    public name?: string | null,
    public code?: string | null,
    public description?: string | null,
    public createUserId?: number | null,
    public createTime?: Moment | null,
    public users?: IUser[] | null,
    public apiPermissions?: IApiPermission[] | null,
    public viewPermissions?: IViewPermission[] | null,
    public department?: IDepartment | null
  ) {}
}
