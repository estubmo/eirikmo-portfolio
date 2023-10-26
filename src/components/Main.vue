<script setup lang="ts">
import { Backdrop, useProgress } from "@tresjs/cientos";
import { TresCanvas, useRenderLoop, useTexture } from "@tresjs/core";
import { useMouse, useWindowScroll, useWindowSize } from "@vueuse/core";
import { damp3, dampE } from "maath/easing";
import {
Color,
Euler,
MathUtils,
MeshBasicMaterial,
MeshStandardMaterial,
NoToneMapping,
PCFSoftShadowMap,
SRGBColorSpace,
Vector3,
} from "three";
import type { ComputedRef, StyleValue } from "vue";
import { computed, onMounted, ref, watch } from "vue";
import Desktop from "./Desktop.vue";
import Keyboard from "./Keyboard.vue";
import Mobile from "./Mobile.vue";
import PostProcessing from "./PostProcessing.vue";
import Tablet from "./Tablet.vue";

type ViewPort = "desktop" | "tablet" | "mobile";

const canvasRef = ref();
const scrollContainerRef = ref();

const currentViewPort = ref<ViewPort>("desktop");
const previousViewPort = ref<ViewPort>("desktop");
const hasFinishedRotatingCamera = ref(false);
const hasScrolled = ref(false);

const firstRef = ref();
const secondRef = ref();
const thirdRef = ref();
const fourthRef = ref();
const fifthRef = ref();
const sixthRef = ref();
const seventhRef = ref();
const eighthRef = ref();
const scrollRefs = [firstRef, secondRef, thirdRef, fourthRef, fifthRef, sixthRef, seventhRef, eighthRef];

const lightIntensity = ref(0);
const cameraRef = ref();
const pointLightRef = ref();

const param = {
  positionSmoothing: 0.4,
  lookAtSmoothing: 0.35,
};

const deviceScreenRefs = {
  desktop: ref(),
  tablet: ref(),
  mobile: ref(),
};

const eirikDesktop = await useTexture({
  map: "/textures/eirik/eirik-desktop.jpg",
  alphaMap: "/textures/eirik/eirik-desktop.jpg",
});

const eirikTablet = await useTexture({
  map: "/textures/eirik/eirik-tablet.jpg",
  alphaMap: "/textures/eirik/eirik-tablet.jpg",
});

const eirikMobile = await useTexture({
  map: "/textures/eirik/eirik-mobile.jpg",
  alphaMap: "/textures/eirik/eirik-mobile.jpg",
});

const standardMaterial = new MeshStandardMaterial({
  color: new Color(0xffffff),
  roughness: 0.4,
  metalness: 0.5,
});

const { width, height } = useWindowSize();
const { y: scrollY } = useWindowScroll();
const {
  x: mouseX,
  y: mouseY,
  sourceType,
} = useMouse({
  type: "screen",
});

const hover = ref(false);
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
    start: new Vector3(-2, 1, -0.1),
    second: new Vector3(-2.25, 3, 0),
    third: new Vector3(-1, 4, 3),
    end: new Vector3(0, 5, 8),
    startAngle: new Euler(-Math.PI / 2, 0, Math.PI / 40),
    secondAngle: new Euler(-Math.PI / 2, 0, Math.PI / 40),
    thirdAngle: new Euler(-Math.PI / 5, 0, 0),
    endAngle: new Euler(-Math.PI / 7, 0, 0),
  },
  mobile: {
    start: new Vector3(-0.25, 0.3, -0.25),
    second: new Vector3(-0.25, 2, -0.25),
    third: new Vector3(0, 3, 3),
    end: new Vector3(0, 5, 8),
    startAngle: new Euler(-Math.PI / 2, 0, 0),
    secondAngle: new Euler(-Math.PI / 2, 0, 0),
    thirdAngle: new Euler(-Math.PI / 5, 0, 0),
    endAngle: new Euler(-Math.PI / 7, 0, 0),
  },
} as const;

function getViewPort(): ViewPort {
  if (width.value > 1024) {
    return "desktop";
  } else if (width.value > 768 && width.value <= 1024) {
    return "tablet";
  } else if (width.value <= 768) {
    return "mobile";
  } else return "desktop";
}

const eirikDesktopTexture = new MeshBasicMaterial({
  transparent: true,
  ...eirikDesktop,
});

