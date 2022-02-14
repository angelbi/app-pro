import { Component, Vue, Inject, Prop, Watch } from 'vue-property-decorator';
import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';
import moment from 'moment';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';
import { IAnnouncementRecord, AnnouncementRecord } from '@/shared/model/system/announcement-record.model';
import AnnouncementRecordService from './announcement-record.service';

const validations: any = {
  announcementRecord: {
    id: {},
    anntId: {},
    userId: {},
    hasRead: {},
    readTime: {},
  },
};

@Component({
  validations,
  components: {},
})
export default class AnnouncementRecordUpdateTemplate extends Vue {
  @Inject('announcementRecordService') private announcementRecordService: () => AnnouncementRecordService;
  public announcementRecord: IAnnouncementRecord = new AnnouncementRecord();
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
  public announcementRecordId = null;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.announcementRecordId) {
        vm.retrieveAnnouncementRecord(to.params.announcementRecordId);
      }
    });
  }
  created(): void {}

  public mounted(): void {}

  public save(): void {
    this.isSaving = true;
    if (this.announcementRecord.id) {
      this.announcementRecordService()
        .update(this.announcementRecord)
        .then(param => {
          this.isSaving = false;
          const message = 'A AnnouncementRecord is updated with identifier ' + param.id;
          this.$message.info(message);
          this.$router.go(-1);
        });
    } else {
      this.announcementRecordService()
        .create(this.announcementRecord)
        .then(param => {
          this.isSaving = false;
          const message = 'A AnnouncementRecord is created with identifier ' + param.id;
          this.$message.success(message);
          this.$router.go(-1);
        });
    }
  }

  public retrieveAnnouncementRecord(announcementRecordId): void {
    this.announcementRecordService()
      .find(announcementRecordId)
      .then(res => {
        this.announcementRecord = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}

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
