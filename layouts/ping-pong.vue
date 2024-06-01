<script setup></script>

<template>
  <div>
    <div class="namePage">
      Ping Pong
    </div>
    <slot />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

body {
background-color: #1c1c1c;
  color: white;
  padding: 0;
  margin: 0;
}

.namePage {
  display: flex;
  justify-content: center;
  position: absolute;
  font-weight: bold;
  font-size: 40px;
  left: 50%;
  top: 50%;
  align-items: center;
}
</style>
