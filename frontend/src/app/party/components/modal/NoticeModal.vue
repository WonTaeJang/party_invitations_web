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
            파티에 참석할 수 있는 인원이 제한되어 있습니다. 참석하실분은 꼭 참석여부를 전달해주세요!
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

            <i
              v-if="info.icon" 
              :class="['bi', `bi-${info.icon}`]"
              :style="{
                fontSize: '12px'
              }"
              @click="onClickCopy(info.iconCopy)"
            ></i>
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
          파티 참석하러 가기
        </button>

        <!-- <div
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
        </div> -->
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, toRefs } from 'vue'
import { useCookie } from '@/composables/use-cookie.js'
const { hasCookie, setCookie } = useCookie()
import { useCoreStore } from '@store/core'
import { copyText } from 'vue3-clipboard'
const checked = ref(false)
const infos = ref([])
const coreStore = useCoreStore()
const { snackbarToggle } = toRefs(coreStore)

const emit = defineEmits(['closeModal', 'participate'])

onMounted(() => {
  infos.value.push({
    id: 'heart',
    label: import.meta.env['VITE_NOTICE_TITLE']
  })

  infos.value.push({
    id: 'calendar-check',
    label: import.meta.env['VITE_DATE_STRING']
  })

  infos.value.push({
    id: 'geo-alt',
    label: import.meta.env['VITE_LOCATION'],
    icon: 'copy',
    iconCopy: import.meta.env['VITE_LOCATION_DETAIL'],
  })
})

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

const onClickCopy = (copyString) => {
  copyText(copyString, undefined, (error, event) => {
    if (error) {
      console.log(error)
    } else {
      snackbarToggle.value = true
      console.log(event)
    }
  })
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
      font-size: 12px;
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