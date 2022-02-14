<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="viewPermission">
        <h2 class="jh-entity-heading">
          <span v-text="$t('appApp.systemViewPermission.detail.title')">ViewPermission</span> {{ viewPermission.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('appApp.systemViewPermission.id')">ID</span>
          </dt>
          <dd>
            <span>{{ viewPermission.id }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemViewPermission.text')">Text</span>
          </dt>
          <dd>
            <span>{{ viewPermission.text }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemViewPermission.i18n')">I 18 N</span>
          </dt>
          <dd>
            <span>{{ viewPermission.i18n }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemViewPermission.group')">Group</span>
          </dt>
          <dd>
            <span>{{ viewPermission.group }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemViewPermission.link')">Link</span>
          </dt>
          <dd>
            <span>{{ viewPermission.link }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemViewPermission.externalLink')">External Link</span>
          </dt>
          <dd>
            <span>{{ viewPermission.externalLink }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemViewPermission.target')">Target</span>
          </dt>
          <dd>
            <span v-text="$t('appApp.TargetType.' + viewPermission.target)">{{ viewPermission.target }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemViewPermission.icon')">Icon</span>
          </dt>
          <dd>
            <span>{{ viewPermission.icon }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemViewPermission.disabled')">Disabled</span>
          </dt>
          <dd>
            <span>{{ viewPermission.disabled }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemViewPermission.hide')">Hide</span>
          </dt>
          <dd>
            <span>{{ viewPermission.hide }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemViewPermission.hideInBreadcrumb')">Hide In Breadcrumb</span>
          </dt>
          <dd>
            <span>{{ viewPermission.hideInBreadcrumb }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemViewPermission.shortcut')">Shortcut</span>
          </dt>
          <dd>
            <span>{{ viewPermission.shortcut }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemViewPermission.shortcutRoot')">Shortcut Root</span>
          </dt>
          <dd>
            <span>{{ viewPermission.shortcutRoot }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemViewPermission.reuse')">Reuse</span>
          </dt>
          <dd>
            <span>{{ viewPermission.reuse }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemViewPermission.code')">Code</span>
          </dt>
          <dd>
            <span>{{ viewPermission.code }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemViewPermission.description')">Description</span>
          </dt>
          <dd>
            <span>{{ viewPermission.description }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemViewPermission.type')">Type</span>
          </dt>
          <dd>
            <span v-text="$t('appApp.ViewPermissionType.' + viewPermission.type)">{{ viewPermission.type }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemViewPermission.order')">Order</span>
          </dt>
          <dd>
            <span>{{ viewPermission.order }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemViewPermission.apiPermissionCodes')">Api Permission Codes</span>
          </dt>
          <dd>
            <span>{{ viewPermission.apiPermissionCodes }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemViewPermission.componentFile')">Component File</span>
          </dt>
          <dd>
            <span>{{ viewPermission.componentFile }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemViewPermission.redirect')">Redirect</span>
          </dt>
          <dd>
            <span>{{ viewPermission.redirect }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemViewPermission.parent')">Parent</span>
          </dt>
          <dd>
            <div v-if="viewPermission.parentId">
              <router-link :to="{ name: 'ViewPermissionView', params: { viewPermissionId: viewPermission.parentId } }">{{
                viewPermission.parentText
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="viewPermission.id"
          :to="{ name: 'ViewPermissionEdit', params: { viewPermissionId: viewPermission.id } }"
          tag="button"
          class="btn btn-primary"
        >
          <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./view-permission-details.component.ts"></script>
