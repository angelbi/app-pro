<template>
  <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
    <a-form layout="inline" @submit.prevent="save" class="ant-advanced-update-form">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemViewPermission.id')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.viewPermission.id.$model" id="view-permission-id" name="id" read-only />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemViewPermission.text')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.viewPermission.text.$model" id="view-permission-text" name="text" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemViewPermission.i18n')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.viewPermission.i18n.$model" id="view-permission-i18n" name="i18n" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemViewPermission.group')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-switch
              v-model="$v.viewPermission.group.$model"
              checkedChildren="是"
              unCheckedChildren="否"
              id="view-permission-group"
              name="group"
            ></a-switch>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemViewPermission.link')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.viewPermission.link.$model" id="view-permission-link" name="link" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemViewPermission.externalLink')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.viewPermission.externalLink.$model"
              id="view-permission-externalLink"
              name="externalLink"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemViewPermission.target')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-select placeholder="请选择" id="view-permission-target" name="target" v-model="$v.viewPermission.target.$model">
              <a-select-option value="BLANK">{{ $t('appApp.TargetType.BLANK') }}</a-select-option>
              <a-select-option value="SELF">{{ $t('appApp.TargetType.SELF') }}</a-select-option>
              <a-select-option value="PARENT">{{ $t('appApp.TargetType.PARENT') }}</a-select-option>
              <a-select-option value="TOP">{{ $t('appApp.TargetType.TOP') }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemViewPermission.icon')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.viewPermission.icon.$model" id="view-permission-icon" name="icon" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemViewPermission.disabled')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-switch
              v-model="$v.viewPermission.disabled.$model"
              checkedChildren="是"
              unCheckedChildren="否"
              id="view-permission-disabled"
              name="disabled"
            ></a-switch>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemViewPermission.hide')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-switch
              v-model="$v.viewPermission.hide.$model"
              checkedChildren="是"
              unCheckedChildren="否"
              id="view-permission-hide"
              name="hide"
            ></a-switch>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemViewPermission.hideInBreadcrumb')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-switch
              v-model="$v.viewPermission.hideInBreadcrumb.$model"
              checkedChildren="是"
              unCheckedChildren="否"
              id="view-permission-hideInBreadcrumb"
              name="hideInBreadcrumb"
            ></a-switch>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemViewPermission.shortcut')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-switch
              v-model="$v.viewPermission.shortcut.$model"
              checkedChildren="是"
              unCheckedChildren="否"
              id="view-permission-shortcut"
              name="shortcut"
            ></a-switch>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemViewPermission.shortcutRoot')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-switch
              v-model="$v.viewPermission.shortcutRoot.$model"
              checkedChildren="是"
              unCheckedChildren="否"
              id="view-permission-shortcutRoot"
              name="shortcutRoot"
            ></a-switch>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemViewPermission.reuse')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-switch
              v-model="$v.viewPermission.reuse.$model"
              checkedChildren="是"
              unCheckedChildren="否"
              id="view-permission-reuse"
              name="reuse"
            ></a-switch>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemViewPermission.code')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.viewPermission.code.$model" id="view-permission-code" name="code" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemViewPermission.description')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.viewPermission.description.$model"
              id="view-permission-description"
              name="description"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemViewPermission.type')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-select placeholder="请选择" id="view-permission-type" name="type" v-model="$v.viewPermission.type.$model">
              <a-select-option value="MENU">{{ $t('appApp.ViewPermissionType.MENU') }}</a-select-option>
              <a-select-option value="BUTTON">{{ $t('appApp.ViewPermissionType.BUTTON') }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemViewPermission.order')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.viewPermission.order.$model" id="view-permission-order" name="order" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemViewPermission.apiPermissionCodes')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.viewPermission.apiPermissionCodes.$model"
              id="view-permission-apiPermissionCodes"
              name="apiPermissionCodes"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemViewPermission.componentFile')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.viewPermission.componentFile.$model"
              id="view-permission-componentFile"
              name="componentFile"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemViewPermission.redirect')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.viewPermission.redirect.$model"
              id="view-permission-redirect"
              name="redirect"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.systemViewPermission.parent')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-select id="view-permission-parent" name="parent" v-model="viewPermission.parentId">
              <a-select-option
                v-bind:value="viewPermissionOption.id"
                v-for="viewPermissionOption in viewPermissions"
                :key="viewPermissionOption.id"
                >{{ viewPermissionOption.text }}</a-select-option
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
          <a-button html-type="submit" type="primary" :disabled="$v.viewPermission.$invalid || isSaving">{{
            $t('entity.action.save')
          }}</a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>
<script lang="ts" src="./view-permission-update-template.component.ts"></script>
<style>
.ant-advanced-update-form .ant-form-item {
  display: flex;
}
.ant-advanced-update-form .ant-form-item-control-wrapper {
  flex: 1;
}
</style>