const eirikTabletTexture = new MeshBasicMaterial({
  transparent: true,
  ...eirikTablet,
});

const eirikMobileTexture = new MeshBasicMaterial({
  transparent: true,
  ...eirikMobile,
});

onMounted(() => {
  const segment = new URL(window.location.href).hash.replace("#/", "").replace("#", "");
  if (segment) {
    scrollRefs.forEach((ref) => {
      if (ref.value.id === segment) {
        if (hasFinishLoading) {
          setTimeout(() => {
            ref.value.scrollIntoView({ behavior: "smooth" });
          }, 1000);
        }
      }
    });
  }
});

function updateViewPort() {
  const current = getViewPort();
  if (current !== currentViewPort.value) {
    previousViewPort.value = currentViewPort.value;
    currentViewPort.value = current;
    hasFinishedRotatingCamera.value = false;
  }
}

updateViewPort();

function updateCamera(delta: number) {
  const cursor = {
    x: mouseX.value / width.value - 0.5,
    y: -(mouseY.value / height.value - 0.5),
  };

  const currentDevice = device[currentViewPort.value];
  updateTexture();

  if (!hasScrolled.value && scrollY.value === 0) {
    // On load set the camera to the start position without damping
    cameraRef.value.position.set(currentDevice.start.x, currentDevice.start.y, currentDevice.start.z);

    cameraRef.value.rotation.set(currentDevice.startAngle.x, currentDevice.startAngle.y, currentDevice.startAngle.z);
  } else {
    // When scrolling, damp the camera position from the start to the mid position
    if (scrollY.value < secondRef.value.offsetTop) {
      const normal = normalize(scrollY.value, 0, secondRef.value.offsetTop);
      damp3(
        cameraRef.value.position,
        [
          MathUtils.lerp(currentDevice.start.x + Math.sin(cursor.x), currentDevice.second.x, normal),
          MathUtils.lerp(currentDevice.start.y, currentDevice.second.y, normal),
          MathUtils.lerp(currentDevice.start.z, currentDevice.second.z, normal),
        ],
        param.positionSmoothing,
        delta,
      );

      dampE(
        cameraRef.value.rotation,
        [
          MathUtils.lerp(currentDevice.startAngle.x, currentDevice.secondAngle.x, normal),
          MathUtils.lerp(currentDevice.startAngle.y, currentDevice.secondAngle.y, normal),
          MathUtils.lerp(currentDevice.startAngle.z, currentDevice.secondAngle.z, normal),
        ],
        param.lookAtSmoothing,
        delta,
      );
    } else if (scrollY.value < thirdRef.value.offsetTop) {
      const normal = normalize(scrollY.value, secondRef.value.offsetTop, thirdRef.value.offsetTop);
      damp3(
        cameraRef.value.position,
        [
          MathUtils.lerp(currentDevice.second.x + Math.sin(cursor.x), currentDevice.third.x, normal),
          MathUtils.lerp(currentDevice.second.y, currentDevice.third.y, normal),
          MathUtils.lerp(currentDevice.second.z, currentDevice.third.z, normal),
        ],
        param.positionSmoothing,
        delta,
      );

      dampE(
        cameraRef.value.rotation,
        [
          MathUtils.lerp(currentDevice.secondAngle.x, currentDevice.thirdAngle.x, normal),
          MathUtils.lerp(currentDevice.secondAngle.y, currentDevice.thirdAngle.y, normal),
          MathUtils.lerp(currentDevice.secondAngle.z, currentDevice.thirdAngle.z, normal),
        ],
        param.lookAtSmoothing,
        delta,
      );
    } else {
      const normal = normalize(scrollY.value, thirdRef.value.offsetTop, fourthRef.value.offsetTop);
      damp3(
        cameraRef.value.position,
        [
          MathUtils.lerp(currentDevice.third.x + Math.sin(cursor.x), currentDevice.end.x, normal),
          MathUtils.lerp(currentDevice.third.y, currentDevice.end.y, normal),
          MathUtils.lerp(currentDevice.third.z, currentDevice.end.z, normal),
        ],
        param.positionSmoothing,
        delta,
      );

      dampE(
        cameraRef.value.rotation,
        [
          MathUtils.lerp(currentDevice.thirdAngle.x, currentDevice.endAngle.x, normal),
          MathUtils.lerp(currentDevice.thirdAngle.y, currentDevice.endAngle.y, normal),
          MathUtils.lerp(currentDevice.thirdAngle.z, currentDevice.endAngle.z, normal),
        ],
        param.lookAtSmoothing,
        delta,
      );
    }
  }

  cameraRef.value.updateProjectionMatrix();
}

