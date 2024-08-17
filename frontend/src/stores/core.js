import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { computed, ref } from 'vue'
export const useCoreStore = defineStore('core', () => {
  const user = useStorage('user', {})

  const participateToggle = ref(false)
  const snackbarToggle = ref(false)

  const hasUser = computed(() => {
    let result = false
    if (Object.keys(user.value).length > 0) {
      result = true
    }

    return result
  })

  return {
    user,
    participateToggle,
    snackbarToggle,
    hasUser,
  }
})