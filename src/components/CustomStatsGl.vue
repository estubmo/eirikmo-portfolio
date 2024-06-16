<script setup lang="ts">
import { StatsGl } from "@tresjs/cientos";
import { ref } from "vue";

const showDebug = ref(false);

window.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.altKey && event.key === "d") {
        showDebug.value = !showDebug.value;
    }
});
</script>

<template>
    <StatsGl v-if="showDebug" />
</template>
