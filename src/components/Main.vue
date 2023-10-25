<script setup lang="ts">
import { Backdrop, useProgress } from "@tresjs/cientos";
import { TresCanvas, useRenderLoop } from "@tresjs/core";
import { useWindowScroll, useWindowSize } from "@vueuse/core";
import * as dat from "dat.gui";
import {
  Color,
  Euler,
  NoToneMapping,
  PCFSoftShadowMap,
  SRGBColorSpace,
  Vector3,
} from "three";
import { computed, ref, watch } from "vue";
import Computer from "./Computer.vue";
import Keyboard from "./Keyboard.vue";
import Mobile from "./Mobile.vue";
import Tablet from "./Tablet.vue";

const pointLightRef = ref();
const canvasRef = ref();
const cameraRef = ref();

const gui = new dat.GUI({
  closed: true,
  width: 400,
});
// helpers
function lerp(start: number, end: number, t: number) {
  return (1 - t) * start + t * end;
}

const { width, height } = useWindowSize();
const { x, y } = useWindowScroll();

const desktopViewPort = computed(() => {
  return width.value > 1024;
});
const tabletViewPort = computed(() => {
  return width.value > 768 && width.value <= 1024;
});
const mobileViewPort = computed(() => {
  return width.value <= 768;
});

const aspectRatio = computed(() => width.value / height.value);

function normalize(val: number, min: number, max: number) {
  if (min < 0) {
    max += 0 - min;
    val += 0 - min;
    min = 0;
  }
  val = val - min;
  max = max - min;
  return Math.max(0, Math.min(1, val / max));
}

function updateCamera() {
  cameraRef.value.updateProjectionMatrix();
  const yNormalized = normalize(y.value, 0, 13230);

  // close
  if (desktopViewPort.value) {
    cameraRef.value.position.x = 0;
    cameraRef.value.position.y = lerp(1.8, 5, y.value / 5000);
    cameraRef.value.position.z = lerp(-0.5, 3, y.value / 3000);
    cameraRef.value.lookAt(0, 1.8, -1);
  } else if (tabletViewPort.value) {
    cameraRef.value.position.x = lerp(-2.02, -1.6, y.value / 5000);
    cameraRef.value.position.y = lerp(0.2, 10, y.value / 5000);
    cameraRef.value.position.z = lerp(-0.25, 1, y.value / 1000);
    cameraRef.value.lookAt(-2.02, 0, -0.1);
  } else if (mobileViewPort.value) {
    // cameraRef.value.position.x = lerp(-0.25, -0.25, y.value / 5000);
    cameraRef.value.position.x = -0.25;
    cameraRef.value.position.y = lerp(0.2, 10, y.value / 5000);
    cameraRef.value.position.z = lerp(-0.25, 1, y.value / 1000);
    cameraRef.value.lookAt(-0.25, 0, -0.25);
  }
  // far
}

watch(aspectRatio, updateCamera);
watch(x, () => console.log(x.value));
watch(y, updateCamera);

const gl = {
  clearColor: "#221339",
  shadows: true,
  alpha: false,
  shadowMapType: PCFSoftShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
};

const { onLoop } = useRenderLoop();

function lookAtPosition(value: any) {
  cameraRef.value.lookAt(value);
}

onLoop(({ elapsed }) => {
  // cubeRef.value.rotation.y += 0.01;
  pointLightRef.value.position.x = Math.sin(elapsed * 0.5) / 2;
  console.log("🚀 ~ file: Main.vue:36 ~ y:", y.value);

  updateCamera();
});
const { progress: prog, hasFinishLoading } = await useProgress();
</script>

