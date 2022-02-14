import { Component, Vue, Inject, Prop, Watch } from 'vue-property-decorator';
import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';
import moment from 'moment';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import UserService from '@/shared/service/user.service';

import ResourceCategoryService from '../../files//resource-category/resource-category.service';
import { IResourceCategory } from '@/shared/model/files/resource-category.model';

import { IUploadImage, UploadImage } from '@/shared/model/files/upload-image.model';
import UploadImageService from './upload-image.service';

const validations: any = {
  uploadImage: {
    id: {},
    fullName: {},
    name: {},
    ext: {},
    type: {},
    url: {},
    path: {},
    folder: {},
    entityName: {},
    createAt: {},
    fileSize: {},
    smartUrl: {},
    mediumUrl: {},
    referenceCount: {},
  },
};

@Component({
  validations,
  components: {},
})
export default class UploadImageUpdateTemplate extends Vue {
  @Inject('uploadImageService') private uploadImageService: () => UploadImageService;
  public uploadImage: IUploadImage = new UploadImage();

  @Inject('userService') private userService: () => UserService;

  public users: Array<any> = [];

  @Inject('resourceCategoryService') private resourceCategoryService: () => ResourceCategoryService;

  public resourceCategories: IResourceCategory[] = [];
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
  public uploadImageId = null;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.initRelationships();
      if (to.params.uploadImageId) {
        vm.retrieveUploadImage(to.params.uploadImageId);
      }
    });
  }
  created(): void {
    this.initRelationships();
  }

  public mounted(): void {}

  public save(): void {
    this.isSaving = true;
    if (this.uploadImage.id) {
      this.uploadImageService()
        .update(this.uploadImage)
        .then(param => {
          this.isSaving = false;
          const message = 'A UploadImage is updated with identifier ' + param.id;
          this.$message.info(message);
          this.$router.go(-1);
        });
    } else {
      this.uploadImageService()
        .create(this.uploadImage)
        .then(param => {
          this.isSaving = false;
          const message = 'A UploadImage is created with identifier ' + param.id;
          this.$message.success(message);
          this.$router.go(-1);
        });
    }
  }

  public retrieveUploadImage(uploadImageId): void {
    this.uploadImageService()
      .find(uploadImageId)
      .then(res => {
        this.uploadImage = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.userService()
      .retrieve()
      .then(res => {
        this.users = res.data;
      });
    this.resourceCategoryService()
      .tree()
      .then(res => {
        this.resourceCategories = res.data;
      });
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