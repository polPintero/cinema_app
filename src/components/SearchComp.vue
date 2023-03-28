<template>
  <label class="search">
    <search-icon class="search__icon" />
    <input type="text" class="search__input" />
  </label>
</template>

<script>
import SearchIcon from './icons/SearchIcon.vue'

export default {
  name: 'SearchComp',
  components: { SearchIcon }
}
</script>

<style lang="scss">
.search {
  position: relative;
  padding: var(--gap) var(--gap-double);
  padding-left: calc(var(--gap-double) * 2);
  border: 1px solid rgba(109, 158, 255, 0.1);
  border-radius: 8px;
  background: var(--bg-secondary);

  &__input {
    background: var(--bg-secondary);
    border-radius: 10px;
    font-size: 1rem;
    color: inherit;
    border: none;
    outline: none;
  }

  &__icon {
    position: absolute;
    top: 50%;
    left: var(--gap);
    transform: translateY(-50%);
  }
}
</style>
