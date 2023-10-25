<script setup lang="ts">
import { Backdrop, useProgress } from "@tresjs/cientos";
import { TresCanvas, useRenderLoop } from "@tresjs/core";
import {
  useElementBounding,
  useWindowScroll,
  useWindowSize,
} from "@vueuse/core";
import * as dat from "dat.gui";
import { damp3, dampE } from "maath/easing";
import {
  Color,
  Euler,
  MathUtils,
  NoToneMapping,
  PCFSoftShadowMap,
  SRGBColorSpace,
  Vector3,
} from "three";
import { computed, ref, watch } from "vue";
import Desktop from "./Desktop.vue";
import Keyboard from "./Keyboard.vue";
import Mobile from "./Mobile.vue";
import Tablet from "./Tablet.vue";

type ViewPort = "desktop" | "tablet" | "mobile" | "none";

const canvasRef = ref();
const scrollContainerRef = ref();

const currentViewPort = ref<ViewPort>("none");
const previousViewPort = ref<ViewPort>("none");
const hasFinishedRotatingCamera = ref(false);

const cameraRef = ref();
const pointLightRef = ref();

const boxRef = ref();

const deviceScreenRefs = {
  desktop: ref(),
  tablet: ref(),
  mobile: ref(),
  none: ref(),
};

const gui = new dat.GUI({
  closed: true,
  width: 400,
});

// // helpers
// function MathUtils.lerp(start: number, end: number, t: number) {
//   return (1 - t) * start + t * end;
// }

const { width, height } = useWindowSize();
const { y } = useWindowScroll();
const { height: containerHeight } = useElementBounding(scrollContainerRef);

const aspectRatio = computed(() => width.value / height.value);
const viewPort = computed(getViewPort);

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
// [-2, 0.0945, -0.05]
const device = {
  desktop: {
    start: new Vector3(0, 1.7, 0.5),
    second: new Vector3(0, 1.7, 3),
    third: new Vector3(0, 3, 5),
    end: new Vector3(0, 5, 8),
    startAngle: new Euler(0, 0, 0),
    secondAngle: new Euler(0, 0, 0),
    thirdAngle: new Euler(-Math.PI / 9, 0, 0),
    endAngle: new Euler(-Math.PI / 7, 0, 0),
  },
  tablet: {
    start: new Vector3(-2, 0.3, -0.1),
    second: new Vector3(-2, 3, 0.2),
    third: new Vector3(-1, 4, 3),
    end: new Vector3(0, 5, 8),
    startAngle: new Euler(-Math.PI / 2, 0, Math.PI / 24),
    secondAngle: new Euler(-Math.PI / 2, 0, Math.PI / 24),
    thirdAngle: new Euler(-Math.PI / 5, 0, 0),
    endAngle: new Euler(-Math.PI / 7, 0, 0),
  },
  mobile: {
    start: new Vector3(-0.25, 0.2, -0.25),
    second: new Vector3(-0.25, 3, -0.25),
    third: new Vector3(0, 3, 3),
    end: new Vector3(0, 5, 8),
    startAngle: new Euler(-Math.PI / 2, 0, 0),
    secondAngle: new Euler(-Math.PI / 2, 0, 0),
    thirdAngle: new Euler(-Math.PI / 5, 0, 0),
    endAngle: new Euler(-Math.PI / 7, 0, 0),
  },
  none: {
    start: new Vector3(0, 0, 0),
    second: new Vector3(0, 0, 0),
    third: new Vector3(0, 0, 0),
    end: new Vector3(0, 0, 0),
    startAngle: new Euler(0, 0, 0),
    secondAngle: new Euler(0, 0, 0),
    thirdAngle: new Euler(0, 0, 0),
    endAngle: new Euler(-Math.PI / 5, 0, 0),
  },
} as const;

function getViewPort(): ViewPort {
  if (width.value > 1024) {
    return "desktop";
  } else if (width.value > 768 && width.value <= 1024) {
    return "tablet";
  } else if (width.value <= 768) {
    return "mobile";
  } else return "none";
}

