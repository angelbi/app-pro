<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="smsTemplate">
        <h2 class="jh-entity-heading"><span v-text="$t('appApp.smsTemplate.detail.title')">SmsTemplate</span> {{ smsTemplate.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('appApp.smsTemplate.id')">ID</span>
          </dt>
          <dd>
            <span>{{ smsTemplate.id }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.smsTemplate.name')">Name</span>
          </dt>
          <dd>
            <span>{{ smsTemplate.name }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.smsTemplate.code')">Code</span>
          </dt>
          <dd>
            <span>{{ smsTemplate.code }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.smsTemplate.type')">Type</span>
          </dt>
          <dd>
            <span v-text="$t('appApp.MessageSendType.' + smsTemplate.type)">{{ smsTemplate.type }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.smsTemplate.content')">Content</span>
          </dt>
          <dd>
            <span>{{ smsTemplate.content }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.smsTemplate.testJson')">Test Json</span>
          </dt>
          <dd>
            <span>{{ smsTemplate.testJson }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="smsTemplate.id"
          :to="{ name: 'SmsTemplateEdit', params: { smsTemplateId: smsTemplate.id } }"
          tag="button"
          class="btn btn-primary"
        >
          <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./sms-template-details.component.ts"></script>
