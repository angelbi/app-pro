<template>
  <div class="main">
    <a-form-model ref="form" :model="model" :rules="validatorRules" class="user-layout-login">
      <a-tabs :activeKey="customActiveKey" :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }" @change="handleTabClick">
        <a-tab-pane key="tab1" tab="账号密码登录">
          <a-form-model-item required prop="username">
            <a-input v-model="model.username" size="large" placeholder="请输入帐户名 / admin">
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item required prop="password">
            <a-input v-model="model.password" size="large" type="password" autocomplete="false" placeholder="请输入密码 / admin">
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-model-item>
          <a-row :gutter="0">
            <a-col :span="16">
              <a-form-model-item required prop="inputCode">
                <a-input v-model="model.inputCode" size="large" type="text" placeholder="请输入验证码">
                  <a-icon slot="prefix" type="smile" :style="{ color: 'rgba(0,0,0,.25)' }" />
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="8" style="text-align: right">
              <img v-if="requestCodeSuccess" style="margin-top: 2px" :src="randCodeImage" @click="handleChangeCheckCode" />
              <img v-else style="margin-top: 2px" src="../../../content/checkcode.png" @click="handleChangeCheckCode" />
            </a-col>
          </a-row>
        </a-tab-pane>

        <a-tab-pane key="tab2" tab="手机号登录">
          <a-form-model-item required prop="mobile">
            <a-input v-model="model.mobile" size="large" type="text" placeholder="请输入手机号">
              <a-icon slot="prefix" type="mobile" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-model-item>
          <a-row :gutter="16">
            <a-col class="gutter-row" :span="16">
              <a-form-model-item required prop="captcha">
                <a-input v-model="model.captcha" size="large" type="text" placeholder="请输入验证码">
                  <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <a-button
                class="getCaptcha"
                tabindex="-1"
                :disabled="state.smsSendBtn"
                @click.stop.prevent="getCaptcha"
                v-text="(!state.smsSendBtn && '获取验证码') || state.time + ' s'"
              ></a-button>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>

      <a-form-model-item>
        <a-checkbox @change="handleRememberMeChange" default-checked>自动登录</a-checkbox>
        <router-link :to="{ name: 'alteration' }" class="forge-password" style="float: right"> 忘记密码</router-link>
        <router-link :to="{ name: 'register' }" class="forge-password" style="float: right; margin-right: 10px"> 注册账户 </router-link>
      </a-form-model-item>

      <a-form-item style="margin-top: 24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="loginBtn"
          @click.stop.prevent="handleSubmit"
          :disabled="loginBtn"
          >确定
        </a-button>
      </a-form-item>
    </a-form-model>

    <two-step-captcha
      v-if="requiredTwoStepCaptcha"
      :visible="stepCaptchaVisible"
      @success="stepCaptchaSuccess"
      @cancel="stepCaptchaCancel"
    ></two-step-captcha>
    <login-select-tenant ref="loginSelect" @success="loginSelectOk"></login-select-tenant>
    <!--    <third-login ref="thirdLogin"></third-login>-->
  </div>
</template>

<script lang="ts" src="./login.component.ts"></script>
<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
<style>
.valid-error .ant-select-selection__placeholder {
  color: #f5222d;
}
</style>
