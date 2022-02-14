import { Moment } from 'moment';

import { MessageSendType } from '@/shared/model/enumerations/message-send-type.model';
import { SendStatus } from '@/shared/model/enumerations/send-status.model';
export interface ISmsMessage {
  id?: number;
  title?: string | null;
  sendType?: MessageSendType | null;
  receiver?: string | null;
  params?: string | null;
  content?: string | null;
  sendTime?: Moment | null;
  sendStatus?: SendStatus | null;
  retryNum?: number | null;
  failResult?: string | null;
  remark?: string | null;
}

export class SmsMessage implements ISmsMessage {
  constructor(
    public id?: number,
    public title?: string | null,
    public sendType?: MessageSendType | null,
    public receiver?: string | null,
    public params?: string | null,
    public content?: string | null,
    public sendTime?: Moment | null,
    public sendStatus?: SendStatus | null,
    public retryNum?: number | null,
    public failResult?: string | null,
    public remark?: string | null
  ) {}
}
