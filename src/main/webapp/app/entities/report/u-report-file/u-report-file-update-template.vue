<template>
  <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
    <a-form layout="inline" @submit.prevent="save" class="ant-advanced-update-form">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item :label="$t('appApp.reportUReportFile.id')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.uReportFile.id.$model" id="u-report-file-id" name="id" read-only />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.reportUReportFile.name')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.uReportFile.name.$model" id="u-report-file-name" name="name" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.reportUReportFile.createAt')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-date-picker id="u-report-file-createAt" name="createAt" show-time v-model="$v.uReportFile.createAt.$model"> </a-date-picker>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.reportUReportFile.updateAt')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-date-picker id="u-report-file-updateAt" name="updateAt" show-time v-model="$v.uReportFile.updateAt.$model"> </a-date-picker>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item>
            <a-collapse defaultActiveKey="1" :bordered="false" :showArrow="false">
              <a-collapse-panel :header="$t('appApp.reportUReportFile.content')" key="1">
                <jhi-quill-editor v-model="$v.uReportFile.content.$model" id="u-report-file-content" name="content"></jhi-quill-editor>
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
          <a-button html-type="submit" type="primary" :disabled="$v.uReportFile.$invalid || isSaving">{{
            $t('entity.action.save')
          }}</a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>
<script lang="ts" src="./u-report-file-update-template.component.ts"></script>
<style>
.ant-advanced-update-form .ant-form-item {
  display: flex;
}
.ant-advanced-update-form .ant-form-item-control-wrapper {
  flex: 1;
}
</style>
