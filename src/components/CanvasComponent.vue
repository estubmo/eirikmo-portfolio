<script setup lang="ts">
import { Backdrop } from "@tresjs/cientos";
import { TresCanvas } from "@tresjs/core";
import { useMouse, useWindowSize } from "@vueuse/core";
import CustomDesktop from "~/components/CustomDesktop.vue";
import CustomKeyboard from "~/components/CustomKeyboard.vue";
import CustomLamp from "~/components/CustomLamp.vue";
import CustomMobile from "~/components/CustomMobile.vue";
import CustomMouse from "~/components/CustomMouse.vue";
import CustomTablet from "~/components/CustomTablet.vue";
import FixPixelRatio from "~/components/FixPixelRatio.vue";
import { damp, damp3, dampC, dampE } from "maath/easing";
import type { DirectionalLight, Mesh, PerspectiveCamera, SpotLight, Texture } from "three";
import {
    CineonToneMapping,
    Color,
    Euler,
    MathUtils,
    MeshBasicMaterial,
    MeshStandardMaterial,
    RepeatWrapping,
    SRGBColorSpace,
    TextureLoader,
    Vector3,
} from "three";
import type { Ref } from "vue";
import { computed, reactive, ref, shallowRef, toRefs, watch } from "vue";
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
    duckyOffsetHeight: number;
    knitryOffsetHeight: number;
    signatureApiOffsetHeight: number;
    cheffeloOffsetHeight: number;
    adtubeOffsetHeight: number;
    webtopOffsetHeight: number;
    fotballFeberOffsetTop: number;
    svanhildStubOffsetTop: number;
    duckyOffsetTop: number;
    knitryOffsetTop: number;
    signatureApiOffsetTop: number;
    cheffeloOffsetTop: number;
    adtubeOffsetTop: number;
    webtopOffsetTop: number;
    isModalOpen: boolean;
    scrollY: number;
    hoverTarget: string;
    isExperienceModalOpen: {
        fotballfeber: boolean;
        svanhildstub: boolean;
        ducky: boolean;
        knitry: boolean;
        signatureApi: boolean;
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
    duckyOffsetHeight,
    knitryOffsetHeight,
    signatureApiOffsetHeight,
    cheffeloOffsetHeight,
    adtubeOffsetHeight,
    webtopOffsetHeight,
    fotballFeberOffsetTop,
    svanhildStubOffsetTop,
    duckyOffsetTop,
    knitryOffsetTop,
    signatureApiOffsetTop,
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
type ModalSegment =
    | "fotballfeber"
    | "svanhildstub"
    | "ducky"
    | "knitry"
    | "signatureApi"
    | "cheffelo"
    | "adtube"
    | "webtop";

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
    positionSmoothing: 0.15,
    lookAtSmoothing: 0.15,
};

// Load textures using Three.js TextureLoader
const textureLoader = new TextureLoader();
const alphaTextureState = shallowRef<Texture | null>(null);
const eirikTextureState = shallowRef<Texture | null>(null);
const fotballfeberTextureState = shallowRef<Texture | null>(null);
const svanhildStubTextureState = shallowRef<Texture | null>(null);
const duckyTextureState = shallowRef<Texture | null>(null);
const knitryTextureState = shallowRef<Texture | null>(null);
const signatureApiTextureState = shallowRef<Texture | null>(null);
const cheffeloTextureState = shallowRef<Texture | null>(null);
const adtubeTextureState = shallowRef<Texture | null>(null);
const webtopTextureState = shallowRef<Texture | null>(null);

const loadingProgress = ref(0);
const totalTextures = 7;
let loadedCount = 0;

const onTextureLoaded = () => {
    loadedCount++;
    loadingProgress.value = (loadedCount / totalTextures) * 100;
    if (loadedCount === totalTextures) {
        emit("hasFinishedLoading");
    }
    emit("updateProgress", loadingProgress.value);
};

