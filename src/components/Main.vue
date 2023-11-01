<script setup lang="ts">
import { Backdrop, useProgress } from "@tresjs/cientos";
import { extend, TresCanvas, useRenderLoop, useTexture } from "@tresjs/core";
import { useControls } from "@tresjs/leches";
import { useMouse, useWindowScroll, useWindowSize } from "@vueuse/core";
import { damp, damp3, dampE } from "maath/easing";
import {
  CineonToneMapping,
  Color,
  Euler,
  MathUtils,
  MeshBasicMaterial,
  MeshStandardMaterial,
  SRGBColorSpace,
  Vector3,
} from "three";
import type { ComputedRef, StyleValue } from "vue";
import { computed, onMounted, reactive, ref, watch } from "vue";
import CoolConsoleLog from "./CoolConsoleLog.vue";
import CustomDesktop from "./CustomDesktop.vue";
import CustomKeyboard from "./CustomKeyboard.vue";
import CustomLamp from "./CustomLamp.vue";
import CustomLeche from "./CustomLeche.vue";
import CustomMobile from "./CustomMobile.vue";
import CustomMouse from "./CustomMouse.vue";
import CustomStatsGl from "./CustomStatsGl.vue";
import CustomTablet from "./CustomTablet.vue";
import Expertise from "./Expertise.vue";
import FixPixelRatio from "./FixPixelRatio.vue";
import Header from "./Header.vue";
import Me from "./Me.vue";
import Socials from "./Socials.vue";

type ViewPort = "desktop" | "tablet" | "mobile";

const canvasRef = ref();
const scrollContainerRef = ref();

const currentViewPort = ref<ViewPort>("desktop");
const previousViewPort = ref<ViewPort>("desktop");
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
const spotLightRef = ref();
const spotLightTargetRef = ref();
const directionalLightRef = ref();

const mousePositionRef = ref(new Vector3(2, -0.08, 1));
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
  positionSmoothing: 0.3,
  lookAtSmoothing: 0.3,
};

const alpha = await useTexture({
  map: "/textures/eirik/alpha.jpg",
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

const fotballfeber = await useTexture({
  map: "/textures/projects/ff-repeat.jpg",
});

const standardMaterial = new MeshStandardMaterial({
  color: new Color(0xffffff),
  roughness: 0.4,
  metalness: 0.5,
});
const { value: position } = useControls({
  position: new Vector3(2, 4, 5),
});

const { width, height } = useWindowSize();
const { y: scrollY } = useWindowScroll();
const { x: mouseX, y: mouseY } = useMouse({
  type: "client",
  touch: false,
});

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
    start: new Vector3(0, 1.6, -0.2),
    second: new Vector3(0, 1.6, 1.5),
    third: new Vector3(0, 2, 2.5),
    end: new Vector3(0, 3, 5),
    startAngle: new Euler(0, 0, 0),
    secondAngle: new Euler(0, 0, 0),
    thirdAngle: new Euler(-Math.PI / 9, 0, 0),
    endAngle: new Euler(-Math.PI / 7, 0, 0),
  },
  tablet: {
    start: new Vector3(-2, 0.7, -0.1),
    second: new Vector3(-1.75, 1.25, 0),
    third: new Vector3(-1, 3, 2),
    end: new Vector3(0, 3, 5),
    startAngle: new Euler(-Math.PI / 2, 0, Math.PI / 40),
    secondAngle: new Euler(-Math.PI / 2, 0, Math.PI / 40),
    thirdAngle: new Euler(-Math.PI / 5, 0, 0),
    endAngle: new Euler(-Math.PI / 7, 0, 0),
  },
  mobile: {
    start: new Vector3(-0.25, 0.2, -0.25),
    second: new Vector3(-0.25, 1, -0.25),
    third: new Vector3(0, 3, 2),
    end: new Vector3(0, 3, 5),
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

const fotballfeberTexture = new MeshBasicMaterial({
  transparent: true,
  map: fotballfeber.map,
  aoMap: fotballfeber.map,
  aoMapIntensity: 1,
});

function updateHeight() {
  canvasRef.value.height = firstRef.value.offsetHeight;
}

watch(height, () => updateHeight());

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
  }
}

