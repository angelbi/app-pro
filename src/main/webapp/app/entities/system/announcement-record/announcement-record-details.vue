<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="announcementRecord">
        <h2 class="jh-entity-heading">
          <span v-text="$t('appApp.announcementRecord.detail.title')">AnnouncementRecord</span> {{ announcementRecord.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('appApp.announcementRecord.id')">ID</span>
          </dt>
          <dd>
            <span>{{ announcementRecord.id }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.announcementRecord.anntId')">Annt Id</span>
          </dt>
          <dd>
            <span>{{ announcementRecord.anntId }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.announcementRecord.userId')">User Id</span>
          </dt>
          <dd>
            <span>{{ announcementRecord.userId }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.announcementRecord.hasRead')">Has Read</span>
          </dt>
          <dd>
            <span>{{ announcementRecord.hasRead }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.announcementRecord.readTime')">Read Time</span>
          </dt>
          <dd>
            <span>{{ announcementRecord.readTime | formatDate }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="announcementRecord.id"
          :to="{ name: 'AnnouncementRecordEdit', params: { announcementRecordId: announcementRecord.id } }"
          tag="button"
          class="btn btn-primary"
        >
          <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./announcement-record-details.component.ts"></script>