// Load all textures
textureLoader.load("/textures/eirik/alpha.jpg", (texture) => {
    alphaTextureState.value = texture;
    onTextureLoaded();
});
textureLoader.load("/textures/eirik/eirik.webp", (texture) => {
    eirikTextureState.value = texture;
    onTextureLoaded();
});
textureLoader.load("/textures/projects/ff-repeat.jpg", (texture) => {
    fotballfeberTextureState.value = texture;
    onTextureLoaded();
});
textureLoader.load("/textures/projects/ss-repeat.jpg", (texture) => {
    svanhildStubTextureState.value = texture;
    onTextureLoaded();
});
textureLoader.load("/textures/work/ducky/ducky-repeat.jpg", (texture) => {
    duckyTextureState.value = texture;
    onTextureLoaded();
});
textureLoader.load("/textures/work/knitry/knitry-repeat.jpg", (texture) => {
    knitryTextureState.value = texture;
    onTextureLoaded();
});
textureLoader.load("/textures/work/signatureapi/signatureapi-repeat.jpg", (texture) => {
    signatureApiTextureState.value = texture;
    onTextureLoaded();
});
textureLoader.load("/textures/work/adtube/adtube-repeat.jpg", (texture) => {
    adtubeTextureState.value = texture;
    onTextureLoaded();
});
textureLoader.load("/textures/work/cheffelo/cheffelo-repeat.jpg", (texture) => {
    cheffeloTextureState.value = texture;
    onTextureLoaded();
});
textureLoader.load("/textures/work/webtop/webtop-repeat.jpg", (texture) => {
    webtopTextureState.value = texture;
    onTextureLoaded();
});

// Check if all textures are loaded
const texturesLoaded = computed(
    () =>
        alphaTextureState.value &&
        eirikTextureState.value &&
        fotballfeberTextureState.value &&
        svanhildStubTextureState.value &&
        duckyTextureState.value &&
        knitryTextureState.value &&
        signatureApiTextureState.value &&
        adtubeTextureState.value &&
        cheffeloTextureState.value &&
        webtopTextureState.value,
);

const standardMaterial = new MeshStandardMaterial({
    color: new Color(0xffffff),
    roughness: 0.4,
    metalness: 0.5,
});

const emit = defineEmits(["updateProgress", "hasFinishedLoading", "updateCurrentSegment"]);

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

// Material refs - will be populated when textures load
const eirikDesktopMaterial = shallowRef(new MeshBasicMaterial({ transparent: true }));
const eirikTabletTexture = shallowRef(new MeshBasicMaterial({ transparent: true }));
const eirikMobileTexture = shallowRef(new MeshBasicMaterial({ transparent: true }));

const fotballfeberMaterialDesktop = shallowRef(new MeshBasicMaterial({ transparent: true }));
const fotballfeberMaterialTablet = shallowRef(new MeshBasicMaterial({ transparent: true }));
const fotballfeberMaterialMobile = shallowRef(new MeshBasicMaterial({ transparent: true }));

const svanhildStubMaterialDesktop = shallowRef(new MeshBasicMaterial({ transparent: true }));
const svanhildStubMaterialTablet = shallowRef(new MeshBasicMaterial({ transparent: true }));
const svanhildStubMaterialMobile = shallowRef(new MeshBasicMaterial({ transparent: true }));

const duckyMaterialDesktop = shallowRef(new MeshBasicMaterial({ transparent: true }));
const duckyMaterialTablet = shallowRef(new MeshBasicMaterial({ transparent: true }));
const duckyMaterialMobile = shallowRef(new MeshBasicMaterial({ transparent: true }));

const knitryMaterialDesktop = shallowRef(new MeshBasicMaterial({ transparent: true }));
const knitryMaterialTablet = shallowRef(new MeshBasicMaterial({ transparent: true }));
const knitryMaterialMobile = shallowRef(new MeshBasicMaterial({ transparent: true }));

const signatureApiMaterialDesktop = shallowRef(new MeshBasicMaterial({ transparent: true }));
const signatureApiMaterialTablet = shallowRef(new MeshBasicMaterial({ transparent: true }));
const signatureApiMaterialMobile = shallowRef(new MeshBasicMaterial({ transparent: true }));

