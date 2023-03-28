<template>
  <div class="about" v-if="selectedMovie">
    <section class="about__tabs">
      <div
        class="about__tabs__item"
        v-for="tab in tabs"
        :class="{ 'about__tabs--active': activeTab === tab }"
        :key="tab"
        @click="activeTab = tab"
      >
        {{ tab }}
      </div>
    </section>
    <div class="about__main">

      <template v-if="activeTab === tabs[0]">
        <div class="about__main__img">
          <img :src="selectedMovie.image" :alt="selectedMovie.name" />
        </div>
        <div class="about__main__add" v-html="selectedMovie.additional"></div>
        <div class="about__main__descr">{{ selectedMovie.description }}</div>
      </template>

      <template v-if="activeTab === tabs[1]">
        <session-movie :sessions="sessions"/>
      </template>

    </div>
  </div>
</template>

<script>
import SessionMovie from '../components/SessionMovie.vue';

export default {
  name: 'MovieAbout',
  components: { SessionMovie },
  data() {
    return {
      tabs: ['About', 'Sessions'],
      activeTab: 'About',
      sessions: null,
    }
  },
  // created() {
  //   if (this.selectedMovie) {
  //     this.selectedMovie.additional = this.selectedMovie.additional.replace(
  //       /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  //       ''
  //     )
  //     this.selectedMovie.additional = this.selectedMovie.additional.replace(
  //       /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
  //       ''
  //     )
  //   }
  // },
  computed: {
    selectedMovie(){
      return this.$store.getters.selectedMovie
    },
    selectedMovieId(){
      return this.$store.state.selectedMovieId
    }
  },
  watch: {
    async activeTab(e){
      if(e !== this.tabs[1]) return
      const response = await this.$store.dispatch('movieSessionsGet')
      this.sessions = response.data[this.selectedMovieId]
    }
  }
}
</script>

<style lang="scss">
.about {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__tabs {
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

    &--active {
      color: var(--txt-primary-color);
      text-shadow: 0px 0px 16px rgba(255, 128, 54, 0.5);
      border-color: var(--txt-primary-color);
      pointer-events: none;
    }
  }

  &__main {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: var(--gap-double);

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

    @media (max-width: $tablet) {
      flex-direction: column;
    }
  }
}
</style>
