<template>
  <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
    <a-form layout="inline" @submit.prevent="save" class="ant-advanced-update-form">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemUser.id')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.user.id.$model" id="user-id" name="id" read-only />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemUser.login')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.user.login.$model" id="user-login" name="login" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemUser.password')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.user.password.$model" id="user-password" name="password" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemUser.firstName')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.user.firstName.$model" id="user-firstName" name="firstName" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemUser.lastName')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.user.lastName.$model" id="user-lastName" name="lastName" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemUser.email')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.user.email.$model" id="user-email" name="email" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemUser.mobile')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.user.mobile.$model" id="user-mobile" name="mobile" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemUser.birthday')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-date-picker id="user-birthday" name="birthday" show-time v-model="$v.user.birthday.$model"> </a-date-picker>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemUser.activated')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-switch
              v-model="$v.user.activated.$model"
              checkedChildren="是"
              unCheckedChildren="否"
              id="user-activated"
              name="activated"
            ></a-switch>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemUser.langKey')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.user.langKey.$model" id="user-langKey" name="langKey" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemUser.imageUrl')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.user.imageUrl.$model" id="user-imageUrl" name="imageUrl" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemUser.activationKey')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.user.activationKey.$model" id="user-activationKey" name="activationKey" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemUser.resetKey')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.user.resetKey.$model" id="user-resetKey" name="resetKey" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemUser.resetDate')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-date-picker id="user-resetDate" name="resetDate" show-time v-model="$v.user.resetDate.$model"> </a-date-picker>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemUser.department')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-select id="user-department" name="department" v-model="user.departmentId">
              <a-select-option v-bind:value="departmentOption.id" v-for="departmentOption in departments" :key="departmentOption.id">{{
                departmentOption.name
              }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemUser.position')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-select id="user-position" name="position" v-model="user.positionId">
              <a-select-option v-bind:value="positionOption.id" v-for="positionOption in positions" :key="positionOption.id">{{
                positionOption.name
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
          <a-button html-type="submit" type="primary" :disabled="$v.user.$invalid || isSaving">{{ $t('entity.action.save') }}</a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>
<script lang="ts" src="./user-update-template.component.ts"></script>
<style>
.ant-advanced-update-form .ant-form-item {
  display: flex;
}
.ant-advanced-update-form .ant-form-item-control-wrapper {
  flex: 1;
}
</style>
