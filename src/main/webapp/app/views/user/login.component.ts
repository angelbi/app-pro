import { postAction } from '@/api/manage';
import { ACCESS_TOKEN, ENCRYPTED_STRING } from '@/store/mutation-types';
import LoginSelectTenant from './LoginSelectTenant.vue';
import TwoStepCaptcha from '@/components/tools/TwoStepCaptcha.vue';
import { encryption, getEncryptedString } from '@/utils/encryption/aesEncrypt';
import { timeFix } from '@/utils/util';
import { Component, Inject, Ref, Vue } from 'vue-property-decorator';
import AccountService from '@/account/account.service';
import axios from 'axios';
import { namespace } from 'vuex-class';
const userModule = namespace('user');

@Component({
  components: {
    LoginSelectTenant,
    TwoStepCaptcha,
  },
})
export default class LoginComponent extends Vue {
  @Inject('accountService')
  private accountService: () => AccountService;
  @Ref('loginSelect')
  private loginSelect: any;
  @Ref('form')
  private form: any;

  @userModule.Action('PhoneLogin') PhoneLogin;

  public model = {
    username: null,
    password: '',
    inputCode: '',
    rememberMe: true,
    mobile: '',
    captcha: '',
  };

  public loginType = 0;
  public validatorRules = {
    username: [{ required: true, message: '请输入用户名!' }, { validator: this.handleUsernameOrEmail }],
    password: [
      {
        required: true,
        message: '请输入密码!',
        validator: 'click',
      },
    ],
    inputCode: [
      {
        required: true,
        message: '请输入验证码!',
      },
    ],
    mobile: [{ required: true, message: '请输入手机号码!' }, { validator: this.validateMobile }],
    captcha: [
      {
        required: true,
        message: '请输入验证码!',
      },
    ],
  };
  public customActiveKey = 'tab1';
  public requestCodeSuccess = false;
  public randCodeImage = '';
  public currdatetime = 0;
  public loginBtn = false;
  public requiredTwoStepCaptcha = false;
  public stepCaptchaVisible = false;
  // 手机号登录用
  public state = {
    time: 60,
    smsSendBtn: false,
  };
  public encryptedString = {
    key: '',
    iv: '',
  };

  created() {
    this.currdatetime = new Date().getTime();
    this.model.rememberMe = true;
    Vue.ls.remove(ACCESS_TOKEN);
    this.getRouterData();
    this.handleChangeCheckCode();
  }

  handleTabClick(key) {
    this.customActiveKey = key;
  }
  handleUsernameOrEmail(rule, value, callback) {
    const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    if (regex.test(value)) {
      this.loginType = 0;
    } else {
      this.loginType = 1;
    }
    callback();
  }
  /**刷新验证码*/
  handleChangeCheckCode() {
    this.currdatetime = new Date().getTime();
    this.model.inputCode = '';
    axios
      .get(`/api/randomImage/${this.currdatetime}`)
      .then(res => {
        this.randCodeImage = res.data;
        this.requestCodeSuccess = true;
      })
      .catch(err => {
        this.requestCodeSuccess = false;
        this.$message.error(err.message);
      });
  }

  /**跳转到登录页面的参数-账号获取*/
  getRouterData() {
    this.$nextTick(() => {
      let temp = this.$route.params.username || this.$route.query.username || '';
      if (temp) {
        this.model['username'] = temp;
      }
    });
  }

  handleRememberMeChange(e) {
    this.model.rememberMe = e.target.checked;
  }

  //登录
  handleSubmit() {
    let that = this;
    let loginParams = {};
    that.loginBtn = true;
    // 使用账户密码登录
    if (that.customActiveKey === 'tab1') {
      this.loginByUsername();
    } else {
      this.loginByPhone();
    }
  }

  /**
   * 验证字段
   * @param arr
   * @param callback
   */
  validateFields(arr, callback) {
    let promiseArray = [];
    for (let item of arr) {
      let p = new Promise((resolve, reject) => {
        this.form.validateField(item, err => {
          if (!err) {
            resolve(item);
          } else {
            reject(err);
          }
        });
      });
      promiseArray.push(p);
    }
    Promise.all(promiseArray)
      .then(() => {
        callback();
      })
      .catch(err => {
        callback(err);
      });
  }