function updateTexture() {
  if (scrollY.value < firstRef.value.offsetTop + firstRef.value.offsetHeight / 2) {
    lightIntensity.value = 0.01;
    deviceScreenRefs.desktop.value.material = standardMaterial;
    deviceScreenRefs.tablet.value.material = standardMaterial;
    deviceScreenRefs.mobile.value.material = standardMaterial;
  } else if (scrollY.value < secondRef.value.offsetTop + secondRef.value.offsetHeight / 2) {
    lightIntensity.value = 0.1;
    deviceScreenRefs.desktop.value.material = eirikDesktopTexture;
    deviceScreenRefs.tablet.value.material = eirikTabletTexture;
    deviceScreenRefs.mobile.value.material = eirikMobileTexture;
  } else if (scrollY.value < thirdRef.value.offsetTop + thirdRef.value.offsetHeight / 2) {
    lightIntensity.value = 0.01;
    deviceScreenRefs.desktop.value.material = standardMaterial;
    deviceScreenRefs.tablet.value.material = standardMaterial;
    deviceScreenRefs.mobile.value.material = standardMaterial;
  }
}

watch(scrollY, () => {
  if (!hasScrolled.value) {
    hasScrolled.value = scrollY.value > 0;
  }
  updateTexture();
});
watch(aspectRatio, updateViewPort);

const gl = {
  clearColor: "#221339",
  shadows: true,
  alpha: false,
  shadowMapType: PCFSoftShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
  powerPreference: "high-performance",
  antialias: false,
  stencil: false,
  depth: false,
};

const { onLoop } = useRenderLoop();
const fillerStyles: ComputedRef<StyleValue> = computed(() => {
  return {
    height: "14px",
    width: `${100 - prog.value + 1}%`,
    backgroundColor: "white",
    transition: "width 500ms ease-in-out",
    borderRadius: "inherit",
    textAlign: "right",
  };
});

onLoop(({ elapsed, delta }) => {
  pointLightRef.value.intensity = Math.abs(Math.cos(elapsed * 0.33) / 2);

  updateCamera(delta);
});
const { progress: prog, hasFinishLoading } = await useProgress();
</script>

