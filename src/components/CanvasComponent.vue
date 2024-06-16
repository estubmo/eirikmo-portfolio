<script setup lang="ts">
import { Backdrop, useProgress } from "@tresjs/cientos";
import { TresCanvas, useRenderLoop, useTexture } from "@tresjs/core";
import { useMouse, useWindowSize } from "@vueuse/core";
import CustomDesktop from "~/components/CustomDesktop.vue";
import CustomKeyboard from "~/components/CustomKeyboard.vue";
import CustomLamp from "~/components/CustomLamp.vue";
import CustomMobile from "~/components/CustomMobile.vue";
import CustomMouse from "~/components/CustomMouse.vue";
import CustomTablet from "~/components/CustomTablet.vue";
import FixPixelRatio from "~/components/FixPixelRatio.vue";
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
    RepeatWrapping,
    SpotLight,
    SRGBColorSpace,
    Vector3,
} from "three";
import type { Ref } from "vue";
import { reactive, ref, toRefs, watch } from "vue";
import { device } from "../constants/deviceVectors";
import { normalize } from "../utils/normalize";
import CustomStatsGl from "./CustomStatsGl.vue";

type ViewPort = "desktop" | "tablet" | "mobile";

const canvasRef = ref<HTMLCanvasElement>();

const currentViewPort = ref<ViewPort>("desktop");
const hasScrolled = ref(false);

const props = defineProps<{
    meOffsetTop: number;
    meOffsetHeight: number;
    expertiseOffsetTop: number;
    projectsOffsetTop: number;
    topOffsetHeight: number;
    expertiseOffsetHeight: number;
    fotballFeberOffsetHeight: number;
    svanhildStubOffsetHeight: number;
    cheffeloOffsetHeight: number;
    adtubeOffsetHeight: number;
    webtopOffsetHeight: number;
    fotballFeberOffsetTop: number;
    svanhildStubOffsetTop: number;
    cheffeloOffsetTop: number;
    adtubeOffsetTop: number;
    webtopOffsetTop: number;
    isModalOpen: boolean;
    scrollY: number;
    hoverTarget: string;
    isExperienceModalOpen: {
        fotballfeber: boolean;
        svanhildstub: boolean;
        cheffelo: boolean;
        adtube: boolean;
        webtop: boolean;
    };
    scrollRefs: Array<Ref>;
    currentSegment: string;
}>();

const {
    meOffsetTop,
    meOffsetHeight,
    expertiseOffsetTop,
    projectsOffsetTop,
    topOffsetHeight,
    isModalOpen,
    expertiseOffsetHeight,
    fotballFeberOffsetHeight,
    svanhildStubOffsetHeight,
    cheffeloOffsetHeight,
    adtubeOffsetHeight,
    webtopOffsetHeight,
    fotballFeberOffsetTop,
    svanhildStubOffsetTop,
    cheffeloOffsetTop,
    adtubeOffsetTop,
    webtopOffsetTop,
    scrollY,
    hoverTarget,
    isExperienceModalOpen,
    scrollRefs,
    currentSegment,
} = toRefs(props);

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

type PageSegment = "top" | "me" | "expertise" | "projects" | "work" | "contact";
type ModalSegment = "fotballfeber" | "svanhildstub" | "cheffelo" | "adtube" | "webtop";

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

const param = {
    positionSmoothing: 0.3,
    lookAtSmoothing: 0.3,
};

const alpha = await useTexture({
    map: "/textures/eirik/alpha.jpg",
});

const eirikTexture = await useTexture({
    map: "/textures/eirik/eirik.webp",
});

const fotballfeberTexture = await useTexture({
    map: "/textures/projects/ff-repeat.jpg",
});

const svanhildStubTexture = await useTexture({
    map: "/textures/projects/ss-repeat.jpg",
});

const adtubeTexture = await useTexture({
    map: "/textures/work/adtube/adtube-repeat.jpg",
});

const cheffeloTexture = await useTexture({
    map: "/textures/work/cheffelo/cheffelo-repeat.jpg",
});

const webtopTexture = await useTexture({
    map: "/textures/work/webtop/webtop-repeat.jpg",
});

const standardMaterial = new MeshStandardMaterial({
    color: new Color(0xffffff),
    roughness: 0.4,
    metalness: 0.5,
});
const { onLoop } = useRenderLoop();
const { progress: prog, hasFinishLoading } = await useProgress();
const emit = defineEmits(["updateProgress", "hasFinishedLoading", "updateCurrentSegment"]);

