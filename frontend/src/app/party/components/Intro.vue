<template>
  <div class="intro text-white">
    <div class="contents">
      <h1>
        <span>우리의</span>
        <span>결혼을</span>
        <span>축하하는</span>
        <span>파티에</span>
        <span>초대합니다!</span>
        <span>함께</span>
        <span>즐거운</span>
        <span>시간을</span>
        <span>보내요.</span>
      </h1>
    </div>

    <footer>
      <span>{{ dateString }}</span>
      <span>{{ location }}</span>
    </footer>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
let location = ref(null)
let dateString = ref(null)
 
onMounted(() => {
  location.value = import.meta.env['VITE_LOCATION']
  dateString.value = import.meta.env['VITE_DATE_STRING']
})
</script>
<style lang="scss" scoped>
@keyframes fade-in {
  100% {
    opacity: 1;
    filter: blur(0);
  }
}
.intro {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 10000;
  background-size: cover;
  background-position: center center;
  background-image: url("@img/main_start.jpg");

  footer {
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 0 30px 100px 30px;
    display: flex;
    width: 100%;
    align-items: center;
    flex-direction: column;

    span {
      font-size: 12px;
    }
  }

  .contents {
    position: absolute;
    left: 0;
    top: 50%;

    h1 {
      font-size: 20px;
      text-align: center;
      transform: scale(0.94);
      animation: scale 3s forwards cubic-bezier(0.5, 1, 0.89, 1);
    }

    span {
      display: inline-block;
      padding-right: 8px;
      opacity: 0;
      filter: blur(4px);
    }
        
    span:nth-child(1) {
      animation: fade-in 0.8s 0.1s forwards cubic-bezier(0.11, 0, 0.5, 0);
    }

    span:nth-child(2) {
      animation: fade-in 0.8s 0.2s forwards cubic-bezier(0.11, 0, 0.5, 0);
    }

    span:nth-child(3) {
      animation: fade-in 0.8s 0.3s forwards cubic-bezier(0.11, 0, 0.5, 0);
    }

    span:nth-child(4) {
      animation: fade-in 0.8s 0.4s forwards cubic-bezier(0.11, 0, 0.5, 0);
    }

    span:nth-child(5) {
      animation: fade-in 0.8s 0.5s forwards cubic-bezier(0.11, 0, 0.5, 0);
    }

    span:nth-child(6) {
      animation: fade-in 0.8s 0.6s forwards cubic-bezier(0.11, 0, 0.5, 0);
    }

    span:nth-child(7) {
      animation: fade-in 0.8s 0.7s forwards cubic-bezier(0.11, 0, 0.5, 0);
    }

    span:nth-child(8) {
      animation: fade-in 0.8s 0.8s forwards cubic-bezier(0.11, 0, 0.5, 0);
    }

    span:nth-child(9) {
      animation: fade-in 0.8s 0.9s forwards cubic-bezier(0.11, 0, 0.5, 0);
    }

    span:nth-child(10) {
      animation: fade-in 0.8s 1s forwards cubic-bezier(0.11, 0, 0.5, 0);
    }

    span:nth-child(11) {
      animation: fade-in 0.8s 1.1s forwards cubic-bezier(0.11, 0, 0.5, 0);
    }

    span:nth-child(12) {
      animation: fade-in 0.8s 1.2s forwards cubic-bezier(0.11, 0, 0.5, 0);
    }

    span:nth-child(13) {
      animation: fade-in 0.8s 1.3s forwards cubic-bezier(0.11, 0, 0.5, 0);
    }

    span:nth-child(14) {
      animation: fade-in 0.8s 1.4s forwards cubic-bezier(0.11, 0, 0.5, 0);
    }

    span:nth-child(15) {
      animation: fade-in 0.8s 1.5s forwards cubic-bezier(0.11, 0, 0.5, 0);
    }

    span:nth-child(16) {
      animation: fade-in 0.8s 1.6s forwards cubic-bezier(0.11, 0, 0.5, 0);
    }

    span:nth-child(17) {
      animation: fade-in 0.8s 1.7s forwards cubic-bezier(0.11, 0, 0.5, 0);
    }

    span:nth-child(18) {
      animation: fade-in 0.8s 1.8s forwards cubic-bezier(0.11, 0, 0.5, 0);
    }
  }
}
</style>