<template>
  <div class="w-full h-[100vh] relative px-2 text-zinc-200">
    <div class="flex flex-col fixed top-0 left-0 space-y-0.5 font-light p-2 md:p-4 lg:p-8">
      <a href="#first">*</a>
      <a href="#second">Who Am I </a>
      <a href="#third">Expertise</a>
      <a href="#fourth">Projects</a>
      <a href="#fifth">Work</a>
      <a href="#sixth">Contact</a>
      <!-- <a href="#seventh" >seventh</a> -->
      <!-- <a href="#eighth" >eighth</a> -->
    </div>
    <main ref="scrollContainerRef" class="flex flex-col p-4 md:p-8 lg:p-16">
      <section class="min-h-screen container flex items-center" id="first" ref="firstRef">
        <div class="flex flex-col p-4 max-w-xl bg-black/20">
          <p class="font-mono">Hello I am</p>
          <h2 class="text-4xl font-extrabold">Eirik Mo</h2>
          <p class="font-light">Fullstack Developer</p>
          <p class="mt-4">
            Software engineer, passionate about code, design and open source. Over 7 years of industry experience
            specializing in TypeScript, React & Next.js.
          </p>
        </div>
      </section>
      <section class="min-h-screen container flex items-center justify-end" id="second" ref="secondRef">
        <div class="w-full lg:w-1/2">
          <div class="flex flex-col p-4 max-w-xl bg-black/20">
            <h2 class="text-4xl font-extrabold mb-4">Who I am</h2>
            <p>
              As a full-stack web developer, I am passionate about delivering high-quality and user-friendly web
              solutions for clients. With a focus on JavaScript frameworks, I have gained valuable experience working
              with NextJS, React, and Angular. I have a strong understanding of .NET, C#, Node, REST, GraphQL,
              PostgreSQL, MongoDB, and SQL. I also have experience with cloud computing platforms such as Azure and AWS,
              including CI/CD tools such as Jenkins and Github Actions. My expertise extends to CMS platforms like
              Sanity.io and Strapi, allowing me to provide clients with a wide range of options to meet their specific
              needs and requirements.
            </p>
            <p>
              One of my key areas of expertise is TypeScript, where I have extensive experience working with type safety
              to ensure the security and stability of web applications. I believe in the importance of writing clean,
              efficient, and well-documented code, and am constantly seeking to improve my skills and stay up-to-date
              with the latest technologies and trends in the web development industry.
            </p>
            <p>
              Outside of work, I am a lifelong learner and enjoy exploring new technologies and approaches to web
              development. I am also an avid traveler and enjoy hiking up sunny mountains in my free time.
            </p>
            <p>
              I am exclusively open to fully remote freelance contracts, and I take pride in being able to effectively
              communicate and collaborate with clients and team members remotely. This allows me to take on projects
              from anywhere in the world and deliver high-quality results. I kindly ask that recruiters respect my
              preference for remote work and only reach out if the position offered is fully remote.
            </p>
          </div>
        </div>
      </section>
      <section class="min-h-screen container flex items-center" id="third" ref="thirdRef">
        <div class="flex flex-col p-4 max-w-xl bg-black/20">
          <h2 class="text-4xl font-extrabold mb-4">Expertise</h2>
          <p class="font-italic">My main focus these days is building my personal project, FotballFeber.</p>
        </div>
      </section>
      <section class="min-h-screen container flex items-center" id="fourth" ref="fourthRef">
        <div class="flex flex-col p-4 max-w-xl bg-black/20">
          <h2 class="text-4xl font-extrabold mb-4">Projects I am Proud of</h2>
          <p class="font-italic">FotballFeber! 🚀</p>
        </div>
      </section>
    </main>
    <main class="flex flex-col p-4 md:p-8 lg:p-16">
      <section class="min-h-screen container flex items-center" id="fifth" ref="fifthRef">
        <div class="flex flex-col p-4 max-w-xl bg-black/20">
          <h2 class="text-4xl text-light font-extrabold">Work</h2>
        </div>
      </section>
      <section class="min-h-screen container flex items-center" id="sixth" ref="sixthRef">
        <div class="flex flex-col p-4 max-w-xl bg-black/20">
          <h2 class="text-4xl font-extrabold mb-4">Contact</h2>
          <p class="font-italic">Contact form goes here</p>
        </div>
      </section>
      <section class="min-h-screen container flex items-center" id="seventh" ref="seventhRef">
        <div class="flex flex-col p-4 max-w-xl bg-black/20">
          <h2 class="text-4xl font-extrabold mb-4"></h2>
          <p class="font-italic"></p>
        </div>
      </section>
      <section class="min-h-screen container flex items-center" id="eighth" ref="eighthRef">
        <div class="flex flex-col p-4 max-w-xl bg-black/20">
          <h2 class="text-4xl font-extrabold mb-4"></h2>
          <p class="font-italic"></p>
        </div>
      </section>
    </main>

    <Transition
      name="fade-overlay"
      enter-active-class="opacity-1 transition-opacity duration-1000"
      leave-active-class="opacity-0 transition-opacity duration-1000 delay-1000"
    >
      <div
        v-show="!hasFinishLoading"
        class="fixed bg-black/20 inset-0 w-full text-center flex flex-col justify-center items-center h-full z-80"
      >
        <div class="max-w-xl" :style="fillerStyles"></div>
      </div>
    </Transition>

    <TresCanvas
      class="h-[100vh] -z-30"
      v-bind="gl"
      preset="realistic"
      ref="canvasRef"
      window-size
      :disable-render="true"
    >
      <PostProcessing />
      <!-- Camera -->
      <TresPerspectiveCamera ref="cameraRef" :position="[0, 1, 0]" />

      <!-- Backdrop -->
      <TresMesh :scale="[120, 60, 60]" :position="[0, -0.1, -40]">
        <Backdrop :floor="1" :segments="20" receive-shadow>
          <TresMeshStandardMaterial :color="new Color(0xbcbcbc)" :roughness="0.1" :metalness="0" />
        </Backdrop>
      </TresMesh>

      <!-- <TresReflector
        :color="new Color(0x0000ff)"
        :clipBias="0.3"
        :textureWidth="1024"
        :textureHeight="1024"
        :rotation="[-Math.PI / 2, 0, 0]"
        :position="[0, 0, 0]"
      >
        <TresPlaneGeometry :args="[100, 100]" />
      </TresReflector> -->
      <!-- Desktop -->
      <Suspense>
        <Desktop :position="new Vector3(0, 0.2, -1)" />
      </Suspense>

      <TresMesh :ref="deviceScreenRefs.desktop" :position="[0, 1.65, -1.232]">
        <TresPlaneGeometry :args="[3.75, 1.89]" />
        <TresMeshStandardMaterial :roughness="0.4" :metalness="0.5" :color="new Color(0x888888)" />
      </TresMesh>

      <!-- Mobile -->
      <Suspense>
        <Mobile :position="new Vector3(-0.24, -0.299, 0)" :rotation="new Euler(-Math.PI / 4, 0, 0)" />
      </Suspense>

      <TresMesh
        :ref="deviceScreenRefs.mobile"
        :position="[-0.24, 0.034, -0.31]"
        :rotation="new Euler(-Math.PI / 2, 0, 0)"
      >
        <TresPlaneGeometry :args="[0.278, 0.568]" />
        <TresMeshStandardMaterial :roughness="0.4" :metalness="0.5" :color="new Color(0xaaaaaa)" />
      </TresMesh>
      <TresMesh
        :ref="deviceScreenRefs.mobile"
        :position="[-0.24, 0.035, -0.31]"
        :rotation="new Euler(-Math.PI / 2, 0, 0)"
      >
        <TresPlaneGeometry :args="[0.278, 0.568]" />
        <TresMeshStandardMaterial :roughness="0.4" :metalness="0.5" :color="new Color(0x888888)" />
      </TresMesh>

      <!-- Tablet -->
      <Suspense>
        <Tablet :position="new Vector3(-2, 0, 0)" :rotation="new Euler(0, 0.1, 0)" :scale="8" />
      </Suspense>

      <!-- <TresMesh :position="[-2.01, 0.0944, -0.05]" :rotation="new Euler(-Math.PI / 2, 0.0, 0.084)">
        <TresPlaneGeometry :args="[0.933, 1.28]" />
        <TresMeshStandardMaterial :roughness="0.4" :metalness="0.5" :color="new Color(0x888888)" />
      </TresMesh> -->
      <TresMesh
        :ref="deviceScreenRefs.tablet"
        :position="[-2.01, 0.0945, -0.05]"
        :rotation="new Euler(-Math.PI / 2, 0.0, 0.084)"
      >
        <TresPlaneGeometry :args="[0.933, 1.28]" />
        <TresMeshStandardMaterial :roughness="0.4" :metalness="0.5" :color="new Color(0x888888)" />
      </TresMesh>

      <!-- Keyboard -->
      <Suspense>
        <Keyboard :position="new Vector3(0, 0.1, 0.5)" scale="0.5" />
      </Suspense>

      <!-- Lights -->
      <!-- <TresRectAreaLight
        :intensity="0.5"
        :width="4"
        :rotation="[Math.PI / 2, Math.PI, 0]"
        :height="10"
        :color="new Color(0xff0000)"
        :position="[-10, 5, 0]"
      /> -->
      <TresRectAreaLight
        :intensity="lightIntensity"
        :width="3.75"
        :rotation="[0, Math.PI, 0]"
        :height="1.89"
        :color="new Color(0x7dd3fc)"
        :position="[0, 1, -1.2]"
      />
      <!-- <TresRectAreaLight
        :intensity="0.5"
        :width="4"
        :rotation="[Math.PI / 2, Math.PI, 0]"
        :height="10"
        :color="new Color(0x0000ff)"
        :position="[10, 5, 0]"
      /> -->

      <TresPointLight
        ref="pointLightRef"
        :intensity="2"
        :distance="2"
        :color="new Color(0x0f1a03)"
        :position="[0, 1.5, -0.75]"
        :cast-shadow="true"
      />

      <TresDirectionalLight :intensity="2" :color="new Color(0x0f1a03)" :position="[2, 5, 2]" :cast-shadow="true" />

      <!-- <TresAmbientLight :intensity="0.1" :color="new Color(0xffffff)" /> -->
    </TresCanvas>
  </div>
</template>
