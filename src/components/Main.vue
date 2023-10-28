<script setup lang="ts">
import { Backdrop, StatsGl, useProgress, vLightHelper } from "@tresjs/cientos";
import { extend, TresCanvas, useRenderLoop, useTexture } from "@tresjs/core";
import { useMouse, useWindowScroll, useWindowSize } from "@vueuse/core";
import { damp, damp3, dampE } from "maath/easing";
import {
  CineonToneMapping,
  Color,
  Euler,
  MathUtils,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PCFSoftShadowMap,
  SRGBColorSpace,
  Vector3,
} from "three";
import type { ComputedRef, StyleValue } from "vue";
import { computed, onMounted, ref, watch } from "vue";
import CustomDesktop from "./CustomDesktop.vue";
import CustomKeyboard from "./CustomKeyboard.vue";
import CustomLamp from "./CustomLamp.vue";
import CustomMobile from "./CustomMobile.vue";
import CustomMouse from "./CustomMouse.vue";
import CustomTablet from "./CustomTablet.vue";
import FixPixelRatio from "./FixPixelRatio.vue";

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
const lightRef = ref();
const spotLightTargetRef = ref();
const directionalLightRef = ref();

const mousePositionRef = ref(new Vector3(2, 0, 1));
const mouseRotationRef = ref(new Euler(0, Math.PI, 0));

const deviceScreenRefs = {
  desktop: ref(),
  tablet: ref(),
  mobile: ref(),
};

const desktopOverlayRef = ref();
const tabletOverlayRef = ref();
const mobileOverlayRef = ref();

const param = {
  positionSmoothing: 0.4,
  lookAtSmoothing: 0.35,
};

const alpha = await useTexture({
  map: "/textures/eirik/alpha_best.jpg",
});

const eirikDesktop = await useTexture({
  map: "/textures/eirik/eirik-desktop.jpg",
});

const eirikTablet = await useTexture({
  map: "/textures/eirik/eirik-tablet.jpg",
});

const eirikMobile = await useTexture({
  map: "/textures/eirik/eirik-mobile.jpg",
});

const standardMaterial = new MeshStandardMaterial({
  color: new Color(0xffffff),
  roughness: 0.4,
  metalness: 0.5,
});

const { width, height } = useWindowSize();
const { y: scrollY } = useWindowScroll();
const { x: mouseX, y: mouseY } = useMouse({
  type: "screen",
  touch: false,
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
  map: eirikDesktop.map,
  alphaMap: alpha.map,
  aoMap: eirikDesktop.map,
  aoMapIntensity: 0.8,
});

const eirikTabletTexture = new MeshBasicMaterial({
  transparent: true,
  map: eirikTablet.map,
  alphaMap: alpha.map,
  aoMap: eirikTablet.map,
  aoMapIntensity: 0.8,
});

