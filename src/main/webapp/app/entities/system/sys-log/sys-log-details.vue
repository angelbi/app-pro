<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="sysLog">
        <h2 class="jh-entity-heading"><span v-text="$t('appApp.sysLog.detail.title')">SysLog</span> {{ sysLog.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('appApp.sysLog.id')">ID</span>
          </dt>
          <dd>
            <span>{{ sysLog.id }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.sysLog.logType')">Log Type</span>
          </dt>
          <dd>
            <span v-text="$t('appApp.LogType.' + sysLog.logType)">{{ sysLog.logType }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.sysLog.logContent')">Log Content</span>
          </dt>
          <dd>
            <span>{{ sysLog.logContent }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.sysLog.operateType')">Operate Type</span>
          </dt>
          <dd>
            <span>{{ sysLog.operateType }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.sysLog.userid')">Userid</span>
          </dt>
          <dd>
            <span>{{ sysLog.userid }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.sysLog.username')">Username</span>
          </dt>
          <dd>
            <span>{{ sysLog.username }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.sysLog.ip')">Ip</span>
          </dt>
          <dd>
            <span>{{ sysLog.ip }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.sysLog.method')">Method</span>
          </dt>
          <dd>
            <span>{{ sysLog.method }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.sysLog.requestUrl')">Request Url</span>
          </dt>
          <dd>
            <span>{{ sysLog.requestUrl }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.sysLog.requestParam')">Request Param</span>
          </dt>
          <dd>
            <span>{{ sysLog.requestParam }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.sysLog.requestType')">Request Type</span>
          </dt>
          <dd>
            <span>{{ sysLog.requestType }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.sysLog.costTime')">Cost Time</span>
          </dt>
          <dd>
            <span>{{ sysLog.costTime }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="sysLog.id" :to="{ name: 'SysLogEdit', params: { sysLogId: sysLog.id } }" tag="button" class="btn btn-primary">
          <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./sys-log-details.component.ts"></script>
