<script setup lang="ts">
import { useRenderLoop, useTresContext } from "@tresjs/core";
import { useWindowSize } from "@vueuse/core";
import { watch } from "vue";

const { width } = useWindowSize();

const { renderer } = useTresContext();
function setup() {
  renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}
setup();

watch(width, () => {
  setup();
});

const { onLoop } = useRenderLoop();

onLoop(() => {
  renderer.value.setSize(width.value, window.innerHeight);
});
</script>

<template></template>
