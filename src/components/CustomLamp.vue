<script setup lang="ts">
import { useGLTF } from "@tresjs/cientos";
import { useRenderLoop, useTresContext } from "@tresjs/core";
import { useMouse, useWindowSize } from "@vueuse/core";
import { Vector2, Vector3, type Euler } from "three";
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

const lightSwitch = ref();
const isIntersecting = ref(false);

const { x: mouseX, y: mouseY } = useMouse({
  type: "client",
  touch: false,
});
const { width, height } = useWindowSize();

const { camera, raycaster } = useTresContext();
const path = "/models/lamp.glb";

const { onLoop } = useRenderLoop();
const { scene } = await useGLTF(path, { draco: true });

const handleLightSwitch = () => {
  if (isIntersecting.value) {
    light.value.visible = light.value.visible ? false : true;
  }
};

window.addEventListener("mousedown", handleLightSwitch);

onLoop(({ elapsed }) => {
  pointer.x = (mouseX.value / width.value) * 2 - 1;
  pointer.y = -(mouseY.value / height.value) * 2 + 1;
  if (camera.value) {
    raycaster.value.setFromCamera(pointer, camera.value);
    const intersects = raycaster.value.intersectObjects([lightSwitch.value]);
    if (intersects.length > 0) {
      isIntersecting.value = true;

      if (Math.sin(elapsed * 8) > 0.98) {
        light.value.intensity = Math.random();
      }
    } else {
      isIntersecting.value = false;
    }
  }
});
</script>

<template>
  <TresGroup :position="position" :rotation="rotation" :scale="scale">
    <primitive :object="scene" />
    <TresMesh ref="lightSwitch" :visible="false" :position="new Vector3(0.55, 0.15, 0)">
      <TresBoxGeometry :args="[0.3, 0.3, 0.3]" />
    </TresMesh>
  </TresGroup>
</template>
