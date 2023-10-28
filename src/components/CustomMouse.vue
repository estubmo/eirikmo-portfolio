<script setup lang="ts">
import { useGLTF } from "@tresjs/cientos";
import { useTexture } from "@tresjs/core";
import { Color, Vector3, type Euler } from "three";
import { toRefs } from "vue";

const props = defineProps<{
  position: Vector3;
  rotation: Euler;
  scale: number;
}>();

const { position, rotation, scale } = toRefs(props);
const simpleShadow = await useTexture({
  alphaMap: "/textures/simpleShadow.jpg",
});
const path = "/models/mouse.glb";

const { scene } = await useGLTF(path, { draco: true });
</script>

<template>
  <TresGroup :position="position" :rotation="rotation" :scale="scale">
    <primitive :object="scene" />
    <TresMesh :rotation="[-Math.PI / 2, 0, 0]" :position="[0, 0.01, 0]">
      <TresPlaneGeometry :args="[0.08, 0.15]" />
      <TresMeshBasicMaterial :color="new Color(0x000000)" :transparent="true" :alphaMap="simpleShadow.alphaMap" />
    </TresMesh>
  </TresGroup>
</template>
