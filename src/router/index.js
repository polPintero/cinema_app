import { createRouter, createWebHistory } from 'vue-router'
import routeList from './routeList'
import store from '../store'

function getmovie(to){
  if(store.state.selectedMovieId !== null) return
  const id = to.params.id
  store.dispatch('getMovieById', id)
}

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
      component: () => import('@/views/MovieInfo.vue'),
      beforeEnter:[getmovie]
    }
  ]
})
router.routeList = routeList

export default router
