export interface ISysFillRule {
  id?: number;
  name?: string | null;
  code?: string | null;
  implClass?: string | null;
  params?: string | null;
}

export class SysFillRule implements ISysFillRule {
  constructor(
    public id?: number,
    public name?: string | null,
    public code?: string | null,
    public implClass?: string | null,
    public params?: string | null
  ) {}
}
