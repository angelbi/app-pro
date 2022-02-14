<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="siteConfig">
        <h2 class="jh-entity-heading"><span v-text="$t('appApp.siteConfig.detail.title')">SiteConfig</span> {{ siteConfig.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('appApp.siteConfig.id')">ID</span>
          </dt>
          <dd>
            <span>{{ siteConfig.id }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.siteConfig.title')">Title</span>
          </dt>
          <dd>
            <span>{{ siteConfig.title }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.siteConfig.remark')">Remark</span>
          </dt>
          <dd>
            <span>{{ siteConfig.remark }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.siteConfig.fieldName')">Field Name</span>
          </dt>
          <dd>
            <span>{{ siteConfig.fieldName }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.siteConfig.fieldValue')">Field Value</span>
          </dt>
          <dd>
            <span>{{ siteConfig.fieldValue }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.siteConfig.fieldType')">Field Type</span>
          </dt>
          <dd>
            <span v-text="$t('appApp.CommonFieldType.' + siteConfig.fieldType)">{{ siteConfig.fieldType }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="siteConfig.id"
          :to="{ name: 'SiteConfigEdit', params: { siteConfigId: siteConfig.id } }"
          tag="button"
          class="btn btn-primary"
        >
          <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./site-config-details.component.ts"></script>
