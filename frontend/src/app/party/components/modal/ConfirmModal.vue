<template>
  <div class="modal">
    <div class="modal-container">
      <!-- header -->
      <header>
        <h1>{{ title }}</h1>
      </header>

      <!-- contents -->
      <section>
        <!-- info -->
        <div class="info-container">
          <i 
            :class="['bi', `bi-${reqBody.icon}`, reqBody.color]"
            style="font-size: 32px;"
          >
          </i>

          <span>{{ reqBody.text }}</span>
        </div>
      </section>

      <!-- footer -->
      <div class="footer">
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
import { computed } from 'vue';

const emit = defineEmits(['closeModal'])

const props = defineProps({
  reqType: {
    type: Boolean, 
    default: false
  },
  reqError: {
    type: [String, null],
    default: null
  }
})

const title = computed(() => {
  return props.reqType ? '파티 신청 완료' : '파티 신청 오류' 
})

const reqBody = computed(() => {
  return {
    icon: props.reqType ? 'check-lg' : 'x-lg',
    text: props.reqType ? '파티 신청이 완료 되었습니다. 감사합니다!!' : props.reqError,
    color: props.reqType ? 'text-success' : 'text-danger',
  }
})

const close = () => {
  emit('closeModal')
}

const onClickConfirm = () => {
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
    width: 80%;
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