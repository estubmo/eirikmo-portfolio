<script setup lang="ts">
import { useGLTF } from "@tresjs/cientos";
import type { Vector3 } from "three";
import { toRefs } from "vue";

const props = defineProps<{
    position: Vector3;
}>();

const { position } = toRefs(props);
const path = "/models/desktop.glb";

const { state } = await useGLTF(path, { draco: true });
const scene = state.value!.scene;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
scene.traverse((node: any) => {
    if (node.isMesh) node.castShadow = true;
});
</script>

<template>
    <TresGroup :position="position" cast-shadow>
        <primitive :object="scene" cast-shadow />
    </TresGroup>
</template>
