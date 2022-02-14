<template>
  <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
    <a-form layout="inline" @submit.prevent="save" class="ant-advanced-update-form">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item :label="$t('appApp.announcement.id')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.announcement.id.$model" id="announcement-id" name="id" read-only />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.announcement.titile')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.announcement.titile.$model" id="announcement-titile" name="titile" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.announcement.startTime')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-date-picker id="announcement-startTime" name="startTime" show-time v-model="$v.announcement.startTime.$model">
            </a-date-picker>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.announcement.endTime')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-date-picker id="announcement-endTime" name="endTime" show-time v-model="$v.announcement.endTime.$model"> </a-date-picker>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.announcement.senderId')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.announcement.senderId.$model" id="announcement-senderId" name="senderId" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.announcement.priority')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-select placeholder="请选择" id="announcement-priority" name="priority" v-model="$v.announcement.priority.$model">
              <a-select-option value="HIGH">{{ $t('appApp.PriorityLevel.HIGH') }}</a-select-option>
              <a-select-option value="MEDIUM">{{ $t('appApp.PriorityLevel.MEDIUM') }}</a-select-option>
              <a-select-option value="LOW">{{ $t('appApp.PriorityLevel.LOW') }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.announcement.category')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-select placeholder="请选择" id="announcement-category" name="category" v-model="$v.announcement.category.$model">
              <a-select-option value="SYSTEM_INFO">{{ $t('appApp.AnnoCategory.SYSTEM_INFO') }}</a-select-option>
              <a-select-option value="NOTICE">{{ $t('appApp.AnnoCategory.NOTICE') }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.announcement.receiverType')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-select placeholder="请选择" id="announcement-receiverType" name="receiverType" v-model="$v.announcement.receiverType.$model">
              <a-select-option value="USER">{{ $t('appApp.ReceiverType.USER') }}</a-select-option>
              <a-select-option value="ALL">{{ $t('appApp.ReceiverType.ALL') }}</a-select-option>
              <a-select-option value="DEPARTMENT">{{ $t('appApp.ReceiverType.DEPARTMENT') }}</a-select-option>
              <a-select-option value="AUTHORITY">{{ $t('appApp.ReceiverType.AUTHORITY') }}</a-select-option>
              <a-select-option value="POSITION">{{ $t('appApp.ReceiverType.POSITION') }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.announcement.businessType')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-select placeholder="请选择" id="announcement-businessType" name="businessType" v-model="$v.announcement.businessType.$model">
              <a-select-option value="EMAIL">{{ $t('appApp.AnnoBusinessType.EMAIL') }}</a-select-option>
              <a-select-option value="WORKFLOW">{{ $t('appApp.AnnoBusinessType.WORKFLOW') }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.announcement.businessId')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.announcement.businessId.$model"
              id="announcement-businessId"
              name="businessId"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.announcement.openType')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-select placeholder="请选择" id="announcement-openType" name="openType" v-model="$v.announcement.openType.$model">
              <a-select-option value="URL">{{ $t('appApp.AnnoOpenType.URL') }}</a-select-option>
              <a-select-option value="COMPONENT">{{ $t('appApp.AnnoOpenType.COMPONENT') }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

        <a-col :span="8" v-if="receiveComponentProps.show">
          <a-form-item :label="$t('testjeecg18App.announcement.userIds')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <select-list-modal
              :selectListName="receiveComponentProps.selectListName"
              :props="receiveComponentProps.props"
              :option-props="receiveComponentProps.optionProps"
              v-model="$v.announcement.userIds.$model"
              id="announcement-userIds"
              name="userIds"
            ></select-list-modal>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item>
            <a-collapse defaultActiveKey="1" :bordered="false" :showArrow="false">
              <a-collapse-panel :header="$t('appApp.announcement.content')" key="1">
                <jhi-quill-editor v-model="$v.announcement.content.$model" id="announcement-content" name="content"></jhi-quill-editor>
              </a-collapse-panel>
              <a-collapse-panel :header="$t('appApp.announcement.summary')" key="2">
                <jhi-quill-editor v-model="$v.announcement.summary.$model" id="announcement-summary" name="summary"></jhi-quill-editor>
              </a-collapse-panel>
            </a-collapse>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="center">
        <a-col span="3">
          <a-button @click="previousState()">{{ $t('entity.action.cancel') }}</a-button>
        </a-col>
        <a-col span="3">
          <a-button html-type="submit" type="primary" :disabled="$v.announcement.$invalid || isSaving">{{
            $t('entity.action.save')
          }}</a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>
<script lang="ts" src="./announcement-update-template.component.ts"></script>
<style>
.ant-advanced-update-form .ant-form-item {
  display: flex;
}
.ant-advanced-update-form .ant-form-item-control-wrapper {
  flex: 1;
}
</style>
