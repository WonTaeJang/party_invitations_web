<template>
  <div class="card-container bg-dark text-white">
    <div class="card-title">
      <i 
        v-if="props.icon"
        :class="`bi bi-${props.icon} fs-4`"
      ></i>

      <h1>{{ props.title }}</h1>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: null
  },
  icon: {
    type: String, 
    default: null,
  }
})
</script>

<style lang="scss" scoped>
.card-container {
  padding: 20px;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;

  h1 {
    font-size: 20px;
    padding: 0;
    margin: 0;
  }
}
</style>
