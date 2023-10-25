<script setup lang="ts">
import { useGLTF } from "@tresjs/cientos";
import { useRenderLoop } from "@tresjs/core";
import type { Vector3 } from "three";
import { ref, shallowRef, toRefs } from "vue";

const props = defineProps<{
  progress: number;
  position: Vector3;
}>();

const { progress, position } = toRefs(props);
const path = "/models/keyboard.glb";

const { scene } = await useGLTF(path, { draco: true });

function normalize(val: number, min: number, max: number) {
  if (min < 0) {
    max += 0 - min;
    val += 0 - min;
    min = 0;
  }
  val = val - min;
  max = max - min;
  return Math.max(0, Math.min(1, val / max));
}

function lerp(start: number, end: number, t: number) {
  return (1 - t) * start + t * end;
}
const parentRef = ref();
const modelRef = shallowRef();

const { onLoop } = useRenderLoop();

onLoop(({ elapsed }) => {});
</script>

<template>
  <TresGroup ref="parentRef" :position="position">
    <primitive ref="modelRef" :object="scene" />
  </TresGroup>
</template>
