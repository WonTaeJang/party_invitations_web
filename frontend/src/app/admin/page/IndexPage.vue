<template>
  <div class="admin-page">
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

    <!-- 삭제, 메모 수정 추가 필요 -->
    <!-- 심플하게 보기 기능 필요 -->
    <ParticitatnsTable 
      v-if="listFileter"
      :list="listFileter"
      @update="eventUpdateItem"
      @delete="eventDeleteItem"
    />
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
import { computed, onMounted, ref } from 'vue'
import adminAPI from '@api/admin'
import ConfirmModal from '@admin/components/ConfirmModal.vue'
import ParticitatnsTable from '@admin/components/ParticitatnsTable.vue'

const list = ref(null)
const search = ref(null)
const confirmToggle = ref(false)

onMounted(async () => {
  await initParticitants()
})

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
    // console.log(data)
    if (data) {
      list.value = data
    }
  } catch (error) {
    console.log(error)
  }
}

const eventUpdateItem = ($event) => {
  console.log($event)
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
</style>