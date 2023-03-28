<template>
  <tabs-comp>
    <template #showdate>
      <div>{{ showdate }}</div>
    </template>
    <template #daytime>
      <div>{{ daytime }}</div>
    </template>
  </tabs-comp>
  <section class="cinema">
    <div class="cinema__screen">SCREEN</div>
  </section>
</template>

<script>
import TabsComp from './TabsComp.vue'
export default {
  name: 'BookSeat',
  components: { TabsComp },
  props: {
    daytime: { type: String, default: '' },
    showdate: { type: String, default: '' },
    seats: { type: Array, default: () => [] }
  }
}
</script>

<style lang="scss">
.cinema {
  width: 100%;
  padding-block-start: calc(var(--gap-double) * 4);

  &__screen {
    text-align: center;
    letter-spacing: 1.5rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: #637394;

    &:after {
      content: '';
      display: block;
      width: 100%;
      height: 30px;
      border-radius: 100%;
      background: linear-gradient(180deg, #1f293d 0%, rgba(31, 41, 61, 0) 100%);
    }
  }
}
</style>
