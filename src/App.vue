<template>
  <HeaderComp />
  <RouterView />
</template>

<script>
import HeaderComp from '@/components/organism/HeaderComp.vue'

export default {
  name: 'App',
  components: {
    HeaderComp
  }
}
</script>

<style lang="scss">
#app {
  width: min(100%, 1020px);
  // padding: var(--gap-double);
  margin: auto;
}
</style>
