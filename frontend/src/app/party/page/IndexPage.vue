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
      <InvitationCard />
      <GalleryCard 
        :title="'추억 갤러리'" 
        :path="'memory'" 
      />
      <NaverMapCard />
    </div>

    <!-- footer -->
    <div class="footer">
      <div class="container">
        <span> 방명록 애니메이션 </span>
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

const isLoading = ref(false)
const noticeToggle = ref(false)

const confirmType = ref(false)  // true: sucess, false: error
const confirmError = ref(null)
const confirmToggle = ref(false)

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

onMounted(() => {
  if (!hasCookie('hide_one_day')) {
    noticeToggle.value = true
  }
})

const eventFormOpen = () => {
  participateToggle.value = true
}

// 파티 신청하기 
const eventSubmit = async ($event) => {
  try {
    isLoading.value = true
    await particitantAPI.createPaticitant($event)
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
    height: calc(100% - 50px);
    overflow-y: scroll;
  }

  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50px;

    // background-color: black;
    padding: 10px;
    box-sizing: border-box;

    .container {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: black;

      span {
        color: #fff;
      }
    }
  }
}
</style>