<template>
  <div class="w-full h-[100vh] relative !scroll-smooth px-2 text-zinc-200">
    <scrollbar>
      <main>
        <section class="min-h-screen container flex justify-end items-center">
          <div class="w-1/2 text-right">
            <h2 class="text-4xl text-light font-extrabold">
              I made this to learn how to mix TresJS and ThreeJS
            </h2>
          </div>
        </section>
        <section class="min-h-screen container flex justify-end items-center">
          <div class="w-1/2 text-light text-right">
            <h2 class="text-4xl font-extrabold mb-4">
              As well as composability
            </h2>
            <p class="font-italic">And passing functions and props</p>
          </div>
        </section>
        <section class="min-h-screen container flex justify-end items-center">
          <div class="w-1/2 text-light text-right">
            <h2 class="text-4xl font-extrabold mb-4">
              Overriding built in ScrollControls
            </h2>
            <p class="font-italic">
              And trying out the Html in a scene component
            </p>
          </div>
        </section>
        <section class="min-h-screen container flex justify-end items-center">
          <div class="w-1/2 text-light text-right">
            <h2 class="text-4xl font-extrabold mb-4">And it worked!</h2>
            <p class="font-italic">Woohoo! 🚀</p>
          </div>
        </section>
      </main>
    </scrollbar>

    <Transition
      name="fade-overlay"
      enter-active-class="opacity-1 transition-opacity duration-200"
      leave-active-class="opacity-0 transition-opacity duration-200"
    >
      <div
        v-show="!hasFinishLoading"
        class="fixed bg-amber-800 text-white top-0 left-0 w-full h-full z-80 flex justify-center items-center font-mono"
      >
        {{ prog }}
      </div>
    </Transition>

    <TresCanvas
      class="h-[100vh] -z-30"
      v-bind="gl"
      preset="realistic"
      ref="canvasRef"
      window-size
    >
      <TresPerspectiveCamera ref="cameraRef" :position="[0, 5, 0]" />

      <!-- Computer -->
      <Suspense>
        <Computer
          :progress="lerp(0, 1, y / 1000)"
          :position="new Vector3(0, 0.2, -1)"
        />
      </Suspense>

      <TresMesh :position="[0, 1.65, -1.232]">
        <TresPlaneGeometry :args="[3.75, 1.89]" />
        <TresMeshStandardMaterial :color="new Color(0x000000)" />
      </TresMesh>

      <!-- Mobile -->
      <Suspense>
        <Mobile
          :progress="lerp(0, 1, y / 1000)"
          :position="new Vector3(-0.24, -0.299, 0)"
          :rotation="new Euler(-Math.PI / 4, 0, 0)"
        />
      </Suspense>

      <TresMesh
        :position="[-0.24, 0.035, -0.31]"
        :rotation="new Euler(-Math.PI / 2, 0, 0)"
      >
        <TresPlaneGeometry :args="[0.278, 0.568]" />
        <TresMeshStandardMaterial :color="new Color(0x000000)" />
      </TresMesh>

      <!-- Tablet -->
      <Suspense>
        <Tablet
          :progress="lerp(0, 1, y / 1000)"
          :position="new Vector3(-2, 0, 0)"
          :rotation="new Euler(0, 0.1, 0)"
          :scale="8"
        />
      </Suspense>

      <TresMesh
        :position="[-2, 0.0945, -0.05]"
        :rotation="new Euler(-Math.PI / 2, 0.0, 0.085)"
      >
        <TresPlaneGeometry :args="[0.935, 1.28]" />
        <TresMeshStandardMaterial :color="new Color(0x000000)" />
      </TresMesh>

      <Suspense>
        <Keyboard
          :progress="lerp(0, 1, y / 1000)"
          :position="new Vector3(0, 0.1, 0.5)"
          scale="0.5"
        />
      </Suspense>

      <TresPointLight
        ref="pointLightRef"
        :intensity="1"
        :distance="5"
        :color="new Color(0xff0000)"
        :position="[0, 1, 1]"
        :cast-shadow="true"
      />
      <TresMesh :scale="[120, 40, 40]" :position="[0, 0, -50]">
        <Backdrop :floor="1.5" :segments="20" receive-shadow>
          <TresMeshPhysicalMaterial
            :color="new Color(0xffffff)"
            :roughness="0.2"
          />
        </Backdrop>
      </TresMesh>
      <TresDirectionalLight
        :intensity="1.5"
        :color="new Color(0x221339)"
        :position="[2, 5, 2]"
        :cast-shadow="true"
      />
      <TresAmbientLight :intensity="1" :color="new Color(0x221339)" />
    </TresCanvas>
  </div>
</template>
