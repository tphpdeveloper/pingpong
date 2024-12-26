<script setup lang="ts">
import {ref} from 'vue';

import circleState from "~/components/helpers/circle-component/circle-state";
import CircleComponent from "~/components/helpers/circle-component/CircleComponent.vue";
import type * as timers from "node:timers";

definePageMeta({
  layout: 'default',
})


const countBall = 10,
    circles = ref([]);
let timer = null;

onMounted(() => {
  for (let i = 0; i < countBall; i++) {
    const newCircle = circleState()

    setCorrectCoordinate(newCircle);
    circles.value.push(newCircle);

    document.addEventListener('wheel', newCircle.onDocumentScroll);
  }

  // runSprintCircles();

  document.addEventListener('keypress', (e) => {
    if(e.code === 'Space') {
      if (timer) {
        clearTimeoutTotally();
      } else {
        runSprintCircles();
      }
    }
  });
})

onUnmounted(() => {
  for (let i = 0; i < countBall; i++) {
    document.removeEventListener('wheel', circles.value[i].onDocumentScroll);
  }
})

function setCorrectCoordinate(newCircle) {
  let top = 0,
      left = 0,
      isColliding = [];

  const circlesCount = circles.value.length;

  do {
    top = newCircle.getRandomInt(0, newCircle.getHeight());
    left = newCircle.getRandomInt(0, newCircle.getWidth());

    newCircle.setTop(top);
    newCircle.setLeft(left);

    if (circlesCount > 1) {
      circles.value.forEach((circle, index) => {
        isColliding[index] = areCirclesColliding(newCircle, circle);
      })
    }

  } while (isColliding.filter(a => a === true).length > 0);
}

function runSprintCircles() {
  timer = setTimeout(() => {

    circles.value.forEach((circle1, index1) => {

      circles.value.forEach((circle2, index2) => {
        if (index1 !== index2 && areCirclesColliding(circle1, circle2)) {
          // circle1.changeAxisCircle(circle2);
          // clearTimeoutTotally();
        }
      })

      //зміщує коло на задану позицію.
      circle1.runSprint()
    })

    if (timer) {
      runSprintCircles();
    }
  }, 50);
}

function areCirclesColliding(circle1, circle2) {
  const c1 = circle1.getCenter(),
      c2 = circle2.getCenter(),
      r1 = circle1.radius.value || circle1.radius,
      r2 = circle2.radius.value || circle2.radius;

  const dx = c2.x - c1.x;
  const dy = c2.y - c1.y;

  const distance = Math.round(Math.sqrt(dx * dx + dy * dy));
  const result = distance - (r1 + r2);

  return distance <= (r1 + r2) || result <= 0;
}

function clearTimeoutTotally() {
  clearTimeout(timer);
  timer = null;
}
</script>

<template>
  <div>
    <h1>Welcome to the homepage</h1>

    <CircleComponent
      v-for="(circle, index) of circles" :key="`'ball_${index}`" :style="circle.style" :center="circle.getCenter()"
      :count-plus="circle.countPlus"/>
  </div>
</template>
