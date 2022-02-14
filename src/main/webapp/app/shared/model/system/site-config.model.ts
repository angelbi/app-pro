import { CommonFieldType } from '@/shared/model/enumerations/common-field-type.model';
export interface ISiteConfig {
  id?: number;
  title?: string | null;
  remark?: string | null;
  fieldName?: string | null;
  fieldValue?: string | null;
  fieldType?: CommonFieldType | null;
}

export class SiteConfig implements ISiteConfig {
  constructor(
    public id?: number,
    public title?: string | null,
    public remark?: string | null,
    public fieldName?: string | null,
    public fieldValue?: string | null,
    public fieldType?: CommonFieldType | null
  ) {}
}