const adtubeMaterialDesktop = shallowRef(new MeshBasicMaterial({ transparent: true }));
const adtubeMaterialTablet = shallowRef(new MeshBasicMaterial({ transparent: true }));
const adtubeMaterialMobile = shallowRef(new MeshBasicMaterial({ transparent: true }));

const cheffeloMaterialDesktop = shallowRef(new MeshBasicMaterial({ transparent: true }));
const cheffeloMaterialTablet = shallowRef(new MeshBasicMaterial({ transparent: true }));
const cheffeloMaterialMobile = shallowRef(new MeshBasicMaterial({ transparent: true }));

const webtopMaterialDesktop = shallowRef(new MeshBasicMaterial({ transparent: true }));
const webtopMaterialTablet = shallowRef(new MeshBasicMaterial({ transparent: true }));
const webtopMaterialMobile = shallowRef(new MeshBasicMaterial({ transparent: true }));

// Create materials when textures are loaded
watch(
    texturesLoaded,
    (loaded) => {
        if (!loaded) return;

        const alphaMap = alphaTextureState.value;
        const eirikMap = eirikTextureState.value;
        const fotballfeberMap = fotballfeberTextureState.value;
        const svanhildStubMap = svanhildStubTextureState.value;
        const duckyMap = duckyTextureState.value;
        const knitryMap = knitryTextureState.value;
        const signatureApiMap = signatureApiTextureState.value;
        const adtubeMap = adtubeTextureState.value;
        const cheffeloMap = cheffeloTextureState.value;
        const webtopMap = webtopTextureState.value;

        // Eirik materials
        eirikDesktopMaterial.value = new MeshBasicMaterial({
            transparent: true,
            map: eirikMap,
            alphaMap: alphaMap,
            aoMap: eirikMap,
            aoMapIntensity: 0.8,
        });

        const eirikTextureTabletClone = eirikMap!.clone();
        eirikTextureTabletClone.repeat.set(0.4, 1);
        eirikTabletTexture.value = new MeshBasicMaterial({
            transparent: true,
            map: eirikTextureTabletClone,
            alphaMap: alphaMap,
            aoMap: eirikTextureTabletClone,
            aoMapIntensity: 0.8,
        });

        const eirikTextureMobileClone = eirikMap!.clone();
        eirikTextureMobileClone.repeat.set(0.15, 0.6);
        eirikTextureMobileClone.offset.set(0.15, 0.2);
        eirikMobileTexture.value = new MeshBasicMaterial({
            transparent: true,
            map: eirikTextureMobileClone,
            alphaMap: alphaMap,
            aoMap: eirikTextureMobileClone,
            aoMapIntensity: 0.8,
        });

        // Ducky material
        const duckyDesktopClone = duckyMap!.clone();
        duckyDesktopClone.repeat.set(6, 3.375);
        duckyDesktopClone.offset.set(0, 0.1);
        duckyDesktopClone.wrapS = RepeatWrapping;
        duckyDesktopClone.wrapT = RepeatWrapping;
        duckyMaterialDesktop.value = new MeshBasicMaterial({
            transparent: true,
            map: duckyDesktopClone,
            aoMap: duckyDesktopClone,
            aoMapIntensity: 1,
        });

        const duckyTabletClone = duckyMap!.clone();
        duckyTabletClone.repeat.set(1, 1.2);
        duckyTabletClone.offset.set(0, -0.1);
        duckyMaterialTablet.value = new MeshBasicMaterial({
            transparent: true,
            map: duckyTabletClone,
            aoMap: duckyTabletClone,
            aoMapIntensity: 1,
        });

        const duckyMobileClone = duckyMap!.clone();
        duckyMobileClone.repeat.set(0.5, 0.7);
        duckyMobileClone.offset.set(0, 0.4);
        duckyMaterialMobile.value = new MeshBasicMaterial({
            transparent: true,
            map: duckyMobileClone,
            aoMap: duckyMobileClone,
            aoMapIntensity: 1,
        });

        // Knitry material
        const knitryDesktopClone = knitryMap!.clone();
        knitryDesktopClone.repeat.set(6, 3.375);
        knitryDesktopClone.offset.set(0, 0.1);
        knitryDesktopClone.wrapS = RepeatWrapping;
        knitryDesktopClone.wrapT = RepeatWrapping;
        knitryMaterialDesktop.value = new MeshBasicMaterial({
            transparent: true,
            map: knitryDesktopClone,
            aoMap: knitryDesktopClone,
            aoMapIntensity: 1,
        });

        const knitryTabletClone = knitryMap!.clone();
        knitryTabletClone.repeat.set(1, 1.2);
        knitryTabletClone.offset.set(0, -0.1);
        knitryMaterialTablet.value = new MeshBasicMaterial({
            transparent: true,
            map: knitryTabletClone,
            aoMap: knitryTabletClone,
            aoMapIntensity: 1,
        });

        const knitryMobileClone = knitryMap!.clone();
        knitryMobileClone.repeat.set(0.5, 0.7);
        knitryMobileClone.offset.set(0, 0.4);
        knitryMaterialMobile.value = new MeshBasicMaterial({
            transparent: true,
            map: knitryMobileClone,
            aoMap: knitryMobileClone,
            aoMapIntensity: 1,
        });

        // SignatureApi material
        const signatureApiDesktopClone = signatureApiMap!.clone();
        signatureApiDesktopClone.repeat.set(6, 3.375);
        signatureApiDesktopClone.offset.set(0, 0.1);
        signatureApiDesktopClone.wrapS = RepeatWrapping;
        signatureApiDesktopClone.wrapT = RepeatWrapping;
        signatureApiMaterialDesktop.value = new MeshBasicMaterial({
            transparent: true,
            map: signatureApiDesktopClone,
            aoMap: signatureApiDesktopClone,
            aoMapIntensity: 1,
        });

        const signatureApiTabletClone = signatureApiMap!.clone();
        signatureApiTabletClone.repeat.set(1, 1.2);
        signatureApiTabletClone.offset.set(0, -0.1);
        signatureApiMaterialTablet.value = new MeshBasicMaterial({
            transparent: true,
            map: signatureApiTabletClone,
            aoMap: signatureApiTabletClone,
            aoMapIntensity: 1,
        });

        const signatureApiMobileClone = fotballfeberMap!.clone();
        signatureApiMobileClone.repeat.set(0.5, 0.7);
        signatureApiMobileClone.offset.set(0, 0.4);
        signatureApiMaterialMobile.value = new MeshBasicMaterial({
            transparent: true,
            map: signatureApiMobileClone,
            aoMap: signatureApiMobileClone,
            aoMapIntensity: 1,
        });

        // Fotballfeber materials
        const fotballfeberDesktopClone = fotballfeberMap!.clone();
        fotballfeberDesktopClone.repeat.set(6, 3.375);
        fotballfeberDesktopClone.offset.set(0, 0.1);
        fotballfeberDesktopClone.wrapS = RepeatWrapping;
        fotballfeberDesktopClone.wrapT = RepeatWrapping;
        fotballfeberMaterialDesktop.value = new MeshBasicMaterial({
            transparent: true,
            map: fotballfeberDesktopClone,
            aoMap: fotballfeberDesktopClone,
            aoMapIntensity: 1,
        });

        const fotballfeberTabletClone = fotballfeberMap!.clone();
        fotballfeberTabletClone.repeat.set(1, 1.2);
        fotballfeberTabletClone.offset.set(0, -0.1);
        fotballfeberMaterialTablet.value = new MeshBasicMaterial({
            transparent: true,
            map: fotballfeberTabletClone,
            aoMap: fotballfeberTabletClone,
            aoMapIntensity: 1,
        });

        const fotballfeberMobileClone = fotballfeberMap!.clone();
        fotballfeberMobileClone.repeat.set(0.5, 0.7);
        fotballfeberMobileClone.offset.set(0, 0.4);
        fotballfeberMaterialMobile.value = new MeshBasicMaterial({
            transparent: true,
            map: fotballfeberMobileClone,
            aoMap: fotballfeberMobileClone,
            aoMapIntensity: 1,
        });

        // SvanhildStub materials
        const svanhildStubDesktopClone = svanhildStubMap!.clone();
        svanhildStubDesktopClone.repeat.set(6, 3.375);
        svanhildStubDesktopClone.offset.set(0, 0.1);
        svanhildStubDesktopClone.wrapS = RepeatWrapping;
        svanhildStubDesktopClone.wrapT = RepeatWrapping;
        svanhildStubMaterialDesktop.value = new MeshBasicMaterial({
            transparent: true,
            map: svanhildStubDesktopClone,
            aoMap: svanhildStubDesktopClone,
            aoMapIntensity: 1,
        });

        const svanhildStubTabletClone = svanhildStubMap!.clone();
        svanhildStubTabletClone.repeat.set(1, 1.2);
        svanhildStubTabletClone.offset.set(0, -0.1);
        svanhildStubMaterialTablet.value = new MeshBasicMaterial({
            transparent: true,
            map: svanhildStubTabletClone,
            aoMap: svanhildStubTabletClone,
            aoMapIntensity: 1,
        });

        const svanhildStubMobileClone = svanhildStubMap!.clone();
        svanhildStubMobileClone.repeat.set(0.5, 0.7);
        svanhildStubMobileClone.offset.set(0, 0.4);
        svanhildStubMaterialMobile.value = new MeshBasicMaterial({
            transparent: true,
            map: svanhildStubMobileClone,
            aoMap: svanhildStubMobileClone,
            aoMapIntensity: 1,
        });

        // Adtube materials
        const adtubeDesktopClone = adtubeMap!.clone();
        adtubeDesktopClone.repeat.set(6, 3.375);
        adtubeDesktopClone.offset.set(0, 0.1);
        adtubeDesktopClone.wrapS = RepeatWrapping;
        adtubeDesktopClone.wrapT = RepeatWrapping;
        adtubeMaterialDesktop.value = new MeshBasicMaterial({
            transparent: true,
            map: adtubeDesktopClone,
            aoMap: adtubeDesktopClone,
            aoMapIntensity: 1,
        });

        const adtubeTabletClone = adtubeMap!.clone();
        adtubeTabletClone.repeat.set(1, 1.2);
        adtubeTabletClone.offset.set(0, -0.1);
        adtubeMaterialTablet.value = new MeshBasicMaterial({
            transparent: true,
            map: adtubeTabletClone,
            aoMap: adtubeTabletClone,
            aoMapIntensity: 1,
        });

        const adtubeMobileClone = adtubeMap!.clone();
        adtubeMobileClone.repeat.set(0.5, 0.7);
        adtubeMobileClone.offset.set(0, 0.4);
        adtubeMaterialMobile.value = new MeshBasicMaterial({
            transparent: true,
            map: adtubeMobileClone,
            aoMap: adtubeMobileClone,
            aoMapIntensity: 1,
        });

        // Cheffelo materials
        const cheffeloDesktopClone = cheffeloMap!.clone();
        cheffeloDesktopClone.repeat.set(6, 3.375);
        cheffeloDesktopClone.offset.set(0, 0.1);
        cheffeloDesktopClone.wrapS = RepeatWrapping;
        cheffeloDesktopClone.wrapT = RepeatWrapping;
        cheffeloMaterialDesktop.value = new MeshBasicMaterial({
            transparent: true,
            map: cheffeloDesktopClone,
            aoMap: cheffeloDesktopClone,
            aoMapIntensity: 1,
        });

        const cheffeloTabletClone = cheffeloMap!.clone();
        cheffeloTabletClone.repeat.set(1, 1.2);
        cheffeloTabletClone.offset.set(0, -0.1);
        cheffeloMaterialTablet.value = new MeshBasicMaterial({
            transparent: true,
            map: cheffeloTabletClone,
            aoMap: cheffeloTabletClone,
            aoMapIntensity: 1,
        });

        const cheffeloMobileClone = cheffeloMap!.clone();
        cheffeloMobileClone.repeat.set(0.5, 0.7);
        cheffeloMobileClone.offset.set(0, 0.4);
        cheffeloMaterialMobile.value = new MeshBasicMaterial({
            transparent: true,
            map: cheffeloMobileClone,
            aoMap: cheffeloMobileClone,
            aoMapIntensity: 1,
        });

        // Webtop materials
        const webtopDesktopClone = webtopMap!.clone();
        webtopDesktopClone.repeat.set(6, 3.375);
        webtopDesktopClone.offset.set(0, 0.1);
        webtopDesktopClone.wrapS = RepeatWrapping;
        webtopDesktopClone.wrapT = RepeatWrapping;
        webtopMaterialDesktop.value = new MeshBasicMaterial({
            transparent: true,
            map: webtopDesktopClone,
            aoMap: webtopDesktopClone,
            aoMapIntensity: 1,
        });

        const webtopTabletClone = webtopMap!.clone();
        webtopTabletClone.repeat.set(1, 1.2);
        webtopTabletClone.offset.set(0, -0.1);
        webtopMaterialTablet.value = new MeshBasicMaterial({
            transparent: true,
            map: webtopTabletClone,
            aoMap: webtopTabletClone,
            aoMapIntensity: 1,
        });

        const webtopMobileClone = webtopMap!.clone();
        webtopMobileClone.repeat.set(0.5, 0.7);
        webtopMobileClone.offset.set(0, 0.4);
        webtopMaterialMobile.value = new MeshBasicMaterial({
            transparent: true,
            map: webtopMobileClone,
            aoMap: webtopMobileClone,
            aoMapIntensity: 1,
        });
    },
    { immediate: true },
);

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

