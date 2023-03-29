<template>
  <label class="search">
    <search-icon class="search__lupa" />
    <input class="search__input" :value="modelValue" @input="inputHandler" />
    <close-icon class="search__clear" @click="clearInputValue" />
  </label>
</template>

<script>
import SearchIcon from '@/components/atoms/icons/SearchIcon.vue'
import CloseIcon from '@/components/atoms/icons/CloseIcon.vue'

export default {
  name: 'SearchComp',
  components: { SearchIcon, CloseIcon },
  emits: ['update:modelValue'],
  props: { modelValue: { type: String } },
  methods: {
    inputHandler(event) {
      this.emitsValue(event.target.value)
    },
    clearInputValue() {
      this.emitsValue('')
    },
    emitsValue(value) {
      this.$emit('update:modelValue', value)
    }
  }
}
</script>

<style lang="scss">
.search {
  position: relative;
  padding: var(--gap) calc(var(--gap-double) * 1.5);
  padding-left: calc(var(--gap-double) * 2);
  border: var(--shadow-primapy);
  border-radius: 8px;
  background: var(--bg-secondary);

  &:hover {
    .search__clear {
      display: block;
    }
  }

  &__input {
    background: var(--bg-secondary);
    border-radius: 10px;
    font-size: 1rem;
    color: inherit;
    border: none;
    outline: none;
  }

  &__lupa {
    position: absolute;
    top: 50%;
    left: 8px;
    transform: translateY(-50%);
  }

  &__clear {
    --size: 22px;
    display: none;
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
    padding: 5px;
    border-radius: 100%;
    width: var(--size);
    height: var(--size);
    background: var(--bg-base);
    cursor: pointer;
  }
}
</style>
