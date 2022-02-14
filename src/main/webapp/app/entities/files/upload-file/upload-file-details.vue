<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="uploadFile">
        <h2 class="jh-entity-heading"><span v-text="$t('appApp.filesUploadFile.detail.title')">UploadFile</span> {{ uploadFile.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('appApp.filesUploadFile.id')">ID</span>
          </dt>
          <dd>
            <span>{{ uploadFile.id }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.filesUploadFile.fullName')">Full Name</span>
          </dt>
          <dd>
            <span>{{ uploadFile.fullName }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.filesUploadFile.name')">Name</span>
          </dt>
          <dd>
            <span>{{ uploadFile.name }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.filesUploadFile.ext')">Ext</span>
          </dt>
          <dd>
            <span>{{ uploadFile.ext }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.filesUploadFile.type')">Type</span>
          </dt>
          <dd>
            <span>{{ uploadFile.type }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.filesUploadFile.url')">Url</span>
          </dt>
          <dd>
            <span>{{ uploadFile.url }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.filesUploadFile.path')">Path</span>
          </dt>
          <dd>
            <span>{{ uploadFile.path }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.filesUploadFile.folder')">Folder</span>
          </dt>
          <dd>
            <span>{{ uploadFile.folder }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.filesUploadFile.entityName')">Entity Name</span>
          </dt>
          <dd>
            <span>{{ uploadFile.entityName }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.filesUploadFile.createAt')">Create At</span>
          </dt>
          <dd>
            <span>{{ uploadFile.createAt | formatDate }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.filesUploadFile.fileSize')">File Size</span>
          </dt>
          <dd>
            <span>{{ uploadFile.fileSize }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.filesUploadFile.referenceCount')">Reference Count</span>
          </dt>
          <dd>
            <span>{{ uploadFile.referenceCount }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.filesUploadFile.user')">User</span>
          </dt>
          <dd>
            {{ uploadFile.userLogin }}
          </dd>
          <dt>
            <span v-text="$t('appApp.filesUploadFile.category')">Category</span>
          </dt>
          <dd>
            <div v-if="uploadFile.categoryId">
              <router-link :to="{ name: 'ResourceCategoryView', params: { resourceCategoryId: uploadFile.categoryId } }">{{
                uploadFile.categoryTitle
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="uploadFile.id"
          :to="{ name: 'UploadFileEdit', params: { uploadFileId: uploadFile.id } }"
          tag="button"
          class="btn btn-primary"
        >
          <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./upload-file-details.component.ts"></script>
