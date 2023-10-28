<script setup lang="ts">
import { useGLTF } from "@tresjs/cientos";
import type { Euler, Vector3 } from "three";
import { toRefs } from "vue";

const props = defineProps<{
  position: Vector3;
  rotation: Euler;
  scale: number;
}>();

const { position, rotation, scale } = toRefs(props);
const path = "/models/tablet.glb";

const { scene } = await useGLTF(path, { draco: true });
</script>

<template>
  <TresGroup :position="position" :rotation="rotation" :scale="scale">
    <primitive :object="scene" />
  </TresGroup>
</template>
