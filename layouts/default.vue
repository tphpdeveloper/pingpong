<script setup lang="ts">

</script>

<template>
  <div>
    <h2>Default Layout</h2>
    AppHeader
    <slot />
    AppFooter
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
}

html,
body {
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
}

body {
  background-color: #1c1c1c;
  color: white;
  padding: 0;
  margin: 0;
}
</style>
