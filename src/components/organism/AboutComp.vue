<template>
  <template v-if="selectedMovie">
    <tabs-comp>
      <template v-for="tab in tabs" :key="tab" #[tab]>
        <div :class="{ 'about__tabs--active': activeTab === tab }" @click="activeTab = tab">
          {{ tab }}
        </div>
      </template>
    </tabs-comp>

    <div class="about__main">
      <template v-if="activeTab === tabs[0]">
        <div class="about__main__img">
          <img :src="selectedMovie.image" :alt="selectedMovie.name" />
        </div>
        <div class="about__main__add" v-html="selectedMovie.additional"></div>
        <div class="about__main__descr">{{ selectedMovie.description }}</div>
        <button class="about__main__select-btn" @click="activeTab = tabs[1]">Select Session</button>
      </template>
      <template v-if="activeTab === tabs[1]">
        <session-movie :sessions="sessions" @selected-time="$emit('selectedTime', $event)" />
      </template>
    </div>
  </template>
</template>

<script>
import SessionMovie from '@/components/organism/SessionMovie.vue'
import TabsComp from '@/components/atoms/TabsComp.vue'

export default {
  name: 'AboutComp',
  components: { SessionMovie, TabsComp },
  data() {
    return {
      tabs: ['About', 'Sessions'],
      activeTab: 'About',
      sessions: null
    }
  },
  computed: {
    selectedMovie() {
      return this.$store.getters.selectedMovie
    },
    selectedMovieId() {
      return this.$store.state.selectedMovieId
    }
  },
  watch: {
    async activeTab(e) {
      if (e !== this.tabs[1]) return
      const response = await this.$store.dispatch('movieSessionsGet')
      this.sessions = response.data[this.selectedMovieId]
    }
  }
}
</script>

<style lang="scss">
.about {
  &__tabs--active {
    color: var(--txt-primary-color);
    text-shadow: var(--txt-primary-shadow);
    border-color: var(--txt-primary-color);
    pointer-events: none;
  }

  &__main {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: var(--gap-double);
    padding-block-end: 0;

    &__img {
      width: 50%;
      aspect-ratio: 0.8;
      img {
        width: 100%;
      }

      @media (max-width: $tablet) {
        width: 100%;
      }
    }

    &__add {
      width: 50%;
      @media (max-width: $tablet) {
        width: 100%;
        order: 3;
        ul {
          padding-left: 16px;
        }
      }
      a {
        pointer-events: none;
        color: inherit;
        text-decoration: none;
      }
    }

    &__descr {
      padding: var(--gap-double) 0;
    }

    &__select-btn {
      width: max(200px, 80%);
      margin: var(--gap-double) auto;
      padding: var(--gap) var(--gap-double);
      color: inherit;
      font-size: 1rem;
      background: var(--bg-primary);
      box-shadow: var(--shadow-primary);
      border-radius: 8px;
      border: none;
      outline: none;
      cursor: pointer;
    }

    @media (max-width: $tablet) {
      flex-direction: column;
    }
  }
}
</style>
