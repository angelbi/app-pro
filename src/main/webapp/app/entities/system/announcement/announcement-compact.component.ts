import { Component, Inject, Prop, Ref, Vue } from 'vue-property-decorator';
import { IAnnouncement, Announcement } from '@/shared/model/system/announcement.model';

import JhiDataUtils from '@/shared/data/data-utils.service';

import AnnouncementService from './announcement.service';
import { AxiosResponse } from 'axios';
import { getFilter, getSearchQueryData, removeBlankChildren } from '@/utils/entity-utils';

@Component
export default class AnnouncementCompactComponent extends Vue {
  @Inject('announcementService') private announcementService: () => AnnouncementService;
  @Ref() public searchInput;
  @Ref('xGridCompact') public xGridCompact;
  public xGridData = [];
  public xGridColumns = [];
  public xGridTableToolbars = {
    perfect: true,
    zoom: true,
    custom: true,
    slots: {
      buttons: 'toolbar_buttons',
    },
  };
  public xGridCheckboxConfig = {
    labelField: 'id',
  };
  public xGridRadioConfig = {
    labelField: 'id',
  };
  public xGridRadioSelectRecord = null;
  public xGridSelectRecords = [];
  private loading: boolean = false;
  public relationshipsData: any = {};
  public xGridPagerConfig = {
    layouts: ['PrevPage', 'NextPage', 'Sizes', 'Total'],
    pageSize: 15,
    pageSizes: [5, 10, 15, 20, 30, 50],
    total: 0,
    pagerCount: 5,
    currentPage: 1,
  };

  @Prop(Boolean) showInOther;

  // @Ref('dataGrid') public dataGrid
  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public filterTreeSpan = 0;
  public dataTableColumns = [];
  public dataTableParams = {
    Status: 1,
    PageSize: 5,
  };
  public dataTableProps = {
    bordered: true,
  };
  public dataTableEventConfig = {
    tabToActive: true, //Tab键进入下一个单元格编辑
    enterToActive: true, //回车键进入下一个单元格编辑
    rightArrowToActive: true, //向右箭头激活同一行下一列的编辑
    leftArrowToActive: true, //向左箭头激活同一行前一列的编辑
    upArrowToActive: true, //向上箭头激活上一行相同列的编辑
    downArrowToActive: true, //向下箭头激活下一行相同列的编辑
    resizeableColumn: false, //列宽拖拽调整,设为true的话，column必须设宽度值，且为整数，如：width:100
  };
  @Prop(Object) otherPresetOrder: { [key: string]: any };
  @Prop() rowIdName;
  @Prop(String) commonTableName;
  @Prop() selectIds;
  @Prop() selectModel;
  public treeFilterData = [];
  public expandedKeys = [];
  public autoExpandParent = true;
  public checkedKeys = [];
  public selectedKeys = [];
  public mapOfSort: { [key: string]: any } = {};
  public reverse = false;
  public totalItems = 0;
  public omitFields = ['id', 'content', 'summary'];
  public announcements: IAnnouncement[] = [];
  public mapOfFilter: { [key: string]: any } = {};
  public editStatus: { [key: string]: any } = {};
  public isFetching = false;
  public searchValue = '';

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
  public loadAll(): void {
    this.loading = true;

    const paginationQuery = {
      page: this.xGridPagerConfig.currentPage - 1,
      size: this.xGridPagerConfig.pageSize,
      sort: this.sort(),
      filter: this.getFilter(),
    };
    this.announcementService()
      .retrieve(paginationQuery)
      .then(res => {
        this.xGridData = res.data;
        this.xGridPagerConfig.total = Number(res.headers['x-total-count']);
        if (this.xGridSelectType === 'checkbox') {
          if (Array.isArray(this.selectIds) && this.selectIds.length > 0) {
            this.$nextTick(() => {
              const rows = [];
              this.selectIds.forEach(id => {
                rows.push(this.xGridCompact.getRowById(id));
              });
              this.xGridCompact.setCheckboxRow(rows, true);
              this.xGridSelectRecords = this.xGridCompact.getCheckboxRecords();
            });
          }
        } else {
          if (this.selectIds) {
            this.$nextTick(() => {
              this.xGridCompact.setRadioRow(this.xGridCompact.getRowById(this.selectIds));
              this.xGridRadioSelectRecord = this.xGridCompact.getRadioRecord();
            });
          }
        }
        this.loading = false;
      })
      .catch(err => {
        this.$message.error(err.message);
        this.loading = false;
      });
  }

