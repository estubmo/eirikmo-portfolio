<script setup lang="ts">
import { onErrorCaptured } from "vue";

// Error boundary scoped to the 3D scene.
//
// onErrorCaptured on the root component would see errors from every component in
// the app, so deciding what to swallow would mean matching on error messages. That
// couples the guard to three.js's exact wording, and it misfires on any unrelated
// error whose message happens to contain "webgl" (a failed dynamic import, say).
// Wrapping the canvas instead means the boundary only ever sees errors from the
// scene, so it can swallow everything without hiding failures elsewhere.
//
// It stays armed for the life of the app on purpose. Tearing the TresCanvas down
// can throw on its own (renderer.dispose, forceContextLoss), and those errors
// arrive after the parent has already decided to drop the scene.
//
// Limits worth knowing: this catches synchronous throws inside Vue's lifecycle
// only. A lost context arrives as a `webglcontextlost` DOM event, and render-loop
// failures throw inside a requestAnimationFrame callback. Neither reaches Vue, so
// neither reaches this hook.
const emit = defineEmits<{ failed: [error: unknown] }>();

onErrorCaptured((error) => {
    emit("failed", error);
    return false;
});
</script>

<template>
    <slot />
</template>
