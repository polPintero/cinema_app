<template>
  <div class="header">
    <template v-if="$route.path === $router.routeList.base">
      <dropdown-comp v-model="filter.genres" :list="genreEnum" />
      <search-comp v-model="filter.name" />
    </template>
    <template v-else>
      <chevron-icon class="header__btn" @click="$router.back()" />
      <h3 v-if="selectedMovie" class="header__movie-name" v-html="selectedMovie.name"></h3>
    </template>
  </div>
</template>

<script>
import SearchComp from '@/components/atoms/SearchComp.vue'
import DropdownComp from '@/components/atoms/DropdownComp.vue'
import ChevronIcon from '@/components/atoms/icons/ChevronIcon.vue'

export default {
  name: 'HeaderComp',
  components: { SearchComp, DropdownComp, ChevronIcon },
  data() {
    return {
      genreEnum: this.$store.state.genreEnum,
      filter: this.$store.state.filter,
      timeout: null
    }
  },
  computed: {
    selectedMovie() {
      return this.$store.getters.selectedMovie
    }
  },
  watch: {
    'filter.name': function () {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.$store.dispatch('filterMovieGet')
      }, 200)
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

  &__btn {
    position: absolute;
    left: calc(var(--gap-double) * 2);
    top: 50%;
    transform: translateX(-50%);
    cursor: pointer;
  }
}
</style>
