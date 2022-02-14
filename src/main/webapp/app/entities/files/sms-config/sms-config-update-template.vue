<template>
  <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
    <a-form layout="inline" @submit.prevent="save" class="ant-advanced-update-form">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesSmsConfig.id')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.smsConfig.id.$model" id="sms-config-id" name="id" read-only />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesSmsConfig.provider')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-select placeholder="请选择" id="sms-config-provider" name="provider" v-model="$v.smsConfig.provider.$model">
              <a-select-option value="YUNPIAN">{{ $t('appApp.SmsProvider.YUNPIAN') }}</a-select-option>
              <a-select-option value="QINIU">{{ $t('appApp.SmsProvider.QINIU') }}</a-select-option>
              <a-select-option value="ALI">{{ $t('appApp.SmsProvider.ALI') }}</a-select-option>
              <a-select-option value="TENCENT">{{ $t('appApp.SmsProvider.TENCENT') }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesSmsConfig.smsCode')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.smsConfig.smsCode.$model" id="sms-config-smsCode" name="smsCode" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesSmsConfig.templateId')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.smsConfig.templateId.$model"
              id="sms-config-templateId"
              name="templateId"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesSmsConfig.accessKey')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.smsConfig.accessKey.$model" id="sms-config-accessKey" name="accessKey" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesSmsConfig.secretKey')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.smsConfig.secretKey.$model" id="sms-config-secretKey" name="secretKey" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesSmsConfig.regionId')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.smsConfig.regionId.$model" id="sms-config-regionId" name="regionId" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesSmsConfig.signName')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.smsConfig.signName.$model" id="sms-config-signName" name="signName" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesSmsConfig.remark')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.smsConfig.remark.$model" id="sms-config-remark" name="remark" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesSmsConfig.enabled')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-switch
              v-model="$v.smsConfig.enabled.$model"
              checkedChildren="是"
              unCheckedChildren="否"
              id="sms-config-enabled"
              name="enabled"
            ></a-switch>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="center">
        <a-col span="3">
          <a-button @click="previousState()">{{ $t('entity.action.cancel') }}</a-button>
        </a-col>
        <a-col span="3">
          <a-button html-type="submit" type="primary" :disabled="$v.smsConfig.$invalid || isSaving">{{
            $t('entity.action.save')
          }}</a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>
<script lang="ts" src="./sms-config-update-template.component.ts"></script>
<style>
.ant-advanced-update-form .ant-form-item {
  display: flex;
}
.ant-advanced-update-form .ant-form-item-control-wrapper {
  flex: 1;
}
</style>
