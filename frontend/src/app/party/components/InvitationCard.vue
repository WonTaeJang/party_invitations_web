<template>
  <CardContainer 
    icon="chat-heart"
    :title="`결혼식 파티에 초대합니다.`"
  >
    <p>
      일도 춤도 열심히 하던 남녀 둘이 우연히 만나 <br>
      두번째 여름을 보내고 앞으로 다가올 가을을 <br>
      맞이하고 있습니다.🎇
    </p>

    <p>
      함께 있으면 마음이 편안하고 웃음이 많아지고 <br>
      서로에게 감사하고 배려하는 게 일상이 된 것이 <br>
      엄청난 행운이라고 생각되어 <br>
      놓칠수가 없어서 평생 같이 가려고 합니다! <br>
      🐓❤🐍
    </p>

    <p>
      저희의 소중한 결심을 나누는 특별한 날에 <br>
      여러분과 재미있게 보내고 싶어 <br>
      술과 음식과 소소한 이벤트까지(!) 파티를 마련했습니다.🍀
    </p>
    <p>
      부족하지만 부담없이 오셔서 즐겨주세요!!✨🥳
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
