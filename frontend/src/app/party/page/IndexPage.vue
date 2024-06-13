<template>
  <div class="party-index">
    <!-- header -->
    <TheHeader class="header" :top="top" />

    <!-- contents -->
    <div class="contents" ref="contentsRef">
      <IntroCard />
      <InvitationCard />
      <GalleryCard 
        :title="'추억 갤러리'" 
        :path="'memory'" 
      />
      <NaverMapCard />
    </div>

    <!-- footer -->
    <div class="footer">
      <div class="container">
        <span> 방명록 애니메이션 </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import TheHeader from "@party/components/TheHeader.vue"
import IntroCard from "@party/components/IntroCard.vue"
import GalleryCard from "@party/components/GalleryCard.vue"
import InvitationCard from "@party/components/InvitationCard.vue"
import NaverMapCard from "@party/components/NaverMapCard.vue"

import { ref, toRefs } from "vue"
import { useScroll } from "@vueuse/core"

const contentsRef = ref(null)
const { arrivedState } = useScroll(contentsRef)
const { left, right, top, bottom } = toRefs(arrivedState)

const indexMap = [
  {
    id: "invitation",
    label: "파티에 초대합니다.",
  },
  {
    id: "photos",
    label: "추억 갤러리",
  },
  {
    id: "gallery",
    label: "웨딩 갤러리",
  },
  {
    id: "reservation",
    label: "참석 하기",
  },
  {
    id: "location",
    label: "오시는 길",
  },
]
</script>

<style lang="scss" scoped>
.party-index {
  height: 100%;
  width: 100%;
  position: relative;

  .header {
    position: absolute;
    top: 0;
    left: 0;
  }

  .contents {
    height: calc(100% - 50px);
    overflow-y: scroll;
  }

  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50px;

    // background-color: black;
    padding: 10px;
    box-sizing: border-box;

    .container {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: black;

      span {
        color: #fff;
      }
    }
  }
}
</style>
