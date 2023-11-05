<script setup lang="ts">
import { useTresContext } from "@tresjs/core";
import { useWindowSize } from "@vueuse/core";
import { watch } from "vue";

const { height } = defineProps({ height: { type: HTMLElement, default: null } });

const { width: windowWidth } = useWindowSize();

const { renderer } = useTresContext();
function setup() {
  renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.value.setSize(windowWidth.value, height.offsetHeight);
}
setup();

watch(windowWidth, setup);
</script>

<template>{}</template>
