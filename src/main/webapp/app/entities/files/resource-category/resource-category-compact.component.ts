import { Component, Inject, Prop, Ref, Vue } from 'vue-property-decorator';
import { IResourceCategory, ResourceCategory } from '@/shared/model/files/resource-category.model';

import ResourceCategoryService from './resource-category.service';
import { AxiosResponse } from 'axios';
import { getFilter, getSearchQueryData, removeBlankChildren } from '@/utils/entity-utils';
import { UPLOAD_IMAGE_URL, UPLOAD_FILE_URL } from '@/constants';

@Component
export default class ResourceCategoryCompactComponent extends Vue {
  @Inject('resourceCategoryService') private resourceCategoryService: () => ResourceCategoryService;
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
  @Prop() parentId;
  public treeFilterData = [];
  public expandedKeys = [];
  public autoExpandParent = true;
  public checkedKeys = [];
  public selectedKeys = [];
  public mapOfSort: { [key: string]: any } = {};
  public reverse = false;
  public totalItems = 0;
  public authHeader = { Authorization: 'Bearer ' };
  public uploadFileUrl = UPLOAD_FILE_URL;
  public uploadImageUrl = UPLOAD_IMAGE_URL;
  public previewImage: string | undefined = '';
  public previewVisible = false;
  public showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true,
  };
  public omitFields = ['id'];
  public resourceCategories: IResourceCategory[] = [];
  public mapOfFilter: { [key: string]: any } = {
    files: { list: [], value: [], type: 'one-to-many' },
    children: { list: [], value: [], type: 'one-to-many' },
    images: { list: [], value: [], type: 'one-to-many' },
    parent: { list: [], value: [], type: 'many-to-one' },
  };
  public editStatus: { [key: string]: any } = {};
  public isFetching = false;
  public searchValue = '';
  resourcecategories: IResourceCategory[];

  public created(): void {
    this.initRelationships();
  }

  public mounted(): void {
    const token = localStorage.getItem('jhi-authenticationToken') || sessionStorage.getItem('jhi-authenticationToken');
    this.authHeader.Authorization = 'Bearer ' + token;
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
    if (this.parentId) {
      this.resourceCategoryService()
        .treeByParentId(this.parentId)
        .then(res => {
          this.xGridData = removeBlankChildren(res.data);
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
      return;
    }
    this.resourceCategoryService()
      .tree()
      .then(res => {
        this.xGridData = removeBlankChildren(res.data);
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

  public prepareRemove(instance: IResourceCategory): void {
    this.removeId = instance.id;
  }

  public removeById(removeId: number): void {
    this.resourceCategoryService()
      .delete(removeId)
      .then((res: AxiosResponse) => {
        const message = 'A ResourceCategory is deleted with identifier ' + this.removeId;
        this.$message.success(message);
        this.loadAll();
      });
  }
  public removeByIds(ids: number[]) {
    this.resourceCategoryService()
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
  public beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
    if (!isJPG) {
      this.$message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 4;
    if (!isLt2M) {
      this.$message.error('Image must smaller than 4MB!');
    }
    return isJPG && isLt2M;
  }
  public getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  private checkImageDimension(file: File): Promise<boolean> {
    return new Promise(resolve => {
      const img = new Image(); // create image
      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        window.URL.revokeObjectURL(img.src);
        resolve(width === height && width >= 3000);
      };
    });
  }
  public handlePreview(file) {
    this.previewImage = file.url ?? file.thumbUrl;
    this.previewVisible = true;
  }
  public handlePreviewCancel() {
    this.previewVisible = false;
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

  public initRelationships(): void {
    this.loading = true;
    Promise.all([this.resourceCategoryService().tree()])
      .then(([resourceCategories]) => {
        this.relationshipsData['resourceCategories'] = resourceCategories.data;
        const listOfFilterparent = resourceCategories.data.slice(
          0,
          resourceCategories.data.length > 8 ? 7 : resourceCategories.data.length - 1
        );
        this.mapOfFilter.parent = { list: listOfFilterparent, value: [], type: 'many-to-one' };
      })
      .catch(error => {
        this.loading = false;
        this.$message.error({
          content: `数据获取失败`,
          onClose: () => {},
        });
      });
  }

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
      field: 'title',
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
      title: '代码',
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
      title: '排序',
      field: 'sort',
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
      title: '上级',
      field: 'parent.id',
      minWidth: 120,
      editRender: {
        name: 'ASelectListModal',
        options: this.relationshipsData['resourceCategories'],
        optionProps: { value: 'id', label: 'title' },
      },
    });
    this.xGridColumns.push({ title: '操作', field: 'operation', fixed: 'right', width: 140, slots: { default: 'recordAction' } });
  }
}
