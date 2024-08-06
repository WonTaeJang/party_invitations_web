<template>
  <div 
    class="bg-dark text-white"
    :class="[
      'header-wrap', 
      // { 'header-wrap--top': isTop }
    ]"
  >
    <!-- <div
      v-if="isTop"
      class="header-container--top"
    >
      <label class="font-color-gold fs-4 fw-light fst-italic">Please join us</label>
      <br>
      <label class="fw-medium fst-italic">9.28</label>
      <label class="font-color-gold fs-5">장원태 & 김희연</label>
    </div> -->
    <!-- <div
      v-if="isTop"
      class="header-container--top"
    >
      <StarComponent>
        <div class="floating-container">
          <label class="font-color-gold fs-4 fw-light fst-italic">Please join us</label>
          <br>
          <label class="fw-medium fst-italic">9.28</label>
          <label class="font-color-gold fs-5">장원태 & 김희연</label>
        </div>
      </StarComponent>
    </div> -->
    <div
      class="header-container--normal"
    >
      <label>
        장원태  
        <i class="bi bi-heart-fill color-danger"></i>
        김희연
      </label>
      <i 
        :class="[
          'bi', 
          coreStore.hasUser ? `bi-envelope-check` : 'bi-envelope']"
        style="font-size: 24px;"
        @click="onClick"
      ></i>
    </div>
  </div>
</template>

<script setup>
//import StarComponent from "./header/StarComponent.vue"
import { toRefs, computed } from "vue"
import { useCoreStore } from "@store/core"

const coreStore = useCoreStore()
const { participateToggle } = toRefs(coreStore)

const props = defineProps({
  top: {
    type: Boolean,
    default: true,
  },
})

// const isTop = computed(() => {
//   return props.top
// })

const onClick = () => {
  participateToggle.value = true
}
</script>

<style lang="scss" scoped>
.header-container {
  &--top {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    // padding: 10px;
    border: 1px solid #fff;
  }

  &--normal {
    height: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.header-wrap {
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
  height: 60px;
  padding: 10px;
  transition: all 0.5s;
  z-index: 10000;
  position: relative;

  label {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
    // color: #fff;
  }

  &--top {
    height: 200px;
    // align-items: center;
    // justify-content: center;

    label {
      // color: #fff;
      font-size: 32px;
    }
  }
}

.bi-envelope-check {
  display: flex;
  align-items: center;
}

.font-color-gold {
  color: #FFCC33;
}

.color-danger {
  color: rgb(220,53,69);
}

.floating-container {
  position: absolute;
  left: 50%;
  top: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translate(-50%, -50%);
}
</style>
