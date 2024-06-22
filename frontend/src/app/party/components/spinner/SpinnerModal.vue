<template>
  <div class="spinner-container">
    <div class="spinner-border text-light" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>
<script setup>

</script>
<style lang="scss" scoped>
.spinner-container {
  position: fixed;
  top:0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(0,0,0,0.2);

}
</style>