<script setup lang="ts">
import { TresLeches } from "@tresjs/leches";
import { ref } from "vue";

const showDebug = ref(false);

window.addEventListener("keydown", function (event) {
  if (event.ctrlKey && event.altKey && event.key === "d") {
    showDebug.value = !showDebug.value;
    console.log(showDebug.value ? "Show Debug" : "Hide Debug");
  }
});
</script>

<template>
  <TresLeches v-if="showDebug" class="!fixed" />
</template>

<style scoped>
.w-280px {
  width: 280px;
}

.bg-dark-200 {
  --un-bg-opacity: 1;
  background-color: rgba(50, 50, 50, var(--un-bg-opacity));
}

.bg-dark-500 {
  --un-bg-opacity: 1;
  background-color: rgba(31, 31, 31, var(--un-bg-opacity));
}

.important-outline-gray-200 {
  --un-outline-color-opacity: 1 !important;
  outline-color: rgba(229, 231, 235, var(--un-outline-color-opacity)) !important;
}

input[type="range"][data-v-9e6267fe] {
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

input[type="range"][data-v-9e6267fe]::-webkit-slider-thumb {
  height: 1rem;
  width: 0.75rem;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-width: 2px;
  border-radius: 0.125rem;
  --un-bg-opacity: 1;
  background-color: rgba(50, 50, 50, var(--un-bg-opacity));
  --un-shadow: var(--un-shadow-inset) 0 10px 15px -3px var(--un-shadow-color, rgba(0, 0, 0, 0.1)),
    var(--un-shadow-inset) 0 4px 6px -4px var(--un-shadow-color, rgba(0, 0, 0, 0.1));
  box-shadow: var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow);
}

input[type="range"][data-v-9e6267fe]::-moz-range-thumb {
  height: 1rem;
  width: 0.75rem;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-width: 2px;
  border-radius: 0.125rem;
  --un-bg-opacity: 1;
  background-color: rgba(50, 50, 50, var(--un-bg-opacity));
  --un-shadow: var(--un-shadow-inset) 0 10px 15px -3px var(--un-shadow-color, rgba(0, 0, 0, 0.1)),
    var(--un-shadow-inset) 0 4px 6px -4px var(--un-shadow-color, rgba(0, 0, 0, 0.1));
  box-shadow: var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow);
}

input[type="color"] {
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.125rem;
  border-style: none;
  background-color: transparent;
  padding: 0;
  outline: 2px solid transparent;
  outline-offset: 2px;
  cursor: pointer;
}

input[type="color"]::-webkit-color-swatch-wrapper {
  border-style: none;
  padding: 0;
}

input[type="color"]::-webkit-color-swatch {
  margin-top: -0.125rem;
  height: 30px;
  width: 30px;
  border-radius: 0.125rem;
  border-style: none;
  padding: 0;
}
</style>
