<template>
  <span class="genre-tag">{{ genreName }}</span>
</template>

<script>
export default {
  name: 'GenreTag',
  props: {
    genreId: { type: Number, require: true }
  },
  data() {
    return {
      genreEnum: this.$store.state.genreEnum
    }
  },
  computed: {
    genreName() {
      return this.genreEnum[this.genreId]
      // let genreName = ''
      // Object.keys(this.genreEnum).some((name) => {
      //   const id = this.genreEnum[name]
      //   if (id === this.genreId) {
      //     genreName = name
      //     return true
      //   }
      // })
      // return genreName
    }
  }
}
</script>

<style lang="scss">
.genre-tag {
    text-transform: lowercase;
    width: max-content;
    border-radius: var(--gap-step);
    color: var(--txt-secondary-color);
    cursor: pointer;
    
}
</style>
