export interface IDataPermissionRule {
  id?: number;
  permissionId?: string | null;
  name?: string | null;
  column?: string | null;
  conditions?: string | null;
  value?: string | null;
  disabled?: boolean | null;
}

export class DataPermissionRule implements IDataPermissionRule {
  constructor(
    public id?: number,
    public permissionId?: string | null,
    public name?: string | null,
    public column?: string | null,
    public conditions?: string | null,
    public value?: string | null,
    public disabled?: boolean | null
  ) {
    this.disabled = this.disabled ?? false;
  }
}
