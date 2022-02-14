<template>
  <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
    <a-form layout="inline" @submit.prevent="save" class="ant-advanced-update-form">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item :label="$t('appApp.siteConfig.id')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.siteConfig.id.$model" id="site-config-id" name="id" read-only />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.siteConfig.title')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.siteConfig.title.$model" id="site-config-title" name="title" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.siteConfig.remark')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.siteConfig.remark.$model" id="site-config-remark" name="remark" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.siteConfig.fieldName')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.siteConfig.fieldName.$model" id="site-config-fieldName" name="fieldName" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.siteConfig.fieldValue')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.siteConfig.fieldValue.$model"
              id="site-config-fieldValue"
              name="fieldValue"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.siteConfig.fieldType')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-select placeholder="请选择" id="site-config-fieldType" name="fieldType" v-model="$v.siteConfig.fieldType.$model">
              <a-select-option value="INTEGER">{{ $t('appApp.CommonFieldType.INTEGER') }}</a-select-option>
              <a-select-option value="LONG">{{ $t('appApp.CommonFieldType.LONG') }}</a-select-option>
              <a-select-option value="BOOLEAN">{{ $t('appApp.CommonFieldType.BOOLEAN') }}</a-select-option>
              <a-select-option value="STRING">{{ $t('appApp.CommonFieldType.STRING') }}</a-select-option>
              <a-select-option value="FLOAT">{{ $t('appApp.CommonFieldType.FLOAT') }}</a-select-option>
              <a-select-option value="DOUBLE">{{ $t('appApp.CommonFieldType.DOUBLE') }}</a-select-option>
              <a-select-option value="ZONED_DATE_TIME">{{ $t('appApp.CommonFieldType.ZONED_DATE_TIME') }}</a-select-option>
              <a-select-option value="LOCATE_DATE">{{ $t('appApp.CommonFieldType.LOCATE_DATE') }}</a-select-option>
              <a-select-option value="BIG_DECIMAL">{{ $t('appApp.CommonFieldType.BIG_DECIMAL') }}</a-select-option>
              <a-select-option value="TEXTBLOB">{{ $t('appApp.CommonFieldType.TEXTBLOB') }}</a-select-option>
              <a-select-option value="IMAGEBLOB">{{ $t('appApp.CommonFieldType.IMAGEBLOB') }}</a-select-option>
              <a-select-option value="ARRAY">{{ $t('appApp.CommonFieldType.ARRAY') }}</a-select-option>
              <a-select-option value="ENUM">{{ $t('appApp.CommonFieldType.ENUM') }}</a-select-option>
              <a-select-option value="UPLOAD_IMAGE">{{ $t('appApp.CommonFieldType.UPLOAD_IMAGE') }}</a-select-option>
              <a-select-option value="UPLOAD_FILE">{{ $t('appApp.CommonFieldType.UPLOAD_FILE') }}</a-select-option>
              <a-select-option value="ENTITY">{{ $t('appApp.CommonFieldType.ENTITY') }}</a-select-option>
              <a-select-option value="RADIO">{{ $t('appApp.CommonFieldType.RADIO') }}</a-select-option>
              <a-select-option value="MULTI_SELECT">{{ $t('appApp.CommonFieldType.MULTI_SELECT') }}</a-select-option>
              <a-select-option value="DATA_DICTIONARY">{{ $t('appApp.CommonFieldType.DATA_DICTIONARY') }}</a-select-option>
              <a-select-option value="UUID">{{ $t('appApp.CommonFieldType.UUID') }}</a-select-option>
              <a-select-option value="INSTANT">{{ $t('appApp.CommonFieldType.INSTANT') }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="center">
        <a-col span="3">
          <a-button @click="previousState()">{{ $t('entity.action.cancel') }}</a-button>
        </a-col>
        <a-col span="3">
          <a-button html-type="submit" type="primary" :disabled="$v.siteConfig.$invalid || isSaving">{{
            $t('entity.action.save')
          }}</a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>
<script lang="ts" src="./site-config-update-template.component.ts"></script>
<style>
.ant-advanced-update-form .ant-form-item {
  display: flex;
}
.ant-advanced-update-form .ant-form-item-control-wrapper {
  flex: 1;
}
</style>
