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
    <div class="cinema__control">
      <button @click="scaleUp">zoom +</button>
      <button @click="scaleDown">zoom -</button>
    </div>
    <div class="cinema__screen">SCREEN</div>
    <div class="cinema__seats" ref="seats">
      <canvas ref="canvas" @mousedown="mouseDownHandler" @click="clickHandler"></canvas>
    </div>
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
  },
  data() {
    return {
      canvas: {
        ctx: null,
        cw: 0,
        ch: 0,
        tileSize: 0,
        gap: 10,
        stepScale: {
          large: 0.2,
          small: 0.1
        },
        scale: 1,
        pan: { x: 0, y: 0 },
        startDrag: { x: 0, y: 0 }
      },
      mirror: {
        canvas: null,
        ctx: null
      },
      pickerList: {},
      activeSeat: {},
      timeout: null
    }
  },
  methods: {
    mouseDownHandler(ev) {
      this.timeout = Date.now()
      const { target } = ev
      target.style.cursor = 'grab'
      const { startDrag, pan } = this.canvas
      startDrag.x = ev.clientX - pan.x
      startDrag.y = ev.clientY - pan.y
      target.addEventListener('mousemove', this.mouseMoveHandler)
      document.addEventListener('mouseup', this.mouseUpHandler)
    },
    mouseUpHandler() {
      const canvas = this.$refs.canvas
      canvas.style.cursor = 'pointer'
      canvas.removeEventListener('mousemove', this.mouseMoveHandler)
      document.removeEventListener('mouseup', this.mouseUpHandler)
    },
    mouseMoveHandler(ev) {
      const { startDrag, pan } = this.canvas
      pan.x = ev.clientX - startDrag.x
      pan.y = ev.clientY - startDrag.y
    },
    clickHandler(ev) {
      if (Date.now() > this.timeout + 300) return
      const { offsetX, offsetY } = ev
      const pixel = this.mirror.ctx.getImageData(offsetX, offsetY, 1, 1)
      const color = `rgb(${pixel.data[0]}, ${pixel.data[1]}, ${pixel.data[2]})`
      const item = this.pickerList[color]
      if (!item) return
      this.activeSeat = item
    },
    scaleDown() {
      const { stepScale } = this.canvas
      this.canvas.scale > 1
        ? (this.canvas.scale -= stepScale.large)
        : (this.canvas.scale -= stepScale.small)
    },
    scaleUp() {
      const { stepScale } = this.canvas
      this.canvas.scale > 1
        ? (this.canvas.scale += stepScale.large)
        : (this.canvas.scale += stepScale.small)
    },
    drawInit() {
      const wrap = this.$refs.seats
      const wrapStyles = wrap.getBoundingClientRect()
      const canvas = this.$refs.canvas
      this.canvas.cw = wrapStyles.width
      canvas.width = this.canvas.cw
      this.canvas.ch = window.innerHeight - wrapStyles.top
      canvas.height = this.canvas.ch
      this.canvas.ctx = canvas.getContext('2d')

      this.mirror.canvas = document.createElement('canvas')
      this.mirror.canvas.width = this.canvas.cw
      this.mirror.canvas.height = this.canvas.ch
      this.mirror.ctx = this.mirror.canvas.getContext('2d')

      let width = this.canvas.cw / this.seats[0][1].length
      let height = this.canvas.ch / this.seats.length
      this.canvas.tileSize = width > height ? height : width
      this.canvas.tileSize = height > width ? width : height
      this.canvas.tileSize -= this.canvas.gap

      this.createPickerList()

      requestAnimationFrame(this.draw)
    },

    draw() {
      const { seats, mirror } = this
      const { ctx, cw, ch, tileSize, scale, pan } = this.canvas
      const gap = this.canvas.gap
      let x = 0
      let y = 0

      const setTransforms = (ctx) => {
        ctx.clearRect(0, 0, cw, ch)
        ctx.save()
        ctx.translate(pan.x, pan.y)
        ctx.scale(scale, scale)
      }
      setTransforms(ctx)
      setTransforms(mirror.ctx)

      for (let i = 0; i < seats.length; i++) {
        const row = seats[i][1]
        y = (tileSize + gap) * i

        for (let h = 0; h < row.length; h++) {
          const seatElem = row[h]
          x = (tileSize + gap) * h

          ctx.fillStyle = seatElem.is_free ? '#253554' : '#1F293D'
          if (seatElem === this.activeSeat) ctx.fillStyle = '#ff8036'

          const drawBaseTile = (ctx) => {
            ctx.beginPath()
            ctx.roundRect(x, y, tileSize, tileSize, 4)
            ctx.closePath()
            ctx.fill()
          }
          drawBaseTile(ctx)
          mirror.ctx.fillStyle = seatElem.color
          drawBaseTile(mirror.ctx)

          if (seatElem.is_free) {
            ctx.beginPath()
            ctx.font = '6px Roboto'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillStyle = 'white'
            ctx.fillText(seatElem.seat, x + tileSize / 2, y + tileSize / 2)
            ctx.closePath()
            ctx.fill()
          }
        }
      }

      const restore = (ctx) => {
        ctx.restore()
      }
      restore(ctx)
      restore(mirror.ctx)

      requestAnimationFrame(this.draw)
    },
    createPickerList() {
      const { seats, pickerList } = this
      for (let i = 0; i < seats.length; i++) {
        const row = seats[i][1]
        for (let h = 0; h < row.length; h++) {
          const seatElem = row[h]
          const color = this.getColor()
          pickerList[color] = seatElem
          seatElem.color = color
          seatElem.row = seats[i][0].row
        }
      }
    },
    getColor() {
      const getRandom = () => Math.floor(Math.random() * 256)
      const color = `rgb(${getRandom()}, ${getRandom()}, ${getRandom()})`
      if (this.pickerList[color]) this.getColor()
      return color
    }
  },
  mounted() {
    this.drawInit()
    console.log(this.seats)
  }
}
</script>

<style lang="scss">
.cinema {
  position: relative;
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

  &__seats {
    gap: var(--gap-double);
    display: grid;
    &__row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(20px, 1fr));
      gap: var(--gap-step);
    }

    &__cell {
      background: green;
      border-radius: 8px;
      width: 20px;
      aspect-ratio: 1;
      font-size: 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;

      &--busy {
        background: red;
      }
    }

    canvas {
      cursor: pointer;
    }
  }

  &__control {
    position: absolute;
    top: var(--gap-double);
    right: calc(var(--gap-double) * 3);
    button {
      padding: var(--gap) var(--gap-double);
      margin: 0 var(--gap);
      cursor: pointer;
      font-size: 1rem;
      color: inherit;
      background: var(--bg-primary);
      border: none;
      box-shadow: 0px 4px 16px rgba(255, 128, 54, 0.25);
      border-radius: 8px;
    }
  }
}
</style>
