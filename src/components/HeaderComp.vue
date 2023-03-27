<template>
  <div class="header">HeaderComp</div>
</template>

<script>
export default {
  name: 'HeaderComp'
}
</script>

<style lang="scss">
.header {
    background: var(--bg-secondary);
    padding: var(--gap-double) 0;
    position: sticky;
    top: 0;
    height: var(--header-height);
    z-index: 1
}
</style>
