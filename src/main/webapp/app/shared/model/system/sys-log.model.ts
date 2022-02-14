import { LogType } from '@/shared/model/enumerations/log-type.model';
export interface ISysLog {
  id?: number;
  logType?: LogType | null;
  logContent?: string | null;
  operateType?: number | null;
  userid?: string | null;
  username?: string | null;
  ip?: string | null;
  method?: string | null;
  requestUrl?: string | null;
  requestParam?: string | null;
  requestType?: string | null;
  costTime?: number | null;
}

export class SysLog implements ISysLog {
  constructor(
    public id?: number,
    public logType?: LogType | null,
    public logContent?: string | null,
    public operateType?: number | null,
    public userid?: string | null,
    public username?: string | null,
    public ip?: string | null,
    public method?: string | null,
    public requestUrl?: string | null,
    public requestParam?: string | null,
    public requestType?: string | null,
    public costTime?: number | null
  ) {}
}
