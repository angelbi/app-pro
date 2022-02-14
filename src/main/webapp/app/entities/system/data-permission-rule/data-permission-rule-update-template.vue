<template>
  <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
    <a-form layout="inline" @submit.prevent="save" class="ant-advanced-update-form">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item :label="$t('appApp.dataPermissionRule.id')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.dataPermissionRule.id.$model"
              id="data-permission-rule-id"
              name="id"
              read-only
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.dataPermissionRule.permissionId')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.dataPermissionRule.permissionId.$model"
              id="data-permission-rule-permissionId"
              name="permissionId"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.dataPermissionRule.name')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.dataPermissionRule.name.$model"
              id="data-permission-rule-name"
              name="name"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.dataPermissionRule.column')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.dataPermissionRule.column.$model"
              id="data-permission-rule-column"
              name="column"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.dataPermissionRule.conditions')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.dataPermissionRule.conditions.$model"
              id="data-permission-rule-conditions"
              name="conditions"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.dataPermissionRule.value')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.dataPermissionRule.value.$model"
              id="data-permission-rule-value"
              name="value"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.dataPermissionRule.disabled')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-switch
              v-model="$v.dataPermissionRule.disabled.$model"
              checkedChildren="是"
              unCheckedChildren="否"
              id="data-permission-rule-disabled"
              name="disabled"
            ></a-switch>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="center">
        <a-col span="3">
          <a-button @click="previousState()">{{ $t('entity.action.cancel') }}</a-button>
        </a-col>
        <a-col span="3">
          <a-button html-type="submit" type="primary" :disabled="$v.dataPermissionRule.$invalid || isSaving">{{
            $t('entity.action.save')
          }}</a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>
<script lang="ts" src="./data-permission-rule-update-template.component.ts"></script>
<style>
.ant-advanced-update-form .ant-form-item {
  display: flex;
}
.ant-advanced-update-form .ant-form-item-control-wrapper {
  flex: 1;
}
</style>