const screenTextureOpacityRef = ref(0);
const screenOverlayOpacityRef = ref(1);

updateViewPort();

watch(width, updateViewPort);

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
    // damp(mouseParams, "rotation", (Math.PI + (mouseX.value / width.value - 0.5) / 2), 0.25, delta);

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
          0,
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
          0,
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
          0,
          MathUtils.lerp(currentDevice.thirdAngle.z, currentDevice.endAngle.z, normal),
        ],
        param.lookAtSmoothing,
        delta,
      );
    }
  }

  cameraRef.value.aspect = width.value / firstRef.value.offsetHeight;
  cameraRef.value.updateProjectionMatrix();
}
const mouseParams = {
  x: 0,
  z: 0,
  rotation: Math.PI,
};

let tempLightIntensity = 0;

function updateObjects(delta: number) {
  if (!hasScrolled.value && scrollY.value === 0) {
    // Set the lights to the start intensity
    spotLightRef.value.intensity = 0;
    directionalLightRef.value.intensity = 0.05;

    // Set screens textures to the start opacity
    eirikDesktopTexture.opacity = 0;
    desktopOverlayRef.value.opacity = 1;
  } else {
    // Mouse Position
    damp(mouseParams, "x", (mouseX.value / width.value - 0.5) / 4, 0.25, delta);
    damp(mouseParams, "z", (mouseY.value / height.value - 0.5) / 4, 0.25, delta);
    mousePositionRef.value = new Vector3(mouseParams.x + 2, mousePositionRef.value.y, mouseParams.z + 0.5);

    // Mouse Rotation
    damp(mouseParams, "rotation", (Math.PI + (mouseX.value / width.value - 0.5) / 2) * -1, 0.25, delta);
    mouseRotationRef.value = new Euler(0, mouseParams.rotation, 0);

    const normalizedLightInterval = normalize(scrollY.value, 0, thirdRef.value.offsetTop);

    damp(spotLightRef.value, "intensity", normalizedLightInterval, 0.25, delta);
    damp(directionalLightRef.value, "intensity", normalizedLightInterval / 12 + 0.05, 0.25, delta);

    const secondPart = {
      height: secondRef.value.offsetHeight,
      start: secondRef.value.offsetTop - firstRef.value.offsetHeight / 2,
      end: secondRef.value.offsetTop + secondRef.value.offsetHeight,
    };

    const projectFotballFeber = {
      start: fourthRef.value.offsetTop - firstRef.value.offsetHeight / 2,
      end: fourthRef.value.offsetTop + fourthRef.value.offsetHeight,
    };

    if (scrollY.value < secondPart.start) {
      screenTextureOpacityRef.value = 0;
      screenOverlayOpacityRef.value = 1;
    } else if (scrollY.value > secondPart.start && scrollY.value < secondPart.end) {
      screenTextureOpacityRef.value = 1;
      screenOverlayOpacityRef.value = 0;
      if (currentViewPort.value === "desktop") {
        tempLightIntensity = 0.05;
        deviceScreenRefs.desktop.value.material = eirikDesktopTexture;
        deviceScreenRefs.tablet.value.material = standardMaterial;
        deviceScreenRefs.mobile.value.material = standardMaterial;
      } else if (currentViewPort.value === "tablet") {
        tempLightIntensity = 0.01;
        deviceScreenRefs.desktop.value.material = standardMaterial;
        deviceScreenRefs.tablet.value.material = eirikTabletTexture;
        deviceScreenRefs.mobile.value.material = standardMaterial;
      } else if (currentViewPort.value === "mobile") {
        tempLightIntensity = 0.01;
        deviceScreenRefs.desktop.value.material = standardMaterial;
        deviceScreenRefs.tablet.value.material = standardMaterial;
        deviceScreenRefs.mobile.value.material = eirikMobileTexture;
      }
    } else if (scrollY.value > secondPart.end && scrollY.value < projectFotballFeber.start) {
      tempLightIntensity = 0.01;
      screenTextureOpacityRef.value = 0;
      screenOverlayOpacityRef.value = 1;
    } else if (scrollY.value > projectFotballFeber.start && scrollY.value < projectFotballFeber.end) {
      tempLightIntensity = 0.05;
      screenTextureOpacityRef.value = 1;
      screenOverlayOpacityRef.value = 0.25;
      deviceScreenRefs.desktop.value.material = fotballfeberTexture;
      deviceScreenRefs.tablet.value.material = fotballfeberTexture;
      deviceScreenRefs.mobile.value.material = fotballfeberTexture;
    } else if (scrollY.value > projectFotballFeber.end) {
      tempLightIntensity = 0.01;
      screenTextureOpacityRef.value = 0;
      screenOverlayOpacityRef.value = 1;
    }

    damp(lightIntensity, "value", tempLightIntensity, 0.25, delta);

    damp(eirikDesktopTexture, "opacity", screenTextureOpacityRef.value, 0.25, delta);
    damp(eirikTabletTexture, "opacity", screenTextureOpacityRef.value, 0.25, delta);
    damp(eirikMobileTexture, "opacity", screenTextureOpacityRef.value, 0.25, delta);
    damp(desktopOverlayRef.value, "opacity", screenOverlayOpacityRef.value, 0.25, delta);
    damp(tabletOverlayRef.value, "opacity", screenOverlayOpacityRef.value, 0.25, delta);
    damp(mobileOverlayRef.value, "opacity", screenOverlayOpacityRef.value, 0.25, delta);
  }
  // deviceScreenRefs.desktop.value.material.needsUpdate = true;
  // cameraRef.value.position.y = 0;
}

