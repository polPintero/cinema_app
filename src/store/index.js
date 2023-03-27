import { createStore } from 'vuex'
import api from '@/api.js'
import genreEnum from './genreEnum'

export default createStore({
  state: {
    genreEnum,
    allMovies: [],
  },
  getters: {},
  mutations: {
    setAllMovies (state, payload) {
      console.log(payload)
      state.allMovies = payload
    }
  },
  actions: {
    async moviesGet ({ commit }) {
      const allMovies = await api.moviesGet()
      commit('setAllMovies', allMovies.data)
    },
    async movieSessionsGet ({ commmit }, id = 0) {
      const allMovies = await api.movieSessionsGet(id)
      console.log(allMovies.data)
    }
  },
  modules: {}
})
