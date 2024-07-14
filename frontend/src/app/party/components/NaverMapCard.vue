<template>
  <CardContainer 
    icon="map"
    :title="`오시는 길`"
  >
    <div>
      지도 경로 입력
    </div>

    <naver-map
      style="width: 100%; height: 400px"
      :map-options="mapOptions"
    >
      <naver-marker
        :latitude="37.51347"
        :longitude="127.041722"
        @on-load="onLoadMarker($event)"
      />
    </naver-map>

    <div>
      네이버 하이퍼 링크 걸기  
    </div>
  </CardContainer>
</template>
<script setup>
import { ref } from "vue"
import CardContainer from "./CardContainer.vue"
import { NaverMap, NaverMarker } from "vue3-naver-maps"

const marker = ref();
const onLoadMarker = (markerObject) => {
  marker.value = markerObject;
};
const mapOptions = {
  latitude: 37.51347, // 지도 중앙 위도
  longitude: 127.041722, // 지도 중앙 경도
  zoom: 15,
  zoomControl: true,
  zoomControlOptions: { position: "TOP_RIGHT" },
};
</script>
<style lang="scss" scoped>

</style>
