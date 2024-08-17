<template>
  <section class="snackbar-wrap">
    <div class="snackbar bg-dark text-white">
      <span>복사되었습니다.</span>
    </div>
  </section>
</template>
<script setup>

</script>
<style lang="scss" scoped>
.snackbar-wrap {
  width: 100%;
  position: fixed;
  bottom: 10%;
  z-index: 10000;
}
.snackbar {
  display: flex;
  border: 1px solid #fff;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 8px;
  width: 200px;
  margin: 0 auto;
}
</style>