<script setup lang="ts">
import { useTresContext } from "@tresjs/core";
import { useWindowSize } from "@vueuse/core";
import { toRefs, watch } from "vue";

const props = defineProps<{
  height: any;
}>();
const { height } = toRefs(props);

const { width } = useWindowSize();

const { renderer } = useTresContext();
function setup() {
  renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.value.setSize(width.value, height.value.offsetHeight);
}
setup();

watch(width, () => {
  setup();
});
</script>

<template></template>
