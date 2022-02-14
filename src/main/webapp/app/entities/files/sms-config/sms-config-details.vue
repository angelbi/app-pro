<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="smsConfig">
        <h2 class="jh-entity-heading"><span v-text="$t('appApp.filesSmsConfig.detail.title')">SmsConfig</span> {{ smsConfig.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('appApp.filesSmsConfig.id')">ID</span>
          </dt>
          <dd>
            <span>{{ smsConfig.id }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.filesSmsConfig.provider')">Provider</span>
          </dt>
          <dd>
            <span v-text="$t('appApp.SmsProvider.' + smsConfig.provider)">{{ smsConfig.provider }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.filesSmsConfig.smsCode')">Sms Code</span>
          </dt>
          <dd>
            <span>{{ smsConfig.smsCode }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.filesSmsConfig.templateId')">Template Id</span>
          </dt>
          <dd>
            <span>{{ smsConfig.templateId }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.filesSmsConfig.accessKey')">Access Key</span>
          </dt>
          <dd>
            <span>{{ smsConfig.accessKey }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.filesSmsConfig.secretKey')">Secret Key</span>
          </dt>
          <dd>
            <span>{{ smsConfig.secretKey }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.filesSmsConfig.regionId')">Region Id</span>
          </dt>
          <dd>
            <span>{{ smsConfig.regionId }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.filesSmsConfig.signName')">Sign Name</span>
          </dt>
          <dd>
            <span>{{ smsConfig.signName }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.filesSmsConfig.remark')">Remark</span>
          </dt>
          <dd>
            <span>{{ smsConfig.remark }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.filesSmsConfig.enabled')">Enabled</span>
          </dt>
          <dd>
            <span>{{ smsConfig.enabled }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="smsConfig.id"
          :to="{ name: 'SmsConfigEdit', params: { smsConfigId: smsConfig.id } }"
          tag="button"
          class="btn btn-primary"
        >
          <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./sms-config-details.component.ts"></script>
