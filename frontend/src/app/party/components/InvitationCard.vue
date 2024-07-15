<template>
  <CardContainer 
    icon="chat-heart"
    :title="`결혼식 파티에 초대합니다.`"
  >
    <!-- <p>우리의 결혼식 파티에 초대합니다.</p> -->

    <p>취미에 진심인 남녀 둘이 만나 2년을 함께 보냈습니다.</p>

    <p>
      그저 같이 있으면 마음이 편안하고 웃음이 많아져 <br>
      앞으로도 평생 함께 하기로 결심했습니다🥰💕
    </p>

    <p>
      저희의 소중한 결심을 나누는 좋은 날에 <br>
      여러분을 초대합니다🍀
    </p>
    <p>
      좋은날인 만큼 술과 음식과 소소한 이벤트까지(!) 준비된 <br>
      파티를 마련했으니 부담 없이 오셔서 함께 즐겨주세요.✨
    </p>
    <p>
      *축하해주시는 마음만으로도 충분하니 축의금은 사양하도록 하겠습니다🎆*
    </p>

    <div class="party-btn">
      <button
        class="btn btn-secondary"
        @click="emit('click')"  
      >
        파티 참석하기
      </button>
    </div>
  </CardContainer>
</template>

<script setup>
import CardContainer from "./CardContainer.vue"
const emit = defineEmits(['click'])
</script>

<style lang="scss" scoped>
p {
  text-align: center;
}

.party-btn {
  display: flex;
  justify-content: center;
}
</style>
