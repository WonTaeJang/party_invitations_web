<template>
  <div class="party">
    <div class="party-container">
      <!-- <div>Party Layout</div> -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>

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
    // background-color: red;
    // width: 200px;

    // background-size: cover;
    // background-image: url('@img/main_title.png');
    // background-position: center center;
  }
}
</style>