watch(scrollY, () => {
  if (!hasScrolled.value) {
    hasScrolled.value = scrollY.value > 0;
  }
});

const gl = {
  clearColor: "#223d4a",
  physicallyCorrectLights: true,
  shadows: true,
  alpha: false,
  toneMappingExposure: 3,
  outputColorSpace: SRGBColorSpace,
  toneMapping: CineonToneMapping,
};

const { onLoop } = useRenderLoop();

const fillerStyles: ComputedRef<StyleValue> = computed(() => {
  return {
    height: "14px",
    minWidth: "14px",
    width: `${100 - prog.value}%`,
    paddingLeft: "2px",
    paddingRight: "2px",
    backgroundColor: "white",
    transition: "width 500ms ease-in-out",
    borderRadius: "inherit",
    textAlign: "right",
  };
});

const canvasStyle = reactive({
  display: "block",
  top: "0px",
  bottom: "0px",
  left: "0px",
  right: "0px",
  position: "fixed",
  height: "100vh",
  width: "100%",
});

extend({ CustomDesktop, CustomKeyboard, CustomLamp, CustomMobile, CustomMouse, CustomTablet });

onLoop(({ delta }) => {
  if (spotLightRef.value && spotLightTargetRef.value) {
    spotLightRef.value.target = spotLightTargetRef.value;
  }
  updateCamera(delta);
  updateObjects(delta);
});

const { progress: prog, hasFinishLoading } = await useProgress();
</script>

