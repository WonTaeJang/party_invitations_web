<template>
  <div 
    class="bg-dark text-white"
    :class="['header-wrap', { 'header-wrap--top': isTop }]"
  >
    <label>장원태 ♡ 김희연</label>

    <i 
      v-if="!isTop"
      :class="[
        'bi', 
        coreStore.hasUser ? `bi-envelope-check` : 'bi-envelope']"
      style="font-size: 20px;"
      @click="onClick"
    ></i>
  </div>
</template>

<script setup>
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



const isTop = computed(() => {
  return props.top
})

const onClick = () => {
  participateToggle.value = true
}
</script>

<style lang="scss" scoped>
.header-wrap {
  // background-color: --bs-body-bg;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 32px;
  padding: 0 10px;
  transition: all 0.5s;
  z-index: 10000;

  label {
    font-size: 16px;
    // color: #fff;
  }

  &--top {
    height: 80px;
    align-items: center;
    justify-content: center;

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
</style>
