<script lang="ts" setup>
import { useRenderLoop, useTresContext } from "@tresjs/core";
import { useWindowSize } from "@vueuse/core";
import { BloomEffect, EffectComposer, EffectPass, RenderPass } from "postprocessing";
import { Camera, Scene, WebGLRenderer } from "three";
import { watch } from "vue";

let effectComposer: EffectComposer;

function setup(renderer: WebGLRenderer, scene: Scene, camera: Camera) {
  const onUpdateWindowSize = () => {
    const { width, height } = useWindowSize();
    renderer.setSize(width.value, height.value);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };
  onUpdateWindowSize();

  effectComposer = new EffectComposer(renderer);

  const bloomEffect = new BloomEffect({
    intensity: 0.5,
    luminanceThreshold: 0.1,
    radius: 0.3,
    luminanceSmoothing: 0.9,
  });

  const renderPass = new RenderPass(scene, camera);
  const effectPass = new EffectPass(camera, bloomEffect);
  effectComposer = new EffectComposer(renderer);
  effectComposer.addPass(renderPass);
  effectComposer.addPass(effectPass);

  watch(useWindowSize, onUpdateWindowSize);
}

useRenderLoop().onLoop(() => {
  effectComposer?.render();
});

const { renderer, scene, camera } = useTresContext();

setTimeout(() => setup(renderer.value, scene.value, camera.value ?? new Camera()), 10);
</script>

<template></template>
