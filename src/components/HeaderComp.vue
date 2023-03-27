<template>
  <div class="header">
    <search-comp />
  </div>
</template>

<script>
import SearchComp from './SearchComp.vue'

export default {
  name: 'HeaderComp',
  components: { SearchComp }
}
</script>

<style lang="scss">
.header {
  background: var(--bg-secondary);
  padding: var(--gap-double) 0;
  position: sticky;
  top: 0;
  height: var(--header-height);
  z-index: 1;
}
</style>
