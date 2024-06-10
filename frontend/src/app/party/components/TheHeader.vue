<template>
  <div :class="['header-wrap', { 'header-wrap--top': isTop }]">
    <span>장원태 ♡ 김희연</span>
  </div>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  top: {
    type: Boolean,
    default: true,
  },
})

const isTop = computed(() => {
  return props.top
})
</script>

<style lang="scss" scoped>
.header-wrap {
  background-color: transparent;
  display: flex;

  width: 100%;
  height: 32px;
  transition: all 0.5s;

  span {
    font-size: 16px;
    color: black;
  }

  &--top {
    height: 80px;
    background-color: black;
    align-items: center;
    justify-content: center;

    span {
      color: #fff;
      font-size: 32px;
    }
  }
}
</style>
