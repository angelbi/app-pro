import { email, maxLength, minLength, required } from 'vuelidate/lib/validators';
import { Component, Inject, Vue } from 'vue-property-decorator';
import UserManagementService from './user-management.service';
import { IUser, User } from '@/shared/model/user.model';

function loginValidator(value) {
  if (typeof value === 'undefined' || value === null || value === '') {
    return true;
  }
  return /^[_.@A-Za-z0-9-]*$/.test(value);
}

const validations: any = {
  userAccount: {
    login: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(254),
      loginValidator,
    },
    firstName: {
      maxLength: maxLength(50),
    },
    lastName: {
      maxLength: maxLength(50),
    },
    email: {
      required,
      email,
      minLength: minLength(5),
      maxLength: maxLength(254),
    },
  },
};

@Component({
  validations,
})
export default class JhiUserManagementEdit extends Vue {
  @Inject('userService') private userManagementService: () => UserManagementService;
  public userAccount: IUser;
  public isSaving = false;
  public authorities: any[] = [];
  public languages: any = this.$store.getters.languages;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.initAuthorities();
      if (to.params.userId) {
        vm.init(to.params.userId);
      }
    });
  }

  public constructor() {
    super();
    this.userAccount = new User();
    this.userAccount.authorities = [];
  }

  public initAuthorities() {
    this.userManagementService()
      .retrieveAuthorities()
      .then(_res => {
        this.authorities = _res.data;
      });
  }

  public init(userId: number): void {
    this.userManagementService()
      .get(userId)
      .then(res => {
        this.userAccount = res.data;
      });
  }

  public previousState(): void {
    (<any>this).$router.go(-1);
  }

  public save(): void {
    this.isSaving = true;
    if (this.userAccount.id) {
      this.userManagementService()
        .update(this.userAccount)
        .then(res => {
          this.returnToList();
          this.$message.info(this.getMessageFromHeader(res).toString());
        });
    } else {
      this.userAccount.langKey = 'en';
      this.userManagementService()
        .create(this.userAccount)
        .then(res => {
          this.returnToList();
          this.$message.success(this.getMessageFromHeader(res).toString());
        });
    }
  }

  private returnToList(): void {
    this.isSaving = false;
    (<any>this).$router.go(-1);
  }

  private getMessageFromHeader(res: any): any {
    return res.headers['x-appapp-alert'];
  }
}
