<template>
  <div class="card-movie">
    <about-comp v-if="!isBooking" @selected-time="selectedTime"></about-comp>
    <book-seat
      v-else-if="isBooking"
      :daytime="bookingData.daytime"
      :showdate="bookingData.showdate"
      :seats="seats"
      @selected-seat="selectedSeatHandler"
    ></book-seat>
    <modal-comp :show="showModal" @close="closeModalWindow">

      <template #body>
        {{ resultTxt }}
      </template>
  
    </modal-comp>
  </div>
</template>

<script>
import AboutComp from '@/components/AboutComp.vue'
import BookSeat from '@/components/BookSeat.vue'
import ModalComp from '@/components/ModalComp.vue'


export default {
  name: 'MovieAbout',
  components: { AboutComp, BookSeat, ModalComp },
  data() {
    return {
      isBooking: false,
      bookingData: null,
      seats: null,
      showModal: false,
      resultTxt: ''
    }
  },
  methods: {
    closeModalWindow() {
      this.showModal = false
    },
    async selectedSeatHandler(itemSeat) {
      const query = {
        row: itemSeat.row,
        seat: itemSeat.seat,
        showdate: this.bookingData.showdate,
        daytime: this.bookingData.daytime
      }
      const result = await this.$store.dispatch('bookPlace', query)
      if (result.ok === false) {
        this.resultTxt = result.statusText
      } else {
        this.resultTxt = `Your ticket is ${result.data.ticketkey}`
      }
      console.log(result)
      this.showModal = true
    },
    async selectedTime(ev) {
      this.bookingData = ev
      this.seats = await this.$store.dispatch(
        'getPlaces',
        this.$store.selectedMovieId,
        ev.showdate,
        ev.daytime
      )
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
