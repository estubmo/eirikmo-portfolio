<script setup lang="ts">
import { Backdrop, useProgress } from "@tresjs/cientos";
import { extend, TresCanvas, useRenderLoop, useTexture } from "@tresjs/core";
import { useMouse, useWindowScroll, useWindowSize } from "@vueuse/core";
import { damp, damp3, dampC, dampE } from "maath/easing";
import {
  CineonToneMapping,
  Color,
  DirectionalLight,
  Euler,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  SpotLight,
  SRGBColorSpace,
  Vector3,
} from "three";
import type { ComputedRef, StyleValue } from "vue";
import { computed, onMounted, reactive, ref, watch } from "vue";
import AdtubeComponent from "./AdtubeComponent.vue";
import CheffeloComponent from "./CheffeloComponent.vue";
import CoolConsoleLog from "./CoolConsoleLog.vue";
import CustomDesktop from "./CustomDesktop.vue";
import CustomKeyboard from "./CustomKeyboard.vue";
import CustomLamp from "./CustomLamp.vue";
// import CustomLeche from "./CustomLeche.vue";
import CustomMobile from "./CustomMobile.vue";
import CustomMouse from "./CustomMouse.vue";
import CustomStatsGl from "./CustomStatsGl.vue";
import CustomTablet from "./CustomTablet.vue";
import ExpertiseComponent from "./ExpertiseComponent.vue";
import FixPixelRatio from "./FixPixelRatio.vue";
import FotballFeber from "./FotballFeber.vue";
import HeaderComponent from "./HeaderComponent.vue";
import MeComponent from "./MeComponent.vue";
import SocialsComponent from "./SocialsComponent.vue";
import WebtopComponent from "./WebtopComponent.vue";

type ViewPort = "desktop" | "tablet" | "mobile";

const canvasRef = ref<HTMLCanvasElement>();

const currentViewPort = ref<ViewPort>("desktop");
const hasScrolled = ref(false);

const topRef = ref<HTMLElement>();
const meRef = ref<HTMLElement>();
const expertiseRef = ref<HTMLElement>();
const projectsRef = ref<HTMLElement>();
const workRef = ref<HTMLElement>();
const contactRef = ref<HTMLElement>();

const fotballFeberRef = ref<HTMLElement>();
const cheffeloRef = ref<HTMLElement>();
const adtubeRef = ref<HTMLElement>();
const webtopRef = ref<HTMLElement>();

const githubInfo = ref<{
  stars: number;
  forks: number;
  watchers: number;
  lastUpdated: string;
}>({
  stars: 0,
  forks: 0,
  watchers: 0,
  lastUpdated: "",
});

fetch("https://api.github.com/repos/estubmo/eirikmo-portfolio")
  .then((response) => response.json())
  .then((json) => {
    const { stargazers_count, forks_count, watchers_count, updated_at } = json as {
      stargazers_count: number;
      forks_count: number;
      watchers_count: number;
      updated_at: string;
    };

    githubInfo.value = {
      stars: stargazers_count,
      forks: forks_count,
      watchers: watchers_count,
      lastUpdated: updated_at,
    };
  })
  .catch((e) => console.error(e));

const scrollRefs = [topRef, meRef, expertiseRef, projectsRef, workRef, contactRef];
const currentSegmentRef = ref<string>("top");

const rectAreaLightIntensity = ref(0);
const cameraRef = ref<PerspectiveCamera>();
const spotLightRef = ref<SpotLight>();
const spotLightTargetRef = ref<Mesh>();
const directionalLightRef = ref<DirectionalLight>();

const mousePositionRef = ref(new Vector3(2, -0.08, 1));
const mouseRotationRef = ref(new Euler(0, Math.PI, 0));

const deviceScreenRefs = {
  desktop: ref<Mesh>(),
  tablet: ref<Mesh>(),
  mobile: ref<Mesh>(),
};

const desktopOverlayRef = ref<MeshStandardMaterial>();
const tabletOverlayRef = ref<MeshStandardMaterial>();
const mobileOverlayRef = ref<MeshStandardMaterial>();

