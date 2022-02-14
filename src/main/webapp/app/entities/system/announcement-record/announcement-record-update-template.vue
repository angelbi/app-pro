<template>
  <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
    <a-form layout="inline" @submit.prevent="save" class="ant-advanced-update-form">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item :label="$t('appApp.announcementRecord.id')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.announcementRecord.id.$model"
              id="announcement-record-id"
              name="id"
              read-only
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.announcementRecord.anntId')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.announcementRecord.anntId.$model"
              id="announcement-record-anntId"
              name="anntId"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.announcementRecord.userId')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.announcementRecord.userId.$model"
              id="announcement-record-userId"
              name="userId"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.announcementRecord.hasRead')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-switch
              v-model="$v.announcementRecord.hasRead.$model"
              checkedChildren="是"
              unCheckedChildren="否"
              id="announcement-record-hasRead"
              name="hasRead"
            ></a-switch>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.announcementRecord.readTime')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-date-picker id="announcement-record-readTime" name="readTime" show-time v-model="$v.announcementRecord.readTime.$model">
            </a-date-picker>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="center">
        <a-col span="3">
          <a-button @click="previousState()">{{ $t('entity.action.cancel') }}</a-button>
        </a-col>
        <a-col span="3">
          <a-button html-type="submit" type="primary" :disabled="$v.announcementRecord.$invalid || isSaving">{{
            $t('entity.action.save')
          }}</a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>
<script lang="ts" src="./announcement-record-update-template.component.ts"></script>
<style>
.ant-advanced-update-form .ant-form-item {
  display: flex;
}
.ant-advanced-update-form .ant-form-item-control-wrapper {
  flex: 1;
}
</style>
