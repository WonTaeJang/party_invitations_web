import { createWebHistory, createRouter } from "vue-router"

const routes = [
  {
    path: '/party',
    component: () => import('@/app/layout/PartyLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('@party/page/IndexPage.vue'),
      }
    ]
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router