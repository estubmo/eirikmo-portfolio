<script setup lang="ts">
import { useGLTF } from "@tresjs/cientos";
import type { Vector3 } from "three";
import { toRefs } from "vue";

const props = defineProps<{
  position: Vector3;
}>();

const { position } = toRefs(props);
const path = "/models/keyboard.glb";

const { scene } = await useGLTF(path, { draco: true });
</script>

<template>
  <TresGroup :position="position">
    <primitive :object="scene" />
  </TresGroup>
</template>
