import { RegionCodeLevel } from '@/shared/model/enumerations/region-code-level.model';
export interface IRegionCode {
  id?: number;
  name?: string | null;
  areaCode?: string | null;
  cityCode?: string | null;
  mergerName?: string | null;
  shortName?: string | null;
  zipCode?: string | null;
  level?: RegionCodeLevel | null;
  lng?: number | null;
  lat?: number | null;
  children?: IRegionCode[] | null;
  parent?: IRegionCode | null;
  expand?: boolean;
  nzAddLevel?: number;
}

export class RegionCode implements IRegionCode {
  constructor(
    public id?: number,
    public name?: string | null,
    public areaCode?: string | null,
    public cityCode?: string | null,
    public mergerName?: string | null,
    public shortName?: string | null,
    public zipCode?: string | null,
    public level?: RegionCodeLevel | null,
    public lng?: number | null,
    public lat?: number | null,
    public children?: IRegionCode[] | null,
    public parent?: IRegionCode | null,
    public expand?: boolean,
    public nzAddLevel?: number
  ) {}
}