const setDuckyParams = () => {
    lightParams.spot.color = 0x00545d;

    screenTextureOpacityRef.value = 1;
    screenOverlayOpacityRef.value = 0.5;
    if (!deviceScreenRefs.desktop.value || !deviceScreenRefs.tablet.value || !deviceScreenRefs.mobile.value) return;
    deviceScreenRefs.desktop.value.material = duckyMaterialDesktop.value;
    deviceScreenRefs.tablet.value.material = duckyMaterialTablet.value;
    deviceScreenRefs.mobile.value.material = duckyMaterialMobile.value;
};
const setKnitryParams = () => {
    lightParams.spot.color = 0xceff1a;

    screenTextureOpacityRef.value = 1;
    screenOverlayOpacityRef.value = 0.5;
    if (!deviceScreenRefs.desktop.value || !deviceScreenRefs.tablet.value || !deviceScreenRefs.mobile.value) return;
    deviceScreenRefs.desktop.value.material = knitryMaterialDesktop.value;
    deviceScreenRefs.tablet.value.material = knitryMaterialTablet.value;
    deviceScreenRefs.mobile.value.material = knitryMaterialMobile.value;
};
const setSignatureApiParams = () => {
    lightParams.spot.color = 0xffffff;

    screenTextureOpacityRef.value = 1;
    screenOverlayOpacityRef.value = 0.5;
    if (!deviceScreenRefs.desktop.value || !deviceScreenRefs.tablet.value || !deviceScreenRefs.mobile.value) return;
    deviceScreenRefs.desktop.value.material = signatureApiMaterialDesktop.value;
    deviceScreenRefs.tablet.value.material = signatureApiMaterialTablet.value;
    deviceScreenRefs.mobile.value.material = signatureApiMaterialMobile.value;
};

