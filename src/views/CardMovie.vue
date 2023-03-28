<template>
  <div class="card-movie">
    <about-comp v-if="!isBooking" @selected-time="selectedTime"></about-comp>
    <book-seat
      v-else-if="isBooking"
      :daytime="bookingData.daytime"
      :showdate="bookingData.showdate"
      :seats="seats"
    ></book-seat>
  </div>
</template>

<script>
import AboutComp from '@/components/AboutComp.vue'
import BookSeat from '@/components/BookSeat.vue'

export default {
  name: 'MovieAbout',
  components: { AboutComp, BookSeat },
  data() {
    return {
      isBooking: false,
      bookingData: null,
      seats: null
    }
  },
  methods: {
    async selectedTime(ev) {
      this.bookingData = ev
      this.seats = await this.$store.dispatch(
        'getPlaces',
        this.$store.selectedMovieId,
        ev.showdate,
        ev.daytime
      )
      console.log(this.bookingData)
      this.isBooking = true
    }
  }
}
</script>

<style lang="scss">
.card-movie {
  display: flex;
  flex-direction: column;
}
</style>
