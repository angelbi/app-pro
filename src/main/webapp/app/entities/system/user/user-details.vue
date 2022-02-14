<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="user">
        <h2 class="jh-entity-heading"><span v-text="$t('appApp.systemUser.detail.title')">User</span> {{ user.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('appApp.systemUser.id')">ID</span>
          </dt>
          <dd>
            <span>{{ user.id }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemUser.login')">Login</span>
          </dt>
          <dd>
            <span>{{ user.login }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemUser.password')">Password</span>
          </dt>
          <dd>
            <span>{{ user.password }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemUser.firstName')">First Name</span>
          </dt>
          <dd>
            <span>{{ user.firstName }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemUser.lastName')">Last Name</span>
          </dt>
          <dd>
            <span>{{ user.lastName }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemUser.email')">Email</span>
          </dt>
          <dd>
            <span>{{ user.email }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemUser.mobile')">Mobile</span>
          </dt>
          <dd>
            <span>{{ user.mobile }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemUser.birthday')">Birthday</span>
          </dt>
          <dd>
            <span>{{ user.birthday | formatDate }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemUser.activated')">Activated</span>
          </dt>
          <dd>
            <span>{{ user.activated }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemUser.langKey')">Lang Key</span>
          </dt>
          <dd>
            <span>{{ user.langKey }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemUser.imageUrl')">Image Url</span>
          </dt>
          <dd>
            <span>{{ user.imageUrl }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemUser.activationKey')">Activation Key</span>
          </dt>
          <dd>
            <span>{{ user.activationKey }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemUser.resetKey')">Reset Key</span>
          </dt>
          <dd>
            <span>{{ user.resetKey }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemUser.resetDate')">Reset Date</span>
          </dt>
          <dd>
            <span>{{ user.resetDate | formatDate }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemUser.department')">Department</span>
          </dt>
          <dd>
            <div v-if="user.departmentId">
              <router-link :to="{ name: 'DepartmentView', params: { departmentId: user.departmentId } }">{{
                user.departmentName
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('appApp.systemUser.position')">Position</span>
          </dt>
          <dd>
            <div v-if="user.positionId">
              <router-link :to="{ name: 'PositionView', params: { positionId: user.positionId } }">{{ user.positionName }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="user.id" :to="{ name: 'UserEdit', params: { userId: user.id } }" tag="button" class="btn btn-primary">
          <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./user-details.component.ts"></script>