function updateViewPort() {
  const current = getViewPort();
  if (current !== currentViewPort.value) {
    previousViewPort.value = currentViewPort.value;
    currentViewPort.value = current;
    hasFinishedRotatingCamera.value = false;
  }
}

updateViewPort();

const SCROLL_BREAKPOINTS = {
  START: 0,
  SECOND: 0.33,
  THIRD: 0.66,
  END: 1,
};

const param = {
  positionSmoothing: 0.2,
  lookAtSmoothing: 0.35,
};

gui.add(currentViewPort, "value", ["desktop", "tablet", "mobile"]);
gui.add(param, "positionSmoothing").min(0).max(1).step(0.01);
gui.add(param, "lookAtSmoothing").min(0).max(1).step(0.01);

function updateCamera(scrollDistance: number, delta: number) {
  const currentDevice = device[currentViewPort.value];
  console.log(
    "🚀 ~ file: Main.vue:166 ~ updateCamera ~ scrollDistance:",
    scrollDistance,
  );

  if (previousViewPort.value === "none" && scrollDistance === 0) {
    // On load set the camera to the start position without damping

    cameraRef.value.position.set(
      currentDevice.start.x,
      currentDevice.start.y,
      currentDevice.start.z,
    );

    cameraRef.value.rotation.set(
      currentDevice.startAngle.x,
      currentDevice.startAngle.y,
      currentDevice.startAngle.z,
    );

    // cameraRef.value.lookAt(currentDevice.start);
  } else {
    // When scrolling, damp the camera position from the start to the mid position
    if (scrollDistance < SCROLL_BREAKPOINTS.SECOND) {
      const normal = normalize(
        scrollDistance,
        SCROLL_BREAKPOINTS.START,
        SCROLL_BREAKPOINTS.SECOND,
      );
      damp3(
        cameraRef.value.position,
        [
          MathUtils.lerp(currentDevice.start.x, currentDevice.second.x, normal),
          MathUtils.lerp(currentDevice.start.y, currentDevice.second.y, normal),
          MathUtils.lerp(currentDevice.start.z, currentDevice.second.z, normal),
        ],
        param.positionSmoothing,
        delta,
      );

      dampE(
        cameraRef.value.rotation,
        [
          MathUtils.lerp(
            currentDevice.startAngle.x,
            currentDevice.secondAngle.x,
            normal,
          ),
          MathUtils.lerp(
            currentDevice.startAngle.y,
            currentDevice.secondAngle.y,
            normal,
          ),
          MathUtils.lerp(
            currentDevice.startAngle.z,
            currentDevice.secondAngle.z,
            normal,
          ),
        ],
        param.lookAtSmoothing,
        delta,
      );
    } else if (scrollDistance < SCROLL_BREAKPOINTS.THIRD) {
      const normal = normalize(
        scrollDistance,
        SCROLL_BREAKPOINTS.SECOND,
        SCROLL_BREAKPOINTS.THIRD,
      );
      damp3(
        cameraRef.value.position,
        [
          MathUtils.lerp(currentDevice.second.x, currentDevice.third.x, normal),
          MathUtils.lerp(currentDevice.second.y, currentDevice.third.y, normal),
          MathUtils.lerp(currentDevice.second.z, currentDevice.third.z, normal),
        ],
        param.positionSmoothing,
        delta,
      );

      dampE(
        cameraRef.value.rotation,
        [
          MathUtils.lerp(
            currentDevice.secondAngle.x,
            currentDevice.thirdAngle.x,
            normal,
          ),
          MathUtils.lerp(
            currentDevice.secondAngle.y,
            currentDevice.thirdAngle.y,
            normal,
          ),
          MathUtils.lerp(
            currentDevice.secondAngle.z,
            currentDevice.thirdAngle.z,
            normal,
          ),
        ],
        param.lookAtSmoothing,
        delta,
      );
    } else {
      const normal = normalize(
        scrollDistance,
        SCROLL_BREAKPOINTS.THIRD,
        SCROLL_BREAKPOINTS.END,
      );
      damp3(
        cameraRef.value.position,
        [
          MathUtils.lerp(currentDevice.third.x, currentDevice.end.x, normal),
          MathUtils.lerp(currentDevice.third.y, currentDevice.end.y, normal),
          MathUtils.lerp(currentDevice.third.z, currentDevice.end.z, normal),
        ],
        param.positionSmoothing,
        delta,
      );

      dampE(
        cameraRef.value.rotation,
        [
          MathUtils.lerp(
            currentDevice.thirdAngle.x,
            currentDevice.endAngle.x,
            normal,
          ),
          MathUtils.lerp(
            currentDevice.thirdAngle.y,
            currentDevice.endAngle.y,
            normal,
          ),
          MathUtils.lerp(
            currentDevice.thirdAngle.z,
            currentDevice.endAngle.z,
            normal,
          ),
        ],
        param.lookAtSmoothing,
        delta,
      );
    }
  }

  cameraRef.value.updateProjectionMatrix();
}

