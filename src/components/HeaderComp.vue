<template>
  <div class="header">
    <search-comp />
    <dropdown-comp />
  </div>
</template>

<script>
import SearchComp from './SearchComp.vue'
import DropdownComp from './DropdownComp.vue';

export default {
  name: 'HeaderComp',
  components: { SearchComp, DropdownComp }
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
