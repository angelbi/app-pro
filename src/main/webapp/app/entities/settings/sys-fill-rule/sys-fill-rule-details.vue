<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="sysFillRule">
        <h2 class="jh-entity-heading">
          <span v-text="$t('appApp.settingsSysFillRule.detail.title')">SysFillRule</span> {{ sysFillRule.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('appApp.settingsSysFillRule.id')">ID</span>
          </dt>
          <dd>
            <span>{{ sysFillRule.id }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.settingsSysFillRule.name')">Name</span>
          </dt>
          <dd>
            <span>{{ sysFillRule.name }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.settingsSysFillRule.code')">Code</span>
          </dt>
          <dd>
            <span>{{ sysFillRule.code }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.settingsSysFillRule.implClass')">Impl Class</span>
          </dt>
          <dd>
            <span>{{ sysFillRule.implClass }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.settingsSysFillRule.params')">Params</span>
          </dt>
          <dd>
            <span>{{ sysFillRule.params }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="sysFillRule.id"
          :to="{ name: 'SysFillRuleEdit', params: { sysFillRuleId: sysFillRule.id } }"
          tag="button"
          class="btn btn-primary"
        >
          <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./sys-fill-rule-details.component.ts"></script>