<template>
  <CoolConsoleLog />
  <div class="flex justify-center relative">
    <div class="w-full relative px-2 text-zinc-200 max-w-screen-3xl">
      <div
        class="fixed top-0 right-0 3xl:right-1/2 3xl:translate-x-[958px] font-light h-screen flex flex-col justify-between select-none z-50"
      >
        <div class="flex flex-col space-y-0.5 gap-4 p-3 lg:px-5">
          <a href="#eirik" class="pl-1.5"><div class="h-3 w-3 bg-zinc-400 hover:bg-zinc-200 rounded-full" /></a>
          <a
            class="hover:text-zinc-200 text-zinc-400"
            style="writing-mode: vertical-rl; -webkit-writing-mode: vertical-rl"
            href="#me"
            >Me</a
          >
          <a
            class="hover:text-zinc-200 text-zinc-400"
            style="writing-mode: vertical-rl; -webkit-writing-mode: vertical-rl"
            href="#expertise"
            >Expertise</a
          >
          <a
            class="hover:text-zinc-200 text-zinc-400"
            style="writing-mode: vertical-rl; -webkit-writing-mode: vertical-rl"
            href="#projects"
            >Projects</a
          >
          <a
            class="hover:text-zinc-200 text-zinc-400"
            style="writing-mode: vertical-rl; -webkit-writing-mode: vertical-rl"
            href="#work"
            >Work</a
          >
          <a
            class="hover:text-zinc-200 text-zinc-400"
            style="writing-mode: vertical-rl; -webkit-writing-mode: vertical-rl"
            href="#contact"
            >Contact</a
          >
        </div>

        <div class="hidden md:flex flex-col space-y-6 font-light px-3 lg:px-5">
          <a
            class="text-zinc-200 hover:text-zinc-100"
            style="writing-mode: vertical-rl; -webkit-writing-mode: vertical-rl"
            href="mailto:eirik@mowebdev.com"
            >eirik@mowebdev.com</a
          >
          <div class="mx-3 h-32 lg:h-40 w-[2px] flex-shrink bg-zinc-400"></div>
        </div>
      </div>
      <Socials />
      <main ref="scrollContainerRef" class="flex flex-col pl-4 pr-8 md:px-12 lg:px-16 items-center">
        <section class="min-h-screen container flex items-center" id="eirik" ref="firstRef">
          <Header />
        </section>
        <section class="min-h-screen container flex items-center justify-end" id="me" ref="secondRef">
          <Me />
        </section>
        <section class="min-h-screen container flex items-center w-full py-40" ref="thirdRef">
          <Expertise />
        </section>
      </main>
      <main class="flex flex-col pl-4 pr-8 md:p-12 lg:p-16 items-center">
        <section class="min-h-screen container flex items-center" id="projects">
          <div class="flex flex-col gap-2">
            <h2 class="text-4xl font-extrabold mb-4">Projects</h2>
            <div class="gap-3 flex">
              <div class="h-3 w-16 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-sm" />
              <div class="h-3 w-11 bg-gradient-to-r from-blue-300 to-blue-400 rounded-sm" />
              <div class="h-3 w-3 bg-zinc-400 rounded-full" />
            </div>

            <div
              class="md:pl-10 md:border-l border-gray-500 mt-4 mb-2 md:mt-8 md:mb-4 md:bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#223d4a]/80 via-[#223d4a]/10 to-transparent"
              ref="fourthRef"
            >
              <div class="grid grid-cols-3 gap-x-8 lg:gap-x-12">
                <div class="drop-shadow col-span-2 my-4">
                  <h1 class="md:text-3xl text-4xl font-bold drop-shadow">FotballFeber</h1>
                  <h2 class="text-xl md:text-2xl font-light italic text-sky-200 drop-shadow break-words wrap">
                    Where Norwegian Football Fans Unite
                  </h2>
                  <h3 class="text-xl font-bold italic text-[#15FF93] drop-shadow">Work in progress</h3>
                </div>
                <div class="col-span-1 justify-self-center my-4">
                  <img
                    src="/images/projects/fotballfeber/logo.png"
                    alt="FotballFeber Logo"
                    class="w-16 sm:w-24 md:w-32"
                  />
                </div>
                <p class="drop-shadow my-4 col-span-3 md:col-span-2">
                  FotballFeber is a vibrant online community dedicated to Norwegian football enthusiasts. Here, fans can
                  engage in discussions on the latest news, matches, transfers, and rumors, delve into tactical
                  strategies, explore player development, analyze statistics, delve into fan culture, and dive into the
                  rich history of Norwegian football.
                </p>
                <div
                  class="flex flex-col col-span-3 md:col-span-1 items-center gap-4 relative overflow-visible row-span-2"
                >
                  <img
                    src="/images/projects/fotballfeber/screenshot.jpg"
                    alt="FotballFeber Login Screen"
                    class="md:w-[150%] md:max-w-[150%] lg:w-[125%] lg:max-w-[125%] floating drop-shadow-lg shadow-xl z-20"
                  />
                </div>

                <div class="flex flex-col col-span-3 md:col-span-2 gap-2">
                  <h3 class="text-lg md:text-xl drop-shadow font-bold mt-4">The Vision</h3>
                  <p class="drop-shadow">
                    Inspired by the absence of a unified platform for Norwegian football aficionados, I embarked on a
                    mission to bring this community to life. My goal was to create a space where supporters from all
                    Norwegian football clubs could come together and share their passion for the sport.
                  </p>

                  <h3 class="text-lg md:text-xl drop-shadow font-bold mt-4">The Technical Journey</h3>
                  <p class="drop-shadow">
                    Building FotballFeber from the ground up was a fascinating journey. I chose Next.js, React, and
                    TailwindCSS as the core technologies. Everything was meticulously organized in a monorepo using
                    Turborepo, and the website is seamlessly hosted on Vercel. For state management and data fetching, I
                    adopted Jotai and Tanstack Query. The UI is adorned with shadcn/ui, Radix UI, and Lucide icons,
                    ensuring a sleek and user-friendly experience. Wireframing involved low-fidelity designs created in
                    Excalidraw and high-fidelity wireframes crafted in Figma. Flowcharts and diagrams were illustrated
                    using Excalidraw.
                  </p>

                  <h3 class="text-lg md:text-xl drop-shadow font-bold mt-4">News Aggregation Magic</h3>
                  <p class="drop-shadow">
                    To keep the platform abuzz with the latest Norwegian football updates, I developed a method to
                    source articles from various Norwegian football news sites, leveraging their public APIs. This
                    involves a Python script for monitoring updates on the news sites. The articles go through a
                    meticulous processing pipeline with the aid of Upstash Redis, a NodeJS server, and an additional
                    Redis database. An exposed GUI, powered by Fastify, keeps things transparent, and it's all hosted on
                    Railway. The articles find their permanent home in a MySQL database hosted on Planetscale, and they
                    are rapidly indexed in a high-performance Meilisearch instance on Fly.io. This setup ensures
                    seamless search and filtering for users, offering an exceptional browsing experience.
                  </p>
                </div>
                <div
                  class="flex flex-col col-span-3 md:col-span-1 items-center gap-4 relative overflow-visible row-span-1 md:order-last"
                >
                  <img
                    src="/images/projects/fotballfeber/screenshot2.jpg"
                    alt="FotballFeber Login Screen"
                    class="md:w-[150%] md:max-w-[150%] lg:w-[135%] lg:max-w-[135%] floating drop-shadow-lg shadow-xl z-20"
                  />
                </div>
                <div class="flex flex-col col-span-3 md:col-span-2 gap-2">
                  <h3 class="text-lg md:text-xl drop-shadow font-bold mt-4">The Road Ahead</h3>

                  <p class="drop-shadow">
                    FotballFeber is an ever-evolving project with a comprehensive roadmap. The current focus is on
                    finalizing the onboarding process and introducing a crucial discussion forum. The next milestone is
                    implementing a subscription and payment service, marking the official launch for public use.
                  </p>

                  <h3 class="text-lg md:text-xl drop-shadow font-bold mt-4">Beyond Passion</h3>
                  <p class="drop-shadow">
                    The commitment to this project extends beyond my love for Norwegian football and online communities.
                    It has become a priceless learning experience in entrepreneurship. As a web developer, I've never
                    learned at such a rapid pace as I have during this project. Building something from scratch demands
                    a deep understanding of the objectives, which can only be achieved through a pragmatic approach.
                    I've encountered my fair share of challenges and setbacks, but each one has been a valuable lesson.
                  </p>

                  <h3 class="text-lg md:text-xl drop-shadow font-bold mt-4">Evolution as a Developer</h3>
                  <p class="drop-shadow">
                    My journey began as a full-stack web developer, but it has evolved to encompass backend development
                    and proficiency in various types of databases. I've expanded my software engineering skills by
                    delving into software architecture, microservices, message queues, and load balancers. The role of a
                    DevOps expert emerged as I managed CI/CD, containerization, orchestration, performance monitoring,
                    issue alerting, and analytical insights.
                  </p>
                  <p class="drop-shadow">
                    This project has not only created a community but has also been a transformative experience in
                    personal and professional growth. FotballFeber is the embodiment of my passion for Norwegian
                    football and the ever-evolving world of web development.
                  </p>

                  <div class="w-fit mt-4">
                    <a
                      href="https://www.fotballfeber.com/"
                      target="_blank"
                      class="text-[#15FF93] font-medium border-[#15FF93] border rounded-md px-4 py-2 space-x-4 flex hover:bg-[#15FF93] hover:text-black transition-all duration-200 ease-in-out items-center"
                    >
                      <span> Go to FotballFeber </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-external-link"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" x2="21" y1="14" y2="3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="min-h-screen container flex items-center" id="work" ref="fifthRef">
          <div class="flex flex-col p-4 max-w-xl gap-2">
            <h2 class="text-4xl text-light font-extrabold">Work</h2>
            <div class="gap-3 flex">
              <div class="h-3 w-6 bg-gradient-to-r from-green-300 to-green-400 rounded-sm" />
              <div class="h-3 w-8 bg-gradient-to-r from-purple-300 to-purple-400 rounded-sm" />
              <div class="h-3 w-4 bg-gradient-to-r from-red-300 to-red-400 rounded-sm" />
            </div>
          </div>
        </section>
        <section class="min-h-screen container flex items-center" id="contact" ref="sixthRef">
          <div class="flex flex-col p-4 max-w-xl gap-2">
            <h2 class="text-4xl font-extrabold mb-4">Contact</h2>
            <div class="gap-3 flex">
              <div class="h-3 w-16 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-sm" />
              <div class="h-3 w-8 bg-gradient-to-r from-purple-300 to-purple-400 rounded-sm" />
              <div class="h-3 w-10 bg-gradient-to-r from-green-300 to-green-400 rounded-sm" />
            </div>
            <p>Contact form goes here</p>
          </div>
        </section>
        <section class="min-h-screen container flex items-center" id="seventh" ref="seventhRef">
          <div class="flex flex-col p-4 max-w-xl gap-2">
            <h2 class="text-4xl font-extrabold mb-4"></h2>
            <p></p>
          </div>
        </section>
        <section class="min-h-screen container flex items-center" id="eighth" ref="eighthRef">
          <div class="flex flex-col p-4 max-w-xl gap-2">
            <h2 class="text-4xl font-extrabold mb-4"></h2>
            <p></p>
          </div>
        </section>
      </main>
    </div>

    <Transition
      name="fade-overlay"
      enter-active-class="opacity-1 transition-opacity duration-1000"
      leave-active-class="opacity-0 transition-opacity duration-1000 delay-1000"
    >
      <div
        v-show="!hasFinishLoading"
        class="fixed bg-[#00040C] inset-0 w-full text-center flex flex-col justify-center items-center h-full z-80"
      >
        <div class="max-w-xl" :style="fillerStyles"></div>
      </div>
    </Transition>
  </div>
  <CustomLeche />

  <TresCanvas class="-z-30" v-bind="gl" ref="canvasRef" id="canvas" :style="canvasStyle">
    <CustomStatsGl />
    <!-- Camera -->
    <TresPerspectiveCamera ref="cameraRef" :position="[0, 1, 0]" :near="0.1" :far="80" :fov="70" />

    <!-- Backdrop -->
    <TresMesh cast-shadow receive-shadow :scale="[200, 60, 60]" :position="[0, -0.1, -40]">
      <Backdrop :floor="1" :segments="20" cast-shadow receive-shadow>
        <TresMeshStandardMaterial :color="new Color(0xffffff)" :roughness="0.3" :metalness="0.3" />
      </Backdrop>
    </TresMesh>

    <FixPixelRatio :height="firstRef" />

    <Suspense>
      <CustomDesktop :position="new Vector3(0, 0.15, -1)" />
    </Suspense>

    <TresMesh cast-shadow receive-shadow :ref="deviceScreenRefs.desktop" :position="[0, 1.6, -1.232]">
      <TresPlaneGeometry :args="[3.75, 1.89]" />
      <TresMeshStandardMaterial :roughness="0.4" :metalness="0.5" :color="new Color(0x888888)" />
    </TresMesh>

    <TresMesh cast-shadow receive-shadow :position="[0, 1.6, -1.231]">
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
      <CustomMobile :position="new Vector3(-0.24, -0.315, 0)" :rotation="new Euler(-Math.PI / 4, 0, 0)" />
    </Suspense>

    <TresMesh
      :ref="deviceScreenRefs.mobile"
      :position="[-0.24, 0.018, -0.31]"
      :rotation="new Euler(-Math.PI / 2, 0, 0)"
    >
      <TresPlaneGeometry :args="[0.278, 0.568]" />
      <TresMeshStandardMaterial :roughness="0.4" :metalness="0.5" :color="new Color(0xaaaaaa)" />
    </TresMesh>
    <TresMesh cast-shadow receive-shadow :position="[-0.24, 0.019, -0.31]" :rotation="new Euler(-Math.PI / 2, 0, 0)">
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
      <CustomTablet :position="new Vector3(-2, -0.03, 0)" :rotation="new Euler(0, 0.1, 0)" :scale="8" />
    </Suspense>

    <TresMesh
      :ref="deviceScreenRefs.tablet"
      :position="[-2.01, 0.0915, -0.05]"
      :rotation="new Euler(-Math.PI / 2, 0.0, 0.084)"
    >
      <TresPlaneGeometry :args="[0.933, 1.28]" />
      <TresMeshStandardMaterial :roughness="0.4" :metalness="0.5" :color="new Color(0x888888)" />
    </TresMesh>
    <TresMesh
      cast-shadow
      receive-shadow
      :position="[-2.01, 0.0916, -0.05]"
      :rotation="new Euler(-Math.PI / 2, 0.0, 0.084)"
    >
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
      <CustomKeyboard :position="new Vector3(0, 0.025, 0.5)" scale="0.5" />
    </Suspense>

    <!-- Mouse -->
    <Suspense>
      <CustomMouse :position="mousePositionRef" :scale="4" :rotation="mouseRotationRef" />
    </Suspense>

    <!-- Lamp -->
    <Suspense>
      <CustomLamp
        :position="new Vector3(3.5, -0.04, -1)"
        :scale="0.5"
        :rotation="new Euler(0, Math.PI * 1.25, 0)"
        :light="spotLightRef"
      />
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

    <TresMesh cast-shadow receive-shadow ref="spotLightTargetRef" :position="[2.8, 0, -0.34]" />

    <TresSpotLight
      ref="spotLightRef"
      :distance="12"
      :color="new Color(0xebc653)"
      :position="[3.15, 2.05, -0.64]"
      :penumbra="0.5"
      :shadow-mapSize-width="2048"
      :shadow-mapSize-height="2048"
      cast-shadow
      :shadow-radius="1"
    />

    <TresDirectionalLight
      ref="directionalLightRef"
      :color="new Color(0x7dd3fc)"
      :position-x="position.x"
      :position-y="position.y"
      :position-z="position.z"
    />
  </TresCanvas>
</template>

<style>
.floating {
  image-rendering: high-quality;
  transform: perspective(1500px) rotateY(-25deg) rotateX(0) rotateZ(5deg) scale(0.75);
  border-radius: 0.25rem;
  transition: transform 1s ease 0s;

  &:hover {
    transform: perspective(3000px) rotateY(-5deg) rotateX(0) rotateZ(0deg) scale(0.75);
  }
}
</style>
