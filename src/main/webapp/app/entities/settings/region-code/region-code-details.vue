<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="regionCode">
        <h2 class="jh-entity-heading"><span v-text="$t('appApp.settingsRegionCode.detail.title')">RegionCode</span> {{ regionCode.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('appApp.settingsRegionCode.id')">ID</span>
          </dt>
          <dd>
            <span>{{ regionCode.id }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.settingsRegionCode.name')">Name</span>
          </dt>
          <dd>
            <span>{{ regionCode.name }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.settingsRegionCode.areaCode')">Area Code</span>
          </dt>
          <dd>
            <span>{{ regionCode.areaCode }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.settingsRegionCode.cityCode')">City Code</span>
          </dt>
          <dd>
            <span>{{ regionCode.cityCode }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.settingsRegionCode.mergerName')">Merger Name</span>
          </dt>
          <dd>
            <span>{{ regionCode.mergerName }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.settingsRegionCode.shortName')">Short Name</span>
          </dt>
          <dd>
            <span>{{ regionCode.shortName }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.settingsRegionCode.zipCode')">Zip Code</span>
          </dt>
          <dd>
            <span>{{ regionCode.zipCode }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.settingsRegionCode.level')">Level</span>
          </dt>
          <dd>
            <span v-text="$t('appApp.RegionCodeLevel.' + regionCode.level)">{{ regionCode.level }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.settingsRegionCode.lng')">Lng</span>
          </dt>
          <dd>
            <span>{{ regionCode.lng }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.settingsRegionCode.lat')">Lat</span>
          </dt>
          <dd>
            <span>{{ regionCode.lat }}</span>
          </dd>
          <dt>
            <span v-text="$t('appApp.settingsRegionCode.parent')">Parent</span>
          </dt>
          <dd>
            <div v-if="regionCode.parentId">
              <router-link :to="{ name: 'RegionCodeView', params: { regionCodeId: regionCode.parentId } }">{{
                regionCode.parentName
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="regionCode.id"
          :to="{ name: 'RegionCodeEdit', params: { regionCodeId: regionCode.id } }"
          tag="button"
          class="btn btn-primary"
        >
          <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./region-code-details.component.ts"></script>
