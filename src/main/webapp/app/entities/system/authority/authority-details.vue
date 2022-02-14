<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="authority">
        <h2 class="jh-entity-heading"><span v-text="$t('appApp.systemAuthority.detail.title')">Authority</span> {{ authority.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('appApp.systemAuthority.id')">ID</span>
          </dt>
          <dd>
            <span>{{ authority.id }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemAuthority.name')">Name</span>
          </dt>
          <dd>
            <span>{{ authority.name }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemAuthority.code')">Code</span>
          </dt>
          <dd>
            <span>{{ authority.code }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemAuthority.info')">Info</span>
          </dt>
          <dd>
            <span>{{ authority.info }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemAuthority.order')">Order</span>
          </dt>
          <dd>
            <span>{{ authority.order }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemAuthority.display')">Display</span>
          </dt>
          <dd>
            <span>{{ authority.display }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemAuthority.parent')">Parent</span>
          </dt>
          <dd>
            <div v-if="authority.parentId">
              <router-link :to="{ name: 'AuthorityView', params: { authorityId: authority.parentId } }">{{
                authority.parentName
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemAuthority.apiPermissions')">Api Permissions</span>
          </dt>
          <dd>
            <span v-for="(apiPermissions, i) in authority.apiPermissions" :key="apiPermissions.id"
              >{{ i > 0 ? ', ' : '' }}
              <router-link :to="{ name: 'ApiPermissionView', params: { apiPermissionId: apiPermissions.id } }">{{
                apiPermissions.name
              }}</router-link>
            </span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemAuthority.viewPermissions')">View Permissions</span>
          </dt>
          <dd>
            <span v-for="(viewPermissions, i) in authority.viewPermissions" :key="viewPermissions.id"
              >{{ i > 0 ? ', ' : '' }}
              <router-link :to="{ name: 'ViewPermissionView', params: { viewPermissionId: viewPermissions.id } }">{{
                viewPermissions.text
              }}</router-link>
            </span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="authority.id"
          :to="{ name: 'AuthorityEdit', params: { authorityId: authority.id } }"
          tag="button"
          class="btn btn-primary"
        >
          <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./authority-details.component.ts"></script>
