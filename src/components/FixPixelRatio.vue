<script setup lang="ts">
import { useRenderLoop, useTresContext } from "@tresjs/core";
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
  console.log("🚀 ~ file: FixPixelRatio.vue:18 ~ setup ~ height.value.offsetHeight:", height.value.offsetHeight);
}
setup();

watch(width, () => {
  setup();
});

const { onLoop } = useRenderLoop();

onLoop(() => {});
</script>

<template></template>