  public prepareRemove(instance: IAnnouncement): void {
    this.removeId = instance.id;
  }

  public removeById(removeId: number): void {
    this.announcementService()
      .delete(removeId)
      .then((res: AxiosResponse) => {
        const message = 'A Announcement is deleted with identifier ' + this.removeId;
        this.$message.success(message);
        this.loadAll();
      });
  }
  public removeByIds(ids: number[]) {
    this.announcementService()
      .deleteByIds(ids)
      .then((res: AxiosResponse) => {
        this.$message.success('删除成功');
        this.loadAll();
      })
      .catch(err => this.$message.error(err.message));
  }

  public sort(): Array<any> {
    const result = [];
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

  handleTableChange(pagination, filters, sorter) {
    if (sorter && sorter.columnKey) {
      this.propOrder = sorter.columnKey;
      this.reverse = sorter.order === 'ascend';
    } else {
      this.propOrder = 'id';
      this.reverse = false;
    }
    Object.keys(filters).forEach(key => {
      this.mapOfFilter[key].value = filters[key];
    });
    this.page = pagination.current;
    this.loadAll();
  }

  filterByColumn(fieldName: string, filterValue: string[]) {
    this.mapOfFilter[fieldName].value = filterValue;
    this.loadAll();
  }
  getFilter() {
    const result: { [key: string]: any } = {};
    if (this.searchValue) {
      result['jhiCommonSearchKeywords'] = this.searchValue;
      return result;
    }
    Object.keys(this.mapOfFilter).forEach(key => {
      const filterResult = [];
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

  public newEntity(): void {
    this.$router.push({ path: 'new', append: true });
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

  public initRelationships(): void {}

  public changeEvent(e) {
    console.log(e);
  }

  public xGridPageChange({ currentPage, pageSize }) {
    this.xGridPagerConfig.currentPage = currentPage;
    this.xGridPagerConfig.pageSize = pageSize;
    this.loadAll();
  }

  public handleCancel() {
    this.$emit('cancel');
  }

  public handleOK() {
    if (this.xGridSelectType === 'checkbox') {
      this.$emit('ok', this.xGridSelectRecords);
    } else {
      this.$emit('ok', this.xGridRadioSelectRecord);
    }
  }

  public xGridCheckboxChangeEvent() {
    this.xGridSelectRecords = this.xGridCompact.getCheckboxRecords();
  }

  get xGridSelectType() {
    if (this.selectModel !== 'multiple') {
      return 'radio';
    } else {
      return 'checkbox';
    }
  }

  public xGridRadioChangeEvent() {
    this.xGridRadioSelectRecord = this.xGridCompact.getRadioRecord();
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
      title: '标题',
      field: 'titile',
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
      title: '开始时间',
      field: 'startTime',
      minWidth: 140,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'ZONED_DATE_TIME' },
      editRender: {
        name: 'ADatePicker',
        props: { type: 'date', format: 'YYYY-MM-DD hh:mm:ss' },
        events: { ok: this.changeEvent, change: this.changeEvent },
      },
      filters: [{ data: [] }],
      filterRender: { name: 'AARangePicker' },
    });
    this.xGridColumns.push({
      title: '结束时间',
      field: 'endTime',
      minWidth: 140,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'ZONED_DATE_TIME' },
      editRender: {
        name: 'ADatePicker',
        props: { type: 'date', format: 'YYYY-MM-DD hh:mm:ss' },
        events: { ok: this.changeEvent, change: this.changeEvent },
      },
      filters: [{ data: [] }],
      filterRender: { name: 'AARangePicker' },
    });
    this.xGridColumns.push({
      title: '发布人Id',
      field: 'senderId',
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
      title: '优先级',
      field: 'priority',
      minWidth: 100,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'ENUM' },
      filters: [
        { label: 'HIGH', value: 'HIGH' },
        { label: 'MEDIUM', value: 'MEDIUM' },
        { label: 'LOW', value: 'LOW' },
      ],
    });
    this.xGridColumns.push({
      title: '消息类型',
      field: 'category',
      minWidth: 100,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'ENUM' },
      filters: [
        { label: 'SYSTEM_INFO', value: 'SYSTEM_INFO' },
        { label: 'NOTICE', value: 'NOTICE' },
      ],
    });
    this.xGridColumns.push({
      title: '通告对象类型',
      field: 'receiverType',
      minWidth: 100,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'ENUM' },
      filters: [
        { label: 'USER', value: 'USER' },
        { label: 'ALL', value: 'ALL' },
        { label: 'DEPARTMENT', value: 'DEPARTMENT' },
        { label: 'AUTHORITY', value: 'AUTHORITY' },
        { label: 'POSITION', value: 'POSITION' },
      ],
    });
    this.xGridColumns.push({
      title: '发布状态',
      field: 'sendStatus',
      minWidth: 100,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'ENUM' },
      filters: [
        { label: 'NOT_RELEASE', value: 'NOT_RELEASE' },
        { label: 'RELEASED', value: 'RELEASED' },
        { label: 'CANCELED', value: 'CANCELED' },
      ],
    });
    this.xGridColumns.push({
      title: '发布时间',
      field: 'sendTime',
      minWidth: 140,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'ZONED_DATE_TIME' },
      editRender: {
        name: 'ADatePicker',
        props: { type: 'date', format: 'YYYY-MM-DD hh:mm:ss' },
        events: { ok: this.changeEvent, change: this.changeEvent },
      },
      filters: [{ data: [] }],
      filterRender: { name: 'AARangePicker' },
    });
    this.xGridColumns.push({
      title: '撤销时间',
      field: 'cancelTime',
      minWidth: 140,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'ZONED_DATE_TIME' },
      editRender: {
        name: 'ADatePicker',
        props: { type: 'date', format: 'YYYY-MM-DD hh:mm:ss' },
        events: { ok: this.changeEvent, change: this.changeEvent },
      },
      filters: [{ data: [] }],
      filterRender: { name: 'AARangePicker' },
    });
    this.xGridColumns.push({
      title: '业务类型',
      field: 'businessType',
      minWidth: 100,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'ENUM' },
      filters: [
        { label: 'EMAIL', value: 'EMAIL' },
        { label: 'WORKFLOW', value: 'WORKFLOW' },
      ],
    });
    this.xGridColumns.push({
      title: '业务id',
      field: 'businessId',
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
      title: '打开方式',
      field: 'openType',
      minWidth: 100,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'ENUM' },
      filters: [
        { label: 'URL', value: 'URL' },
        { label: 'COMPONENT', value: 'COMPONENT' },
      ],
    });
    this.xGridColumns.push({
      title: '组件/路由 地址',
      field: 'openPage',
      minWidth: 160,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'STRING' },
      editRender: { name: 'AInput', events: { change: this.changeEvent, pressEnter: this.changeEvent } },
      filters: [{ data: '' }],
      filterRender: { name: 'AInput', props: { placeholder: '请输入包含字符' } },
    });
    this.xGridColumns.push({ title: '操作', field: 'operation', fixed: 'right', width: 140, slots: { default: 'recordAction' } });
  }
}
