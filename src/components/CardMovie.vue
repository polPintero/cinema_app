<template>
  <section class="card-movie">
    <img class="card-movie__img" :src="image" :alt="name" />
    <h4 class="card-movie__name">{{ name }}</h4>
    <GenreTag :genre-id="genre" />
    <!-- <div v-html="additional"></div> -->
  </section>
</template>

<script>
import GenreTag from './GenreTag.vue'
export default {
  name: 'CardMovie',

  components: { GenreTag },

  props: {
    id: { type: Number, default: null },
    genre: { type: Number, default: null },
    image: { type: String, default: '' },
    description: { type: String, default: '' },
    name: { type: String, default: '' },
    additional: { type: String, default: '' }
  }
}
</script>

<style lang="scss">
.card-movie {
  display: flex;
  flex-direction: column;
  aspect-ratio: 0.73;

  &__img {
    height: 100%;
    border-radius: var(--gap);
    margin-block-end: var(--gap);
    filter: drop-shadow(0px 16px 40px rgba(7, 9, 13, 0.25));
    cursor: pointer;
}

&__genre {
    text-transform: lowercase;
}

&__name {
    margin-block-end: var(--gap);
  }
}
</style>
