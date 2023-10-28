<script setup lang="ts">
import { useGLTF } from "@tresjs/cientos";
import { useRenderLoop, useTresContext } from "@tresjs/core";
import { useMouse, useWindowSize } from "@vueuse/core";
import { Color, Vector2, Vector3, type Euler } from "three";
import type { Ref } from "vue";
import { ref, toRefs } from "vue";

const props = defineProps<{
  position: Vector3;
  rotation: Euler;
  scale: number;
  light: Ref<any>;
}>();

const pointer = new Vector2();

const { position, rotation, scale, light } = toRefs(props);
const lightClickRef = ref();
const lightClickMaterialRef = ref();

const { x: mouseX, y: mouseY } = useMouse({
  type: "client",
  touch: false,
});
const { width, height } = useWindowSize();

const { camera, renderer, raycaster } = useTresContext();
const path = "/models/lamp.glb";
const { onLoop } = useRenderLoop();
const { scene } = await useGLTF(path, { draco: true });

const onClick = () => {
  console.log("click");
};

onLoop(() => {
  pointer.x = (mouseX.value / width.value) * 2 - 1;
  pointer.y = -(mouseY.value / height.value) * 2 + 1;
  if (camera.value) {
    raycaster.value.setFromCamera(pointer, camera.value);
    const intersects = raycaster.value.intersectObjects([lightClickRef.value]);
    if (intersects.length > 0) {
      lightClickRef.value.material.color = new Color(0xff0000);
      light.value.intensity = 0;
    } else {
      lightClickRef.value.material.color = new Color(0xffffff);
    }
  }
});
</script>

<template>
  <TresGroup :position="position" :rotation="rotation" :scale="scale">
    <primitive :object="scene" />
    <TresMesh @click="onClick" ref="lightClickRef" :position="new Vector3(0, 1, 0)">
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshBasicMaterial ref="lightClickMaterialRef" />
    </TresMesh>
  </TresGroup>
</template>
