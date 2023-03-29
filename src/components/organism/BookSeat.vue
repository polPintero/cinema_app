<template>
  <tabs-comp>
    <template #showdate>
      <div class="tabs__info">
        <div class="tabs__info__wrap">
          <calendar-icon /><span>{{ showdate }}</span>
        </div>
      </div>
    </template>
    <template #daytime>
      <div class="tabs__info">
        <div class="tabs__info__wrap">
          <clock-icon /> <span>{{ daytime }}</span>
        </div>
      </div>
    </template>
  </tabs-comp>
  <section class="cinema">
    <div class="cinema__control">
      <button @click="scaleUp">zoom +</button>
      <button @click="scaleDown">zoom -</button>
    </div>
    <div class="cinema__screen">SCREEN</div>
    <div class="cinema__seats" ref="seats">
      <canvas
        ref="canvas"
        @mousedown="mouseDownHandler"
        @touchmove="touchMoveHandler"
        @click="clickHandler"
        @touchstart="touchStartHandler"
      ></canvas>
    </div>
  </section>
</template>

<script>
import TabsComp from '@/components/atoms/TabsComp.vue'
import CalendarIcon from '@/components/atoms/icons/CalendarIcon.vue'
import ClockIcon from '@/components/atoms/icons/ClockIcon.vue'

export default {
  name: 'BookSeat',
  components: { TabsComp, CalendarIcon, ClockIcon },
  props: {
    daytime: { type: String, default: '' },
    showdate: { type: String, default: '' },
    seats: { type: Array, default: () => [] }
  },
  data() {
    return {
      canvas: {
        position: null,
        ctx: null,
        cw: 0,
        ch: 0,
        tileSize: 0,
        minSize: 15,
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
      const { startDrag, pan } = this.canvas
      startDrag.x = ev.clientX - pan.x
      startDrag.y = ev.clientY - pan.y
      const { target } = ev
      if (!target) return
      target.style.cursor = 'grab'
      target.addEventListener('mousemove', this.mouseMoveHandler)
      document.addEventListener('mouseup', this.mouseUpHandler)
    },
    mouseUpHandler() {
      const canvas = this.$refs.canvas
      canvas.style.cursor = 'pointer'
      canvas.removeEventListener('mousemove', this.mouseMoveHandler)
      document.removeEventListener('mouseup', this.mouseUpHandler)
    },
    touchStartHandler(ev) {
      const coords = this.modifaiCoordinates(ev)
      this.mouseDownHandler(coords)
    },
    modifaiCoordinates(ev) {
      const touch = ev.touches[0]
      const { canvas } = this
      const params = {
        clientX: touch.clientX - canvas.position.left,
        clientY: touch.clientY - canvas.position.top
      }
      return params
    },
    touchMoveHandler(ev) {
      const coords = this.modifaiCoordinates(ev)
      this.mouseMoveHandler(coords)
    },
    mouseMoveHandler(ev) {
      const { startDrag, pan } = this.canvas
      pan.x = ev.clientX - startDrag.x
      pan.y = ev.clientY - startDrag.y
    },
    clickHandler(ev) {
      if (Date.now() > this.timeout + 400 && ev.pointerType !== 'touch') return
      const { offsetX, offsetY } = ev
      const pixel = this.mirror.ctx.getImageData(offsetX, offsetY, 1, 1)
      const color = `rgb(${pixel.data[0]}, ${pixel.data[1]}, ${pixel.data[2]})`
      const item = this.pickerList[color]
      if (!item) return
      this.activeSeat = item
      this.$emit('selectedSeat', item)
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
      const { canvas, mirror, seats } = this
      const wrap = this.$refs.seats
      const wrapStyles = wrap.getBoundingClientRect()
      const canvasElem = this.$refs.canvas
      canvas.cw = wrapStyles.width
      canvasElem.width = canvas.cw
      canvas.ch = window.innerHeight - wrapStyles.top
      canvasElem.height = canvas.ch
      canvas.ctx = canvasElem.getContext('2d')
      canvas.position = canvasElem.getBoundingClientRect()

      mirror.canvas = document.createElement('canvas')
      mirror.canvas.width = canvas.cw
      mirror.canvas.height = canvas.ch
      mirror.ctx = mirror.canvas.getContext('2d')

      const lengtRow = seats[0][1].length
      let width = canvas.cw / lengtRow
      let height = canvas.ch / seats.length

      canvas.tileSize = width > height ? height : width
      canvas.tileSize = height > width ? width : height
      canvas.tileSize -= canvas.gap
      canvas.tileSize = canvas.tileSize < canvas.minSize ? canvas.minSize : canvas.tileSize

      canvas.scale = canvas.position.width / (lengtRow * (canvas.tileSize + canvas.gap))

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
            // const fontSize = 6*scale
            ctx.font = `6px Roboto`
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
    this.$nextTick(() => {
      this.drawInit()
      console.log(this.seats)
    })
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
    color: var(--txt-secondary-color);

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
    display: grid;

    canvas {
      cursor: pointer;
    }
  }

  &__control {
    position: absolute;
    top: var(--gap-double);
    right: calc(var(--gap-double));
    button {
      padding: var(--gap) var(--gap-double);
      margin: 0 var(--gap);
      cursor: pointer;
      font-size: 1rem;
      color: inherit;
      background: var(--bg-primary);
      border: none;
      box-shadow: var(--shadow-primary);
      border-radius: 8px;
    }
  }
}

.tabs__info {
  display: flex;
  justify-content: center;

  &__wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: var(--gap) var(--gap-double);
    border: var(--shadow-secondary);
    border-radius: 8px;
    width: fit-content;
    span {
      margin-left: var(--gap-double);
    }
  }
}
</style>
