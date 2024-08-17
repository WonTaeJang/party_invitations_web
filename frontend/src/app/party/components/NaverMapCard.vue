<template>
  <CardContainer 
    icon="map"
    :title="`오시는 길`"
  >
    <naver-map
      style="width: 100%; height: 400px"
      :map-options="mapOptions"
    >
      <naver-marker
        :latitude="37.510859"
        :longitude="127.055737"
        @on-load="onLoadMarker($event)"
      />
    </naver-map>

    <div class="map-container bg-white">
      <div class="main-container">
        <label 
          class="text-dark"
          @click="onClickGoLink"
        >
          {{ locationString }}
        </label>
      </div>
      <div class="detail-container">
        <label class="text-secondary">{{ locationDetailString }}</label>
        <i
          :class="['bi', `bi-copy`, 'text-secondary']"
          @click="onClickCopy()"
        ></i>
      </div>
      <!-- 지하철, 버스 , 자가용 이용시 -->

      <div class="nav-container">
        <i
          :class="['bi', `bi-2-circle`]"
          :style="{
            color: 'rgb(58,180,73)'
          }"
        ></i>
        <label 
          class="text-dark"
        >
          삼성역 5번 출구에서 도보 14분
        </label>
      </div>

      <div class="nav-container">
        <i
          :class="['bi', `bi-9-circle`]"
          :style="{
            color: 'rgb(201,167,84)'
          }"
        ></i>
        <label 
          class="text-dark"
        >
          삼성중앙역 5번 출구에서 도보 4분
        </label>
      </div>

      <div class="nav-container">
        <i
          :class="['bi', `bi-p-circle`, 'text-dark']"
        ></i>
        <label 
          class="text-dark"
          :style="{
            lineHeight: '14px'
          }"
        >
          주차가 불가하니 인근 주차장이나 대중교통 이용을 권유드립니다.
        </label>
      </div>
    </div>
  </CardContainer>
</template>
<script setup>
import { ref } from "vue"
import CardContainer from "./CardContainer.vue"
import { NaverMap, NaverMarker } from "vue3-naver-maps"
import { copyText } from 'vue3-clipboard'

const marker = ref()
const onLoadMarker = (markerObject) => {
  marker.value = markerObject
}
const mapOptions = {
  latitude: 37.510859, // 지도 중앙 위도
  longitude: 127.055737, // 지도 중앙 경도
  zoom: 15,
  zoomControl: true,
  zoomControlOptions: { position: "TOP_RIGHT" },
}

const locationString = import.meta.env['VITE_LOCATION']
const locationDetailString = import.meta.env['VITE_LOCATION_DETAIL']
const localtionLink = import.meta.env['VITE_LOCATION_LINK']

const onClickCopy = () => { 
  copyText(locationDetailString, undefined, (error, event) => {
    if (error) {
      console.log(error)
    } else {
      console.log(event)
    }
  })
}

const onClickGoLink = () => {
  window.open(localtionLink, "_blank")
}
</script>
<style lang="scss" scoped>
.map-container {
  padding: 10px;
}

.main-container {
  font-weight: bold;
  margin-bottom: 4px;
}

.detail-container {
  display: flex;
  align-items: center;
  font-size: 12px;
  gap: 4px;
  margin-bottom: 4px;
}

.nav-container {
  display: flex;
  align-items: center;
  font-size: 14px;
  gap: 4px;
  margin-bottom: 4px;
}
</style>
