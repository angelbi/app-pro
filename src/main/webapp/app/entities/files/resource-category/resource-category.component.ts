import { Component, Inject, Prop, Vue, Ref } from 'vue-property-decorator';
import { IResourceCategory, ResourceCategory } from '@/shared/model/files/resource-category.model';
import ResourceCategoryService from './resource-category.service';
import { AxiosResponse } from 'axios';
import { getFilter, getSearchQueryData, removeBlankChildren } from '@/utils/entity-utils';
import { UPLOAD_IMAGE_URL, UPLOAD_FILE_URL } from '@/constants';

@Component
export default class ResourceCategoryComponent extends Vue {
  @Inject('resourceCategoryService') private resourceCategoryService: () => ResourceCategoryService;
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
  @Prop(Boolean) showInOther;
  public editInModal = false;
  public updateModalVisible: boolean = false;
  public parentId = null;
  public resourceCategoryId = null;
  public clickResourceCategoryId = null;
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
    this.resourceCategoryService()
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
      listModelName: 'ResourceCategory',
      page: this.xGridPagerConfig.currentPage - 1,
      size: this.xGridPagerConfig.pageSize,
      sort: this.sort(),
      filter: getFilter(this.searchValue, this.mapOfFilter),
    };
    this.resourceCategoryService()
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
        this.$message.success('????????????');
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

  public editEntity(row: IResourceCategory): void {
    if (this.showInOther || this.editInModal) {
      this.resourceCategoryId = row.id;
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
    this.resourceCategoryId = null;
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

  public addChild(parent: IResourceCategory): void {
    if (this.showInOther || this.editInModal) {
      this.updateModalVisible = true;
      this.parentId = parent.id;
    } else {
      // @ts-ignore
      this.$router.push({ name: 'files-resource-category-new', params: { parentId: parent.id }, append: true });
    }
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

  public editClosedEvent({ row, column }) {
    let field = column.property;
    let cellValue = row[field];
    // ?????????????????????????????????
    if (this.xGrid.isUpdateByRow(row, field)) {
      const entity = { id: row.id };
      entity[field] = cellValue;
      this.resourceCategoryService()
        .updateBySpecifiedField(entity, field)
        .then(res => {
          this.$message.success({
            content: `????????????????????? ${field}=${cellValue}`,
            duration: 1,
          });
          this.xGrid.reloadRow(row, null, field);
        })
        .catch(error => {
          this.$message.error({
            content: `????????????????????????????????? ${field}=${cellValue}`,
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
    Promise.all([this.resourceCategoryService().tree()])
      .then(([resourceCategories]) => {
        this.relationshipsData['resourceCategories'] = resourceCategories.data;
        const listOfFilterparent = resourceCategories.data.slice(
          0,
          resourceCategories.data.length > 8 ? 7 : resourceCategories.data.length - 1
        );
        this.mapOfFilter.parent = { list: listOfFilterparent, value: [], type: 'many-to-one' };
        this.generateColumns();
      })
      .catch(error => {
        this.loading = false;
        this.$message.error({
          content: `??????????????????`,
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
      title: '??????',
      field: 'title',
      minWidth: 160,
      treeNode: true,
      sortable: true,
      remoteSort: true,
      params: { type: 'STRING' },
      editRender: { name: 'AInput', events: { change: this.changeEvent, pressEnter: this.changeEvent } },
      filters: [{ data: '' }],
      filterRender: { name: 'AInput', props: { placeholder: '?????????????????????' } },
    });
    this.xGridColumns.push({
      title: '??????',
      field: 'code',
      minWidth: 160,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'STRING' },
      editRender: { name: 'AInput', events: { change: this.changeEvent, pressEnter: this.changeEvent } },
      filters: [{ data: '' }],
      filterRender: { name: 'AInput', props: { placeholder: '?????????????????????' } },
    });
    this.xGridColumns.push({
      title: '??????',
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
      title: '??????',
      field: 'parent.id',
      minWidth: 120,
      editRender: {
        name: 'ASelectListModal',
        options: this.relationshipsData['resourceCategories'],
        optionProps: { value: 'id', label: 'title' },
      },
    });
    this.xGridColumns.push({ title: '??????', field: 'operation', fixed: 'right', width: 140, slots: { default: 'recordAction' } });
  }
}
