import { createApp } from "vue"
import { createPinia } from 'pinia'
import router from "./router"
import App from "./App.vue"

import VCalendar from 'v-calendar'
import VueClipboard from 'vue3-clipboard'
// import "./assets/css/style.css"
import 'v-calendar/style.css'

import { createNaverMap } from "vue3-naver-maps"

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css' // Bootstrap CSS 추가
import 'bootstrap-icons/font/bootstrap-icons.min.css' // Bootstrap CSS 추가
import * as bootstrap from 'bootstrap'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(VCalendar)
app.use(VueClipboard, {
  autoSetContainer: true,
  appendToBody: true,
})
app.use(router)
app.use(createNaverMap, {
  clientId: "2ovaor9f5t", // Required
  category: "ncp", // Optional
  subModules: ["drawing"], // Optional, "panorama" | "geocoder" | "drawing" | "visualization"
})

app.mount("#app")
