<template>
  <div class="movies-list">
    <card-movie
      v-for="film in allMovies"
      :key="film.id"
      :id="film.id"
      :name="film.name"
      :image="film.image"
      :additional="film.additional"
      :genre="film.genre"
      :description="film.description"
    />
  </div>
</template>

<script>
import CardMovie from '../components/CardMovie.vue'

export default {
  name: 'MoviesList',
  components: { CardMovie },
  data() {
    return {
      allMovies: this.$store.state.allMovies
    }
  }
}
</script>

<style lang="scss">
.movies-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(40%, 250px), 1fr));
  gap: calc(var(--gap-double) * 2);
}
</style>