const screenTextureOpacityRef = ref(0);
const screenOverlayOpacityRef = ref(1);

type Segments = "top" | "me" | "expertise" | "projects" | "work" | "contact";

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

const fotballfeber = await useTexture({
  map: "/textures/projects/ff-repeat.jpg",
});

const standardMaterial = new MeshStandardMaterial({
  color: new Color(0xffffff),
  roughness: 0.4,
  metalness: 0.5,
});

const { width, height } = useWindowSize();
const { y: scrollY } = useWindowScroll();
const { x: mouseX, y: mouseY } = useMouse({
  type: "client",
  touch: false,
});

const { onLoop } = useRenderLoop();
const { progress: prog, hasFinishLoading } = await useProgress();

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

const gl = {
  clearColor: "#223d4a",
  physicallyCorrectLights: true,
  shadows: true,
  alpha: false,
  toneMappingExposure: 3,
  outputColorSpace: SRGBColorSpace,
  toneMapping: CineonToneMapping,
};

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

const eirikDesktopMaterial = new MeshBasicMaterial({
  transparent: true,
  map: eirikDesktop.map,
  alphaMap: alpha.map,
  aoMap: eirikDesktop.map,
  aoMapIntensity: 0.8,
});

const eirikTextureTablet = eirikDesktop.map.clone();
eirikTextureTablet.repeat.set(0.4, 1);

const eirikTabletTexture = new MeshBasicMaterial({
  transparent: true,
  map: eirikTextureTablet,
  alphaMap: alpha.map,
  aoMap: eirikTextureTablet,
  aoMapIntensity: 0.8,
});

const eirikTextureMobile = eirikDesktop.map.clone();
eirikTextureMobile.repeat.set(0.15, 0.6);
eirikTextureMobile.offset.set(0.15, 0.2);

const eirikMobileTexture = new MeshBasicMaterial({
  transparent: true,
  map: eirikTextureMobile,
  alphaMap: alpha.map,
  aoMap: eirikTextureMobile,
  aoMapIntensity: 0.8,
});

const fotballfeberMaterialDesktop = new MeshBasicMaterial({
  transparent: true,
  map: fotballfeber.map,
  aoMap: fotballfeber.map,
  aoMapIntensity: 1,
});

const fotballfeberTextureTablet = fotballfeber.map.clone();
fotballfeberTextureTablet.repeat.set(0.25, 0.5);
const fotballfeberMaterialTablet = new MeshBasicMaterial({
  transparent: true,
  map: fotballfeberTextureTablet,
  aoMap: fotballfeberTextureTablet,
  aoMapIntensity: 1,
});

const fotballfeberTextureMobile = fotballfeber.map.clone();
fotballfeberTextureMobile.repeat.set(0.13, 0.45);
fotballfeberTextureMobile.offset.set(0.131, 0.4);

const fotballfeberMaterialMobile = new MeshBasicMaterial({
  transparent: true,
  map: fotballfeberTextureMobile,
  aoMap: fotballfeberTextureMobile,
  aoMapIntensity: 1,
});

function updateHeight() {
  if (!canvasRef.value || topRef.value === undefined) return;
  canvasRef.value.height = topRef.value.offsetHeight;
}

watch(height, () => updateHeight());

onMounted(() => {
  const segment = new URL(window.location.href).hash.replace("#/", "").replace("#", "");
  if (segment) {
    scrollRefs.forEach((ref) => {
      if (ref.value?.id === segment) {
        currentSegmentRef.value = segment;
        if (hasFinishLoading) {
          setTimeout(() => {
            ref.value?.scrollIntoView({ behavior: "smooth" });
          }, 1000);
        }
      }
    });
  }
});

function updateViewPort() {
  const current = getViewPort();
  if (current !== currentViewPort.value) {
    currentViewPort.value = current;
  }
}

updateViewPort();

watch(width, updateViewPort);