watch(aspectRatio, updateViewPort);
// watch(y, updateCamera);

const gl = {
  clearColor: "#221339",
  shadows: true,
  alpha: false,
  shadowMapType: PCFSoftShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
};

const { onLoop } = useRenderLoop();

onLoop(({ elapsed, delta }) => {
  pointLightRef.value.position.x = Math.sin(elapsed * 0.5) / 2;
  boxRef.value.visible = false;
  damp3(
    boxRef.value.position,
    [Math.sin(elapsed), 1, Math.sin(elapsed)],
    0.25,
    delta,
  );
  const totalScrollDistance = containerHeight.value - height.value;
  const normalizedScrollDistance = normalize(y.value, 0, totalScrollDistance);

  updateCamera(normalizedScrollDistance, delta);
});
const { progress: prog, hasFinishLoading } = await useProgress();
</script>

<template>
  <div class="w-full h-[100vh] relative px-2 text-zinc-200">
    <main ref="scrollContainerRef" class="!scroll-smooth">
      <div class="flex flex-col fixed top-0 left-0">
        <a href="#first" class="">first</a>
        <a href="#second" class="">second</a>
        <a href="#third" class="">third</a>
        <a href="#fourth" class="">fourth</a>
        <a href="#fifth" class="">fifth</a>
        <a href="#sixth" class="">sixth</a>
        <a href="#seventh" class="">seventh</a>
        <a href="#eighth" class="">eighth</a>
      </div>
      <section
        class="min-h-screen container flex justify-end items-center"
        id="first"
      >
        <div class="w-1/2 text-right">
          <h2 class="text-4xl text-light font-extrabold">
            I made this to learn how to mix TresJS and ThreeJS
          </h2>
        </div>
      </section>
      <section
        class="min-h-screen container flex justify-end items-center"
        id="second"
      >
        <div class="w-1/2 text-light text-right">
          <h2 class="text-4xl font-extrabold mb-4">As well as composability</h2>
          <p class="font-italic">And passing functions and props</p>
        </div>
      </section>
      <section
        class="min-h-screen container flex justify-end items-center"
        id="third"
      >
        <div class="w-1/2 text-light text-right">
          <h2 class="text-4xl font-extrabold mb-4">
            Overriding built in ScrollControls
          </h2>
          <p class="font-italic">
            And trying out the Html in a scene component
          </p>
        </div>
      </section>
      <section
        class="min-h-screen container flex justify-end items-center"
        id="fourth"
      >
        <div class="w-1/2 text-light text-right">
          <h2 class="text-4xl font-extrabold mb-4">And it worked!</h2>
          <p class="font-italic">Woohoo! 🚀</p>
        </div>
      </section>
      <section
        class="min-h-screen container flex justify-end items-center"
        id="fifth"
      >
        <div class="w-1/2 text-right">
          <h2 class="text-4xl text-light font-extrabold">
            I made this to learn how to mix TresJS and ThreeJS
          </h2>
        </div>
      </section>
      <section
        class="min-h-screen container flex justify-end items-center"
        id="sixth"
      >
        <div class="w-1/2 text-light text-right">
          <h2 class="text-4xl font-extrabold mb-4">As well as composability</h2>
          <p class="font-italic">And passing functions and props</p>
        </div>
      </section>
      <section
        class="min-h-screen container flex justify-end items-center"
        id="seventh"
      >
        <div class="w-1/2 text-light text-right">
          <h2 class="text-4xl font-extrabold mb-4">
            Overriding built in ScrollControls
          </h2>
          <p class="font-italic">
            And trying out the Html in a scene component
          </p>
        </div>
      </section>
      <section
        class="min-h-screen container flex justify-end items-center"
        id="eighth"
      >
        <div class="w-1/2 text-light text-right">
          <h2 class="text-4xl font-extrabold mb-4">And it worked!</h2>
          <p class="font-italic">Woohoo! 🚀</p>
        </div>
      </section>
    </main>

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
      <!-- Camera -->
      <TresPerspectiveCamera ref="cameraRef" :position="[0, 1, 0]" />

      <!-- Backdrop -->
      <TresMesh :scale="[120, 40, 40]" :position="[0, 0, -50]">
        <Backdrop :floor="1.5" :segments="20" receive-shadow>
          <TresMeshPhysicalMaterial
            :color="new Color(0xffffff)"
            :roughness="0.2"
          />
        </Backdrop>
      </TresMesh>

      <!-- Desktop -->
      <Suspense>
        <Desktop :position="new Vector3(0, 0.2, -1)" />
      </Suspense>

      <TresMesh :ref="deviceScreenRefs.desktop" :position="[0, 1.65, -1.232]">
        <TresPlaneGeometry :args="[3.75, 1.89]" />
        <TresMeshStandardMaterial :color="new Color(0x000000)" />
      </TresMesh>

      <!-- Mobile -->
      <Suspense>
        <Mobile
          :position="new Vector3(-0.24, -0.299, 0)"
          :rotation="new Euler(-Math.PI / 4, 0, 0)"
        />
      </Suspense>
      <TresAxesHelper :position="[-2, 0.0945, -0.05]" />

      <TresMesh
        :ref="deviceScreenRefs.mobile"
        :position="[-0.24, 0.035, -0.31]"
        :rotation="new Euler(-Math.PI / 2, 0, 0)"
      >
        <TresPlaneGeometry :args="[0.278, 0.568]" />
        <TresMeshStandardMaterial :color="new Color(0x000000)" />
      </TresMesh>

      <!-- Tablet -->
      <Suspense>
        <Tablet
          :position="new Vector3(-2, 0, 0)"
          :rotation="new Euler(0, 0.1, 0)"
          :scale="8"
        />
      </Suspense>

      <TresMesh
        :ref="deviceScreenRefs.tablet"
        :position="[-2, 0.0945, -0.05]"
        :rotation="new Euler(-Math.PI / 2, 0.0, 0.085)"
      >
        <TresPlaneGeometry :args="[0.935, 1.28]" />
        <TresMeshStandardMaterial :color="new Color(0x000000)" />
      </TresMesh>

      <!-- Keyboard -->
      <Suspense>
        <Keyboard :position="new Vector3(0, 0.1, 0.5)" scale="0.5" />
      </Suspense>

      <TresMesh ref="boxRef" :position="[0, 0, 2]">
        <TresBoxGeometry />
        <TresMeshBasicMaterial />
      </TresMesh>

      <!-- Lights -->

      <TresPointLight
        ref="pointLightRef"
        :intensity="1"
        :distance="5"
        :color="new Color(0xff0000)"
        :position="[0, 1, 1]"
        :cast-shadow="true"
      />

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
