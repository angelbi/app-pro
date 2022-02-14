<template>
  <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
    <a-form layout="inline" @submit.prevent="save" class="ant-advanced-update-form">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesUploadFile.id')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.uploadFile.id.$model" id="upload-file-id" name="id" read-only />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesUploadFile.fullName')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.uploadFile.fullName.$model" id="upload-file-fullName" name="fullName" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesUploadFile.name')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.uploadFile.name.$model" id="upload-file-name" name="name" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesUploadFile.ext')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.uploadFile.ext.$model" id="upload-file-ext" name="ext" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesUploadFile.type')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.uploadFile.type.$model" id="upload-file-type" name="type" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesUploadFile.url')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.uploadFile.url.$model" id="upload-file-url" name="url" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesUploadFile.path')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.uploadFile.path.$model" id="upload-file-path" name="path" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesUploadFile.folder')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.uploadFile.folder.$model" id="upload-file-folder" name="folder" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesUploadFile.entityName')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.uploadFile.entityName.$model"
              id="upload-file-entityName"
              name="entityName"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesUploadFile.createAt')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-date-picker id="upload-file-createAt" name="createAt" show-time v-model="$v.uploadFile.createAt.$model"> </a-date-picker>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesUploadFile.fileSize')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.uploadFile.fileSize.$model" id="upload-file-fileSize" name="fileSize" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesUploadFile.referenceCount')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.uploadFile.referenceCount.$model"
              id="upload-file-referenceCount"
              name="referenceCount"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesUploadFile.user')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-select id="upload-file-user" name="user" v-model="uploadFile.userId">
              <a-select-option v-bind:value="userOption.id" v-for="userOption in users" :key="userOption.id">{{
                userOption.login
              }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesUploadFile.category')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-select id="upload-file-category" name="category" v-model="uploadFile.categoryId">
              <a-select-option
                v-bind:value="resourceCategoryOption.id"
                v-for="resourceCategoryOption in resourceCategories"
                :key="resourceCategoryOption.id"
                >{{ resourceCategoryOption.title }}</a-select-option
              >
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="center">
        <a-col span="3">
          <a-button @click="previousState()">{{ $t('entity.action.cancel') }}</a-button>
        </a-col>
        <a-col span="3">
          <a-button html-type="submit" type="primary" :disabled="$v.uploadFile.$invalid || isSaving">{{
            $t('entity.action.save')
          }}</a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>
<script lang="ts" src="./upload-file-update-template.component.ts"></script>
<style>
.ant-advanced-update-form .ant-form-item {
  display: flex;
}
.ant-advanced-update-form .ant-form-item-control-wrapper {
  flex: 1;
}
</style>
