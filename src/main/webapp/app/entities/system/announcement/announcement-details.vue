<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="announcement">
        <h2 class="jh-entity-heading"><span v-text="$t('appApp.announcement.detail.title')">Announcement</span> {{ announcement.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('appApp.announcement.id')">ID</span>
          </dt>
          <dd>
            <span>{{ announcement.id }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.announcement.titile')">Titile</span>
          </dt>
          <dd>
            <span>{{ announcement.titile }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.announcement.content')">Content</span>
          </dt>
          <dd>
            <span>{{ announcement.content }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.announcement.startTime')">Start Time</span>
          </dt>
          <dd>
            <span>{{ announcement.startTime | formatDate }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.announcement.endTime')">End Time</span>
          </dt>
          <dd>
            <span>{{ announcement.endTime | formatDate }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.announcement.senderId')">Sender Id</span>
          </dt>
          <dd>
            <span>{{ announcement.senderId }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.announcement.priority')">Priority</span>
          </dt>
          <dd>
            <span v-text="$t('appApp.PriorityLevel.' + announcement.priority)">{{ announcement.priority }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.announcement.category')">Category</span>
          </dt>
          <dd>
            <span v-text="$t('appApp.AnnoCategory.' + announcement.category)">{{ announcement.category }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.announcement.receiverType')">Receiver Type</span>
          </dt>
          <dd>
            <span v-text="$t('appApp.ReceiverType.' + announcement.receiverType)">{{ announcement.receiverType }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.announcement.sendStatus')">Send Status</span>
          </dt>
          <dd>
            <span v-text="$t('appApp.AnnoSendStatus.' + announcement.sendStatus)">{{ announcement.sendStatus }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.announcement.sendTime')">Send Time</span>
          </dt>
          <dd>
            <span>{{ announcement.sendTime | formatDate }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.announcement.cancelTime')">Cancel Time</span>
          </dt>
          <dd>
            <span>{{ announcement.cancelTime | formatDate }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.announcement.businessType')">Business Type</span>
          </dt>
          <dd>
            <span v-text="$t('appApp.AnnoBusinessType.' + announcement.businessType)">{{ announcement.businessType }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.announcement.businessId')">Business Id</span>
          </dt>
          <dd>
            <span>{{ announcement.businessId }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.announcement.openType')">Open Type</span>
          </dt>
          <dd>
            <span v-text="$t('appApp.AnnoOpenType.' + announcement.openType)">{{ announcement.openType }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.announcement.openPage')">Open Page</span>
          </dt>
          <dd>
            <span>{{ announcement.openPage }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.announcement.receiverIds')">Receiver Ids</span>
          </dt>
          <dd>
            <span>{{ announcement.receiverIds }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.announcement.summary')">Summary</span>
          </dt>
          <dd>
            <span>{{ announcement.summary }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="announcement.id"
          :to="{ name: 'AnnouncementEdit', params: { announcementId: announcement.id } }"
          tag="button"
          class="btn btn-primary"
        >
          <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./announcement-details.component.ts"></script>
