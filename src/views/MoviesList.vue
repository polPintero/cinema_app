<template>
  <div class="movies-list">
    <router-link
      :to="$router.routeList.movie + '/' + film.id"
      v-for="film in allMovies"
      :key="film.id"
      class="movies-list__item"
      @click="$store.commit('selectedMovieIdSet', film.id)"
    >
      <card-movie
        :id="film.id"
        :name="film.name"
        :image="film.image"
        :additional="film.additional"
        :genre="film.genre"
        :description="film.description"
      />
    </router-link>
  </div>
</template>

<script>
import CardMovie from '@/components/organism/CardMovie.vue'

export default {
  name: 'MoviesList',
  components: { CardMovie },
  created() {
    this.$store.dispatch('filterMovieGet')
  },
  computed: {
    allMovies() {
      return this.$store.state.allMovies
    }
  }
}
</script>

<style lang="scss">
.movies-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(40%, 250px), 1fr));
  gap: calc(var(--gap-double) * 2);
  padding: var(--gap-double);

  &__item {
    color: inherit;
    text-decoration: none;
  }
}
</style>
