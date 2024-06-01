<script setup>
import {ref} from "vue";

onMounted(() => {
  runInterval();
  document.addEventListener('wheel', onDocumentScroll);
})

onUnmounted(() => {
  document.removeEventListener('wheel', onDocumentScroll);
})

const top = ref(0),
  left = ref(0),
  moveX = ref(true),
  moveY = ref(false),
  countPlus = ref(2),
  size = ref(100),
  colorRgb = ref({r: 0, g: 80, b: 125,}),
  style = ref({height: `${size.value}px`, width: `${size.value}px`, top: '0px', left: '0px', 'background-color': `rgb(${colorRgb.value.r}, ${colorRgb.value.g}, ${colorRgb.value.b})`}),
  endRed = ref(false),
  endGreen = ref(false),
  endBlue = ref(false);


function runInterval() {
  setInterval(() => {
    generateColor()
  }, 50);

  setInterval(() => {
    if (getCountPlus() > 0) {
      runCircle()
    }
  }, 20);
}

function runCircle() {
  setX()
  setY()
  style.value.top = `${top.value}px`
  style.value.left = `${left.value}px`
  style.value['background-color'] = `rgb(${colorRgb.value.r}, ${colorRgb.value.g}, ${colorRgb.value.b})`
}

function windowSize() {
  return {
    width: document.body.clientWidth,
    height: document.body.clientHeight,
  }
}

function setX() {
  if (isRight()) {
    left.value += getCountPlus()
    if (left.value > getWidth()) {
      left.value = getWidth()
      asLeft()
    }
  }

  if (isLeft()) {
    left.value -= getCountPlus()
    if (left.value <= 0) {
      left.value = 0;
      asRight()
    }
  }
}

function setY() {
  if (isDown()) {
    top.value += getCountPlus()
    if (top.value > getHeight()) {
      top.value = getHeight();
      asUp()
    }
  }

  if (isUp()) {
    top.value -= getCountPlus()
    if (top.value <= 0) {
      top.value = 0;
      asDown()
    }
  }
}

function getHeight() {
  return windowSize().height - size.value
}

function getWidth() {
  return windowSize().width - size.value
}

function isRight() {
  return moveX.value
}

function isLeft() {
  return !moveX.value
}

function asRight() {
  moveX.value = !moveX.value
}

function asLeft() {
  asRight();
}

function isUp() {
  return moveY.value
}

function isDown() {
  return !moveY.value
}

function asUp() {
  moveY.value = !moveY.value
}

function asDown() {
  asUp()
}

function getCountPlus() {
  return countPlus.value
}

function onDocumentScroll(e) {
  if (e.deltaY < 0) {
    countPlus.value++
  } else if (e.deltaY > 0) {
    if (countPlus.value > 1) {
      countPlus.value--
    }
  }
}

function generateColor() {
  colorRgb.value.r = getSlowlyAddValue(() => colorRgb.value.r, 255, endRed);
  colorRgb.value.g = getSlowlyAddValue(() => colorRgb.value.g, 255, endGreen);
  colorRgb.value.b = getSlowlyAddValue(() => colorRgb.value.b, 255, endBlue);
}

function getSlowlyAddValue(callback, max, endValue) {
  let value = callback();

  if (!endValue.value) {
    value += 1;
    if (value >= max) {
      value = max;
      endValue.value = !endValue.value;
    }
  }

  if (endValue.value) {
    value -= 1;
    if (value <= 0) {
      value = 0;
      endValue.value = !endValue.value;
    }
  }

  return value
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
</script>

<template>
  <div
    class="circle"
    :style="style"
  >
    <div class="info">
      <span>{{ countPlus }}</span>
      <span>top: {{ style.top }}</span>
      <span>left: {{ style.left }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'style/circle-component/circle';
</style>
