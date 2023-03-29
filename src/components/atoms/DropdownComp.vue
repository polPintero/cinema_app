<template>
  <div class="dropdown" @click="toggleVisible" :class="{ 'dropdown--show': visible }">
    <div class="dropdown__wrap-btn">
      <chevron-icon class="dropdown__chevron"></chevron-icon>
      <button class="dropdown__btn">{{ valueVisible }}</button>
    </div>
    <ul class="dropdown__content" @click="toggleVisible">
      <li
        class="dropdown__content__name"
        :class="{ 'dropdown__content__name--active': valueVisible === placeholder }"
        @click="$emit('update:modelValue', null)"
      >
        <span>{{ placeholder }}</span>
      </li>
      <li
        v-for="(value, id) in list"
        :key="id"
        class="dropdown__content__name"
        :class="{ 'dropdown__content__name--active': id === modelValue }"
        @click="$emit('update:modelValue', id)"
      >
        <span>{{ value.toLowerCase() }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import ChevronIcon from '@/components/atoms/icons/ChevronIcon.vue'

export default {
  name: 'DropdownComp',
  components: {
    ChevronIcon
  },
  emits: ['update:modelValue'],
  props: {
    list: {
      type: Array
    },
    modelValue: {
      type: String
    },
    placeholder: {
      type: String,
      default: 'all'
    }
  },
  computed: {
    valueVisible() {
      const value = this.list[this.modelValue]
      return value ? value.toLowerCase() : this.placeholder
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
  color: inherit;
  position: relative;
  display: inline-block;
  cursor: pointer;
  background: var(--bg-secondary);

  &__btn {
    width: 100%;
    padding: var(--gap) var(--gap-double);
    padding-right: calc(var(--gap-double) * 3);
    text-transform: capitalize;
    font-size: 1rem;
    color: inherit;
    text-align: left;
    cursor: pointer;
    background: var(--bg-secondary);
    border: var(--shadow-primapy);
    border-radius: 8px;
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
    transform: translateY(-50%) rotate(-90deg);
    z-index: 1;
    pointer-events: none;
  }

  &__content {
    display: none;
    position: absolute;
    margin-block-start: 5px;
    padding-left: 0;
    left: 0;
    background: var(--bg-secondary);

    &__name {
      padding: var(--gap) var(--gap-double);
      text-decoration: none;
      display: block;
      border-bottom: 1px solid #2a2b2d;
      text-transform: capitalize;
      &:hover {
        color: var(--txt-primary-color);
        text-shadow: 0px 0px 16px rgba(255, 128, 54, 0.5);
      }
      &--active {
        color: var(--txt-primary-color);
        text-shadow: 0px 0px 16px rgba(255, 128, 54, 0.5);
      }
    }
  }

  &--show {
    .dropdown__content {
      display: block;
    }
    .dropdown__chevron {
      transform: translateY(-50%) rotate(90deg);
    }
  }
}
</style>
