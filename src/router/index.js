import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'movies-list',
      component: () => import('@/views/MoviesList.vue')
    }
  ]
})

export default router
