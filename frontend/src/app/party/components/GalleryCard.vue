<template>
  <CardContainer :title="`초대합니다.`">
    <div class="gallery-container bg-dark">
      <Carousel
        id="gallery"
        v-model="currentSlide"
        :items-to-show="1"
        :wrap-around="false"
      >
        <Slide
          v-for="slide in galleryList"
          :key="slide"
        >
          <div class="carousel__item">
            <img :src="`${slide.link}`">
          </div>
        </Slide>
      </Carousel>

      <Carousel
        id="thumbnails"
        ref="carousel"
        v-model="currentSlide"
        :items-to-show="4"
        :wrap-around="true"
      >
        <Slide
          v-for="(slide, idx) in galleryList"
          :key="slide"
        >
          <div
            class="carousel__item border-dark"
            @click="slideTo(idx)"
          >
            <img :src="`${slide.link}`">
          </div>
        </Slide>
      </Carousel>
    </div>
  </CardContainer>
</template>

<script setup>
import { computed, ref } from "vue"
import CardContainer from "./CardContainer.vue"
import { Carousel, Slide } from "vue3-carousel"
import "vue3-carousel/dist/carousel.css"
const props = defineProps({
  path: {
    type: String,
    default: null,
  },
})

const currentSlide = ref(0)
// const currentSlide2 = ref(0)

const galleryList = computed(() => {
  let list = []

  // prod 일때와 dev일때 링크가 다르게 해야함
  for (let i = 0; i < 27; i++) {
    list.push({
      // link: `/img/${props.path}/${i + 1}.png`, // /src/assets
      link: `/src/assets/img/${props.path}/${i + 1}.png`,
    })
  }

  return list
})

const slideTo = (val) => {
  currentSlide.value = val
}
</script>

<style lang="scss" scoped>
.gallery-container {
  // background-color: black !important;
  padding-bottom: 10px;
}
#gallery {
  .carousel__item {
    height: 400px;
    width: 100%;
  }
}

#thumbnails {
  .carousel__item {
    height: 100px;
    width: 200px;
    border: 2px solid black;
    cursor: pointer;
  }
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
