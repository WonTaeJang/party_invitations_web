import { createApp } from "vue"
import router from "./router"
import App from "./App.vue"
import "./assets/css/style.css"
import { createNaverMap } from "vue3-naver-maps"

const app = createApp(App)
app.use(router)
app.use(createNaverMap, {
  clientId: "2ovaor9f5t", // Required
  category: "ncp", // Optional
  subModules: ["drawing"], // Optional, "panorama" | "geocoder" | "drawing" | "visualization"
})

app.mount("#app")
