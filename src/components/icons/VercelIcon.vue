<script setup>
const { height, width } = defineProps({
  height: { type: Number, required: true },
  width: { type: Number, required: true },
});
</script>

<template>
  <svg :width="width" :height="height" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M256 34L512 477.41H0L256 34Z" fill="black" />
  </svg>
</template>
