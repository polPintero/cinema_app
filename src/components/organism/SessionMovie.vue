<template>
  <div v-if="list" class="session">
    <div v-for="item in list" :key="item.showdate" class="session__item">
      <div class="session__item__date">
        {{ new Date(item.showdate).toLocaleString('ua', { month: 'short', day: 'numeric' }) }}
      </div>
      <div class="session__item__time">
        <span
          v-for="time in item.daytime.split(';')"
          :key="time"
          @click="selectedTime(item.showdate, time)"
          >{{ time }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SessionMovie',
  props: {
    sessions: [Array, Object],
    default: null
  },
  computed: {
    list() {
      return this.sessions
    }
  },
  methods: {
    selectedTime(date, time) {
      this.$emit('selectedTime', { showdate: date, daytime: time })
    }
  }
}
</script>

<style lang="scss">
.session {
  display: grid;
  grid-template-rows: repeat(auto-fit, minmax(20px, 1fr));
  width: 100%;
  &__item {
    display: grid;
    grid-template-columns: min(100px, 20%) 1fr;
    gap: var(--gap-double);
    border-bottom: 1px solid;
    padding: var(--gap-double);

    &__date {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__time {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
      gap: var(--gap-double);
    }
  }
}
</style>
