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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
scene.traverse((node: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (node.isMesh) node.castShadow = true;
});
</script>

<template>
  <TresGroup :position="position" :rotation="rotation" :scale="scale">
    <primitive :object="scene" />
  </TresGroup>
</template>
