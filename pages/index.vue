<template>
  <div class="circle" :style="style" />
</template>

<script>

export default {
  name: 'Index',
  data () {
    return {
      top: 0,
      left: 0,
      moveX: 'left',
      moveY: 'down',
      countPlus: 1,
      screenW: 0,
      screenH: 0,
      size: 100,
      style: {
        top: 0,
        left: 0
      }
    }
  },
  created () {
    this.runCircle()
    this.setDocumentScroll()
  },
  methods: {
    runCircle () {
      this.setX()
      this.setY()
      this.style.left = `${this.left}px`
      this.style.top = `${this.top}px`
      setTimeout(() => {
        this.runCircle()
      }, 1)
    },
    windowSize () {
      return {
        width: 1536,
        height: 761
      }
    },
    setX () {
      if (this.isRight()) {
        this.left += this.getLetCount()
        if (this.left >= this.getWidth()) {
          this.asLeft()
        }
      } else if (this.isLeft()) {
        this.left -= this.getLetCount()
        if (this.left <= 0) {
          this.asRight()
        }
      }
    },
    setY () {
      if (this.isDown()) {
        this.top += this.getTopCount()
        if (this.top >= this.getHeight()) {
          this.asUp()
        }
      } else if (this.isUp()) {
        this.top -= this.getTopCount()
        if (this.top <= 0) {
          this.asDown()
        }
      }
    },
    getHeight () {
      return this.windowSize().height - this.size
    },
    getWidth () {
      return (this.windowSize().width - this.size) - 20
    },
    isRight () {
      return this.moveX === 'right'
    },
    asRight () {
      this.moveX = 'right'
    },
    isLeft () {
      return this.moveX === 'left'
    },
    asLeft () {
      this.moveX = 'left'
    },
    isDown () {
      return this.moveY === 'down'
    },
    asDown () {
      this.moveY = 'down'
    },
    isUp () {
      return this.moveY === 'up'
    },
    asUp () {
      this.moveY = 'up'
    },
    getTopCount () {
      return this.countPlus
    },
    getLetCount () {
      return this.countPlus
    },
    setDocumentScroll () {
      document.addEventListener('wheel', (e) => {
        if (e.deltaY < 0) {
          this.countPlus++
        } else if (e.deltaY > 0) {
          if (this.countPlus > 1) {
            this.countPlus--
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .circle {
    background-color: #253cff;
    border-radius: 50%;
    position: absolute;
    height: 100px;
    width: 100px;
  }
</style>
