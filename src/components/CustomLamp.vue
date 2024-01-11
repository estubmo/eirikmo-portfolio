<script setup lang="ts">
import { useGLTF } from "@tresjs/cientos";
import { useRenderLoop } from "@tresjs/core";
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

const { x: mouseX, y: mouseY } = useMouse({
  type: "client",
  touch: false,
});
const { width, height } = useWindowSize();

const path = "/models/lamp.glb";

const { onLoop } = useRenderLoop();
const { scene } = await useGLTF(path, { draco: true });

const isLightSwitchHovered = ref(false);

const handleLightSwitch = () => {
  if (light?.value) {
    light.value.visible = light.value.visible ? false : true;
  }
};

onLoop(({ elapsed }) => {
  pointer.x = (mouseX.value / width.value) * 2 - 1;
  pointer.y = -(mouseY.value / height.value) * 2 + 1;
  if (isLightSwitchHovered.value) {
    if (Math.sin(elapsed * 8) > 0.98) {
      if (light?.value) {
        light.value.intensity = Math.random();
      }
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
    <TresMesh
      ref="lightSwitch"
      :visible="false"
      :position="new Vector3(0.55, 0.3, 0)"
      @click="handleLightSwitch"
      @pointer-enter="isLightSwitchHovered = true"
      @pointer-leave="isLightSwitchHovered = false"
    >
      <TresBoxGeometry :args="[0.35, 0.35, 0.35]" />
    </TresMesh>
  </TresGroup>
</template>
