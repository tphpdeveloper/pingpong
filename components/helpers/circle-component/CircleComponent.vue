<script setup lang="ts">
defineProps({
  style: {
    type: Object,
    default() {
      return {
        top: 0,
        left: 0,
        height: 0,
        width: 0,
        backgroundColor: 'red',
      }
    }
  },
  countPlus: {
    type: Number,
    default: () => 0
  },
  center: {
    type: Object,
    default() {
      return {x:0, y:0}
    }
  }
});
</script>

<template>
  Style = {{ style }}
  <br>
  <div
    class="circle"
    :style="style"
  >
    <div class="info">
      <span>{{ countPlus }}</span>
      <span>left: {{ style.left }}</span>
      <span>top: {{ style.top }}</span>
      <span>x: {{ center.x }}</span>
      <span>y: {{ center.y }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use './circle.scss';
</style>
