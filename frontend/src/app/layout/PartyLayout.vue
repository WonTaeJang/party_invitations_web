<template>
  <div class="party">
    <div class="party-container">
      <router-view />
    </div>
  </div>

  <teleport to="#loading">
    <Transition>
      <Intro 
        v-if="isIntro"
        @click="isIntro = !isIntro"
      />
    </Transition>
  </teleport>
</template>

<script setup>
import Intro from '@party/components/Intro.vue'
import { ref, onMounted } from 'vue'

const isIntro = ref(true)

onMounted(() => {
  setTimeout(() => {
    isIntro.value = false
  }, 5000)
})
</script>

<style lang="scss" scoped>
.party {
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;

  &-container {
    width: 100%;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>