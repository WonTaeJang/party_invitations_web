<template>
  <div class="modal">
    <div class="modal-container">
      <!-- contents -->
      <section>
        <!-- info -->
        <div class="info-container">
          <span>정말로 삭제하겠습니까?</span>
        </div>
      </section>

      <!-- footer -->
      <div class="footer">
        <button 
          type="button"
          class="btn btn-secondary btn-sm"
          @click="close"
        >
          취소
        </button>
        <button 
          type="button"
          class="btn btn-dark btn-sm"
          @click="onClickConfirm"
        >
          확인
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
const emit = defineEmits(['closeModal', 'confirm'])

const close = () => {
  emit('closeModal')
}

const onClickConfirm = () => {
  emit('confirm')
  close()
}

</script>
<style lang="scss" scoped>
.modal {
  position: fixed;
  top:0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  background: rgb(0,0,0,0.5);

  &-container {
    padding: 20px 10px;
    width: 50%;
    border-radius: 8px;
    max-height: 95vh;
    position: relative;
    background-color: #fff;

    section {
      max-height: 50vh;
      overflow-y: scroll;
      padding: 0 10px;
    }
  }

  header {
    display: flex;
    justify-content: center;
    h1 {
      font-size: 18px;
      padding: 8px 0;
      margin: 0;
    }
  }

  .notice {
    span {
      font-size: 12px;

    }
  }

  .info-container {
    margin: 20px 0;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .check-lg {
    font-size: 22px;
    line-height: 22px;
  }

  .footer {
    display: flex;
    gap: 10px;
    padding: 0 10px;
    button {
      width: 100%
    }
  }
}

.form-check {
  label {
    font-size: 0.875rem;
  }
}

.form-check-input:checked {
  background-color: #343a40; /* Dark color */
  border-color: #343a40; /* Dark color */
}

.form-control:focus { 
  border-color: #343a40; /* Dark color */
  box-shadow: 0 0 0 0.25rem rgba(52, 58, 64, 0.25); /* Adjust focus shadow */
}

.form-check-input:focus {
  box-shadow: 0 0 0 0.25rem rgba(52, 58, 64, 0.25); /* Adjust focus shadow */
}
</style>