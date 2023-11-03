<script setup lang="ts">
import { useGLTF } from "@tresjs/cientos";
import { Vector3, type Euler } from "three";
import { toRefs } from "vue";

const props = defineProps<{
  position: Vector3;
  rotation: Euler;
  scale: number;
}>();

const { position, rotation, scale } = toRefs(props);
// const simpleShadow = await useTexture({
//   alphaMap: "/textures/simpleShadow.jpg",
// });
const path = "/models/mouse.glb";

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
