import { Component, Inject, Prop, Vue, Ref } from 'vue-property-decorator';
import { ISysFillRule, SysFillRule } from '@/shared/model/settings/sys-fill-rule.model';
import SysFillRuleService from './sys-fill-rule.service';
import { AxiosResponse } from 'axios';
import { getFilter, getSearchQueryData, removeBlankChildren } from '@/utils/entity-utils';

@Component
export default class SysFillRuleComponent extends Vue {
  @Inject('sysFillRuleService') private sysFillRuleService: () => SysFillRuleService;
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
  public sysFillRules: ISysFillRule[] = [];
  public mapOfFilter: { [key: string]: any } = {};
  public editStatus: { [key: string]: any } = {};
  public isFetching = false;
  @Prop(Boolean) showInOther;
  public editInModal = false;
  public updateModalVisible: boolean = false;
  public sysFillRuleId = null;
  public clickSysFillRuleId = null;
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
    this.sysFillRuleService()
      .retrieve(paginationQuery)
      .then(res => {
        this.xGridData = res.data;
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
      listModelName: 'SysFillRule',
      page: this.xGridPagerConfig.currentPage - 1,
      size: this.xGridPagerConfig.pageSize,
      sort: this.sort(),
      filter: getFilter(this.searchValue, this.mapOfFilter),
    };
    this.sysFillRuleService()
      .retrieve(paginationQuery)
      .then(res => {
        this.xGridData = res.data;
        this.xGridPagerConfig.total = Number(res.headers['x-total-count']);
        this.loading = false;
      })
      .catch(err => {
        this.$message.error(err.message);
        this.loading = false;
      });
  }

  public prepareRemove(instance: ISysFillRule): void {
    this.removeId = instance.id;
  }

  public removeById(removeId: number): void {
    this.sysFillRuleService()
      .delete(removeId)
      .then((res: AxiosResponse) => {
        const message = 'A SysFillRule is deleted with identifier ' + this.removeId;
        this.$message.success(message);
        this.loadAll();
      });
  }
  public removeByIds(ids: number[]) {
    this.sysFillRuleService()
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

  public editEntity(row: ISysFillRule): void {
    if (this.showInOther || this.editInModal) {
      this.sysFillRuleId = row.id;
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
    this.sysFillRuleId = null;
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
      this.sysFillRuleService()
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
    this.generateColumns();
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
      title: '规则名称',
      field: 'name',
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
      title: '规则Code',
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
      title: '规则实现类',
      field: 'implClass',
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
      title: '规则参数',
      field: 'params',
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
