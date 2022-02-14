import { Component, Inject, Prop, Vue, Ref } from 'vue-property-decorator';
import { IViewPermission, ViewPermission } from '@/shared/model/system/view-permission.model';
import ViewPermissionService from './view-permission.service';
import { IAuthority } from '@/shared/model/system/authority.model';
import AuthorityService from '@/entities/system/authority/authority.service';
import { AxiosResponse } from 'axios';
import { getFilter, getSearchQueryData, removeBlankChildren } from '@/utils/entity-utils';

@Component
export default class ViewPermissionComponent extends Vue {
  @Inject('viewPermissionService') private viewPermissionService: () => ViewPermissionService;
  @Inject('authorityService') private authorityService!: () => AuthorityService;
  @Ref('searchInput') public searchInput: any;
  @Ref('xGrid') public xGrid: any;
  public searchFormConfig = {
    fieldList: [],
    toggleSearchStatus: false,
    matchType: 'and',
  };
  public xGridData: any[] = [];
  public xGridColumns: any[] = [];
  public xGridTableToolbars = {
    perfect: true,
    custom: true,
    slots: {
      buttons: 'toolbar_buttons',
    },
  };
  public xGridTreeConfig: boolean | Object = false;
  public xGridSelectRecords: any[] = [];
  private loading: boolean = false;
  public relationshipsData: any = {};
  public xGridPagerConfig = {
    layouts: ['Sizes', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump', 'Total'],
    pageSize: 15,
    pageSizes: [5, 10, 15, 20, 30, 50],
    total: 0,
    pagerCount: 5,
    currentPage: 1,
  };
  public xGridSortConfig = {
    trigger: 'default',
    defaultSort: {
      field: 'id',
      order: 'asc',
    },
  };

  public xGridFilterConfig = {
    remote: true,
  };

  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public filterTreeSpan = 0;

  @Prop(Object) otherPresetOrder: { [key: string]: any } | undefined;
  public treeFilterData: any[] = [];
  public expandedKeys: any[] = [];
  public autoExpandParent = true;
  public checkedKeys: any[] = [];
  public selectedKeys: any[] = [];
  public mapOfSort: { [key: string]: any } = {};
  public reverse = false;
  public totalItems = 0;
  public omitFields = ['id'];
  public viewPermissions: IViewPermission[] = [];
  public mapOfFilter: { [key: string]: any } = {
    children: { list: [], value: [], type: 'one-to-many' },
    parent: { list: [], value: [], type: 'many-to-one' },
    authorities: { list: [], value: [], type: 'many-to-many' },
  };
  public editStatus: { [key: string]: any } = {};
  public isFetching = false;
  @Prop(Boolean) showInOther;
  public editInModal = false;
  public updateModalVisible: boolean = false;
  public parentId = null;
  public viewPermissionId = null;
  public clickViewPermissionId = null;
  public searchValue = '';
  viewpermissions: IViewPermission[];
  authorities: IAuthority[];

  public created(): void {
    this.initRelationships();
  }

  public mounted(): void {
    this.loadAll();
  }

  public clear(): void {
    this.xGridPagerConfig.currentPage = 1;
    this.loadAll();
  }

  handleToggleSearch() {
    this.searchFormConfig.toggleSearchStatus = !this.searchFormConfig.toggleSearchStatus;
  }

  public formSearch(): void {
    this.loading = true;
    const paginationQuery = {
      page: 0,
      size: this.xGridPagerConfig.pageSize,
      sort: this.sort(),
      filter: getSearchQueryData(this.searchFormConfig),
    };
    this.viewPermissionService()
      .tree()
      .then(res => {
        this.xGridData = removeBlankChildren(res.data);
        this.xGridPagerConfig.total = Number(res.headers['x-total-count']);
        this.loading = false;
      })
      .catch(err => {
        this.$message.error(err.message);
        this.loading = false;
      });
  }

  public loadAll(): void {
    this.loading = true;

    const paginationQuery = {
      listModelName: 'ViewPermission',
      page: this.xGridPagerConfig.currentPage - 1,
      size: this.xGridPagerConfig.pageSize,
      sort: this.sort(),
      filter: getFilter(this.searchValue, this.mapOfFilter),
    };
    this.viewPermissionService()
      .tree()
      .then(res => {
        this.xGridData = removeBlankChildren(res.data);
        this.xGridPagerConfig.total = Number(res.headers['x-total-count']);
        this.loading = false;
      })
      .catch(err => {
        this.$message.error(err.message);
        this.loading = false;
      });
  }

  public prepareRemove(instance: IViewPermission): void {
    this.removeId = instance.id;
  }

  public removeById(removeId: number): void {
    this.viewPermissionService()
      .delete(removeId)
      .then((res: AxiosResponse) => {
        const message = 'A ViewPermission is deleted with identifier ' + this.removeId;
        this.$message.success(message);
        this.loadAll();
      });
  }
  public removeByIds(ids: number[]) {
    this.viewPermissionService()
      .deleteByIds(ids)
      .then((res: AxiosResponse) => {
        this.$message.success('删除成功');
        this.loadAll();
      })
      .catch(err => this.$message.error(err.message));
  }

  public sort(): Array<any> {
    const result: any[] = [];
    Object.keys(this.mapOfSort).forEach(key => {
      if (this.mapOfSort[key] && this.mapOfSort[key] !== false) {
        if (this.mapOfSort[key] === 'asc') {
          result.push(key + ',asc');
        } else if (this.mapOfSort[key] === 'desc') {
          result.push(key + ',desc');
        }
      }
    });
    return result;
  }

  public loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  public transition(): void {
    this.loadAll();
  }

  public changeOrder(propOrder): void {
    this.propOrder = propOrder;
    this.reverse = !this.reverse;
    this.transition();
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }

  public editEntity(row: IViewPermission): void {
    if (this.showInOther || this.editInModal) {
      this.viewPermissionId = row.id;
      this.updateModalVisible = true;
    } else {
      this.$router.push({ path: row.id + '/edit', append: true });
    }
  }

  filterByColumn(fieldName: string, filterValue: string[]) {
    this.mapOfFilter[fieldName].value = filterValue;
    this.loadAll();
  }

  getFilterTest() {
    const result: { [key: string]: any } = {};
    if (this.searchValue) {
      result['jhiCommonSearchKeywords'] = this.searchValue;
      return result;
    }
    Object.keys(this.mapOfFilter).forEach(key => {
      const filterResult: any[] = [];
      if (this.mapOfFilter[key].type === 'Enum') {
        this.mapOfFilter[key].value.forEach(value => {
          filterResult.push(value);
        });
        result[key + '.in'] = filterResult;
      }
      if (['one-to-one', 'many-to-many', 'many-to-one', 'one-to-many'].includes(this.mapOfFilter[key].type)) {
        this.mapOfFilter[key].value.forEach(value => {
          filterResult.push(value);
        });
        result[key + 'Id.in'] = filterResult;
      }
    });
    return result;
  }

  cancelEdit(id: string): void {
    this.loadAll();
  }

  emitEmpty() {
    this.searchInput.focus();
    this.searchValue = '';
  }

  public updateModalCancel(e: any) {
    this.viewPermissionId = null;
    this.updateModalVisible = false;
    this.loadAll();
  }

  public newEntity(): void {
    if (this.showInOther || this.editInModal) {
      this.updateModalVisible = true;
    } else {
      this.$router.push({ path: 'new', append: true });
    }
  }

  public addChild(parent: IViewPermission): void {
    if (this.showInOther || this.editInModal) {
      this.updateModalVisible = true;
      this.parentId = parent.id;
    } else {
      // @ts-ignore
      this.$router.push({ name: 'system-view-permission-new', params: { parentId: parent.id }, append: true });
    }
  }

  public onExpand(expandedKeys) {
    console.log('onExpand', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.expandedKeys = expandedKeys;
    this.autoExpandParent = false;
  }

  public onCheck(checkedKeys) {
    console.log('onCheck', checkedKeys);
    this.checkedKeys = checkedKeys;
  }

  public onSelect(selectedKeys, info) {
    console.log('onSelect', info);
    console.log('record', info.node.record);
    const filterData = info.node.dataRef;
    if (filterData.type === 'filterGroup') {
      this.mapOfFilter[info.node.dataRef.key].value = [];
    } else if (filterData.type === 'filterItem') {
      this.mapOfFilter[info.node.dataRef.filterName].value = [info.node.dataRef.filterValue];
    }
    this.loadAll();
    this.selectedKeys = selectedKeys;
  }

  public editClosedEvent({ row, column }) {
    let field = column.property;
    let cellValue = row[field];
    // 判断单元格值是否被修改
    if (this.xGrid.isUpdateByRow(row, field)) {
      const entity = { id: row.id };
      entity[field] = cellValue;
      this.viewPermissionService()
        .updateBySpecifiedField(entity, field)
        .then(res => {
          this.$message.success({
            content: `信息更新成功。 ${field}=${cellValue}`,
            duration: 1,
          });
          this.xGrid.reloadRow(row, null, field);
        })
        .catch(error => {
          this.$message.error({
            content: `信息保存可能存在问题！ ${field}=${cellValue}`,
            onClose: () => {},
          });
        });
    }
  }

  public xGridCheckboxChangeEvent() {
    this.xGridSelectRecords = this.xGrid.getCheckboxRecords();
  }

  public changeEvent(e: any) {
    console.log(e);
  }

  public initRelationships(): void {
    this.loading = true;
    Promise.all([this.viewPermissionService().tree(), this.authorityService().tree()])
      .then(([viewPermissions, authorities]) => {
        this.relationshipsData['viewPermissions'] = viewPermissions.data;
        this.relationshipsData['authorities'] = authorities.data;
        const listOfFilterparent = viewPermissions.data.slice(0, viewPermissions.data.length > 8 ? 7 : viewPermissions.data.length - 1);
        this.mapOfFilter.parent = { list: listOfFilterparent, value: [], type: 'many-to-one' };
        const listOfFilterauthorities = authorities.data.slice(0, authorities.data.length > 8 ? 7 : authorities.data.length - 1);
        this.mapOfFilter.authorities = { list: listOfFilterauthorities, value: [], type: 'many-to-many' };
        this.generateColumns();
      })
      .catch(error => {
        this.loading = false;
        this.$message.error({
          content: `数据获取失败`,
          onClose: () => {},
        });
      });
  }

  public xGridPageChange({ currentPage, pageSize }) {
    this.xGridPagerConfig.currentPage = currentPage;
    this.xGridPagerConfig.pageSize = pageSize;
    this.loadAll();
  }

  public xGridSortChange({ property, order }) {
    this.mapOfSort = {};
    this.mapOfSort[property] = order;
    this.loadAll();
  }

  public xGridFilterChange({ column, property, values, datas, filters, $event }) {
    const type = column.params ? column.params.type : '';
    var tempValues;
    if (type === 'STRING') {
      tempValues = datas[0];
    } else if (type === 'INTEGER' || type === 'LONG' || type === 'DOUBLE' || type === 'FLOAT' || type === 'ZONED_DATE_TIME') {
      tempValues = datas[0];
    } else if (type === 'BOOLEAN') {
      tempValues = values;
    }
    this.mapOfFilter[property] = { value: tempValues, type: type };
    this.loadAll();
  }

  public switchFilterTree() {
    this.filterTreeSpan = this.filterTreeSpan > 0 ? 0 : 6;
  }

  private generateColumns() {
    this.xGridColumns.push({ type: 'checkbox', width: 60 });
    this.xGridColumns.push({
      title: 'ID',
      field: 'id',
      minWidth: 80,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'LONG' },
      editRender: { name: 'AInputNumber', events: { change: this.changeEvent, pressEnter: this.changeEvent } },
      filters: [{ data: [0, 100] }],
      filterRender: { name: 'ASlider', props: { range: true, marks: { 0: '0', 100: '100' } } },
    });
    this.xGridColumns.push({
      title: '权限名称',
      field: 'text',
      minWidth: 160,
      treeNode: true,
      sortable: true,
      remoteSort: true,
      params: { type: 'STRING' },
      editRender: { name: 'AInput', events: { change: this.changeEvent, pressEnter: this.changeEvent } },
      filters: [{ data: '' }],
      filterRender: { name: 'AInput', props: { placeholder: '请输入包含字符' } },
    });
    this.xGridColumns.push({
      title: 'i18n主键',
      field: 'i18n',
      minWidth: 160,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'STRING' },
      editRender: { name: 'AInput', events: { change: this.changeEvent, pressEnter: this.changeEvent } },
      filters: [{ data: '' }],
      filterRender: { name: 'AInput', props: { placeholder: '请输入包含字符' } },
    });
    this.xGridColumns.push({
      title: '显示分组名',
      field: 'group',
      minWidth: 70,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'BOOLEAN' },
      editRender: { name: 'ASwitch', type: 'visible', events: { change: this.changeEvent } },
      filters: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    });
    this.xGridColumns.push({
      title: '路由',
      field: 'link',
      minWidth: 160,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'STRING' },
      editRender: { name: 'AInput', events: { change: this.changeEvent, pressEnter: this.changeEvent } },
      filters: [{ data: '' }],
      filterRender: { name: 'AInput', props: { placeholder: '请输入包含字符' } },
    });
    this.xGridColumns.push({
      title: '外部链接',
      field: 'externalLink',
      minWidth: 160,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'STRING' },
      editRender: { name: 'AInput', events: { change: this.changeEvent, pressEnter: this.changeEvent } },
      filters: [{ data: '' }],
      filterRender: { name: 'AInput', props: { placeholder: '请输入包含字符' } },
    });
    this.xGridColumns.push({
      title: '链接目标',
      field: 'target',
      minWidth: 100,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'ENUM' },
      filters: [
        { label: 'BLANK', value: 'BLANK' },
        { label: 'SELF', value: 'SELF' },
        { label: 'PARENT', value: 'PARENT' },
        { label: 'TOP', value: 'TOP' },
      ],
    });
    this.xGridColumns.push({
      title: '图标',
      field: 'icon',
      minWidth: 160,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'STRING' },
      editRender: { name: 'AInput', events: { change: this.changeEvent, pressEnter: this.changeEvent } },
      filters: [{ data: '' }],
      filterRender: { name: 'AInput', props: { placeholder: '请输入包含字符' } },
    });
    this.xGridColumns.push({
      title: '禁用菜单',
      field: 'disabled',
      minWidth: 70,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'BOOLEAN' },
      editRender: { name: 'ASwitch', type: 'visible', events: { change: this.changeEvent } },
      filters: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    });
    this.xGridColumns.push({
      title: '隐藏菜单',
      field: 'hide',
      minWidth: 70,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'BOOLEAN' },
      editRender: { name: 'ASwitch', type: 'visible', events: { change: this.changeEvent } },
      filters: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    });
    this.xGridColumns.push({
      title: '隐藏面包屑',
      field: 'hideInBreadcrumb',
      minWidth: 70,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'BOOLEAN' },
      editRender: { name: 'ASwitch', type: 'visible', events: { change: this.changeEvent } },
      filters: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    });
    this.xGridColumns.push({
      title: '快捷菜单项',
      field: 'shortcut',
      minWidth: 70,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'BOOLEAN' },
      editRender: { name: 'ASwitch', type: 'visible', events: { change: this.changeEvent } },
      filters: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    });
    this.xGridColumns.push({
      title: '菜单根节点',
      field: 'shortcutRoot',
      minWidth: 70,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'BOOLEAN' },
      editRender: { name: 'ASwitch', type: 'visible', events: { change: this.changeEvent } },
      filters: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    });
    this.xGridColumns.push({
      title: '允许复用',
      field: 'reuse',
      minWidth: 70,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'BOOLEAN' },
      editRender: { name: 'ASwitch', type: 'visible', events: { change: this.changeEvent } },
      filters: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    });
    this.xGridColumns.push({
      title: '权限代码(ROLE_开头)',
      field: 'code',
      minWidth: 160,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'STRING' },
      editRender: { name: 'AInput', events: { change: this.changeEvent, pressEnter: this.changeEvent } },
      filters: [{ data: '' }],
      filterRender: { name: 'AInput', props: { placeholder: '请输入包含字符' } },
    });
    this.xGridColumns.push({
      title: '权限描述',
      field: 'description',
      minWidth: 160,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'STRING' },
      editRender: { name: 'AInput', events: { change: this.changeEvent, pressEnter: this.changeEvent } },
      filters: [{ data: '' }],
      filterRender: { name: 'AInput', props: { placeholder: '请输入包含字符' } },
    });
    this.xGridColumns.push({
      title: '权限类型',
      field: 'type',
      minWidth: 100,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'ENUM' },
      filters: [
        { label: 'MENU', value: 'MENU' },
        { label: 'BUTTON', value: 'BUTTON' },
      ],
    });
    this.xGridColumns.push({
      title: '排序',
      field: 'order',
      minWidth: 80,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'INTEGER' },
      editRender: { name: 'AInputNumber', events: { change: this.changeEvent, pressEnter: this.changeEvent } },
      filters: [{ data: [0, 100] }],
      filterRender: { name: 'ASlider', props: { range: true, marks: { 0: '0', 100: '100' } } },
    });
    this.xGridColumns.push({
      title: 'api权限标识串',
      field: 'apiPermissionCodes',
      minWidth: 160,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'STRING' },
      editRender: { name: 'AInput', events: { change: this.changeEvent, pressEnter: this.changeEvent } },
      filters: [{ data: '' }],
      filterRender: { name: 'AInput', props: { placeholder: '请输入包含字符' } },
    });
    this.xGridColumns.push({
      title: '组件名称',
      field: 'componentFile',
      minWidth: 160,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'STRING' },
      editRender: { name: 'AInput', events: { change: this.changeEvent, pressEnter: this.changeEvent } },
      filters: [{ data: '' }],
      filterRender: { name: 'AInput', props: { placeholder: '请输入包含字符' } },
    });
    this.xGridColumns.push({
      title: '组件名称',
      field: 'redirect',
      minWidth: 160,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'STRING' },
      editRender: { name: 'AInput', events: { change: this.changeEvent, pressEnter: this.changeEvent } },
      filters: [{ data: '' }],
      filterRender: { name: 'AInput', props: { placeholder: '请输入包含字符' } },
    });
    this.xGridColumns.push({
      title: 'Department Authority',
      field: 'departmentAuthority.id',
      minWidth: 120,
      editRender: {
        name: 'ASelectListModal',
        options: this.relationshipsData['departmentAuthorities'],
        optionProps: { value: 'id', label: 'id' },
      },
    });
    this.xGridColumns.push({
      title: '上级',
      field: 'parent.id',
      minWidth: 120,
      editRender: {
        name: 'ASelectListModal',
        options: this.relationshipsData['viewPermissions'],
        optionProps: { value: 'id', label: 'text' },
      },
    });
    this.xGridColumns.push({ title: '操作', field: 'operation', fixed: 'right', width: 140, slots: { default: 'recordAction' } });
  }
}
