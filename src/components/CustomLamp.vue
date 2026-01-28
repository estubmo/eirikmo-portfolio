<script setup lang="ts">
import { useGLTF } from "@tresjs/cientos";
import { useLoop, useTresContext } from "@tresjs/core";
import { useMouse, useWindowSize } from "@vueuse/core";
import type { Euler, Mesh, SpotLight } from "three";
import { Raycaster, Vector2, Vector3 } from "three";
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

const ctx = useTresContext();
const raycaster = new Raycaster();
const path = "/models/lamp.glb";

const { onBeforeRender } = useLoop();
const { state } = await useGLTF(path, { draco: true });
const scene = state.value!.scene;

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
window.addEventListener("touchstart", handleLightSwitch, { passive: true });

onBeforeRender(({ elapsed }: { elapsed: number }) => {
    pointer.x = (mouseX.value / width.value) * 2 - 1;
    pointer.y = -(mouseY.value / height.value) * 2 + 1;
    const activeCamera = ctx.camera.activeCamera.value;
    if (activeCamera && lightSwitch.value) {
        raycaster.setFromCamera(pointer, activeCamera);
        const intersects = raycaster.intersectObjects([lightSwitch.value]);
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
