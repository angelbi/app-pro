import { IDepartmentAuthority } from '@/shared/model/settings/department-authority.model';
import { IAuthority } from '@/shared/model/system/authority.model';

import { ApiPermissionType } from '@/shared/model/enumerations/api-permission-type.model';
import { ApiPermissionState } from '@/shared/model/enumerations/api-permission-state.model';
export interface IApiPermission {
  id?: number;
  serviceName?: string | null;
  name?: string | null;
  code?: string | null;
  description?: string | null;
  type?: ApiPermissionType | null;
  method?: string | null;
  url?: string | null;
  status?: ApiPermissionState | null;
  children?: IApiPermission[] | null;
  departmentAuthority?: IDepartmentAuthority | null;
  parent?: IApiPermission | null;
  authorities?: IAuthority[] | null;
  expand?: boolean;
  nzAddLevel?: number;
}

export class ApiPermission implements IApiPermission {
  constructor(
    public id?: number,
    public serviceName?: string | null,
    public name?: string | null,
    public code?: string | null,
    public description?: string | null,
    public type?: ApiPermissionType | null,
    public method?: string | null,
    public url?: string | null,
    public status?: ApiPermissionState | null,
    public children?: IApiPermission[] | null,
    public departmentAuthority?: IDepartmentAuthority | null,
    public parent?: IApiPermission | null,
    public authorities?: IAuthority[] | null,
    public expand?: boolean,
    public nzAddLevel?: number
  ) {}
}
