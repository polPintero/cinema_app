<template>
  <div class="header">
    <template v-if="$route.path === $router.routeList.base">
      <dropdown-comp v-model="filter.genres" :list="genreEnum" />
      <search-comp v-model="filter.name"/>
    </template>
    <template v-else>
      <h3 class="header__movie-name" v-html="selectedMovie.name"></h3>
    </template>
  </div>
</template>

<script>
import SearchComp from './SearchComp.vue'
import DropdownComp from './DropdownComp.vue'

export default {
  name: 'HeaderComp',
  components: { SearchComp, DropdownComp },
  data() {
    return {
      genreEnum: this.$store.state.genreEnum,
      filter: this.$store.state.filter,
      timeout: null,
    }
  },
  computed: {
    selectedMovie(){
      return this.$store.getters.selectedMovie
    }
  },
  watch: {
    'filter.name': function () {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(()=>{
        this.$store.dispatch('filterMovieGet')
      },200)
    },
    'filter.genres': function () {
      this.$store.dispatch('filterMovieGet')
    }
  }
}
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--bg-secondary);
  padding: var(--gap-double);
  position: sticky;
  top: 0;
  height: var(--header-height);
  z-index: 2;

  .search {
    margin-left: auto;
  }
}
</style>
