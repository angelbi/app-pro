<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="departmentAuthority">
        <h2 class="jh-entity-heading">
          <span v-text="$t('appApp.settingsDepartmentAuthority.detail.title')">DepartmentAuthority</span> {{ departmentAuthority.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('appApp.settingsDepartmentAuthority.id')">ID</span>
          </dt>
          <dd>
            <span>{{ departmentAuthority.id }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.settingsDepartmentAuthority.name')">Name</span>
          </dt>
          <dd>
            <span>{{ departmentAuthority.name }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.settingsDepartmentAuthority.code')">Code</span>
          </dt>
          <dd>
            <span>{{ departmentAuthority.code }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.settingsDepartmentAuthority.description')">Description</span>
          </dt>
          <dd>
            <span>{{ departmentAuthority.description }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.settingsDepartmentAuthority.createUserId')">Create User Id</span>
          </dt>
          <dd>
            <span>{{ departmentAuthority.createUserId }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.settingsDepartmentAuthority.createTime')">Create Time</span>
          </dt>
          <dd>
            <span>{{ departmentAuthority.createTime | formatDate }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.settingsDepartmentAuthority.department')">Department</span>
          </dt>
          <dd>
            <div v-if="departmentAuthority.departmentId">
              <router-link :to="{ name: 'DepartmentView', params: { departmentId: departmentAuthority.departmentId } }">{{
                departmentAuthority.departmentName
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="departmentAuthority.id"
          :to="{ name: 'DepartmentAuthorityEdit', params: { departmentAuthorityId: departmentAuthority.id } }"
          tag="button"
          class="btn btn-primary"
        >
          <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./department-authority-details.component.ts"></script>
