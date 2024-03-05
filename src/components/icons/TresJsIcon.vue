<script setup lang="ts">
const { height, width } = defineProps({
  height: { type: Number, required: true },
  width: { type: Number, required: true },
});
</script>

<template>
  <svg :width="width" :height="height" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 934 934">
    <path
      fill="#82DBC5"
      d="M357.8 33.2a1 1 0 0 1 1.8 0l235.2 392.1a1 1 0 0 1-.8 1.5H123.4a1 1 0 0 1-.8-1.5l235.2-392Z"
    />
    <path
      fill="#4F4F4F"
      d="M457.5 269.8c0-.5.4-1 1-1H812c.6 0 1 .5 1 1v353.6c0 .5-.4 1-1 1H458.5a1 1 0 0 1-1-1V269.8Z"
    />
    <circle cx="467.3" cy="660.3" r="188.5" fill="#EFAC35" />
  </svg>
</template>
