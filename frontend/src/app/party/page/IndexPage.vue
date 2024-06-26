<template>
  <div class="party-index">
    <!-- header -->
    <TheHeader
      class="header"
      :top="top"
    />

    <!-- contents -->
    <div
      ref="contentsRef"
      class="contents"
    >
      <IntroCard />
      <LazyComponent
        idle
        :is-intersected="isReady"
      >
        <InvitationCard />
        
        <GalleryCard 
          :title="'추억 갤러리'" 
          :path="'memory'" 
        />
      </LazyComponent>
      <NaverMapCard />
    </div>

    <!-- footer -->
    <div
      class="footer bg-dark"
      @click="flag = !flag"
    >
      <div
        v-if="messageList.length > 0"
        class="container bg-black text-white"
      >
        <Transition name="slide-up">
          <div
            v-if="flag"
            class="message-item"
          >
            <i class="bi bi-balloon-heart"></i>
            <label>{{ messageList[messageCount].name }}</label>
            <label>{{ messageList[messageCount].comments }}{{ messageList[messageCount].comments }}{{ messageList[messageCount].comments }}{{ messageList[messageCount].comments }}{{ messageList[messageCount].comments }}{{ messageList[messageCount].comments }}{{ messageList[messageCount].comments }}{{ messageList[messageCount].comments }}</label>
          </div>
          <div
            v-else
            class="message-item"
          >
            <i class="bi bi-balloon-heart-fill"></i>
            <label>{{ messageList[messageCount].name }}</label>
            <label>{{ messageList[messageCount].comments }}</label>
          </div>
        </Transition>
      </div>
    </div>
  </div>

  <teleport to="#popup">
    <NoticeModal 
      v-if="noticeToggle"
      @close-modal="noticeToggle = false"
      @participate="eventFormOpen"
    />

    <ParticipateFormModal 
      v-if="participateToggle"
      @close-modal="participateToggle = false"
      @submit="eventSubmit"
    />

    <ConfirmModal 
      v-if="confirmToggle"
      :req-type="confirmType"
      :req-error="confirmError"
      @close-modal="confirmToggle = false"
    />
  </teleport>

  <teleport to="#loading">
    <SpinnerModal 
      v-if="isLoading"
    />
  </teleport>
</template>

<script setup>
import LazyComponent from 'v-lazy-component'

import TheHeader from "@party/components/TheHeader.vue"
import IntroCard from "@party/components/IntroCard.vue"
import GalleryCard from "@party/components/GalleryCard.vue"
import InvitationCard from "@party/components/InvitationCard.vue"
import NaverMapCard from "@party/components/NaverMapCard.vue"
import ParticipateFormModal from "@party/components/modal/ParticipateFormModal.vue"
import NoticeModal from "@party/components/modal/NoticeModal.vue"
import SpinnerModal from '@party/components/spinner/SpinnerModal.vue'
import ConfirmModal from "@party/components/modal/ConfirmModal.vue"

import { ref, toRefs, onMounted } from "vue"
import { useCoreStore } from '@store/core'
import { useScroll } from "@vueuse/core"
import particitantAPI from '@api/participant'
import { useCookie } from '@/composables/use-cookie.js'

const coreStore = useCoreStore()
const { participateToggle } = toRefs(coreStore)

const contentsRef = ref(null)
const { arrivedState } = useScroll(contentsRef)
const { left, right, top, bottom } = toRefs(arrivedState)

const {hasCookie, setCookie} = useCookie()

const isReady = ref(false)
const flag = ref(true)
const isLoading = ref(false)
const noticeToggle = ref(false)

const confirmType = ref(false)  // true: sucess, false: error
const confirmError = ref(null)
const confirmToggle = ref(false)

const messageList = ref([])
const messageCount = ref(0)

const indexMap = [
  {
    id: "invitation",
    label: "파티에 초대합니다.",
  },
  {
    id: "photos",
    label: "추억 갤러리",
  },
  {
    id: "gallery",
    label: "웨딩 갤러리",
  },
  {
    id: "reservation",
    label: "참석 하기",
  },
  {
    id: "location",
    label: "오시는 길",
  },
]

onMounted(async () => {
  try {
    if (!hasCookie('hide_one_day')) {
      noticeToggle.value = true
    }

    isReady.value = true
    isLoading.value = true
    await initMessage()
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }

})

const initMessage = async () => {
  let { data } = await particitantAPI.getParticipants()

  console.log(data)

  if (data) {
    messageList.value = data.filter((el) => {
      return !!el.comments
    })

    console.log(messageList.value)
  }

  setInterval(() => {
    flag.value = !flag.value

    if (messageList.value.length > 0) {
      messageCount.value = (messageCount.value + 1) % messageList.value.length
    }
  }, 3000)
}

const eventFormOpen = () => {
  participateToggle.value = true
}

// 파티 신청하기 
const eventSubmit = async ($event) => {
  try {
    isLoading.value = true
    await particitantAPI.createParticitant($event)
    coreStore.user = $event
    confirmType.value = true
    confirmError.value = null
  } catch (error) {
    let { code } = error?.response?.data
    
    confirmError.value = errorNotice(code)
    confirmType.value = false
  } finally {
    confirmToggle.value = true
    isLoading.value = false
  }
}

const errorNotice = (code) => {
  let error = ''
  switch (code) {
    case 'req-error-already':
      // 이미 있을때 
      error = '이미 신청을 하였습니다.'
      break 
    case 'req-error':
    default:
      error = '네트워크 요청 오류'
      // bad requset
  }

  return error
}

</script>

<style lang="scss" scoped>
.party-index {
  height: 100%;
  width: 100%;
  position: relative;

  .header {
    position: absolute;
    top: 0;
    left: 0;
  }

  .contents {
    height: calc(100% - 40px);
    overflow-y: scroll;
  }

  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;

    // background-color: black;
    padding: 5px 10px;
    box-sizing: border-box;

    .container {
      width: 100%;
      height: 100%;
      position: relative;
      border-radius: 4px;
    }
  }
  
}

.v-lazy-component.v-lazy-component--loading {
  filter: blur(20px);
}

.v-lazy-component.v-lazy-component--loaded {
  filter: blur(0);
  transition: filter 1s;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.message-item {
  position: absolute;
  left: 4px;
  top: 4px;
  display: flex;
  gap: 8px;
  // transform: translateY(-50%);
  // display: flex;
  // align-items: center;
  // justify-content: space-between;
  label {
    // text-overflow: ellipsis;
    // width: 250px;
    white-space: nowrap;
  }
}
</style>
