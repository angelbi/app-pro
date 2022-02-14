import { Moment } from 'moment';

import { PriorityLevel } from '@/shared/model/enumerations/priority-level.model';
import { AnnoCategory } from '@/shared/model/enumerations/anno-category.model';
import { ReceiverType } from '@/shared/model/enumerations/receiver-type.model';
import { AnnoSendStatus } from '@/shared/model/enumerations/anno-send-status.model';
import { AnnoBusinessType } from '@/shared/model/enumerations/anno-business-type.model';
import { AnnoOpenType } from '@/shared/model/enumerations/anno-open-type.model';
export interface IAnnouncement {
  id?: number;
  titile?: string | null;
  content?: string | null;
  startTime?: Moment | null;
  endTime?: Moment | null;
  senderId?: number | null;
  priority?: PriorityLevel | null;
  category?: AnnoCategory | null;
  receiverType?: ReceiverType | null;
  sendStatus?: AnnoSendStatus | null;
  sendTime?: Moment | null;
  cancelTime?: Moment | null;
  businessType?: AnnoBusinessType | null;
  businessId?: number | null;
  openType?: AnnoOpenType | null;
  openPage?: string | null;
  receiverIds?: any | null;
  summary?: string | null;
}

export class Announcement implements IAnnouncement {
  constructor(
    public id?: number,
    public titile?: string | null,
    public content?: string | null,
    public startTime?: Moment | null,
    public endTime?: Moment | null,
    public senderId?: number | null,
    public priority?: PriorityLevel | null,
    public category?: AnnoCategory | null,
    public receiverType?: ReceiverType | null,
    public sendStatus?: AnnoSendStatus | null,
    public sendTime?: Moment | null,
    public cancelTime?: Moment | null,
    public businessType?: AnnoBusinessType | null,
    public businessId?: number | null,
    public openType?: AnnoOpenType | null,
    public openPage?: string | null,
    public receiverIds?: any | null,
    public summary?: string | null
  ) {}
}
