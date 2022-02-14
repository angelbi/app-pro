<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="smsMessage">
        <h2 class="jh-entity-heading"><span v-text="$t('appApp.smsMessage.detail.title')">SmsMessage</span> {{ smsMessage.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('appApp.smsMessage.id')">ID</span>
          </dt>
          <dd>
            <span>{{ smsMessage.id }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.smsMessage.title')">Title</span>
          </dt>
          <dd>
            <span>{{ smsMessage.title }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.smsMessage.sendType')">Send Type</span>
          </dt>
          <dd>
            <span v-text="$t('appApp.MessageSendType.' + smsMessage.sendType)">{{ smsMessage.sendType }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.smsMessage.receiver')">Receiver</span>
          </dt>
          <dd>
            <span>{{ smsMessage.receiver }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.smsMessage.params')">Params</span>
          </dt>
          <dd>
            <span>{{ smsMessage.params }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.smsMessage.content')">Content</span>
          </dt>
          <dd>
            <span>{{ smsMessage.content }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.smsMessage.sendTime')">Send Time</span>
          </dt>
          <dd>
            <span>{{ smsMessage.sendTime | formatDate }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.smsMessage.sendStatus')">Send Status</span>
          </dt>
          <dd>
            <span v-text="$t('appApp.SendStatus.' + smsMessage.sendStatus)">{{ smsMessage.sendStatus }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.smsMessage.retryNum')">Retry Num</span>
          </dt>
          <dd>
            <span>{{ smsMessage.retryNum }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.smsMessage.failResult')">Fail Result</span>
          </dt>
          <dd>
            <span>{{ smsMessage.failResult }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.smsMessage.remark')">Remark</span>
          </dt>
          <dd>
            <span>{{ smsMessage.remark }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="smsMessage.id"
          :to="{ name: 'SmsMessageEdit', params: { smsMessageId: smsMessage.id } }"
          tag="button"
          class="btn btn-primary"
        >
          <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./sms-message-details.component.ts"></script>
