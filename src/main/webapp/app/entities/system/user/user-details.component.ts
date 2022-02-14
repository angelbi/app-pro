import { Component, Vue, Inject } from 'vue-property-decorator';
import { IUser } from '@/shared/model/system/user.model';
import UserService from './user.service';

@Component
export default class UserDetails extends Vue {
  @Inject('userService') private userService: () => UserService;
  public user: IUser = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.userId) {
        vm.retrieveUser(to.params.userId);
      }
    });
  }

  public retrieveUser(userId) {
    this.userService()
      .find(userId)
      .then(res => {
        this.user = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
