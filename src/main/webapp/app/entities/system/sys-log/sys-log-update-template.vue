<template>
  <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
    <a-form layout="inline" @submit.prevent="save" class="ant-advanced-update-form">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item :label="$t('appApp.sysLog.id')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.sysLog.id.$model" id="sys-log-id" name="id" read-only />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.sysLog.logType')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-select placeholder="请选择" id="sys-log-logType" name="logType" v-model="$v.sysLog.logType.$model">
              <a-select-option value="LOGIN">{{ $t('appApp.LogType.LOGIN') }}</a-select-option>
              <a-select-option value="OPERATE">{{ $t('appApp.LogType.OPERATE') }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.sysLog.logContent')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.sysLog.logContent.$model" id="sys-log-logContent" name="logContent" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.sysLog.operateType')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.sysLog.operateType.$model" id="sys-log-operateType" name="operateType" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.sysLog.userid')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.sysLog.userid.$model" id="sys-log-userid" name="userid" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.sysLog.username')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.sysLog.username.$model" id="sys-log-username" name="username" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.sysLog.ip')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.sysLog.ip.$model" id="sys-log-ip" name="ip" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.sysLog.method')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.sysLog.method.$model" id="sys-log-method" name="method" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.sysLog.requestUrl')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.sysLog.requestUrl.$model" id="sys-log-requestUrl" name="requestUrl" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.sysLog.requestType')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.sysLog.requestType.$model" id="sys-log-requestType" name="requestType" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.sysLog.costTime')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.sysLog.costTime.$model" id="sys-log-costTime" name="costTime" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item>
            <a-collapse defaultActiveKey="1" :bordered="false" :showArrow="false">
              <a-collapse-panel :header="$t('appApp.sysLog.requestParam')" key="1">
                <jhi-quill-editor v-model="$v.sysLog.requestParam.$model" id="sys-log-requestParam" name="requestParam"></jhi-quill-editor>
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
          <a-button html-type="submit" type="primary" :disabled="$v.sysLog.$invalid || isSaving">{{ $t('entity.action.save') }}</a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>
<script lang="ts" src="./sys-log-update-template.component.ts"></script>
<style>
.ant-advanced-update-form .ant-form-item {
  display: flex;
}
.ant-advanced-update-form .ant-form-item-control-wrapper {
  flex: 1;
}
</style>
