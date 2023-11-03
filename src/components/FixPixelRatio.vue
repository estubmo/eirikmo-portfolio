<script setup lang="ts">
import { useTresContext } from "@tresjs/core";
import { useWindowSize } from "@vueuse/core";
import { toRefs, watch } from "vue";

const props = defineProps<{
  height: any;
}>();
const { height } = toRefs(props);

const { width: windowWidth, height: windowHeight } = useWindowSize();

const { renderer } = useTresContext();
function setup() {
  renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.value.setSize(windowWidth.value, height.value.offsetHeight);
}
setup();

watch(windowWidth, setup);
watch(windowHeight, setup);
</script>

<template></template>
