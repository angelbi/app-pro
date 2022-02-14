import { Moment } from 'moment';

export interface IAnnouncementRecord {
  id?: number;
  anntId?: number | null;
  userId?: number | null;
  hasRead?: boolean | null;
  readTime?: Moment | null;
}

export class AnnouncementRecord implements IAnnouncementRecord {
  constructor(
    public id?: number,
    public anntId?: number | null,
    public userId?: number | null,
    public hasRead?: boolean | null,
    public readTime?: Moment | null
  ) {
    this.hasRead = this.hasRead ?? false;
  }
}
