<template>
  <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
    <a-form layout="inline" @submit.prevent="save" class="ant-advanced-update-form">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemAuthority.id')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.authority.id.$model" id="authority-id" name="id" read-only />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemAuthority.name')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.authority.name.$model" id="authority-name" name="name" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemAuthority.code')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.authority.code.$model" id="authority-code" name="code" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemAuthority.info')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.authority.info.$model" id="authority-info" name="info" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemAuthority.order')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.authority.order.$model" id="authority-order" name="order" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemAuthority.display')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-switch
              v-model="$v.authority.display.$model"
              checkedChildren="是"
              unCheckedChildren="否"
              id="authority-display"
              name="display"
            ></a-switch>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemAuthority.parent')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-select id="authority-parent" name="parent" v-model="authority.parentId">
              <a-select-option v-bind:value="authorityOption.id" v-for="authorityOption in authorities" :key="authorityOption.id">{{
                authorityOption.name
              }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemAuthority.apiPermissions')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-tree-select
              allowClear
              id="authority-apiPermissions"
              name="apiPermissions"
              v-model="authority.apiPermissionsId"
              :treeData="apiPermissionNzTreeNodes"
              multiple
            >
            </a-tree-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemAuthority.viewPermissions')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-tree-select
              allowClear
              id="authority-viewPermissions"
              name="viewPermissions"
              v-model="authority.viewPermissionsId"
              :treeData="viewPermissionNzTreeNodes"
              multiple
            >
            </a-tree-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="center">
        <a-col span="3">
          <a-button @click="previousState()">{{ $t('entity.action.cancel') }}</a-button>
        </a-col>
        <a-col span="3">
          <a-button html-type="submit" type="primary" :disabled="$v.authority.$invalid || isSaving">{{
            $t('entity.action.save')
          }}</a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>
<script lang="ts" src="./authority-update-template.component.ts"></script>
<style>
.ant-advanced-update-form .ant-form-item {
  display: flex;
}
.ant-advanced-update-form .ant-form-item-control-wrapper {
  flex: 1;
}
</style>
