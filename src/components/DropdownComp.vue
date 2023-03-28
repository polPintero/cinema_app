<template>
  <div class="dropdown" @click="toggleVisible" :class="{ 'dropdown--show': visible }">
    <div class="dropdown__wrap-btn">
      <chevron-icon class="dropdown__chevron"></chevron-icon>
      <button class="dropdown__btn">{{ modelValue || placeholder }}</button>
    </div>
    <ul class="dropdown__content" @click="toggleVisible">
      <template v-for="item in list" :key="item.name">
        <li
          class="dropdown__content__item"
          :class="{ 'dropdown__content__item--active': item.name === modelValue }"
          :value="item.name"
          v-if="conditionVisible(item)"
          @click="$emit('update:modelValue', item.name)"
        >
          <span>{{ item.name }}</span>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import ChevronIcon from './icons/ChevronIcon.vue'

export default {
  name: 'DropdownComp',
  components: {
    ChevronIcon
  },
  emits: ['update:modelValue'],
  props: {
    list: {
      type: [Array, Object],
    },
    valueKey: {
      type: String,
    },
    modelValue: {
      type: [String, Number]
    },
    placeholder: {
      type: String,
      default: 'all'
    }
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    toggleVisible() {
      this.visible = !this.visible
      setTimeout(() => {
        this.visible
          ? document.addEventListener('click', this.toggleVisible)
          : document.removeEventListener('click', this.toggleVisible)
      }, 0)
    }
  }
}
</script>

<style lang="scss">
.dropdown {
  // width: 100%;
  color: inherit;
  position: relative;
  display: inline-block;
  cursor: pointer;
  background: var(--bg-secondary);
  
  
  &__btn {
    width: 100%;
    padding: var(--gap) var(--gap-double);
    padding-right: calc(var(--gap-double) * 2);
    font-size: 1rem;
    color: inherit;
    text-align: left;
    cursor: pointer;
    border: none;
    background: var(--bg-secondary);

    &:focus {
    }
  }

  &__wrap-btn {
    position: relative;
  }

  .dropdown__chevron {
    position: absolute;
    right: 10px;
    top: 50%;
    width: 1rem;
    height: 1rem;
    transform: translateY(-50%);
    z-index: 1;
    pointer-events: none;
  }

  &__content {
    display: none;
    position: absolute;
    margin-block-start: 5px;
    padding-left: 0;
    right: 0;
    z-index: 999999;

    &__item {
      padding: var(--gap) var(--gap-double);
      text-decoration: none;
      display: block;
      border-bottom: 1px solid #2a2b2d;
      &:hover {
        span {
        }
      }
      &--active {
      }
    }
  }

  &--show {
    .dropdown__content {
      display: block;
    }
    .dropdown__chevron {
      transform: translateY(-50%) rotate(180deg);
    }
  }
}
</style>
