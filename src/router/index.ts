import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [{
    path: '/',
    component: () => import('@/views/导航栏.vue')
  }
  ],
})

export default router
