import { createRouter, createWebHistory } from 'vue-router'
import routeList from './routeList'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: routeList.base,
      name: 'movies-list',
      component: () => import('@/views/MoviesList.vue')
    },
    {
      path: routeList.movie + '/:id',
      name: routeList.movie,
      component: () => import('@/views/MovieAbout.vue')
    }
  ]
})
router.routeList = routeList

export default router
