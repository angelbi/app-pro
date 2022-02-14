<template>
  <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
    <a-form layout="inline" @submit.prevent="save" class="ant-advanced-update-form">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item :label="$t('appApp.settingsDataDictionary.id')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.dataDictionary.id.$model" id="data-dictionary-id" name="id" read-only />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.settingsDataDictionary.name')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.dataDictionary.name.$model" id="data-dictionary-name" name="name" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.settingsDataDictionary.code')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.dataDictionary.code.$model" id="data-dictionary-code" name="code" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.settingsDataDictionary.title')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.dataDictionary.title.$model" id="data-dictionary-title" name="title" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.settingsDataDictionary.value')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input placeholder="input placeholder" v-model="$v.dataDictionary.value.$model" id="data-dictionary-value" name="value" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.settingsDataDictionary.description')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.dataDictionary.description.$model"
              id="data-dictionary-description"
              name="description"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.settingsDataDictionary.sortOrder')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.dataDictionary.sortOrder.$model"
              id="data-dictionary-sortOrder"
              name="sortOrder"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.settingsDataDictionary.disabled')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-switch
              v-model="$v.dataDictionary.disabled.$model"
              checkedChildren="是"
              unCheckedChildren="否"
              id="data-dictionary-disabled"
              name="disabled"
            ></a-switch>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.settingsDataDictionary.fontColor')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.dataDictionary.fontColor.$model"
              id="data-dictionary-fontColor"
              name="fontColor"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.settingsDataDictionary.valueType')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-select placeholder="请选择" id="data-dictionary-valueType" name="valueType" v-model="$v.dataDictionary.valueType.$model">
              <a-select-option value="NUMBER">{{ $t('appApp.DictType.NUMBER') }}</a-select-option>
              <a-select-option value="STRING">{{ $t('appApp.DictType.STRING') }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.settingsDataDictionary.backgroundColor')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-input
              placeholder="input placeholder"
              v-model="$v.dataDictionary.backgroundColor.$model"
              id="data-dictionary-backgroundColor"
              name="backgroundColor"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label="$t('appApp.settingsDataDictionary.parent')" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-select id="data-dictionary-parent" name="parent" v-model="dataDictionary.parentId">
              <a-select-option
                v-bind:value="dataDictionaryOption.id"
                v-for="dataDictionaryOption in dataDictionaries"
                :key="dataDictionaryOption.id"
                >{{ dataDictionaryOption.name }}</a-select-option
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
          <a-button html-type="submit" type="primary" :disabled="$v.dataDictionary.$invalid || isSaving">{{
            $t('entity.action.save')
          }}</a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>
<script lang="ts" src="./data-dictionary-update-template.component.ts"></script>
<style>
.ant-advanced-update-form .ant-form-item {
  display: flex;
}
.ant-advanced-update-form .ant-form-item-control-wrapper {
  flex: 1;
}
</style>
