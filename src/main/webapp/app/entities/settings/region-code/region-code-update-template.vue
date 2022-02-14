<template>
  <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
    <a-form layout="inline" @submit.prevent="save" class="ant-advanced-update-form">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item :label="$t('appApp.settingsRegionCode.id')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.regionCode.id.$model" id="region-code-id" name="id" read-only />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.settingsRegionCode.name')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.regionCode.name.$model" id="region-code-name" name="name" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.settingsRegionCode.areaCode')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.regionCode.areaCode.$model" id="region-code-areaCode" name="areaCode" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.settingsRegionCode.cityCode')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.regionCode.cityCode.$model" id="region-code-cityCode" name="cityCode" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.settingsRegionCode.mergerName')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.regionCode.mergerName.$model"
              id="region-code-mergerName"
              name="mergerName"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.settingsRegionCode.shortName')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.regionCode.shortName.$model" id="region-code-shortName" name="shortName" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.settingsRegionCode.zipCode')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.regionCode.zipCode.$model" id="region-code-zipCode" name="zipCode" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.settingsRegionCode.level')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-select placeholder="请选择" id="region-code-level" name="level" v-model="$v.regionCode.level.$model">
              <a-select-option value="PROVINCE">{{ $t('appApp.RegionCodeLevel.PROVINCE') }}</a-select-option>
              <a-select-option value="CITY">{{ $t('appApp.RegionCodeLevel.CITY') }}</a-select-option>
              <a-select-option value="COUNTY">{{ $t('appApp.RegionCodeLevel.COUNTY') }}</a-select-option>
              <a-select-option value="TOWN">{{ $t('appApp.RegionCodeLevel.TOWN') }}</a-select-option>
              <a-select-option value="VILLAGE">{{ $t('appApp.RegionCodeLevel.VILLAGE') }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.settingsRegionCode.lng')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.regionCode.lng.$model" id="region-code-lng" name="lng" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.settingsRegionCode.lat')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.regionCode.lat.$model" id="region-code-lat" name="lat" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.settingsRegionCode.parent')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-select id="region-code-parent" name="parent" v-model="regionCode.parentId">
              <a-select-option v-bind:value="regionCodeOption.id" v-for="regionCodeOption in regionCodes" :key="regionCodeOption.id">{{
                regionCodeOption.name
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
          <a-button html-type="submit" type="primary" :disabled="$v.regionCode.$invalid || isSaving">{{
            $t('entity.action.save')
          }}</a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>
<script lang="ts" src="./region-code-update-template.component.ts"></script>
<style>
.ant-advanced-update-form .ant-form-item {
  display: flex;
}
.ant-advanced-update-form .ant-form-item-control-wrapper {
  flex: 1;
}
</style>
