<template>
  <section class="tabs">
    <template v-for="(func, slotsName) in $slots" :key="slotsName">
      <div class="tabs__item">
        <slot :name="slotsName"></slot>
      </div>
    </template>
  </section>
</template>

<script>
export default {
  name: 'TabsComp',
}
</script>

<style lang="scss">
.tabs {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  background: var(--bg-secondary);
  cursor: pointer;
  position: sticky;
  top: var(--header-height);
  z-index: 1;
  &__item {
      text-align: center;
      padding: var(--gap-double);
      border-bottom: 2px solid rgba(109, 158, 255, 0.1);
    }
}
</style>
