<script setup lang="ts">
import { useTresContext } from "@tresjs/core";
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
</script>

<template></template>
