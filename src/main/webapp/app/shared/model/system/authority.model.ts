import { IDepartment } from '@/shared/model/settings/department.model';
import { IApiPermission } from '@/shared/model/system/api-permission.model';
import { IViewPermission } from '@/shared/model/system/view-permission.model';

export interface IAuthority {
  id?: number;
  name?: string | null;
  code?: string | null;
  info?: string | null;
  order?: number | null;
  display?: boolean | null;
  children?: IAuthority[] | null;
  parent?: IAuthority | null;
  departments?: IDepartment[] | null;
  apiPermissions?: IApiPermission[] | null;
  viewPermissions?: IViewPermission[] | null;
  expand?: boolean;
  nzAddLevel?: number;
}

export class Authority implements IAuthority {
  constructor(
    public id?: number,
    public name?: string | null,
    public code?: string | null,
    public info?: string | null,
    public order?: number | null,
    public display?: boolean | null,
    public children?: IAuthority[] | null,
    public parent?: IAuthority | null,
    public departments?: IDepartment[] | null,
    public apiPermissions?: IApiPermission[] | null,
    public viewPermissions?: IViewPermission[] | null,
    public expand?: boolean,
    public nzAddLevel?: number
  ) {
    this.display = this.display ?? false;
  }
}
