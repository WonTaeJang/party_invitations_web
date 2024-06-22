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
        <h1>참석여부 전달 안내</h1>
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
          <div 
            v-for="(info, idx) in infos"
            :key="idx"
            class="info-item"
          >
            <!-- <img :src="`/src/assets/img/${info.id}.png`"> -->
            <i :class="['bi', `bi-${info.id}`]"></i>

            <span>{{ info.label }}</span>
          </div>
        </div>
      </section>

      <!-- footer -->
      <div class="footer">
        <button 
          type="button"
          class="btn btn-dark btn-sm"
          @click="onClickGo"
        >
          참가하러 가기
        </button>

        <div
          class="cookie-item"
          @click="checked = !checked"
        >
          <i 
            :class="['bi', `bi-check-circle`, checked ? 'text-dark' : 'text-body-tertiary']"
            style="font-size: 12px;"
          ></i>

          <span
            :class="[checked ? 'text-dark' : 'text-body-tertiary']"
          >
            하루동안 보지 않기
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useCookie } from '@/composables/use-cookie.js'
const {hasCookie, setCookie} = useCookie()
const checked = ref(false)

const infos = ref([
  {
    id: 'heart',
    label: '신랑 장원태 & 신부 김희연',
  },
  {
    id: 'calendar-check',
    label: '2024년 9월 30일 ...',
  },
  {
    id: 'geo-alt',
    label: '역삼역 어딘가...',
  },
])

const emit = defineEmits(['closeModal', 'participate'])

const close = () => { 
  if (checked.value) {
    setCookie('hide_one_day')
  }

  emit('closeModal')
}

const onClickGo = () => {
  emit('participate')
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
    padding: 20px;
    width: 80%;
    // overflow-y: scroll;
    border-radius: 8px;
    position: relative;
    background-color: #fff;
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

    span {
      font-size: 10px;
    }
  }

  .cookie-item {
    padding-top: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;

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
    button {
      width: 100%
    }
  }
}
</style>