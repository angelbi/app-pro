import { Component, Vue, Inject, Prop, Watch } from 'vue-property-decorator';
import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import UploadFileService from '../../files//upload-file/upload-file.service';
import { IUploadFile } from '@/shared/model/files/upload-file.model';

import UploadImageService from '../../files//upload-image/upload-image.service';
import { IUploadImage } from '@/shared/model/files/upload-image.model';

import { IResourceCategory, ResourceCategory } from '@/shared/model/files/resource-category.model';
import ResourceCategoryService from './resource-category.service';
import { UPLOAD_IMAGE_URL, UPLOAD_FILE_URL } from '@/constants';

const validations: any = {
  resourceCategory: {
    id: {},
    title: {
      maxLength: maxLength(40),
    },
    code: {
      maxLength: maxLength(20),
    },
    sort: {},
  },
};

@Component({
  validations,
  components: {},
})
export default class ResourceCategoryUpdateTemplate extends Vue {
  @Inject('resourceCategoryService') private resourceCategoryService: () => ResourceCategoryService;
  public resourceCategory: IResourceCategory = new ResourceCategory();

  @Inject('uploadFileService') private uploadFileService: () => UploadFileService;

  public uploadFiles: IUploadFile[] = [];
  public filesFileList: any[] = [];

  public resourceCategories: IResourceCategory[] = [];

  @Inject('uploadImageService') private uploadImageService: () => UploadImageService;

  public uploadImages: IUploadImage[] = [];
  public imagesFileList: any[] = [];
  public isSaving = false;
  public loading = false;
  public formJsonData = {
    list: [],
    config: {
      layout: 'horizontal',
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      hideRequiredMark: false,
      customStyle: '',
    },
  };
  public dataFormContent = [];
  public resourceCategoryId = null;
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

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.initRelationships();
      if (to.params.resourceCategoryId) {
        vm.retrieveResourceCategory(to.params.resourceCategoryId);
      }
    });
  }
  created(): void {
    this.initRelationships();
  }

  public mounted(): void {
    const token = localStorage.getItem('jhi-authenticationToken') || sessionStorage.getItem('jhi-authenticationToken');
    this.authHeader.Authorization = 'Bearer ' + token;
  }

  public save(): void {
    this.isSaving = true;
    if (this.resourceCategory.id) {
      this.resourceCategoryService()
        .update(this.resourceCategory)
        .then(param => {
          this.isSaving = false;
          const message = 'A ResourceCategory is updated with identifier ' + param.id;
          this.$message.info(message);
          this.$router.go(-1);
        });
    } else {
      this.resourceCategoryService()
        .create(this.resourceCategory)
        .then(param => {
          this.isSaving = false;
          const message = 'A ResourceCategory is created with identifier ' + param.id;
          this.$message.success(message);
          this.$router.go(-1);
        });
    }
  }

  public retrieveResourceCategory(resourceCategoryId): void {
    this.resourceCategoryService()
      .find(resourceCategoryId)
      .then(res => {
        this.resourceCategory = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.uploadFileService()
      .retrieve()
      .then(res => {
        this.uploadFiles = res.data;
      });
    this.resourceCategoryService()
      .tree()
      .then(res => {
        this.resourceCategories = res.data;
      });
    this.uploadImageService()
      .retrieve()
      .then(res => {
        this.uploadImages = res.data;
      });
    this.resourceCategoryService()
      .tree()
      .then(res => {
        this.resourceCategories = res.data;
      });
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

  // 有一问题要注意，我不能选择已经是我下级的节点做我的上级节点。
  public toTreeNode(items: any, valueFieldName: string, labelFieldName: string, currentId?: any, disabledParent: boolean = false) {
    const nzTreeNode = [];
    if (!items) {
      return nzTreeNode;
    }
    items.forEach(item => {
      let disabledChildren = false;
      const option = {
        value: item[valueFieldName],
        label: item[labelFieldName],
        disabled: disabledParent, // 树形关系中自己不能选择自己做为上级对象。
        children: undefined,
      };
      if (item[valueFieldName] === currentId) {
        option.disabled = true;
        disabledChildren = true;
      }
      if (item.children && item.children.length > 0) {
        option.children = this.toTreeNode(item.children, valueFieldName, labelFieldName, currentId, disabledChildren);
      }
      nzTreeNode.push(option);
    });
    console.log(nzTreeNode);
    return nzTreeNode;
  }
}