const setFotballFeberParams = () => {
    lightParams.spot.color = 0x09fbeb;

    screenTextureOpacityRef.value = 1;
    screenOverlayOpacityRef.value = 0.5;
    if (!deviceScreenRefs.desktop.value || !deviceScreenRefs.tablet.value || !deviceScreenRefs.mobile.value) return;
    deviceScreenRefs.desktop.value.material = fotballfeberMaterialDesktop.value;
    deviceScreenRefs.tablet.value.material = fotballfeberMaterialTablet.value;
    deviceScreenRefs.mobile.value.material = fotballfeberMaterialMobile.value;
};

const setSvanhildStubParams = () => {
    lightParams.spot.color = 0xd4c76c;
    screenTextureOpacityRef.value = 1;
    screenOverlayOpacityRef.value = 0.5;
    if (!deviceScreenRefs.desktop.value || !deviceScreenRefs.tablet.value || !deviceScreenRefs.mobile.value) return;
    deviceScreenRefs.desktop.value.material = svanhildStubMaterialDesktop.value;
    deviceScreenRefs.tablet.value.material = svanhildStubMaterialTablet.value;
    deviceScreenRefs.mobile.value.material = svanhildStubMaterialMobile.value;
};

const setCheffeloParams = () => {
    lightParams.spot.color = 0xe56962;
    screenTextureOpacityRef.value = 1;
    screenOverlayOpacityRef.value = 0.5;
    if (!deviceScreenRefs.desktop.value || !deviceScreenRefs.tablet.value || !deviceScreenRefs.mobile.value) return;
    deviceScreenRefs.desktop.value.material = cheffeloMaterialDesktop.value;
    deviceScreenRefs.tablet.value.material = cheffeloMaterialTablet.value;
    deviceScreenRefs.mobile.value.material = cheffeloMaterialMobile.value;
};