watch(prog, (val) => {
    emit("updateProgress", val);
});
watch(hasFinishLoading, (val) => {
    if (val) {
        emit("hasFinishedLoading");
    }
});

const { width, height } = useWindowSize();
const { x: mouseX, y: mouseY } = useMouse({
    type: "client",
    touch: false,
});

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
    map: eirikTexture.map,
    alphaMap: alpha.map,
    aoMap: eirikTexture.map,
    aoMapIntensity: 0.8,
});

const eirikTextureTablet = eirikTexture.map.clone();
eirikTextureTablet.repeat.set(0.4, 1);

const eirikTabletTexture = new MeshBasicMaterial({
    transparent: true,
    map: eirikTextureTablet,
    alphaMap: alpha.map,
    aoMap: eirikTextureTablet,
    aoMapIntensity: 0.8,
});

const eirikTextureMobile = eirikTexture.map.clone();
eirikTextureMobile.repeat.set(0.15, 0.6);
eirikTextureMobile.offset.set(0.15, 0.2);

const eirikMobileTexture = new MeshBasicMaterial({
    transparent: true,
    map: eirikTextureMobile,
    alphaMap: alpha.map,
    aoMap: eirikTextureMobile,
    aoMapIntensity: 0.8,
});

const fotballfeberTextureDesktop = fotballfeberTexture.map.clone();
fotballfeberTextureDesktop.repeat.set(6, 3.375);
fotballfeberTextureDesktop.offset.set(0, 0.1);
fotballfeberTextureDesktop.wrapS = RepeatWrapping;
fotballfeberTextureDesktop.wrapT = RepeatWrapping;

const fotballfeberMaterialDesktop = new MeshBasicMaterial({
    transparent: true,
    map: fotballfeberTextureDesktop,
    aoMap: fotballfeberTextureDesktop,
    aoMapIntensity: 1,
});

const fotballfeberTextureTablet = fotballfeberTexture.map.clone();
fotballfeberTextureTablet.repeat.set(1, 1.2);
fotballfeberTextureTablet.offset.set(0, -0.1);
const fotballfeberMaterialTablet = new MeshBasicMaterial({
    transparent: true,
    map: fotballfeberTextureTablet,
    aoMap: fotballfeberTextureTablet,
    aoMapIntensity: 1,
});

const fotballfeberTextureMobile = fotballfeberTexture.map.clone();
fotballfeberTextureMobile.repeat.set(0.5, 0.7);
fotballfeberTextureMobile.offset.set(0, 0.4);

const fotballfeberMaterialMobile = new MeshBasicMaterial({
    transparent: true,
    map: fotballfeberTextureMobile,
    aoMap: fotballfeberTextureMobile,
    aoMapIntensity: 1,
});

const svanhildStubTextureDesktop = svanhildStubTexture.map.clone();
svanhildStubTextureDesktop.repeat.set(6, 3.375);
svanhildStubTextureDesktop.offset.set(0, 0.1);
svanhildStubTextureDesktop.wrapS = RepeatWrapping;
svanhildStubTextureDesktop.wrapT = RepeatWrapping;

const svanhildStubMaterialDesktop = new MeshBasicMaterial({
    transparent: true,
    map: svanhildStubTextureDesktop,
    aoMap: svanhildStubTextureDesktop,
    aoMapIntensity: 1,
});

const svanhildStubTextureTablet = svanhildStubTexture.map.clone();
svanhildStubTextureTablet.repeat.set(1, 1.2);
svanhildStubTextureTablet.offset.set(0, -0.1);
const svanhildStubMaterialTablet = new MeshBasicMaterial({
    transparent: true,
    map: svanhildStubTextureTablet,
    aoMap: svanhildStubTextureTablet,
    aoMapIntensity: 1,
});

const svanhildStubTextureMobile = svanhildStubTexture.map.clone();
svanhildStubTextureMobile.repeat.set(0.5, 0.7);
svanhildStubTextureMobile.offset.set(0, 0.4);

const svanhildStubMaterialMobile = new MeshBasicMaterial({
    transparent: true,
    map: svanhildStubTextureMobile,
    aoMap: svanhildStubTextureMobile,
    aoMapIntensity: 1,
});