const eirikMobileTexture = new MeshBasicMaterial({
  transparent: true,
  map: eirikMobile.map,
  alphaMap: alpha.map,
  aoMap: eirikMobile.map,
  aoMapIntensity: 0.8,
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

const screenTextureOpacityRef = ref(0);
const screenOverlayOpacityRef = ref(1);

updateViewPort();

function updateCamera(delta: number) {
  const cursor = {
    x: mouseX.value / width.value - 0.5,
    y: -(mouseY.value / height.value - 0.5),
  };

  const currentDevice = device[currentViewPort.value];

  // Defaults (ScrollY = 0 and has not scrolled yet)
  if (!hasScrolled.value && scrollY.value === 0) {
    // On load set the camera to the start position without damping
    cameraRef.value.position.set(currentDevice.start.x, currentDevice.start.y, currentDevice.start.z);
    cameraRef.value.rotation.set(currentDevice.startAngle.x, currentDevice.startAngle.y, currentDevice.startAngle.z);

    // On Scroll
  } else {
    const cameraPan = currentViewPort.value === "mobile" ? 0 : Math.sin(cursor.x) / 3; // Pan on everything but mobile

    // When scrolling, damp the camera position from the start to the mid position
    if (scrollY.value < secondRef.value.offsetTop) {
      const normal = normalize(scrollY.value, 0, secondRef.value.offsetTop);
      damp3(
        cameraRef.value.position,
        [
          MathUtils.lerp(currentDevice.start.x + cameraPan, currentDevice.second.x, normal),
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
          MathUtils.lerp(currentDevice.second.x + cameraPan, currentDevice.third.x, normal),
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
          MathUtils.lerp(currentDevice.third.x + cameraPan, currentDevice.end.x, normal),
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

  // cameraRef.value.lookAt(3, 1, -0.9);
  cameraRef.value.updateProjectionMatrix();
}
const mouseParams = {
  x: 0,
  z: 0,
  rotation: Math.PI,
};

function updateObjects(delta: number) {
  if (!hasScrolled.value && scrollY.value === 0) {
    // Set the lights to the start intensity
    lightRef.value.intensity = 0;
    directionalLightRef.value.intensity = 0.05;

    // Set screens textures to the start opacity
    eirikDesktopTexture.opacity = 0;
    desktopOverlayRef.value.opacity = 1;
  } else {
    // Mouse Position
    damp(mouseParams, "x", (mouseX.value / width.value - 0.5) / 4, 0.25, delta);
    damp(mouseParams, "z", (mouseY.value / height.value - 0.5) / 4, 0.25, delta);
    mousePositionRef.value = new Vector3(mouseParams.x + 2, 0, mouseParams.z + 0.5);

    // Mouse Rotation
    damp(mouseParams, "rotation", (Math.PI + (mouseX.value / width.value - 0.5) / 2) * -1, 0.25, delta);
    mouseRotationRef.value = new Euler(0, mouseParams.rotation, 0);

    const normalizedLightInterval = normalize(scrollY.value, 0, thirdRef.value.offsetTop);

    damp(lightRef.value, "intensity", normalizedLightInterval * 2, 0.25, delta);
    damp(directionalLightRef.value, "intensity", normalizedLightInterval / 12 + 0.05, 0.25, delta);

    const secondPart = {
      height: secondRef.value.offsetHeight,
      start: secondRef.value.offsetTop - secondRef.value.offsetHeight / 2,
      firstQuarter: secondRef.value.offsetTop + secondRef.value.offsetHeight / 4,
      lastQuarter: secondRef.value.offsetTop + (secondRef.value.offsetHeight / 4) * 3,
      end: secondRef.value.offsetTop + secondRef.value.offsetHeight,
    };

    if (scrollY.value > secondPart.start && scrollY.value < secondPart.firstQuarter) {
      const normal = normalize(scrollY.value, secondPart.start, secondPart.firstQuarter);
      screenTextureOpacityRef.value = Math.min(normal, 1);
      screenOverlayOpacityRef.value = Math.min(1 - normal * 2, 1);
    } else if (scrollY.value > secondPart.firstQuarter && scrollY.value < secondPart.lastQuarter) {
      screenTextureOpacityRef.value = 1;
      screenOverlayOpacityRef.value = 0;
    } else if (scrollY.value > secondPart.lastQuarter && scrollY.value < secondPart.end) {
      const normal = normalize(scrollY.value, secondPart.lastQuarter, secondPart.end);
      screenTextureOpacityRef.value = 1 - normal;
      screenOverlayOpacityRef.value = normal;
    } else {
      screenTextureOpacityRef.value = 0;
      screenOverlayOpacityRef.value = 1;
    }

    damp(eirikDesktopTexture, "opacity", screenTextureOpacityRef.value, 0.25, delta);
    damp(eirikTabletTexture, "opacity", screenTextureOpacityRef.value, 0.25, delta);
    damp(eirikMobileTexture, "opacity", screenTextureOpacityRef.value, 0.25, delta);
    damp(desktopOverlayRef.value, "opacity", screenOverlayOpacityRef.value, 0.25, delta);
    damp(tabletOverlayRef.value, "opacity", screenOverlayOpacityRef.value, 0.25, delta);
    damp(mobileOverlayRef.value, "opacity", screenOverlayOpacityRef.value, 0.25, delta);

    if (currentViewPort.value === "desktop") {
      damp(lightIntensity, "value", Math.max(screenTextureOpacityRef.value / 20, 0.01), 0.25, delta);

      deviceScreenRefs.desktop.value.material = eirikDesktopTexture;
      deviceScreenRefs.tablet.value.material = standardMaterial;
      deviceScreenRefs.mobile.value.material = standardMaterial;
    } else if (currentViewPort.value === "tablet") {
      lightIntensity.value = 0.01;
      deviceScreenRefs.desktop.value.material = standardMaterial;
      deviceScreenRefs.tablet.value.material = eirikTabletTexture;
      deviceScreenRefs.mobile.value.material = standardMaterial;
    } else if (currentViewPort.value === "mobile") {
      lightIntensity.value = 0.01;
      deviceScreenRefs.desktop.value.material = standardMaterial;
      deviceScreenRefs.tablet.value.material = standardMaterial;
      deviceScreenRefs.mobile.value.material = eirikMobileTexture;
    }
  }
}

watch(scrollY, () => {
  if (!hasScrolled.value) {
    hasScrolled.value = scrollY.value > 0;
  }
});
watch(aspectRatio, updateViewPort);

const gl = {
  clearColor: "#1d3106",
  physicallyCorrectLights: true,
  shadows: true,
  alpha: false,
  toneMappingExposure: 3,
  shadowMapType: PCFSoftShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: CineonToneMapping,
};
const { onLoop } = useRenderLoop();
const fillerStyles: ComputedRef<StyleValue> = computed(() => {
  return {
    height: "14px",
    minWidth: "14px",
    width: `${100 - prog.value}%`,
    backgroundColor: "white",
    transition: "width 500ms ease-in-out",
    borderRadius: "inherit",
    textAlign: "right",
  };
});
extend({ CustomDesktop, CustomKeyboard, CustomLamp, CustomMobile, CustomMouse, CustomTablet });

onLoop(({ elapsed, delta }) => {
  // lightRef.value.intensity = Math.abs(Math.cos(elapsed * 0.33) / 2);

  lightRef.value.target = spotLightTargetRef.value;
  updateCamera(delta);
  updateObjects(delta);
});

const { progress: prog, hasFinishLoading } = await useProgress();
</script>

<template>
  <div class="w-full relative px-2 text-zinc-200">
    <div class="flex flex-col fixed top-0 right-0 space-y-0.5 font-light p-2 md:p-4 lg:p-8">
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
        <div class="flex flex-col p-4 max-w-xl">
          <div class="space-y-4">
            <div class="gap-3 flex">
              <div class="h-3 w-16 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-sm" />
              <div class="h-3 w-8 bg-gradient-to-r from-purple-300 to-purple-400 rounded-sm" />
            </div>
            <div class="gap-3 flex">
              <div class="h-3 w-8 bg-gradient-to-r from-red-300 to-red-400 rounded-sm" />
              <div class="h-3 w-20 bg-gradient-to-r from-green-300 to-green-400 rounded-sm" />
              <div class="h-3 w-8 bg-gradient-to-r from-blue-300 to-blue-300 rounded-sm" />
              <div class="h-3 w-3 bg-zinc-400 rounded-full" />
            </div>
            <div class="gap-3 flex">
              <div class="h-3 w-40 bg-gradient-to-r from-blue-300 to-blue-300 rounded-sm" />
              <div class="h-3 w-20 bg-gradient-to-r from-green-300 to-green-400 rounded-sm" />
              <div class="h-3 w-4 bg-gradient-to-r from-purple-300 to-purple-400 rounded-sm" />
            </div>
            <div class="gap-3 flex">
              <div class="h-3 w-5 bg-zinc-400 rounded-sm" />
              <div class="h-3 w-10 bg-zinc-400 rounded-sm" />
              <div class="h-3 w-5 bg-zinc-400 rounded-sm" />
              <div class="h-3 w-3 bg-zinc-400 rounded-sm" />
              <div class="h-3 w-6 bg-zinc-400 rounded-sm" />
            </div>
          </div>
          <div class="pl-4 md:pl-8 lg:pl-16 py-6 space-y-4">
            <p class="font-mono text-zinc-400">Hello, I am</p>
            <h2 class="text-4xl font-extrabold">Eirik Mo</h2>
            <div class="gap-3 flex">
              <div class="h-3 w-7 bg-zinc-400 rounded-sm" />
              <div class="h-3 w-4 bg-zinc-400 rounded-sm" />
              <div class="h-3 w-2 bg-zinc-400 rounded-sm" />
              <div class="h-3 w-5 bg-zinc-400 rounded-sm" />
              <div class="h-3 w-6 bg-zinc-400 rounded-sm" />
            </div>
            <p class="font-mono text-zinc-200 font-light text-xl">&lt; Fullstack Developer /></p>
            <div class="gap-3 flex">
              <div class="h-3 w-20 bg-zinc-400 rounded-sm" />
              <div class="h-3 w-8 bg-zinc-400 rounded-sm" />
            </div>
          </div>
          <div class="space-y-4">
            <div class="gap-3 flex">
              <div class="h-3 w-3 bg-zinc-400 rounded-sm" />
              <div class="h-3 w-8 bg-zinc-400 rounded-sm" />
              <div class="h-3 w-4 bg-zinc-400 rounded-sm" />
            </div>
            <div class="gap-3 flex">
              <div class="h-3 w-40 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-sm" />
              <div class="h-3 w-20 bg-gradient-to-r from-blue-300 to-blue-300 rounded-sm" />
              <div class="h-3 w-3 bg-zinc-400 rounded-full" />
            </div>
            <div class="gap-3 flex">
              <div class="h-3 w-10 bg-gradient-to-r from-green-300 to-green-400 rounded-sm" />
              <div class="h-3 w-14 bg-gradient-to-r from-purple-300 to-purple-400 rounded-sm" />
              <div class="h-3 w-12 bg-gradient-to-r from-red-300 to-red-400 rounded-sm" />
            </div>
            <div class="gap-3 flex">
              <div class="h-3 w-6 bg-gradient-to-r from-blue-300 to-blue-300 rounded-sm" />
              <div class="h-3 w-4 bg-gradient-to-r from-red-300 to-red-400 rounded-sm" />
              <div class="h-3 w-8 bg-gradient-to-r from-green-300 to-green-400 rounded-sm" />
              <div class="h-3 w-3 bg-zinc-400 rounded-full" />
            </div>
          </div>
        </div>
      </section>
      <section class="min-h-screen container flex items-center justify-end" id="second" ref="secondRef">
        <div class="w-full lg:w-1/2">
          <div class="flex flex-col p-4 max-w-xl gap-2">
            <h2 class="text-4xl font-extrabold mb-4">Who I am</h2>

            <p class="font-italic">
              I am a lifelong learner who enjoy exploring new technologies and approaches to web development. I am also
              an avid traveler, language learner, and I enjoy hiking up sunny mountains in my free time.
            </p>
            <p class="font-italic">
              I do all of my work remotely. And I can effectively communicate and collaborate with clients and team
              members remotely. This allows me to take on projects from anywhere in the world and deliver high-quality
              results.
            </p>
          </div>
        </div>
      </section>
      <section class="min-h-screen container flex items-center" id="third" ref="thirdRef">
        <div class="flex flex-col p-4 max-w-xl gap-2">
          <h2 class="text-4xl font-extrabold mb-4">Expertise</h2>
          <p class="font-italic">
            As a full-stack web developer, I am passionate about delivering high-quality and user-friendly web solutions
            for clients. With a focus on JavaScript frameworks, I have gained valuable experience working with NextJS,
            React, and Angular. I have a strong understanding of .NET, C#, Node, REST, GraphQL, PostgreSQL, MongoDB, and
            SQL. I also have experience with cloud computing platforms such as Azure and AWS, including CI/CD tools such
            as Github Actions. My expertise extends to CMS platforms like Sanity.io and Strapi, allowing me to provide
            clients with a wide range of options to meet their specific needs and requirements.
          </p>
          <p class="font-italic">
            One of my key areas of expertise is TypeScript, where I have extensive experience working with type safety
            to ensure the security and stability of web applications. I believe in the importance of writing clean,
            efficient, and well-documented code, and am constantly seeking to improve my skills and stay up-to-date with
            the latest technologies and trends in the web development industry.
          </p>
        </div>
      </section>
      <section class="min-h-screen container flex items-center" id="fourth" ref="fourthRef">
        <div class="flex flex-col p-4 max-w-xl">
          <h2 class="text-4xl font-extrabold mb-4">Projects I am Proud of</h2>
          <p class="font-italic">FotballFeber! 🚀</p>
        </div>
      </section>
    </main>
    <main class="flex flex-col p-4 md:p-8 lg:p-16">
      <section class="min-h-screen container flex items-center" id="fifth" ref="fifthRef">
        <div class="flex flex-col p-4 max-w-xl">
          <h2 class="text-4xl text-light font-extrabold">Work</h2>
        </div>
      </section>
      <section class="min-h-screen container flex items-center" id="sixth" ref="sixthRef">
        <div class="flex flex-col p-4 max-w-xl">
          <h2 class="text-4xl font-extrabold mb-4">Contact</h2>
          <p class="font-italic">Contact form goes here</p>
        </div>
      </section>
      <section class="min-h-screen container flex items-center" id="seventh" ref="seventhRef">
        <div class="flex flex-col p-4 max-w-xl">
          <h2 class="text-4xl font-extrabold mb-4"></h2>
          <p class="font-italic"></p>
        </div>
      </section>
      <section class="min-h-screen container flex items-center" id="eighth" ref="eighthRef">
        <div class="flex flex-col p-4 max-w-xl">
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
        class="fixed bg-black inset-0 w-full text-center flex flex-col justify-center items-center h-full z-80"
      >
        <div class="max-w-xl" :style="fillerStyles"></div>
      </div>
    </Transition>

    <TresCanvas class="-z-30" v-bind="gl" ref="canvasRef" window-size>
      <Suspense>
        <StatsGl />
      </Suspense>

      <!-- Camera -->
      <TresPerspectiveCamera ref="cameraRef" :position="[0, 1, 0]" :near="0.1" :far="80" />

      <!-- Backdrop -->
      <TresMesh :scale="[120, 60, 60]" :position="[0, -0.1, -40]" :receive-shadow="true">
        <Backdrop :floor="1" :segments="20" receive-shadow>
          <TresMeshStandardMaterial :color="new Color(0xffffff)" :roughness="0.3" :metalness="0.3" />
        </Backdrop>
      </TresMesh>
      <FixPixelRatio />

      <Suspense>
        <CustomDesktop :position="new Vector3(0, 0.2, -1)" />
      </Suspense>

      <TresMesh :ref="deviceScreenRefs.desktop" :position="[0, 1.65, -1.232]">
        <TresPlaneGeometry :args="[3.75, 1.89]" />
        <TresMeshStandardMaterial :roughness="0.4" :metalness="0.5" :color="new Color(0x888888)" />
      </TresMesh>

      <TresMesh :position="[0, 1.65, -1.231]">
        <TresPlaneGeometry :args="[3.75, 1.89]" />
        <TresMeshStandardMaterial
          ref="desktopOverlayRef"
          :roughness="0.4"
          :metalness="0.5"
          transparent
          :alpha-test="0"
          :color="new Color(0xffffff)"
        />
      </TresMesh>

      <!-- Mobile -->
      <Suspense>
        <CustomMobile :position="new Vector3(-0.24, -0.299, 0)" :rotation="new Euler(-Math.PI / 4, 0, 0)" />
      </Suspense>

      <TresMesh
        :ref="deviceScreenRefs.mobile"
        :position="[-0.24, 0.034, -0.31]"
        :rotation="new Euler(-Math.PI / 2, 0, 0)"
      >
        <TresPlaneGeometry :args="[0.278, 0.568]" />
        <TresMeshStandardMaterial :roughness="0.4" :metalness="0.5" :color="new Color(0xaaaaaa)" />
      </TresMesh>
      <TresMesh :position="[-0.24, 0.035, -0.31]" :rotation="new Euler(-Math.PI / 2, 0, 0)">
        <TresPlaneGeometry :args="[0.278, 0.568]" />
        <TresMeshStandardMaterial
          ref="mobileOverlayRef"
          :metalness="0.5"
          :roughness="0.4"
          transparent
          :alpha-test="0"
          :color="new Color(0xffffff)"
        />
      </TresMesh>

      <!-- Tablet -->
      <Suspense>
        <CustomTablet :position="new Vector3(-2, 0, 0)" :rotation="new Euler(0, 0.1, 0)" :scale="8" />
      </Suspense>

      <TresMesh
        :ref="deviceScreenRefs.tablet"
        :position="[-2.01, 0.0945, -0.05]"
        :rotation="new Euler(-Math.PI / 2, 0.0, 0.084)"
      >
        <TresPlaneGeometry :args="[0.933, 1.28]" />
        <TresMeshStandardMaterial :roughness="0.4" :metalness="0.5" :color="new Color(0x888888)" />
      </TresMesh>
      <TresMesh :position="[-2.01, 0.0946, -0.05]" :rotation="new Euler(-Math.PI / 2, 0.0, 0.084)">
        <TresPlaneGeometry :args="[0.933, 1.28]" />
        <TresMeshStandardMaterial
          ref="tabletOverlayRef"
          :roughness="0.4"
          :metalness="0.5"
          :color="new Color(0xffffff)"
          transparent
          :alpha-test="0"
        />
      </TresMesh>

      <!-- Keyboard -->
      <Suspense>
        <CustomKeyboard :position="new Vector3(0, 0.1, 0.5)" scale="0.5" />
      </Suspense>

      <!-- Mouse -->
      <Suspense>
        <CustomMouse :position="mousePositionRef" :scale="4" :rotation="mouseRotationRef" />
      </Suspense>

      <!-- Lamp -->
      <Suspense>
        <CustomLamp :position="new Vector3(3.5, 0, -1)" :scale="0.5" :rotation="new Euler(0, Math.PI * 1.25, 0)" />
      </Suspense>

      <!-- Lights -->
      <TresRectAreaLight
        :intensity="lightIntensity"
        :width="3.75"
        :rotation="[0, Math.PI, 0]"
        :height="1.89"
        :color="new Color(0x7dd3fc)"
        :position="[0, 1, -1.2]"
      />

      <TresMesh ref="spotLightTargetRef" :position="[2.8, 0, -0.34]" />

      <TresSpotLight
        v-light-helper
        ref="lightRef"
        :distance="12"
        :color="new Color(0xebc653)"
        :position="[3.15, 2.05, -0.64]"
        :penumbra="0.5"
        :angle="Math.PI * 0.5"
        :cast-shadow="true"
      />

      <TresDirectionalLight
        ref="directionalLightRef"
        :color="new Color(0x7dd3fc)"
        :position="[2, 4, 5]"
        :cast-shadow="true"
      />
    </TresCanvas>
  </div>
</template>