  //账号密码登录
  loginByUsername() {
    this.validateFields(['username', 'password', 'inputCode'], err => {
      if (!err) {
        let loginParams = {
          username: this.model.username,
          password: this.model.password,
          remember_me: this.model.rememberMe,
          captcha: this.model.inputCode,
          checkKey: this.currdatetime,
        };
        axios
          .post('/api/authenticate', loginParams)
          .then(res => {
            const bearerToken = res.headers.authorization;
            if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
              const jwt = bearerToken.slice(7, bearerToken.length);
              this.$store.commit('SET_TOKEN', jwt);
              if (this.model.rememberMe) {
                localStorage.setItem('jhi-authenticationToken', jwt);
                sessionStorage.removeItem('jhi-authenticationToken');
              } else {
                sessionStorage.setItem('jhi-authenticationToken', jwt);
                localStorage.removeItem('jhi-authenticationToken');
              }
            }
            this.accountService().retrieveAccount();
            // 弹出租户选择窗口
          })
          .catch(error => {
            this.requestFailed(error);
          });
      } else {
        this.loginBtn = false;
      }
    });
  }

  //手机号码登录
  loginByPhone() {
    this.validateFields(['mobile', 'captcha'], err => {
      if (!err) {
        let loginParams = {
          mobile: this.model.mobile,
          captcha: this.model.captcha,
          remember_me: this.model.rememberMe,
        };
        this.PhoneLogin(loginParams)
          .then(res => {
            console.log(res.result);
            this.loginSelect.show(res.result);
          })
          .catch(err => {
            this.requestFailed(err);
          });
      } else {
        this.loginBtn = false;
      }
    });
  }

  //登录后台失败
  requestFailed(err) {
    let description = ((err.response || {}).data || {}).message || err.message || '请求出现错误，请稍后再试';
    this.$notification['error']({
      message: '登录失败',
      description: description,
      duration: 4,
    });
    //密码错误后更新验证码
    if (description.indexOf('密码错误') > 0) {
      this.handleChangeCheckCode();
    }
    this.loginBtn = false;
  }

  loginSelectOk() {
    this.loginSuccess();
  }

  //登录成功
  loginSuccess() {
    this.$router.push({ path: '/dashboard/analysis' }).catch(() => {
      console.log('登录跳转首页出错,这个错误从哪里来的');
    });
    this.$notification.success({
      message: '欢迎',
      description: `${timeFix()}，欢迎回来`,
    });
  }

  validateMobile(rule, value, callback) {
    if (!value || new RegExp(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/).test(value)) {
      callback();
    } else {
      callback('您的手机号码格式不正确!');
    }
  }

  //获取验证码
  getCaptcha(e) {
    e.preventDefault();
    let that = this;
    that.validateFields(['mobile'], err => {
      if (!err) {
        that.state.smsSendBtn = true;
        let interval = window.setInterval(() => {
          if (that.state.time-- <= 0) {
            that.state.time = 60;
            that.state.smsSendBtn = false;
            window.clearInterval(interval);
          }
        }, 1000);

        const hide = that.$message.loading('验证码发送中..', 0);
        let smsParams: any = {};
        smsParams.mobile = that.model.mobile;
        smsParams.smsmode = '0';
        postAction('/sys/sms', smsParams)
          .then(res => {
            if (!res.data.success) {
              setTimeout(hide, 0);
              that.cmsFailed(res.data.message);
            }
            console.log(res);
            setTimeout(hide, 500);
          })
          .catch(err => {
            setTimeout(hide, 1);
            clearInterval(interval);
            that.state.time = 60;
            that.state.smsSendBtn = false;
            that.requestFailed(err);
          });
      }
    });
  }

  cmsFailed(err) {
    this.$notification['error']({
      message: '登录失败',
      description: err,
      duration: 4,
    });
  }

  stepCaptchaSuccess() {
    this.loginSuccess();
  }

  stepCaptchaCancel() {
    this.$store.dispatch('Logout').then(() => {
      this.loginBtn = false;
      this.stepCaptchaVisible = false;
    });
  }

  //获取密码加密规则
  getEncrypte() {
    var encryptedString = Vue.ls.get(ENCRYPTED_STRING);
    if (encryptedString == null) {
      getEncryptedString().then(data => {
        this.encryptedString = data;
      });
    } else {
      this.encryptedString = encryptedString;
    }
  }
}