function updateCamera(delta: number) {
  const cursor = {
    x: mouseX.value / width.value - 0.5,
    y: -(mouseY.value / height.value - 0.5),
  };

  const currentDevice = device[currentViewPort.value];
  if (!cameraRef.value || !expertiseRef.value || !meRef.value || !projectsRef.value || !topRef.value) return;
  // Defaults (ScrollY = 0 and has not scrolled yet)
  if (!hasScrolled.value && scrollY.value === 0) {
    // On load set the camera to the start position without damping
    cameraRef.value.position.set(currentDevice.start.x, currentDevice.start.y, currentDevice.start.z);
    cameraRef.value.rotation.set(currentDevice.startAngle.x, currentDevice.startAngle.y, currentDevice.startAngle.z);

    // On Scroll
  } else {
    const cameraPan = currentViewPort.value === "mobile" ? 0 : Math.sin(cursor.x) / 3; // Pan on everything but mobile

    if (scrollY.value < meRef.value.offsetTop) {
      const normal = normalize(scrollY.value, 0, meRef.value.offsetTop);
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
    } else if (scrollY.value < expertiseRef.value.offsetTop) {
      const normal = normalize(scrollY.value, meRef.value.offsetTop, expertiseRef.value.offsetTop);
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
      const normal = normalize(scrollY.value, expertiseRef.value.offsetTop, projectsRef.value.offsetTop);
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

  cameraRef.value.aspect = width.value / topRef.value.offsetHeight;
  cameraRef.value.updateProjectionMatrix();
}

const mouseParams: {
  x: number;
  z: number;
  rotation: number;
} = {
  x: 0,
  z: 0,
  rotation: Math.PI,
};

// These are used as temporary values before damping the actual values
const lightParams: {
  rectArea: {
    intensity: number;
  };
  directional: {
    intensity: number | null;
    color: number;
  };
  spot: {
    intensity: number;
    color: number;
  };
} = {
  rectArea: {
    intensity: 0,
  },
  directional: {
    intensity: null,
    color: 0x7dd3fc,
  },
  spot: {
    intensity: 0,
    color: 0xebc653,
  },
};

function updateObjects(delta: number) {
  if (
    !spotLightRef.value ||
    !directionalLightRef.value ||
    !desktopOverlayRef.value ||
    !meRef.value ||
    !topRef.value ||
    !expertiseRef.value ||
    !fotballFeberRef.value ||
    !cheffeloRef.value ||
    !adtubeRef.value ||
    !webtopRef.value ||
    !deviceScreenRefs.desktop.value ||
    !deviceScreenRefs.tablet.value ||
    !deviceScreenRefs.mobile.value ||
    !tabletOverlayRef.value ||
    !mobileOverlayRef.value
  )
    return;
  if (!hasScrolled.value && scrollY.value === 0) {
    // Default light values
    spotLightRef.value.intensity = 0;
    spotLightRef.value.color = new Color(0xebc653);
    directionalLightRef.value.intensity = 0.05;
    directionalLightRef.value.color = new Color(0x7dd3fc);

    // Default screen texture opacity
    eirikDesktopMaterial.opacity = 0;
    desktopOverlayRef.value.opacity = 1;
  } else {
    // Mouse Position
    damp(mouseParams, "x", (mouseX.value / width.value - 0.5) / 4, 0.25, delta);
    damp(mouseParams, "z", (mouseY.value / height.value - 0.5) / 4, 0.25, delta);
    mousePositionRef.value = new Vector3(mouseParams.x + 2, mousePositionRef.value.y, mouseParams.z + 0.5);

    // Mouse Rotation
    damp(mouseParams, "rotation", (Math.PI + (mouseX.value / width.value - 0.5) / 2) * -1, 0.25, delta);
    mouseRotationRef.value = new Euler(0, mouseParams.rotation, 0);

    // Sections
    const secondPart = {
      height: meRef.value.offsetHeight,
      start: meRef.value.offsetTop - topRef.value.offsetHeight / 2,
      end: meRef.value.offsetTop + meRef.value.offsetHeight,
    };

    const projectFotballFeber = {
      start: fotballFeberRef.value.offsetTop - topRef.value.offsetHeight / 2,
      end: fotballFeberRef.value.offsetTop + fotballFeberRef.value.offsetHeight,
    };

    const workCheffelo = {
      start: cheffeloRef.value.offsetTop - topRef.value.offsetHeight / 2,
      end: cheffeloRef.value.offsetTop + cheffeloRef.value.offsetHeight,
    };

    const workAdtube = {
      start: adtubeRef.value.offsetTop - topRef.value.offsetHeight / 2,
      end: adtubeRef.value.offsetTop + adtubeRef.value.offsetHeight,
    };

    const workWebtop = {
      start: webtopRef.value.offsetTop - topRef.value.offsetHeight / 2,
      end: webtopRef.value.offsetTop + webtopRef.value.offsetHeight,
    };

    // Scroll events
    if (scrollY.value < secondPart.start) {
      screenTextureOpacityRef.value = 0;
      screenOverlayOpacityRef.value = 1;
    } else if (scrollY.value > secondPart.start && scrollY.value < secondPart.end) {
      lightParams.directional.color = 0x7dd3fc;

      screenTextureOpacityRef.value = 1;
      screenOverlayOpacityRef.value = 0;

      if (currentViewPort.value === "desktop") {
        lightParams.rectArea.intensity = 0.05;
        deviceScreenRefs.desktop.value.material = eirikDesktopMaterial;
        deviceScreenRefs.tablet.value.material = standardMaterial;
        deviceScreenRefs.mobile.value.material = standardMaterial;
      } else if (currentViewPort.value === "tablet") {
        lightParams.rectArea.intensity = 0.01;
        deviceScreenRefs.desktop.value.material = standardMaterial;
        deviceScreenRefs.tablet.value.material = eirikTabletTexture;
        deviceScreenRefs.mobile.value.material = standardMaterial;
      } else if (currentViewPort.value === "mobile") {
        lightParams.rectArea.intensity = 0.01;
        deviceScreenRefs.desktop.value.material = standardMaterial;
        deviceScreenRefs.tablet.value.material = standardMaterial;
        deviceScreenRefs.mobile.value.material = eirikMobileTexture;
      }
    } else if (scrollY.value > secondPart.end && scrollY.value < projectFotballFeber.start) {
      lightParams.directional.color = 0x7dd3fc;
      lightParams.rectArea.intensity = 0.01;
      lightParams.directional.intensity = null;
      lightParams.spot.color = 0xebc653;

      screenTextureOpacityRef.value = 0;
      screenOverlayOpacityRef.value = 1;
    } else if (scrollY.value > projectFotballFeber.start && scrollY.value < projectFotballFeber.end) {
      lightParams.spot.color = 0x09fbeb;
      lightParams.rectArea.intensity = 0.05;

      screenTextureOpacityRef.value = 1;
      screenOverlayOpacityRef.value = 0.5;
      deviceScreenRefs.desktop.value.material = fotballfeberMaterialDesktop;
      deviceScreenRefs.tablet.value.material = fotballfeberMaterialTablet;
      deviceScreenRefs.mobile.value.material = fotballfeberMaterialMobile;
    } else if (scrollY.value > workCheffelo.start && scrollY.value < workCheffelo.end) {
      lightParams.spot.color = 0xe56962;
      lightParams.rectArea.intensity = 0.05;

      screenTextureOpacityRef.value = 1;
      screenOverlayOpacityRef.value = 0.5;
      deviceScreenRefs.desktop.value.material = standardMaterial;
      deviceScreenRefs.tablet.value.material = standardMaterial;
      deviceScreenRefs.mobile.value.material = standardMaterial;
    } else if (scrollY.value > workAdtube.start && scrollY.value < workAdtube.end) {
      lightParams.spot.color = 0x40c0c2;
      lightParams.rectArea.intensity = 0.05;

      screenTextureOpacityRef.value = 1;
      screenOverlayOpacityRef.value = 0.5;
      deviceScreenRefs.desktop.value.material = standardMaterial;
      deviceScreenRefs.tablet.value.material = standardMaterial;
      deviceScreenRefs.mobile.value.material = standardMaterial;
    } else if (scrollY.value > workWebtop.start && scrollY.value < workWebtop.end) {
      lightParams.spot.color = 0xff0000;
      lightParams.rectArea.intensity = 0.05;

      screenTextureOpacityRef.value = 1;
      screenOverlayOpacityRef.value = 0.5;
      deviceScreenRefs.desktop.value.material = standardMaterial;
      deviceScreenRefs.tablet.value.material = standardMaterial;
      deviceScreenRefs.mobile.value.material = standardMaterial;
    } else if (scrollY.value > workWebtop.end) {
      lightParams.directional.color = 0x7dd3fc;
      lightParams.rectArea.intensity = 0.01;
      lightParams.directional.intensity = null;
      lightParams.spot.color = 0xebc653;

      screenTextureOpacityRef.value = 0;
      screenOverlayOpacityRef.value = 1;
    }

    // Damping values
    const normalizedLightInterval = normalize(scrollY.value, 0, expertiseRef.value.offsetTop);

    damp(spotLightRef.value, "intensity", normalizedLightInterval * 2, 0.25, delta);
    const directionalLightIntesity = lightParams.directional.intensity
      ? lightParams.directional.intensity
      : normalizedLightInterval / 12 + 0.05;
    damp(directionalLightRef.value, "intensity", directionalLightIntesity, 0.25, delta);

    dampC(directionalLightRef.value.color, new Color(lightParams.directional.color), 0.5, delta);
    dampC(spotLightRef.value.color, new Color(lightParams.spot.color), 0.5, delta);
    damp(rectAreaLightIntensity, "value", lightParams.rectArea.intensity, 0.25, delta);

    damp(eirikDesktopMaterial, "opacity", screenTextureOpacityRef.value, 0.25, delta);
    damp(eirikTabletTexture, "opacity", screenTextureOpacityRef.value, 0.25, delta);
    damp(eirikMobileTexture, "opacity", screenTextureOpacityRef.value, 0.25, delta);
    damp(desktopOverlayRef.value, "opacity", screenOverlayOpacityRef.value, 0.25, delta);
    damp(tabletOverlayRef.value, "opacity", screenOverlayOpacityRef.value, 0.25, delta);
    damp(mobileOverlayRef.value, "opacity", screenOverlayOpacityRef.value, 0.25, delta);
  }
}

watch(scrollY, () => {
  if (!hasScrolled.value) {
    hasScrolled.value = scrollY.value > 0;
  }

  const currentScrollItemId = scrollRefs.find((ref) => {
    if (!ref.value || !topRef.value) return;
    return (
      scrollY.value > ref.value.offsetTop - topRef.value.offsetHeight / 2 &&
      scrollY.value < ref.value.offsetTop + ref.value.offsetHeight - topRef.value.offsetHeight / 2
    );
  })?.value?.id as Segments;
  if (currentScrollItemId) {
    currentSegmentRef.value = currentScrollItemId;
  }
});

onLoop(({ delta }) => {
  if (spotLightRef.value && spotLightTargetRef.value) {
    spotLightRef.value.target = spotLightTargetRef.value;
  }
  updateCamera(delta);
  updateObjects(delta);
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
extend({ CustomDesktop, CustomKeyboard, CustomLamp, CustomMobile, CustomMouse, CustomTablet });
</script>

<template>
  <!-- eslint-disable vue/attribute-hyphenation -->
  <CoolConsoleLog />
  <div class="flex justify-center relative">
    <div class="w-full relative px-2 text-zinc-200 max-w-screen-3xl">
      <div
        class="fixed top-0 right-0 3xl:right-1/2 3xl:translate-x-[958px] font-light h-screen flex flex-col justify-between select-none z-50"
      >
        <div class="flex flex-col space-y-0.5 gap-4 p-3 lg:px-5">
          <a href="#top" class="pl-1.5"
            ><div
              class="h-3 w-3 hover:bg-zinc-200 rounded-full transition-colors ease-in-out"
              :class="[currentSegmentRef === 'top' ? 'bg-zinc-100' : 'bg-zinc-400']"
          /></a>
          <a
            class="hover:text-zinc-200 transition-colors ease-in-out"
            style="writing-mode: vertical-rl; -webkit-writing-mode: vertical-rl"
            href="#me"
            :class="[currentSegmentRef === 'me' ? 'text-zinc-100' : 'text-zinc-400']"
            >Me</a
          >
          <a
            class="hover:text-zinc-200 transition-colors ease-in-out"
            style="writing-mode: vertical-rl; -webkit-writing-mode: vertical-rl"
            href="#expertise"
            :class="[currentSegmentRef === 'expertise' ? 'text-zinc-100' : 'text-zinc-400']"
            >Expertise</a
          >
          <a
            class="hover:text-zinc-200 transition-colors ease-in-out"
            style="writing-mode: vertical-rl; -webkit-writing-mode: vertical-rl"
            href="#projects"
            :class="[currentSegmentRef === 'projects' ? 'text-zinc-100' : 'text-zinc-400']"
            >Projects</a
          >
          <a
            class="hover:text-zinc-200 transition-colors ease-in-out"
            style="writing-mode: vertical-rl; -webkit-writing-mode: vertical-rl"
            href="#work"
            :class="[currentSegmentRef === 'work' ? 'text-zinc-100' : 'text-zinc-400']"
            >Work</a
          >
          <a
            class="hover:text-zinc-200 transition-colors ease-in-out"
            style="writing-mode: vertical-rl; -webkit-writing-mode: vertical-rl"
            href="#contact"
            :class="[currentSegmentRef === 'contact' ? 'text-zinc-100' : 'text-zinc-400']"
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
          <div class="mx-3 h-32 lg:h-40 w-[2px] shrink bg-zinc-400"></div>
        </div>
      </div>
      <SocialsComponent />
      <main class="flex flex-col pl-4 pr-8 md:px-12 lg:px-16 items-center">
        <section id="top" ref="topRef" class="min-h-screen container flex items-center">
          <HeaderComponent :hasFinishLoading="hasFinishLoading" />
        </section>
        <section id="me" ref="meRef" class="min-h-screen container flex items-center justify-end scroll-mt-12">
          <MeComponent />
        </section>

        <section
          id="expertise"
          ref="expertiseRef"
          class="min-h-screen container flex items-center w-full scroll-mt-12 my-12"
        >
          <ExpertiseComponent />
        </section>

        <section id="projects" ref="projectsRef" class="min-h-screen container flex items-center scroll-mt-12 my-12">
          <div class="flex flex-col gap-2">
            <h2 v-motion-slide-visible-once-left-custom class="text-4xl font-extrabold mb-4">Projects</h2>
            <div v-motion-slide-visible-once-left-custom class="gap-3 flex">
              <div class="h-3 w-16 bg-gradient-to-r from-green-300 to-green-400 rounded-sm" />
              <div class="h-3 w-11 bg-gradient-to-r from-blue-300 to-blue-400 rounded-sm" />
              <div class="h-3 w-3 bg-zinc-400 rounded-full" />
            </div>

            <div
              ref="fotballFeberRef"
              v-motion-fade-visible-once-custom
              class="md:pl-10 md:border-l border-gray-500 mt-4 mb-2 md:mt-8 md:mb-4 md:bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#223d4a]/80 via-[#223d4a]/10 to-transparent"
            >
              <FotballFeber :target="fotballFeberRef" />
            </div>
            <div v-motion-slide-visible-once-left-custom class="gap-3 flex">
              <div class="h-3 w-16 bg-gradient-to-r from-green-300 to-green-400 rounded-sm" />
              <div class="h-3 w-11 bg-gradient-to-r from-blue-300 to-blue-400 rounded-sm" />
              <div class="h-3 w-3 bg-zinc-400 rounded-full" />
            </div>
          </div>
        </section>

        <section id="work" ref="workRef" class="min-h-screen container flex items-center scroll-mt-12">
          <div class="flex flex-col gap-2">
            <h2 v-motion-slide-visible-once-left-custom class="text-4xl font-extrabold mb-4">Work</h2>
            <div v-motion-slide-visible-once-left-custom class="gap-3 flex">
              <div class="h-3 w-6 bg-gradient-to-r from-green-300 to-green-400 rounded-sm" />
              <div class="h-3 w-8 bg-gradient-to-r from-purple-300 to-purple-400 rounded-sm" />
              <div class="h-3 w-4 bg-gradient-to-r from-red-300 to-red-400 rounded-sm" />
            </div>

            <div
              ref="cheffeloRef"
              v-motion-fade-visible-once-custom
              class="md:pl-10 md:border-l border-gray-500 mt-4 mb-2 md:mt-8 md:mb-4 md:bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#223d4a]/80 via-[#223d4a]/10 to-transparent"
            >
              <CheffeloComponent />
            </div>

            <div v-motion-slide-visible-once-left-custom class="gap-3 flex mt-4">
              <div class="h-3 w-6 bg-gradient-to-r from-green-300 to-green-400 rounded-sm" />
              <div class="h-3 w-8 bg-gradient-to-r from-purple-300 to-purple-400 rounded-sm" />
              <div class="h-3 w-4 bg-gradient-to-r from-red-300 to-red-400 rounded-sm" />
            </div>

            <div
              ref="adtubeRef"
              v-motion-fade-visible-once-custom
              class="md:pl-10 md:border-l border-gray-500 mt-4 mb-2 md:mt-8 md:mb-4 md:bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#223d4a]/80 via-[#223d4a]/10 to-transparent"
            >
              <AdtubeComponent />
            </div>

            <div v-motion-slide-visible-once-left-custom class="gap-3 flex mt-4">
              <div class="h-3 w-6 bg-gradient-to-r from-green-300 to-green-400 rounded-sm" />
              <div class="h-3 w-8 bg-gradient-to-r from-purple-300 to-purple-400 rounded-sm" />
              <div class="h-3 w-4 bg-gradient-to-r from-red-300 to-red-400 rounded-sm" />
            </div>

            <div
              ref="webtopRef"
              v-motion-fade-visible-once-custom
              class="md:pl-10 md:border-l border-gray-500 mt-4 mb-2 md:mt-8 md:mb-4 md:bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#223d4a]/80 via-[#223d4a]/10 to-transparent"
            >
              <WebtopComponent />
            </div>

            <div v-motion-slide-visible-once-left-custom class="gap-3 flex mt-4">
              <div class="h-3 w-6 bg-gradient-to-r from-green-300 to-green-400 rounded-sm" />
              <div class="h-3 w-8 bg-gradient-to-r from-purple-300 to-purple-400 rounded-sm" />
              <div class="h-3 w-4 bg-gradient-to-r from-red-300 to-red-400 rounded-sm" />
            </div>
          </div>
        </section>

        <section id="contact" ref="contactRef" class="min-h-screen container flex items-center scroll-mt-12">
          <div class="flex flex-col p-4 max-w-xl gap-2">
            <h2 ref="target" v-motion-slide-visible-once-left-custom class="text-4xl font-extrabold mb-4">Contact</h2>
            <div v-motion-slide-visible-once-left-custom class="gap-3 flex">
              <div class="h-3 w-16 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-sm" />
              <div class="h-3 w-8 bg-gradient-to-r from-purple-300 to-purple-400 rounded-sm" />
              <div class="h-3 w-10 bg-gradient-to-r from-green-300 to-green-400 rounded-sm" />
            </div>
            <div v-motion-slide-visible-once-left-custom class="flex">
              <h3 class="text-4xl">Let’s Work Together</h3>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14 14L34 34"
                  stroke="#F9FAFB"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M34 14V34H14"
                  stroke="#F9FAFB"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <p v-motion-slide-visible-once-left-custom class="text - lg">
              I am currently open for interesting remote projects
            </p>
            <div v-motion-slide-visible-once-left-custom>
              <p>Call me:</p>
              <a class="hover:underline" href="tel:+4797602278">+47 976 02 278</a>
            </div>
            <div v-motion-slide-visible-once-left-custom>
              <p>Email me:</p>
              <a class="hover:underline" href="mailto:eirik@mowebdev.com">eirik@mowebdev.com</a>
            </div>
          </div>
        </section>
        <section id="footer" class="my-20 container flex justify-center items-center scroll-mt-12 text-center">
          <div class="flex flex-col p-4 max-w-xl gap-2 text-sm font-mono text-zinc-400">
            <div class="flex justify-center gap-3 items-center">
              <a
                href="https://github.com/estubmo/eirikmo-portfolio"
                target="_blank"
                class="flex gap-2 items-center hover:text-zinc-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-star"
                >
                  <polygon
                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                  />
                </svg>
                {{ githubInfo.stars }}
              </a>
              <a
                href="https://github.com/estubmo/eirikmo-portfolio"
                target="_blank"
                class="flex gap-2 items-center hover:text-zinc-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-git-fork"
                >
                  <circle cx="12" cy="18" r="3" />
                  <circle cx="6" cy="6" r="3" />
                  <circle cx="18" cy="6" r="3" />
                  <path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9" />
                  <path d="M12 12v3" />
                </svg>
                {{ githubInfo.forks }}
              </a>
            </div>
            <p>
              Designed and developed by
              <a class="hover:text-zinc-200 underline" href="https://github.com/estubmo" target="_blank">Eirik Mo</a>
            </p>

            <p>
              Powered by <a class="hover:text-zinc-200 underline" href="https://vuejs.org/" target="_blank">Astro</a>,
              <a class="hover:text-zinc-200 underline" href="https://astro.build/" target="_blank">Vue.js</a> and
              <a class="hover:text-zinc-200 underline" href="https://threejs.org/" target="_blank">Three.js</a>
            </p>
            <p>
              Hosted on <a class="hover:text-zinc-200 underline" href="https://vercel.com/" target="_blank">Vercel</a>
            </p>
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
  <!-- <CustomLeche />   -->

  <TresCanvas v-bind="gl" id="canvas" ref="canvasRef" class="-z-30" :style="canvasStyle">
    <CustomStatsGl />
    <!-- Camera -->
    <TresPerspectiveCamera ref="cameraRef" :position="[0, 1, 0]" :near="0.1" :far="80" :fov="70" />

    <!-- Backdrop -->
    <TresMesh cast-shadow receive-shadow :scale="[200, 60, 60]" :position="[0, -0.1, -40]">
      <Backdrop :floor="1" :segments="20" cast-shadow receive-shadow>
        <TresMeshStandardMaterial :color="new Color(0xffffff)" :roughness="0.3" :metalness="0.3" />
      </Backdrop>
    </TresMesh>

    <FixPixelRatio :height="topRef" />

    <Suspense>
      <CustomDesktop :position="new Vector3(0, 0.15, -1)" />
    </Suspense>

    <TresMesh :ref="deviceScreenRefs.desktop" cast-shadow receive-shadow :position="[0, 1.6, -1.232]">
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
      :intensity="rectAreaLightIntensity"
      :width="3.75"
      :rotation="[0, Math.PI, 0]"
      :height="1.89"
      :color="new Color(0x7dd3fc)"
      :position="[0, 1, -1.2]"
    />

    <TresMesh ref="spotLightTargetRef" cast-shadow receive-shadow :position="[2.8, 0, -0.34]" />

    <TresSpotLight
      ref="spotLightRef"
      :distance="12"
      :position="[3.15, 2.05, -0.64]"
      :penumbra="0.5"
      :shadow-mapSize-width="2048"
      :shadow-mapSize-height="2048"
      cast-shadow
      :shadow-radius="1"
    />

    <TresDirectionalLight ref="directionalLightRef" :position="[2, 4, 5]" />
  </TresCanvas>
</template>

<style>
.floating {
  transform: perspective(1500px) rotateY(-25deg) rotateX(0) rotateZ(5deg) scale(0.75);
  border-radius: 0.25rem;
  transition: transform 1s ease 0s;

  &:hover {
    transform: perspective(3000px) rotateY(-5deg) rotateX(0) rotateZ(0deg) scale(0.75);
  }
}
</style>
