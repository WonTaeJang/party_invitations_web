<template>
  <CardContainer
    icon="calendar-heart"
    title="일시"
  >
    <div class="calendar-container">
      <!-- date -->
      <div class="calendar-title">
        <p class="fs-5">
          {{ date }}
        </p>
        <p class="fs-6">
          {{ evnetTime }}
        </p>
      </div>

      <!-- calendar -->
      <div class="my-calendar">
        <VCalendar 
          is-dark
          mode="date" 
          :attributes="attributes"
        />
      </div>

      <div v-if="dday">
        <div class="time-stamp-title">
          <span>DAYS</span>
          <span>HOUR</span>
          <span>MIN</span>
          <span>SEC</span>
        </div>
        <div class="time-stamp-content">
          <span>
            {{ dday.day }}
          </span>
          <span>
            :
          </span>
          <span>
            {{ dday.hour }}
          </span>
          <span>
            :
          </span>
          <span>
            {{ dday.min }}
          </span>
          <span>
            :
          </span>
          <span>
            {{ dday.sec }}
          </span>
        </div>
      </div>
    </div>
  </CardContainer>
</template>
<script setup>
import CardContainer from "./CardContainer.vue"
import { onMounted, ref, computed } from 'vue'
import dayjs from 'dayjs'

const eventDate = ref(null)
const evnetTime = ref(null)
const dDayDate = ref(null)

onMounted(() => {
  eventDate.value = import.meta.env['VITE_EVENT_DATE']
  evnetTime.value = import.meta.env['VITE_TIME_STRING']

  initTimeStemp()
})

const attributes = ref([
  {
    highlight: true,
    dates: import.meta.env['VITE_EVENT_DATE'],
  },
])

const date = computed(() => {
  if (eventDate.value) {
    return dayjs(eventDate.value).format('YYYY.MM.DD')
  }

  return null
})

const dday = computed(() => {
  if (dDayDate.value && dDayDate.value > 0) {
    return {
      day: dayjs(eventDate.value).diff(dayjs(), 'day'),
      hour: (dayjs(eventDate.value).diff(dayjs(), 'hour') % 24).toString().padStart(2, '0'),
      min:  (dayjs(eventDate.value).diff(dayjs(), 'minute') % 60).toString().padStart(2, '0'),
      sec: dayjs(dDayDate.value).format('ss'),
    } 
  }

  return null
})

const initTimeStemp = () => {
  setInterval(() => {
    dDayDate.value = dayjs(eventDate.value).valueOf() - dayjs().valueOf()
  }, 1000)
}

</script>
<style lang="scss" scoped>

.calendar-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.calendar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  p {
    margin: 0;
  }
}

.time-stamp {
  &-title {
    display: flex;
    justify-content: center;
    gap: 10px;
    font-size: 10px;
  }

  &-content {
    display: flex;
    justify-content: center;
    gap: 6px;
    font-size: 16px;
  }

}

.my-calendar :deep(.vc-arrow) {
  background-color: transparent;

  &:hover {
    background: var(--vc-header-arrow-hover-bg);
  }
}
.my-calendar :deep(.vc-title) {
  background-color: transparent;

  &:hover {
    background: var(--vc-header-arrow-hover-bg);
  }
}
</style>