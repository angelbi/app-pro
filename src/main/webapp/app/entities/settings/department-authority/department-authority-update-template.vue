<template>
  <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
    <a-form layout="inline" @submit.prevent="save" class="ant-advanced-update-form">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item :label="$t('appApp.settingsDepartmentAuthority.id')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.departmentAuthority.id.$model"
              id="department-authority-id"
              name="id"
              read-only
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.settingsDepartmentAuthority.name')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.departmentAuthority.name.$model"
              id="department-authority-name"
              name="name"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.settingsDepartmentAuthority.code')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.departmentAuthority.code.$model"
              id="department-authority-code"
              name="code"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.settingsDepartmentAuthority.description')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.departmentAuthority.description.$model"
              id="department-authority-description"
              name="description"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.settingsDepartmentAuthority.createUserId')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.departmentAuthority.createUserId.$model"
              id="department-authority-createUserId"
              name="createUserId"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.settingsDepartmentAuthority.createTime')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-date-picker
              id="department-authority-createTime"
              name="createTime"
              show-time
              v-model="$v.departmentAuthority.createTime.$model"
            >
            </a-date-picker>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.settingsDepartmentAuthority.department')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-select id="department-authority-department" name="department" v-model="departmentAuthority.departmentId">
              <a-select-option v-bind:value="departmentOption.id" v-for="departmentOption in departments" :key="departmentOption.id">{{
                departmentOption.name
              }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="center">
        <a-col span="3">
          <a-button @click="previousState()">{{ $t('entity.action.cancel') }}</a-button>
        </a-col>
        <a-col span="3">
          <a-button html-type="submit" type="primary" :disabled="$v.departmentAuthority.$invalid || isSaving">{{
            $t('entity.action.save')
          }}</a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>
<script lang="ts" src="./department-authority-update-template.component.ts"></script>
<style>
.ant-advanced-update-form .ant-form-item {
  display: flex;
}
.ant-advanced-update-form .ant-form-item-control-wrapper {
  flex: 1;
}
</style>
