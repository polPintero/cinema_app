import { createStore } from 'vuex'
import api from '@/api.js'
import genreEnum from './genreEnum'

export default createStore({
  state: {
    genreEnum,
    allMovies: [],
    selectedMovieId: null,
    filter: {
      name: null,
      genres: null
    }
  },
  getters: {
    selectedMovie(state) {
      const { allMovies, selectedMovieId } = state
      return allMovies.find((i) => i.id === Number(selectedMovieId))
    }
  },
  mutations: {
    setAllMovies (state, payload) {
      state.allMovies = payload
    },
    selectedMovieIdSet(state, id){
      state.selectedMovieId = id
    }
  },
  actions: {
    async moviesGet ({ commit }) {
      const allMovies = await api.moviesGet()
      commit('setAllMovies', allMovies.data)
    },
    async movieSessionsGet ({ commit }, id = 0) {
      const allMovies = await api.movieSessionsGet(id)
      // console.log(allMovies.data)
    },
    async filterMovieGet ({ commit, state }) {
      const {filter} = state
      const query = {}
      Object.keys(filter).forEach(key => {
        if (filter[key] !== null) query[key] = filter[key] 
      })
      const allMovies = await api.moviesGet(query)
      commit('setAllMovies', allMovies.data)
    }
  },
  modules: {}
})
