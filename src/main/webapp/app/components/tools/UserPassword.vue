<template>
  <a-modal
    :title="title"
    :width="modalWidth"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="旧密码">
          <a-input type="password" placeholder="请输入旧密码" v-decorator="['currentPassword', validatorRules.currentPassword]" />
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="新密码">
          <a-input type="password" placeholder="请输入新密码" v-decorator="['newPassword', validatorRules.newPassword]" />
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="确认新密码">
          <a-input
            type="password"
            @blur="handleConfirmBlur"
            placeholder="请确认新密码"
            v-decorator="['confirmpassword', validatorRules.confirmpassword]"
          />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserPassword',
  data() {
    return {
      title: '修改密码',
      modalWidth: 800,
      visible: false,
      confirmLoading: false,
      validatorRules: {
        currentPassword: {
          rules: [
            {
              required: true,
              message: '请输入旧密码!',
            },
          ],
        },
        newPassword: {
          rules: [
            {
              required: true,
              message: '请输入新密码!',
            },
            {
              validator: this.validateToNextPassword,
            },
          ],
        },
        confirmpassword: {
          rules: [
            {
              required: true,
              message: '请确认新密码!',
            },
            {
              validator: this.compareToFirstPassword,
            },
          ],
        },
      },
      confirmDirty: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },

      form: this.$form.createForm(this),
      url: 'api/account/change-password',
      username: '',
    };
  },
  methods: {
    show(uname) {
      if (!uname) {
        this.$message.warning('当前系统无登录用户!');
      } else {
        this.username = uname;
        this.form.resetFields();
        this.visible = true;
      }
    },
    handleCancel() {
      this.close();
    },
    close() {
      this.$emit('close');
      this.visible = false;
      this.disableSubmit = false;
      this.selectedRole = [];
    },
    handleOk() {
      const that = this;
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true;
          let params = Object.assign({ username: this.username }, values);
          console.log('修改密码提交数据', params);
          axios
            .post(this.url, params)
            .then(res => {
              that.$message.success('修改成功。');
              that.close();
              that.confirmLoading = false;
            })
            .catch(
              error => {
                that.$message.warning('修改密码失败，请确认原密码是否正确。');
                that.confirmLoading = false;
                console.log(error);
              },
              () => {
                that.confirmLoading = false;
              }
            );
        }
      });
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue('newPassword')) {
        callback('两次输入的密码不一样！');
      } else {
        callback();
      }
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
  },
};
</script>

<style scoped></style>
