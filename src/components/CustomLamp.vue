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

const path = "/models/lamp.glb";

const { scene } = await useGLTF(path, { draco: true });
scene.castShadow = true;
scene.receiveShadow = true;
</script>

<template>
  <TresGroup :position="position" :rotation="rotation" :scale="scale">
    <primitive :object="scene" />
  </TresGroup>
</template>