const adtubeTextureDesktop = adtubeTexture.map.clone();
adtubeTextureDesktop.repeat.set(6, 3.375);
adtubeTextureDesktop.offset.set(0, 0.1);
adtubeTextureDesktop.wrapS = RepeatWrapping;
adtubeTextureDesktop.wrapT = RepeatWrapping;

const adtubeMaterialDesktop = new MeshBasicMaterial({
    transparent: true,
    map: adtubeTextureDesktop,
    aoMap: adtubeTextureDesktop,
    aoMapIntensity: 1,
});

const adtubeTextureTablet = adtubeTexture.map.clone();
adtubeTextureTablet.repeat.set(1, 1.2);
adtubeTextureTablet.offset.set(0, -0.1);
const adtubeMaterialTablet = new MeshBasicMaterial({
    transparent: true,
    map: adtubeTextureTablet,
    aoMap: adtubeTextureTablet,
    aoMapIntensity: 1,
});

const adtubeTextureMobile = adtubeTexture.map.clone();
adtubeTextureMobile.repeat.set(0.5, 0.7);
adtubeTextureMobile.offset.set(0, 0.4);

const adtubeMaterialMobile = new MeshBasicMaterial({
    transparent: true,
    map: adtubeTextureMobile,
    aoMap: adtubeTextureMobile,
    aoMapIntensity: 1,
});

const cheffeloTextureDesktop = cheffeloTexture.map.clone();
cheffeloTextureDesktop.repeat.set(6, 3.375);
cheffeloTextureDesktop.offset.set(0, 0.1);
cheffeloTextureDesktop.wrapS = RepeatWrapping;
cheffeloTextureDesktop.wrapT = RepeatWrapping;

const cheffeloMaterialDesktop = new MeshBasicMaterial({
    transparent: true,
    map: cheffeloTextureDesktop,
    aoMap: cheffeloTextureDesktop,
    aoMapIntensity: 1,
});

const cheffeloTextureTablet = cheffeloTexture.map.clone();
cheffeloTextureTablet.repeat.set(1, 1.2);
cheffeloTextureTablet.offset.set(0, -0.1);
const cheffeloMaterialTablet = new MeshBasicMaterial({
    transparent: true,
    map: cheffeloTextureTablet,
    aoMap: cheffeloTextureTablet,
    aoMapIntensity: 1,
});

const cheffeloTextureMobile = cheffeloTexture.map.clone();
cheffeloTextureMobile.repeat.set(0.5, 0.7);
cheffeloTextureMobile.offset.set(0, 0.4);

const cheffeloMaterialMobile = new MeshBasicMaterial({
    transparent: true,
    map: cheffeloTextureMobile,
    aoMap: cheffeloTextureMobile,
    aoMapIntensity: 1,
});

const webtopTextureDesktop = webtopTexture.map.clone();
webtopTextureDesktop.repeat.set(6, 3.375);
webtopTextureDesktop.offset.set(0, 0.1);
webtopTextureDesktop.wrapS = RepeatWrapping;
webtopTextureDesktop.wrapT = RepeatWrapping;

const webtopMaterialDesktop = new MeshBasicMaterial({
    transparent: true,
    map: webtopTextureDesktop,
    aoMap: webtopTextureDesktop,
    aoMapIntensity: 1,
});

const webtopTextureTablet = webtopTexture.map.clone();
webtopTextureTablet.repeat.set(1, 1.2);
webtopTextureTablet.offset.set(0, -0.1);
const webtopMaterialTablet = new MeshBasicMaterial({
    transparent: true,
    map: webtopTextureTablet,
    aoMap: webtopTextureTablet,
    aoMapIntensity: 1,
});

const webtopTextureMobile = webtopTexture.map.clone();
webtopTextureMobile.repeat.set(0.5, 0.7);
webtopTextureMobile.offset.set(0, 0.4);

