<template>
  <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
    <a-form layout="inline" @submit.prevent="save" class="ant-advanced-update-form">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesResourceCategory.id')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.resourceCategory.id.$model"
              id="resource-category-id"
              name="id"
              read-only
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesResourceCategory.title')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.resourceCategory.title.$model" id="resource-category-title" name="title" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesResourceCategory.code')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.resourceCategory.code.$model" id="resource-category-code" name="code" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesResourceCategory.sort')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.resourceCategory.sort.$model" id="resource-category-sort" name="sort" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.filesResourceCategory.parent')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-select id="resource-category-parent" name="parent" v-model="resourceCategory.parentId">
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
          <a-button html-type="submit" type="primary" :disabled="$v.resourceCategory.$invalid || isSaving">{{
            $t('entity.action.save')
          }}</a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>
<script lang="ts" src="./resource-category-update-template.component.ts"></script>
<style>
.ant-advanced-update-form .ant-form-item {
  display: flex;
}
.ant-advanced-update-form .ant-form-item-control-wrapper {
  flex: 1;
}
</style>
