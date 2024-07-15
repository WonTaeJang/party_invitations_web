<template>
  <div class="modal">
    <div class="modal-container">
      <div
        class="close"
        @click="close"
      >
        <i class="bi bi-x-lg"></i>
      </div>

      <!-- header -->
      <header>
        <h1>파티 참석 {{ coreStore.hasUser ? '완료': '신청하기' }} </h1>
      </header>

      <!-- contents -->
      <section>
        <div class="notice">
          <span>
            파티에 참석할 수 있는 인원이 제한되어 있습니다. 참석하실분은 꼭 참석여부를 전달해주세요.!
          </span>
        </div>

        <!-- info -->
        <div class="info-container">
          <!-- 이름 -->
          <div class="input-group mb-2">
            <i :class="['input-group-text', 'bi', `bi-person-check`]"></i>
            <input 
              v-model="name"
              type="text" 
              class="form-control form-control-sm" 
              placeholder="이름" 
              :disabled="coreStore.hasUser"
            >
          </div>

          <!-- 전화번호 뒤 4자리 -->
          <div class="input-group mb-2">
            <i :class="['input-group-text', 'bi', `bi-lock`]"></i>
            <input
              v-model="phone" 
              type="text" 
              class="form-control form-control-sm" 
              placeholder="전화번호 뒤 4자리" 
              :disabled="coreStore.hasUser"
            >
          </div>
          
          <!-- 축하메시지 -->
          <div class="input-group mb-2">
            <i :class="['input-group-text', 'bi', `bi-chat-dots`]"></i>
            <textarea 
              v-model="message"
              class="form-control form-control-sm" 
              placeholder="축하 메시지" 
              rows="2"
              :disabled="coreStore.hasUser"
            >
            </textarea>
          </div>

          <!-- 이벤트 배틀 참가 여부 -->
          <div class="form-check">
            <input 
              id="checkInput"
              v-model="eventFlag" 
              :disabled="coreStore.hasUser"
              type="checkbox" 
              class="form-check-input"
            >
            <label
              class="form-check-label"
              for="checkInput"
            >이벤트 배틀 참여 (랜덤 추첨)</label>
          </div>
        </div>
      </section>

      <!-- footer -->
      <div class="footer">
        <button 
          :disabled="inactiveCheck"
          type="button"
          class="btn btn-dark btn-sm"
          @click="onClickSubmit"
        >
          제출
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCoreStore } from "@store/core"
const coreStore = useCoreStore()
const emit = defineEmits(['closeModal', 'submit'])
const name = ref(null)
const phone = ref(null)
const message = ref(null)
const eventFlag = ref(false)

onMounted(() => {
  if (coreStore.hasUser) {
    name.value = coreStore.user.name
    phone.value= coreStore.user.phone_number
    message.value = coreStore.user.comments
    eventFlag.value = coreStore.user.check_event
  }
})

const close = () => {
  emit('closeModal')
}

const inactiveCheck = computed(() => {
  let result = true
  if (name.value && phone.value && !coreStore.hasUser) {
    result = false
  }
  return result
})

const onClickSubmit = () => {
  if (inactiveCheck.value) return 

  let formData = {
    name: name.value,
    phone_number: phone.value,
    comments: message.value,
    check_event: eventFlag.value
  }

  emit('submit', formData)
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
  }

  .info-item {
    display: flex;
    align-items: center;
    gap: 4px;

    img {
      width: 16px;
      height: 16px;
    }

    span {
      font-size: 12px;
    }
  }

  .close {
    position: absolute;
    padding: 10px 15px;
    top: 0;
    right: 0;

    img {
      width: 16px;
      height: 16px;
    }
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