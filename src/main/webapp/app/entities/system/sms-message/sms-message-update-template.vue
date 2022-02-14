<template>
  <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
    <a-form layout="inline" @submit.prevent="save" class="ant-advanced-update-form">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item :label="$t('appApp.smsMessage.id')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.smsMessage.id.$model" id="sms-message-id" name="id" read-only />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.smsMessage.title')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.smsMessage.title.$model" id="sms-message-title" name="title" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.smsMessage.sendType')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-select placeholder="请选择" id="sms-message-sendType" name="sendType" v-model="$v.smsMessage.sendType.$model">
              <a-select-option value="EMAIL">{{ $t('appApp.MessageSendType.EMAIL') }}</a-select-option>
              <a-select-option value="SMS">{{ $t('appApp.MessageSendType.SMS') }}</a-select-option>
              <a-select-option value="WECHAT">{{ $t('appApp.MessageSendType.WECHAT') }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.smsMessage.receiver')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.smsMessage.receiver.$model" id="sms-message-receiver" name="receiver" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.smsMessage.params')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.smsMessage.params.$model" id="sms-message-params" name="params" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.smsMessage.sendTime')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-date-picker id="sms-message-sendTime" name="sendTime" show-time v-model="$v.smsMessage.sendTime.$model"> </a-date-picker>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.smsMessage.sendStatus')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-select placeholder="请选择" id="sms-message-sendStatus" name="sendStatus" v-model="$v.smsMessage.sendStatus.$model">
              <a-select-option value="WAITING">{{ $t('appApp.SendStatus.WAITING') }}</a-select-option>
              <a-select-option value="SUCCESS">{{ $t('appApp.SendStatus.SUCCESS') }}</a-select-option>
              <a-select-option value="FAILURE">{{ $t('appApp.SendStatus.FAILURE') }}</a-select-option>
              <a-select-option value="NOT_TRY">{{ $t('appApp.SendStatus.NOT_TRY') }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.smsMessage.retryNum')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.smsMessage.retryNum.$model" id="sms-message-retryNum" name="retryNum" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.smsMessage.failResult')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.smsMessage.failResult.$model"
              id="sms-message-failResult"
              name="failResult"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.smsMessage.remark')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.smsMessage.remark.$model" id="sms-message-remark" name="remark" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item>
            <a-collapse defaultActiveKey="1" :bordered="false" :showArrow="false">
              <a-collapse-panel :header="$t('appApp.smsMessage.content')" key="1">
                <jhi-quill-editor v-model="$v.smsMessage.content.$model" id="sms-message-content" name="content"></jhi-quill-editor>
              </a-collapse-panel>
            </a-collapse>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="center">
        <a-col span="3">
          <a-button @click="previousState()">{{ $t('entity.action.cancel') }}</a-button>
        </a-col>
        <a-col span="3">
          <a-button html-type="submit" type="primary" :disabled="$v.smsMessage.$invalid || isSaving">{{
            $t('entity.action.save')
          }}</a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>
<script lang="ts" src="./sms-message-update-template.component.ts"></script>
<style>
.ant-advanced-update-form .ant-form-item {
  display: flex;
}
.ant-advanced-update-form .ant-form-item-control-wrapper {
  flex: 1;
}
</style>
