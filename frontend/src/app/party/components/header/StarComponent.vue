<template>
  <div
    ref="starRef"
    class="star"
  >
    <div class="noite">
    </div>
    <div
      id="constelacao"
      class="constelacao"
    >
      <span
        v-for="(item, idx) in noiteList"
        :key="idx"
        :class="item.class"
        :style="item.style"
      >
      </span>
    </div>
    <div
      id="chuvaMeteoro"
      class="chuvaMeteoro"
    >
      <div
        v-if="meteoroToggle"
        class="meteoro"
        :class="meteoroToggle ? meteoroClass : ''"
      ></div>
    </div>
    <slot></slot>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useElementBounding } from '@vueuse/core'

const starRef = ref(null)
const { width, height } = useElementBounding(starRef)

const noiteList = ref([])
const style = ["style1", "style2", "style3", "style4"]
const tam = ["tam1", "tam1", "tam1", "tam2", "tam3"]
const opacity = ["opacity1", "opacity1", "opacity1", "opacity2", "opacity2", "opacity3"]
const meteoroToggle = ref(false)
const meteoroClass = ref(null)

onMounted(() => {
  var qtdeEstrelas = 250
  var widthWindow = width.value
  var heightWindow = height.value

  const getRandomArbitrary = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
  }

  for (var i = 0; i < qtdeEstrelas; i++) {
    noiteList.value.push({
      class: `estrela ${style[getRandomArbitrary(0, 4)]} ${opacity[getRandomArbitrary(0, 6)]} ${tam[getRandomArbitrary(0, 5)]}`,
      style: {
        animationDelay: `.${getRandomArbitrary(0, 9)}s`,
        left: `${getRandomArbitrary(0, widthWindow)}px`,
        top: `${getRandomArbitrary(0, heightWindow)}px`
      }
    })
  }

  //meteoros
  var numeroAleatorio = 5000

  setTimeout(function (){
    carregarMeteoro()
  }, numeroAleatorio)

  function carregarMeteoro () {
    setTimeout(carregarMeteoro, numeroAleatorio)
    numeroAleatorio = getRandomArbitrary(5000, 10000)
    meteoroClass.value = style[getRandomArbitrary(0, 4)]
    meteoroToggle.value = true

    setTimeout(function (){
      meteoroToggle.value = false
    }, 1000)
  }
})
</script>
<style lang="scss" scoped>
* {
  box-sizing: content-box;
}

.star {
  margin: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.noite {
  background: -webkit-linear-gradient(top, rgb(0, 0, 0) 50%, rgb(25, 19, 39)80%, rgb(43, 32, 72));
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
}

.constelacao {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  animation: rotate 600s infinite linear;
}

.estrela {
  background-color: white;
  border-radius: 50%;
  position: absolute;
  animation-name: estrela;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.estrela.style1 { animation-duration: 0.5s; animation-name: estrela; }
.estrela.style2 { animation-duration: 1s; animation-name: estrela; }
.estrela.style3 { animation-duration: 1.5s; animation-name: estrela; }
.estrela.style4 { animation-duration: 2s; animation-name: estrelaDestacada; }

.estrela.tam1 { width: 1px; height: 1px; }
.estrela.tam2 { width: 2px; height: 2px; }
.estrela.tam3 { width: 3px; height: 3px; }

.estrela.opacity1 { opacity:  1; }
.estrela.opacity2 { opacity: .5; }
.estrela.opacity3 { opacity: .1; }

.meteoro {
  position: absolute;
  background-color: #fff;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  transform: rotate(-35deg);
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-duration: 1s;
}

.meteoro:before {
  content: "";
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
  width: 0;
  height: 0;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
  border-left: 85px solid white;
  position: absolute;
  left: 2px;
  top: 0;
}

.meteoro.style1 { animation-name: meteoroStyle1; }
.meteoro.style2 { animation-name: meteoroStyle2; }
.meteoro.style3 { animation-name: meteoroStyle3; }
.meteoro.style4 { animation-name: meteoroStyle4; }

@keyframes escurecer {
  0%   { top: 0; }
  100% { top: 100%; }
}

@keyframes estrela {
  0% {
    box-shadow: 0 0 10px 0px rgba(255, 255, 255, 0.05);
  }
  50% {
    box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.4);
  }
  100% {
    box-shadow: 0 0 10px 0px rgba(255, 255, 255, 0.05);
  }
}

@keyframes estrelaDestacada {
  0% {
    background-color: #FFFFFF;
    box-shadow: 0 0 10px 0px rgba(255, 255, 255, 1);
  }
  20% {
    background-color: #FFC4C4;
    box-shadow: 0 0 10px 0px rgb(255, 196, 196, 1);
  }
  80% {
    background-color: #C4CFFF;
    box-shadow: 0 0 10px 0px rgb(196, 207, 255, 1);
  }
  100% {
    background-color: #FFFFFF;
    box-shadow: 0 0 10px 0px rgba(255, 255, 255, 0.2);
  }
}

@keyframes meteoroStyle1 {
  0% { opacity: 0; right: 300px; top: 100px; }
  30% { opacity: .3; }
  60% { opacity: .3; }
  100% { opacity: 0; right: 1000px; top: 600px; }
}

@keyframes meteoroStyle2 {
  0% { opacity: 0; right: 700px; top: 100px; }
  30% { opacity: 1; }
  60% { opacity: 1; }
  100% { opacity: 0; right: 1400px; top: 600px; }
}

@keyframes meteoroStyle3 {
  0% { opacity: 0; right: 300px; top: 300px; }
  30% { opacity: 1; }
  60% { opacity: 1; }
  100% { opacity: 0; right: 1000px; top: 800px; }
}

@keyframes meteoroStyle4 {
  0% { opacity: 0; right: 700px; top: 300px; }
  30% { opacity: 1; }
  60% { opacity: 1; }
  100% { opacity: 0; right: 1400px; top: 800px; }
}

@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>