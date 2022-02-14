<template>
  <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
    <a-form layout="inline" @submit.prevent="save" class="ant-advanced-update-form">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item :label="$t('appApp.settingsPosition.id')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.position.id.$model" id="position-id" name="id" read-only />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.settingsPosition.code')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.position.code.$model" id="position-code" name="code" required />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.settingsPosition.name')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.position.name.$model" id="position-name" name="name" required />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.settingsPosition.sortNo')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.position.sortNo.$model" id="position-sortNo" name="sortNo" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.settingsPosition.description')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.position.description.$model"
              id="position-description"
              name="description"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="center">
        <a-col span="3">
          <a-button @click="previousState()">{{ $t('entity.action.cancel') }}</a-button>
        </a-col>
        <a-col span="3">
          <a-button html-type="submit" type="primary" :disabled="$v.position.$invalid || isSaving">{{ $t('entity.action.save') }}</a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>
<script lang="ts" src="./position-update-template.component.ts"></script>
<style>
.ant-advanced-update-form .ant-form-item {
  display: flex;
}
.ant-advanced-update-form .ant-form-item-control-wrapper {
  flex: 1;
}
</style>
