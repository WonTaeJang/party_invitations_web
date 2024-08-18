<template>
  <div 
    class="admin-page"
    v-if="isLogin"
  >
    <div class="admin-header">
      <label>전체: {{ list ? list.length : 0 }}</label>
      <input
        v-model="search"
        type="text"
        placeholder="검색"
      >
    </div>
    <div class="admin-contents">
      <label>참석: {{ attendTeam.length }}팀, {{ attendCount }}명</label>
    </div>

    <ParticitatnsTable 
      v-if="listFileter"
      :list="listFileter"
      @update="eventUpdateItem"
      @delete="eventDeleteItem"
    />
  </div>
  <div
    v-else
  >
    <div class="login-container">
      <div class="input-group mb-2">
        <i :class="['input-group-text', 'bi', `bi-person-check`]"></i>
        <input 
          v-model="password"
          type="text" 
          class="form-control form-control-sm" 
          placeholder="비밀번호" 
        >
        <button
          class="btn btn-secondary"
          @click="onClickLogin"  
        >
          로그인
        </button>
      </div>
    </div>

  </div>

  <teleport to="#popup">
    <ConfirmModal 
      v-if="confirmToggle"
      @close-modal="confirmToggle = false"
      @confirm="onClickDelete"
    />
  </teleport>
</template>
<script setup>
import { computed, ref } from 'vue'
import adminAPI from '@api/admin'
import ConfirmModal from '@admin/components/ConfirmModal.vue'
import ParticitatnsTable from '@admin/components/ParticitatnsTable.vue'

const list = ref(null)
const search = ref(null)
const confirmToggle = ref(false)
const isLogin = ref(false)
const password = ref(null)

const attendTeam = computed(() => {
  if (list.value) {
    return list.value.filter(el => el.check_event)
  }

  return []
})

const attendCount = computed(() => {
  if (attendTeam.value) {
    let cnt = 0

    cnt = attendTeam.value.reduce((acc, cur) => {
      return acc + cur.number_of_participant
    }, 0)

    return cnt
  }

  return 0
})

const listFileter = computed(() => {
  if (list.value) {
    return list.value.filter(el => {
      if (!search.value) return true

      if (el.name && el.name.includes(search.value)) {
        return true
      }

      if (el.phone_number && el.phone_number.includes(search.value)) {
        return true
      }

      if (el.comments && el.comments.includes(search.value)) {
        return true
      }

      if (el.hidden_comments && el.hidden_comments.includes(search.value)) {
        return true
      }

    })
  }

  return []
})

const initParticitants = async () => {
  try {
    let { data } = await adminAPI.getParticipantAll()
    console.log(data)
    if (data) {
      list.value = data
    }
  } catch (error) {
    console.log(error)
  }
}

const eventUpdateItem = async ($event) => {
  let check_event = $event.check_event  // boolean
  
  if ($event.number_of_participant > 0) {
    check_event = true
  } else {
    check_event = false
  }

  try {
    await adminAPI.updateParticipant({
      id: $event._id,
      check_event: check_event,
      number_of_participant: $event.number_of_participant,
      hidden_comments: $event.hidden_comments ? $event.hidden_comments : ''
    })

    await initParticitants()
  } catch (error) {
    console.log(error)
  }
}

const onClickDelete = async () => {
  try {
    await adminAPI.deleteParticipant({
      id: deleteId.value
    })

    await initParticitants()

    deleteId.value = null
  } catch (error) {
    console.log(error)
  }
}

const deleteId = ref(null)
const eventDeleteItem = async ($event) => {
  deleteId.value = $event._id
  confirmToggle.value = true
}

const onClickLogin = async () => {
  if(!password.value && password.value.toString().length === 0) return

  try {
    await adminAPI.login({
      password: password.value
    })

    await initParticitants()
    isLogin.value = true
  } catch (error) {
    console.log(error)
    isLogin.value = false
  }


}

</script>
<style lang="scss" scoped>
.admin-page {
  padding: 20px;
  
  .admin-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .admin-contents {
    margin-bottom: 20px;
  }
}

.login-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
}
</style>