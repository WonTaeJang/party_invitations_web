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

    <div class="bg-black">
      <label>뉴스타 하이볼 삼성점 (href)</label>
      <label>서울 강남구 삼성로104길 12 B 1층 - 작은 글씨 회색 + 주소 복사 아이콘</label>
      
      <!-- https://naver.me/FTqIyW6w -->
    </div>
  </CardContainer>
</template>
<script setup>
import { ref } from "vue"
import CardContainer from "./CardContainer.vue"
import { NaverMap, NaverMarker } from "vue3-naver-maps"

const marker = ref()
const onLoadMarker = (markerObject) => {
  marker.value = markerObject;
};
const mapOptions = {
  latitude: 37.510859, // 지도 중앙 위도
  longitude: 127.055737, // 지도 중앙 경도
  zoom: 15,
  zoomControl: true,
  zoomControlOptions: { position: "TOP_RIGHT" },
};
</script>
<style lang="scss" scoped>

</style>
