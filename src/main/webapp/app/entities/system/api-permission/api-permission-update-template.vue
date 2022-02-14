<template>
  <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
    <a-form layout="inline" @submit.prevent="save" class="ant-advanced-update-form">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemApiPermission.id')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.apiPermission.id.$model" id="api-permission-id" name="id" read-only />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemApiPermission.serviceName')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.apiPermission.serviceName.$model"
              id="api-permission-serviceName"
              name="serviceName"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemApiPermission.name')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.apiPermission.name.$model" id="api-permission-name" name="name" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemApiPermission.code')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.apiPermission.code.$model" id="api-permission-code" name="code" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemApiPermission.description')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.apiPermission.description.$model"
              id="api-permission-description"
              name="description"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemApiPermission.type')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-select placeholder="请选择" id="api-permission-type" name="type" v-model="$v.apiPermission.type.$model">
              <a-select-option value="BUSINESS">{{ $t('appApp.ApiPermissionType.BUSINESS') }}</a-select-option>
              <a-select-option value="API">{{ $t('appApp.ApiPermissionType.API') }}</a-select-option>
              <a-select-option value="ENTITY">{{ $t('appApp.ApiPermissionType.ENTITY') }}</a-select-option>
              <a-select-option value="MICRO_SERVICE">{{ $t('appApp.ApiPermissionType.MICRO_SERVICE') }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemApiPermission.method')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.apiPermission.method.$model" id="api-permission-method" name="method" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemApiPermission.url')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.apiPermission.url.$model" id="api-permission-url" name="url" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemApiPermission.status')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-select placeholder="请选择" id="api-permission-status" name="status" v-model="$v.apiPermission.status.$model">
              <a-select-option value="CONFIGURABLE">{{ $t('appApp.ApiPermissionState.CONFIGURABLE') }}</a-select-option>
              <a-select-option value="PERMIT_ALL">{{ $t('appApp.ApiPermissionState.PERMIT_ALL') }}</a-select-option>
              <a-select-option value="UNREACHABLE">{{ $t('appApp.ApiPermissionState.UNREACHABLE') }}</a-select-option>
              <a-select-option value="AUTHENTICATE">{{ $t('appApp.ApiPermissionState.AUTHENTICATE') }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemApiPermission.parent')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-select id="api-permission-parent" name="parent" v-model="apiPermission.parentId">
              <a-select-option
                v-bind:value="apiPermissionOption.id"
                v-for="apiPermissionOption in apiPermissions"
                :key="apiPermissionOption.id"
                >{{ apiPermissionOption.name }}</a-select-option
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
          <a-button html-type="submit" type="primary" :disabled="$v.apiPermission.$invalid || isSaving">{{
            $t('entity.action.save')
          }}</a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>
<script lang="ts" src="./api-permission-update-template.component.ts"></script>
<style>
.ant-advanced-update-form .ant-form-item {
  display: flex;
}
.ant-advanced-update-form .ant-form-item-control-wrapper {
  flex: 1;
}
</style>
