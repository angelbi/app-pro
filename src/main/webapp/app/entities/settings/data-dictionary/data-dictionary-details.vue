<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="dataDictionary">
        <h2 class="jh-entity-heading">
          <span v-text="$t('appApp.settingsDataDictionary.detail.title')">DataDictionary</span> {{ dataDictionary.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('appApp.settingsDataDictionary.id')">ID</span>
          </dt>
          <dd>
            <span>{{ dataDictionary.id }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.settingsDataDictionary.name')">Name</span>
          </dt>
          <dd>
            <span>{{ dataDictionary.name }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.settingsDataDictionary.code')">Code</span>
          </dt>
          <dd>
            <span>{{ dataDictionary.code }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.settingsDataDictionary.title')">Title</span>
          </dt>
          <dd>
            <span>{{ dataDictionary.title }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.settingsDataDictionary.value')">Value</span>
          </dt>
          <dd>
            <span>{{ dataDictionary.value }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.settingsDataDictionary.description')">Description</span>
          </dt>
          <dd>
            <span>{{ dataDictionary.description }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.settingsDataDictionary.sortOrder')">Sort Order</span>
          </dt>
          <dd>
            <span>{{ dataDictionary.sortOrder }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.settingsDataDictionary.disabled')">Disabled</span>
          </dt>
          <dd>
            <span>{{ dataDictionary.disabled }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.settingsDataDictionary.fontColor')">Font Color</span>
          </dt>
          <dd>
            <span>{{ dataDictionary.fontColor }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.settingsDataDictionary.valueType')">Value Type</span>
          </dt>
          <dd>
            <span v-text="$t('appApp.DictType.' + dataDictionary.valueType)">{{ dataDictionary.valueType }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.settingsDataDictionary.backgroundColor')">Background Color</span>
          </dt>
          <dd>
            <span>{{ dataDictionary.backgroundColor }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.settingsDataDictionary.parent')">Parent</span>
          </dt>
          <dd>
            <div v-if="dataDictionary.parentId">
              <router-link :to="{ name: 'DataDictionaryView', params: { dataDictionaryId: dataDictionary.parentId } }">{{
                dataDictionary.parentName
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="dataDictionary.id"
          :to="{ name: 'DataDictionaryEdit', params: { dataDictionaryId: dataDictionary.id } }"
          tag="button"
          class="btn btn-primary"
        >
          <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./data-dictionary-details.component.ts"></script>