const webtopMaterialMobile = new MeshBasicMaterial({
    transparent: true,
    map: webtopTextureMobile,
    aoMap: webtopTextureMobile,
    aoMapIntensity: 1,
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
    if (
        !cameraRef.value ||
        !expertiseOffsetTop.value ||
        !meOffsetTop.value ||
        !projectsOffsetTop.value ||
        !topOffsetHeight.value
    )
        return;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access

    // Defaults (ScrollY.value = 0 and has not scrolled yet)
    if (!hasScrolled.value && scrollY.value === 0) {
        // On load set the camera to the start position without damping
        cameraRef.value.position.set(currentDevice.start.x, currentDevice.start.y, currentDevice.start.z);
        cameraRef.value.rotation.set(
            currentDevice.startAngle.x,
            currentDevice.startAngle.y,
            currentDevice.startAngle.z,
        );

        // On Scroll
    } else {
        const cameraPan = currentViewPort.value === "mobile" ? 0 : Math.sin(cursor.x) / 3; // Pan on everything but mobile

        if (isModalOpen.value) {
            damp3(
                cameraRef.value.position,
                [currentDevice.zoom.x, currentDevice.zoom.y, currentDevice.zoom.z],
                param.positionSmoothing,
                delta,
            );

            dampE(
                cameraRef.value.rotation,
                [currentDevice.zoomAngle.x, currentDevice.zoomAngle.y, currentDevice.zoomAngle.z],
                param.lookAtSmoothing,
                delta,
            );
            return;
        }

        if (scrollY.value < meOffsetTop.value) {
            const normal = normalize(scrollY.value, 0, meOffsetTop.value);
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
        } else if (scrollY.value < expertiseOffsetTop.value) {
            const normal = normalize(scrollY.value, meOffsetTop.value, expertiseOffsetTop.value);
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
            const normal = normalize(scrollY.value, expertiseOffsetTop.value, projectsOffsetTop.value);
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

    cameraRef.value.aspect = width.value / topOffsetHeight.value;
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

const setDefaultParams = () => {
    lightParams.directional.color = 0x7dd3fc;
    lightParams.rectArea.intensity = 0.01;
    lightParams.directional.intensity = null;
    lightParams.spot.color = 0xebc653;

    screenTextureOpacityRef.value = 0;
    screenOverlayOpacityRef.value = 1;
};

const setFotballFeberParams = () => {
    lightParams.spot.color = 0x09fbeb;

    screenTextureOpacityRef.value = 1;
    screenOverlayOpacityRef.value = 0.5;
    if (!deviceScreenRefs.desktop.value || !deviceScreenRefs.tablet.value || !deviceScreenRefs.mobile.value) return;
    deviceScreenRefs.desktop.value.material = fotballfeberMaterialDesktop;
    deviceScreenRefs.tablet.value.material = fotballfeberMaterialTablet;
    deviceScreenRefs.mobile.value.material = fotballfeberMaterialMobile;
};

const setSvanhildStubParams = () => {
    lightParams.spot.color = 0xd4c76c;
    screenTextureOpacityRef.value = 1;
    screenOverlayOpacityRef.value = 0.5;
    if (!deviceScreenRefs.desktop.value || !deviceScreenRefs.tablet.value || !deviceScreenRefs.mobile.value) return;
    deviceScreenRefs.desktop.value.material = svanhildStubMaterialDesktop;
    deviceScreenRefs.tablet.value.material = svanhildStubMaterialTablet;
    deviceScreenRefs.mobile.value.material = svanhildStubMaterialMobile;
};

const setCheffeloParams = () => {
    lightParams.spot.color = 0xe56962;
    screenTextureOpacityRef.value = 1;
    screenOverlayOpacityRef.value = 0.5;
    if (!deviceScreenRefs.desktop.value || !deviceScreenRefs.tablet.value || !deviceScreenRefs.mobile.value) return;
    deviceScreenRefs.desktop.value.material = cheffeloMaterialDesktop;
    deviceScreenRefs.tablet.value.material = cheffeloMaterialTablet;
    deviceScreenRefs.mobile.value.material = cheffeloMaterialMobile;
};

const setAdtubeParams = () => {
    lightParams.spot.color = 0x40c0c2;
    screenTextureOpacityRef.value = 1;
    screenOverlayOpacityRef.value = 0.5;
    if (!deviceScreenRefs.desktop.value || !deviceScreenRefs.tablet.value || !deviceScreenRefs.mobile.value) return;
    deviceScreenRefs.desktop.value.material = adtubeMaterialDesktop;
    deviceScreenRefs.tablet.value.material = adtubeMaterialTablet;
    deviceScreenRefs.mobile.value.material = adtubeMaterialMobile;
};

const setWebtopParams = () => {
    lightParams.spot.color = 0xff0000;
    screenTextureOpacityRef.value = 1;
    screenOverlayOpacityRef.value = 0.5;
    if (!deviceScreenRefs.desktop.value || !deviceScreenRefs.tablet.value || !deviceScreenRefs.mobile.value) return;
    deviceScreenRefs.desktop.value.material = webtopMaterialDesktop;
    deviceScreenRefs.tablet.value.material = webtopMaterialTablet;
    deviceScreenRefs.mobile.value.material = webtopMaterialMobile;
};
function updateObjects(delta: number) {
    if (
        !spotLightRef.value ||
        !directionalLightRef.value ||
        !desktopOverlayRef.value ||
        !meOffsetTop.value ||
        !meOffsetHeight.value ||
        !topOffsetHeight.value ||
        !expertiseOffsetHeight.value ||
        !fotballFeberOffsetHeight.value ||
        !svanhildStubOffsetHeight.value ||
        !cheffeloOffsetHeight.value ||
        !adtubeOffsetHeight.value ||
        !webtopOffsetHeight.value ||
        !deviceScreenRefs.desktop.value ||
        !deviceScreenRefs.tablet.value ||
        !deviceScreenRefs.mobile.value ||
        !tabletOverlayRef.value ||
        !mobileOverlayRef.value
    )
        return;

    const currentScrollItemId = scrollRefs.value.find((ref) => {
        if (!ref.value || !topOffsetHeight.value) return;
        return (
            scrollY.value > ref.value.offsetTop - topOffsetHeight.value / 2 &&
            scrollY.value < ref.value.offsetTop + ref.value.offsetHeight - topOffsetHeight.value / 2
        );
    })?.value?.id as PageSegment & ModalSegment;

    if (currentScrollItemId) {
        if (currentScrollItemId !== currentSegment.value) {
            emit("updateCurrentSegment", currentScrollItemId);
        }
    }

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
        damp(mouseParams, "x", (mouseX.value / width.value - 0.5) / 4, 0.1, delta);
        damp(mouseParams, "z", (mouseY.value / height.value - 0.5) / 4, 0.1, delta);
        mousePositionRef.value = new Vector3(mouseParams.x + 2, mousePositionRef.value.y, mouseParams.z + 0.5);

        // Mouse Rotation
        damp(mouseParams, "rotation", (Math.PI + (mouseX.value / width.value - 0.5) / 2) * -1, 0.1, delta);
        mouseRotationRef.value = new Euler(0, mouseParams.rotation, 0);

        // Sections
        const secondPart = {
            height: meOffsetHeight.value,
            start: meOffsetTop.value - topOffsetHeight.value / 2,
            end: meOffsetTop.value + meOffsetHeight.value,
        };

        const projectFotballFeber = {
            start: fotballFeberOffsetTop.value - topOffsetHeight.value / 2,
            end: fotballFeberOffsetTop.value + fotballFeberOffsetHeight.value / 2,
        };

        const projectSvanhildStub = {
            start: svanhildStubOffsetTop.value - topOffsetHeight.value / 2,
            end: svanhildStubOffsetTop.value + svanhildStubOffsetHeight.value / 2,
        };

        const workCheffelo = {
            start: cheffeloOffsetTop.value - topOffsetHeight.value / 2,
            end: cheffeloOffsetTop.value + cheffeloOffsetHeight.value / 2,
        };

        const workAdtube = {
            start: adtubeOffsetTop.value - topOffsetHeight.value / 2,
            end: adtubeOffsetTop.value + adtubeOffsetHeight.value / 2,
        };

        const workWebtop = {
            start: webtopOffsetTop.value - topOffsetHeight.value / 2,
            end: webtopOffsetTop.value + webtopOffsetHeight.value / 2,
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
        } else {
            // Hover and modal events

            if (hoverTarget.value === "" && !isModalOpen.value && currentViewPort.value === "desktop") {
                setDefaultParams();
            } else if (hoverTarget.value === "fotballfeber" || isExperienceModalOpen.value.fotballfeber) {
                setFotballFeberParams();
            } else if (hoverTarget.value === "svanhildstub" || isExperienceModalOpen.value.svanhildstub) {
                setSvanhildStubParams();
            } else if (hoverTarget.value === "cheffelo" || isExperienceModalOpen.value.cheffelo) {
                setCheffeloParams();
            } else if (hoverTarget.value === "adtube" || isExperienceModalOpen.value.adtube) {
                setAdtubeParams();
            } else if (hoverTarget.value === "webtop" || isExperienceModalOpen.value.webtop) {
                setWebtopParams();
            } else if (
                currentViewPort.value !== "desktop" &&
                scrollY.value > projectFotballFeber.start &&
                scrollY.value < projectFotballFeber.end
            ) {
                setFotballFeberParams();
            } else if (
                currentViewPort.value !== "desktop" &&
                scrollY.value > projectSvanhildStub.start &&
                scrollY.value < projectSvanhildStub.end
            ) {
                setSvanhildStubParams();
            } else if (
                currentViewPort.value !== "desktop" &&
                scrollY.value > workCheffelo.start &&
                scrollY.value < workCheffelo.end
            ) {
                setCheffeloParams();
            } else if (
                currentViewPort.value !== "desktop" &&
                scrollY.value > workAdtube.start &&
                scrollY.value < workAdtube.end
            ) {
                setAdtubeParams();
            } else if (
                currentViewPort.value !== "desktop" &&
                scrollY.value > workWebtop.start &&
                scrollY.value < workWebtop.end
            ) {
                setWebtopParams();
            } else {
                setDefaultParams();
            }
        }

        // Damping values
        const normalizedLightInterval = normalize(scrollY.value, 0, expertiseOffsetTop.value);

        damp(spotLightRef.value, "intensity", normalizedLightInterval * 2, 0.2, delta);
        const directionalLightIntesity = lightParams.directional.intensity
            ? lightParams.directional.intensity
            : normalizedLightInterval / 12 + 0.05;
        damp(directionalLightRef.value, "intensity", directionalLightIntesity, 0.2, delta);

        dampC(directionalLightRef.value.color, new Color(lightParams.directional.color), 0.5, delta);
        dampC(spotLightRef.value.color, new Color(lightParams.spot.color), 0.5, delta);
        damp(rectAreaLightIntensity, "value", lightParams.rectArea.intensity, 0.2, delta);

        damp(eirikDesktopMaterial, "opacity", screenTextureOpacityRef.value, 0.2, delta);
        damp(eirikTabletTexture, "opacity", screenTextureOpacityRef.value, 0.2, delta);
        damp(eirikMobileTexture, "opacity", screenTextureOpacityRef.value, 0.2, delta);
        damp(desktopOverlayRef.value, "opacity", screenOverlayOpacityRef.value, 0.2, delta);
        damp(tabletOverlayRef.value, "opacity", screenOverlayOpacityRef.value, 0.2, delta);
        damp(mobileOverlayRef.value, "opacity", screenOverlayOpacityRef.value, 0.2, delta);
    }
}

onLoop(({ delta }) => {
    if (spotLightRef.value && spotLightTargetRef.value) {
        spotLightRef.value.target = spotLightTargetRef.value;
    }

    if (!hasScrolled.value) {
        hasScrolled.value = scrollY.value > 0;
    }

    updateCamera(delta);
    updateObjects(delta);
});
</script>

<template>
    <TresCanvas v-bind="gl" id="canvas" ref="canvasRef" class="-z-30" :style="canvasStyle">
        <CustomStatsGl />

        <!-- Camera -->
        <TresPerspectiveCamera ref="cameraRef" :position="[0, 1, 0]" :near="0.1" :far="80" :fov="70" />

        <FixPixelRatio :height="topOffsetHeight" />

        <!-- Backdrop -->
        <TresMesh cast-shadow receive-shadow :scale="[200, 60, 60]" :position="[0, -0.1, -40]">
            <Backdrop :floor="1" :segments="20" cast-shadow receive-shadow>
                <TresMeshStandardMaterial :color="new Color(0xffffff)" :roughness="0.3" :metalness="0.3" />
            </Backdrop>
        </TresMesh>

        <!-- Desktop -->
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
        <TresMesh
            cast-shadow
            receive-shadow
            :position="[-0.24, 0.019, -0.31]"
            :rotation="new Euler(-Math.PI / 2, 0, 0)"
        >
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

        <!-- eslint-disable vue/attribute-hyphenation -->
        <TresSpotLight
            ref="spotLightRef"
            :distance="12"
            :position="[3.15, 2.05, -0.64]"
            :penumbra="0.5"
            :decay="1"
            :shadow-mapSize-width="2048"
            :shadow-mapSize-height="2048"
            cast-shadow
            :shadow-radius="1"
        />

        <TresDirectionalLight ref="directionalLightRef" :position="[2, 4, 5]" />
    </TresCanvas>
</template>
