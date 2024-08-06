<template>
  <div :class="props.type"></div>
</template>
<script setup>
const props = defineProps({
  type: {
    type: String,
    default: null
  }
})
</script>
<style lang="scss" scoped>
.intro {
  // width: 100%;
  height: 100%;
  background-size: cover;
  background-image: url("@img/intro_title.png");
  background-position: center center;
}

.outro {
  // width: 100%;
  height: 100%;
  background-size: cover;
  background-image: url("@img/outro_title.jpg");
  background-position: center center;
}
</style>
