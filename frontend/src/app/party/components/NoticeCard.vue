<template>
  <CardContainer 
    icon="bell"
    :title="`읽어주세요.`"
  >
    <p>
      파티 특성상 신랑신부의 초대 외 인물이 참석을 확정하시거나 <br>
      참석 확정을 안하고 말없이 당일에 오실 경우 죄송하지만 참석이 어렵습니다. 😢
    </p>

    <p>
      가족 등 동행인이 있을 경우 신랑신부에게 얘기해주신 후 <br>
      인원수에 본인을 포함하여 작성해주세요!
    </p>
  </CardContainer>
</template>

<script setup>
import CardContainer from "./CardContainer.vue"
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
