<script setup lang="ts">
import { useGLTF } from "@tresjs/cientos";
import { useRenderLoop, useTresContext } from "@tresjs/core";
import { useMouse, useWindowSize } from "@vueuse/core";
import { Mesh, SpotLight, Vector2, Vector3, type Euler } from "three";
import { ref, toRefs } from "vue";

const props = defineProps<{
  position: Vector3;
  rotation: Euler;
  scale: number;
  light?: SpotLight;
}>();

const pointer = new Vector2();

const { position, rotation, scale, light } = toRefs(props);
const lightSwitch = ref<Mesh>();
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

const handleLightSwitch = (e: Event) => {
  if (isIntersecting.value) {
    e.stopPropagation();
    e.preventDefault();
    if (light?.value) {
      light.value.visible = light.value.visible ? false : true;
    }
  }
};

window.addEventListener("mousedown", handleLightSwitch);
window.addEventListener("touchstart", handleLightSwitch);

onLoop(({ elapsed }) => {
  pointer.x = (mouseX.value / width.value) * 2 - 1;
  pointer.y = -(mouseY.value / height.value) * 2 + 1;
  if (camera.value && lightSwitch.value) {
    raycaster.value.setFromCamera(pointer, camera.value);
    const intersects = raycaster.value.intersectObjects([lightSwitch.value]);
    if (intersects.length > 0) {
      isIntersecting.value = true;

      if (Math.sin(elapsed * 8) > 0.98) {
        if (light?.value) {
          light.value.intensity = Math.random();
        }
      }
    } else {
      isIntersecting.value = false;
    }
  }
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
scene.traverse((node: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (node.isMesh) node.castShadow = true;
});
</script>

<template>
  <TresGroup :position="position" :rotation="rotation" :scale="scale">
    <primitive :object="scene" />
    <TresMesh ref="lightSwitch" :visible="false" :position="new Vector3(0.55, 0.3, 0)">
      <TresBoxGeometry :args="[0.35, 0.35, 0.35]" />
    </TresMesh>
  </TresGroup>
</template>