const setAdtubeParams = () => {
    lightParams.spot.color = 0x40c0c2;
    screenTextureOpacityRef.value = 1;
    screenOverlayOpacityRef.value = 0.5;
    if (!deviceScreenRefs.desktop.value || !deviceScreenRefs.tablet.value || !deviceScreenRefs.mobile.value) return;
    deviceScreenRefs.desktop.value.material = adtubeMaterialDesktop.value;
    deviceScreenRefs.tablet.value.material = adtubeMaterialTablet.value;
    deviceScreenRefs.mobile.value.material = adtubeMaterialMobile.value;
};

const setWebtopParams = () => {
    lightParams.spot.color = 0xff0000;
    screenTextureOpacityRef.value = 1;
    screenOverlayOpacityRef.value = 0.5;
    if (!deviceScreenRefs.desktop.value || !deviceScreenRefs.tablet.value || !deviceScreenRefs.mobile.value) return;
    deviceScreenRefs.desktop.value.material = webtopMaterialDesktop.value;
    deviceScreenRefs.tablet.value.material = webtopMaterialTablet.value;
    deviceScreenRefs.mobile.value.material = webtopMaterialMobile.value;
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
        !duckyOffsetHeight.value ||
        !knitryOffsetHeight.value ||
        !signatureApiOffsetHeight.value ||
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
        eirikDesktopMaterial.value.opacity = 0;
        desktopOverlayRef.value.opacity = 1;
    } else {
        // Mouse Position
        damp(mouseParams, "x", (mouseX.value / width.value - 0.5) / 4, 0.05, delta);
        damp(mouseParams, "z", (mouseY.value / height.value - 0.5) / 4, 0.05, delta);
        mousePositionRef.value = new Vector3(mouseParams.x + 2, mousePositionRef.value.y, mouseParams.z + 0.5);

        // Mouse Rotation
        damp(mouseParams, "rotation", (Math.PI + (mouseX.value / width.value - 0.5) / 2) * -1, 0.05, delta);
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

        const workDucky = {
            start: duckyOffsetTop.value - topOffsetHeight.value / 2,
            end: duckyOffsetTop.value + duckyOffsetHeight.value / 2,
        };

        const workKnitry = {
            start: knitryOffsetTop.value - topOffsetHeight.value / 2,
            end: knitryOffsetTop.value + knitryOffsetHeight.value / 2,
        };

        const workSignatureApi = {
            start: signatureApiOffsetTop.value - topOffsetHeight.value / 2,
            end: signatureApiOffsetTop.value + signatureApiOffsetHeight.value / 2,
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
                deviceScreenRefs.desktop.value.material = eirikDesktopMaterial.value;
                deviceScreenRefs.tablet.value.material = standardMaterial;
                deviceScreenRefs.mobile.value.material = standardMaterial;
            } else if (currentViewPort.value === "tablet") {
                lightParams.rectArea.intensity = 0.01;
                deviceScreenRefs.desktop.value.material = standardMaterial;
                deviceScreenRefs.tablet.value.material = eirikTabletTexture.value;
                deviceScreenRefs.mobile.value.material = standardMaterial;
            } else if (currentViewPort.value === "mobile") {
                lightParams.rectArea.intensity = 0.01;
                deviceScreenRefs.desktop.value.material = standardMaterial;
                deviceScreenRefs.tablet.value.material = standardMaterial;
                deviceScreenRefs.mobile.value.material = eirikMobileTexture.value;
            }
        } else {
            // Hover and modal events
            if (hoverTarget.value === "" && !isModalOpen.value && currentViewPort.value === "desktop") {
                setDefaultParams();
            } else if (hoverTarget.value === "fotballfeber" || isExperienceModalOpen.value.fotballfeber) {
                setFotballFeberParams();
            } else if (hoverTarget.value === "svanhildstub" || isExperienceModalOpen.value.svanhildstub) {
                setSvanhildStubParams();
            } else if (hoverTarget.value === "ducky" || isExperienceModalOpen.value.ducky) {
                setDuckyParams();
            } else if (hoverTarget.value === "knitry" || isExperienceModalOpen.value.knitry) {
                setKnitryParams();
            } else if (hoverTarget.value === "signatureApi" || isExperienceModalOpen.value.signatureApi) {
                setSignatureApiParams();
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
                scrollY.value > workDucky.start &&
                scrollY.value < workDucky.end
            ) {
                setDuckyParams();
            } else if (
                currentViewPort.value !== "desktop" &&
                scrollY.value > workKnitry.start &&
                scrollY.value < workKnitry.end
            ) {
                setKnitryParams();
            } else if (
                currentViewPort.value !== "desktop" &&
                scrollY.value > workSignatureApi.start &&
                scrollY.value < workSignatureApi.end
            ) {
                setSignatureApiParams();
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

        damp(spotLightRef.value, "intensity", normalizedLightInterval * 2, 0.1, delta);
        const directionalLightIntesity = lightParams.directional.intensity
            ? lightParams.directional.intensity
            : normalizedLightInterval / 12 + 0.05;

        damp(directionalLightRef.value, "intensity", directionalLightIntesity, 0.1, delta);

        dampC(directionalLightRef.value.color, new Color(lightParams.directional.color), 0.25, delta);
        dampC(spotLightRef.value.color, new Color(lightParams.spot.color), 0.25, delta);
        damp(rectAreaLightIntensity, "value", lightParams.rectArea.intensity, 0.1, delta);

        damp(eirikDesktopMaterial.value, "opacity", screenTextureOpacityRef.value, 0.1, delta);
        damp(eirikTabletTexture.value, "opacity", screenTextureOpacityRef.value, 0.1, delta);
        damp(eirikMobileTexture.value, "opacity", screenTextureOpacityRef.value, 0.1, delta);
        damp(desktopOverlayRef.value, "opacity", screenOverlayOpacityRef.value, 0.1, delta);
        damp(tabletOverlayRef.value, "opacity", screenOverlayOpacityRef.value, 0.1, delta);
        damp(mobileOverlayRef.value, "opacity", screenOverlayOpacityRef.value, 0.1, delta);
    }
}

function onLoop({ delta }: { delta: number }) {
    if (spotLightRef.value && spotLightTargetRef.value) {
        spotLightRef.value.target = spotLightTargetRef.value;
    }

    if (!hasScrolled.value) {
        hasScrolled.value = scrollY.value > 0;
    }

    updateCamera(delta);
    updateObjects(delta);
}
</script>

<template>
    <TresCanvas v-bind="gl" id="canvas" ref="canvasRef" class="-z-30" :style="canvasStyle" @loop="onLoop">
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
            <CustomKeyboard :position="new Vector3(0, 0.025, 0.5)" :scale="0.5" />
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
