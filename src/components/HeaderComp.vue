<template>
  <div class="header">
    <dropdown-comp v-model="selectedGenre" :list="Object.keys(genreEnum)" />
    <search-comp v-model="searchString"/>
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
      selectedGenre: '',
      searchString: ''
    }
  },
  watch: {
    searchString(){
    }
  }
}
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg-secondary);
  padding: var(--gap-double) ;
  position: sticky;
  top: 0;
  height: var(--header-height);
  z-index: 2;
}
</style>
