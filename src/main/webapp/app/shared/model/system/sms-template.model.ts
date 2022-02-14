import { MessageSendType } from '@/shared/model/enumerations/message-send-type.model';
export interface ISmsTemplate {
  id?: number;
  name?: string | null;
  code?: string | null;
  type?: MessageSendType | null;
  content?: string | null;
  testJson?: string | null;
}

export class SmsTemplate implements ISmsTemplate {
  constructor(
    public id?: number,
    public name?: string | null,
    public code?: string | null,
    public type?: MessageSendType | null,
    public content?: string | null,
    public testJson?: string | null
  ) {}
}
