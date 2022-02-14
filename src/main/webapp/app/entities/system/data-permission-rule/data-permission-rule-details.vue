<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="dataPermissionRule">
        <h2 class="jh-entity-heading">
          <span v-text="$t('appApp.dataPermissionRule.detail.title')">DataPermissionRule</span> {{ dataPermissionRule.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('appApp.dataPermissionRule.id')">ID</span>
          </dt>
          <dd>
            <span>{{ dataPermissionRule.id }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.dataPermissionRule.permissionId')">Permission Id</span>
          </dt>
          <dd>
            <span>{{ dataPermissionRule.permissionId }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.dataPermissionRule.name')">Name</span>
          </dt>
          <dd>
            <span>{{ dataPermissionRule.name }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.dataPermissionRule.column')">Column</span>
          </dt>
          <dd>
            <span>{{ dataPermissionRule.column }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.dataPermissionRule.conditions')">Conditions</span>
          </dt>
          <dd>
            <span>{{ dataPermissionRule.conditions }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.dataPermissionRule.value')">Value</span>
          </dt>
          <dd>
            <span>{{ dataPermissionRule.value }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.dataPermissionRule.disabled')">Disabled</span>
          </dt>
          <dd>
            <span>{{ dataPermissionRule.disabled }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="dataPermissionRule.id"
          :to="{ name: 'DataPermissionRuleEdit', params: { dataPermissionRuleId: dataPermissionRule.id } }"
          tag="button"
          class="btn btn-primary"
        >
          <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./data-permission-rule-details.component.ts"></script>
