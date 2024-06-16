<script setup lang="ts">
import { useTresContext } from "@tresjs/core";
import { useWindowSize, watchDebounced } from "@vueuse/core";

const { height } = defineProps<{ height: number }>();

const { width: windowWidth, height: windowHeight } = useWindowSize();

const { renderer } = useTresContext();
function setup() {
    renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.value.setSize(windowWidth.value, height);
}
setup();

watchDebounced(windowWidth, setup, { debounce: 1000, maxWait: 2000 });
watchDebounced(windowHeight, setup, { debounce: 1000, maxWait: 2000 });
</script>

<template>{}</template>
