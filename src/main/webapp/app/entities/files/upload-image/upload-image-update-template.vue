<template>
  <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
    <a-form layout="inline" @submit.prevent="save" class="ant-advanced-update-form">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesUploadImage.id')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.uploadImage.id.$model" id="upload-image-id" name="id" read-only />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesUploadImage.fullName')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.uploadImage.fullName.$model" id="upload-image-fullName" name="fullName" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesUploadImage.name')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.uploadImage.name.$model" id="upload-image-name" name="name" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesUploadImage.ext')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.uploadImage.ext.$model" id="upload-image-ext" name="ext" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesUploadImage.type')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.uploadImage.type.$model" id="upload-image-type" name="type" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesUploadImage.url')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.uploadImage.url.$model" id="upload-image-url" name="url" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesUploadImage.path')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.uploadImage.path.$model" id="upload-image-path" name="path" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesUploadImage.folder')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.uploadImage.folder.$model" id="upload-image-folder" name="folder" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesUploadImage.entityName')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.uploadImage.entityName.$model"
              id="upload-image-entityName"
              name="entityName"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesUploadImage.createAt')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-date-picker id="upload-image-createAt" name="createAt" show-time v-model="$v.uploadImage.createAt.$model"> </a-date-picker>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesUploadImage.fileSize')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.uploadImage.fileSize.$model" id="upload-image-fileSize" name="fileSize" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesUploadImage.smartUrl')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.uploadImage.smartUrl.$model" id="upload-image-smartUrl" name="smartUrl" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesUploadImage.mediumUrl')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.uploadImage.mediumUrl.$model"
              id="upload-image-mediumUrl"
              name="mediumUrl"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesUploadImage.referenceCount')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.uploadImage.referenceCount.$model"
              id="upload-image-referenceCount"
              name="referenceCount"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesUploadImage.user')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-select id="upload-image-user" name="user" v-model="uploadImage.userId">
              <a-select-option v-bind:value="userOption.id" v-for="userOption in users" :key="userOption.id">{{
                userOption.login
              }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesUploadImage.category')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-select id="upload-image-category" name="category" v-model="uploadImage.categoryId">
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
          <a-button html-type="submit" type="primary" :disabled="$v.uploadImage.$invalid || isSaving">{{
            $t('entity.action.save')
          }}</a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>
<script lang="ts" src="./upload-image-update-template.component.ts"></script>
<style>
.ant-advanced-update-form .ant-form-item {
  display: flex;
}
.ant-advanced-update-form .ant-form-item-control-wrapper {
  flex: 1;
}
</style>
