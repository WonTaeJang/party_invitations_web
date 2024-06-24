<template>
  <div class="card-title">
    <h1>{{ props.title }}</h1>
  </div>
  <slot></slot>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: null
  },
})
</script>

<style lang="scss" scoped>
.card-title {
  padding-top: 20px;

  h1 {
    font-size: 20px;
  }
}
</style>
