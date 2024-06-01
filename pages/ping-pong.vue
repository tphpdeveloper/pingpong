<script setup>
definePageMeta({
  layout: 'ping-pong',
});

useHead({
  title: 'Сторінка з кулькою',
  meta: [
    {name: 'description', content: 'Сторінка з кулькою - це опис сторінки'},
    {name: 'author', content: 'Це я сам, красавчик'},
    {name: 'customer', content: 'customer text'},
  ],
});


</script>

<template>
  <div>
    <CircleComponent />
  </div>
</template>

<style scoped>

</style>
