import { createApp } from "vue"
import { createPinia } from 'pinia'
import router from "./router"
import App from "./App.vue"
import "./assets/css/style.css"
import { createNaverMap } from "vue3-naver-maps"

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css' // Bootstrap CSS 추가
import 'bootstrap-icons/font/bootstrap-icons.min.css' // Bootstrap CSS 추가
import * as bootstrap from 'bootstrap'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(createNaverMap, {
  clientId: "2ovaor9f5t", // Required
  category: "ncp", // Optional
  subModules: ["drawing"], // Optional, "panorama" | "geocoder" | "drawing" | "visualization"
})

app.mount("#app")
