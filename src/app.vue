<script setup lang="ts">
import { useRouter } from "nuxt/app";
import VueSimplebar from "simplebar-vue";
import "simplebar-vue/dist/simplebar.min.css";
import CanvasComponent from "~/components/CanvasComponent.vue";
import CoolConsoleLog from "~/components/CoolConsoleLog.vue";
import type { ComputedRef, StyleValue } from "vue";
import { computed, ref, watch } from "vue";
import { ModalsContainer } from "vue-final-modal";
import ContactComponent from "./components/ContactComponent.vue";
import ExpertiseComponent from "./components/ExpertiseComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
import HeaderComponent from "./components/HeaderComponent.vue";
import MeComponent from "./components/MeComponent.vue";
import MyModal from "./components/MyModal.vue";
import NavBarComponent from "./components/NavBarComponent.vue";
import FotballFeberCard from "./components/projects/FotballFeberCard.vue";
import FotballFeberContent from "./components/projects/FotballFeberContent.vue";
import SvanhildStubCard from "./components/projects/SvanhildStubCard.vue";
import SvanhildStubContent from "./components/projects/SvanhildStubContent.vue";
import AdtubeCard from "./components/work/AdtubeCard.vue";
import AdtubeContent from "./components/work/AdtubeContent.vue";
import CheffeloCard from "./components/work/CheffeloCard.vue";
import CheffeloContent from "./components/work/CheffeloContent.vue";
import WebtopCard from "./components/work/WebtopCard.vue";
import WebtopContent from "./components/work/WebtopContent.vue";

type ModalSegment = "fotballfeber" | "svanhildstub" | "cheffelo" | "adtube" | "webtop";

const router = useRouter();

const containerRef = ref<HTMLElement>();

const scrollY = ref(0);
const progress = ref(0);
const hasFinishedLoading = ref(false);

// Scroll Refs
const topRef = ref<HTMLElement>();
const meRef = ref<HTMLElement>();
const expertiseRef = ref<HTMLElement>();
const projectsRef = ref<HTMLElement>();
const workRef = ref<HTMLElement>();
const contactRef = ref<HTMLElement>();

const fotballFeberRef = ref<HTMLElement>();
const svanhildStubRef = ref<HTMLElement>();
const cheffeloRef = ref<HTMLElement>();
const adtubeRef = ref<HTMLElement>();
const webtopRef = ref<HTMLElement>();

const scrollRefs = [
  topRef,
  meRef,
  expertiseRef,
  projectsRef,
  workRef,
  contactRef,
  fotballFeberRef,
  svanhildStubRef,
  cheffeloRef,
  adtubeRef,
  webtopRef,
];

const currentSegmentRef = ref<string>("top");

const simpleBarRef = ref(null);
const isModalOpenRef = ref(false);

const hoverTargetRef = ref<"fotballfeber" | "svanhildstub" | "cheffelo" | "adtube" | "webtop" | "">("");

const isExperienceModalOpenRef = ref({
  fotballfeber: false,
  svanhildstub: false,
  cheffelo: false,
  adtube: false,
  webtop: false,
});

const fillerStyles: ComputedRef<StyleValue> = computed(() => {
  return {
    height: "14px",
    minWidth: "14px",
    width: `${100 - progress.value}%`,
    paddingLeft: "2px",
    paddingRight: "2px",
    backgroundColor: "#e8e8e8",
    transition: "width 500ms ease-in-out",
    borderRadius: "inherit",
    textAlign: "right",
  };
});

const openModalBySegment = (segment: ModalSegment) => {
  if (segment === "fotballfeber") {
    isExperienceModalOpenRef.value.fotballfeber = true;
  } else if (segment === "svanhildstub") {
    isExperienceModalOpenRef.value.svanhildstub = true;
  } else if (segment === "cheffelo") {
    isExperienceModalOpenRef.value.cheffelo = true;
  } else if (segment === "adtube") {
    isExperienceModalOpenRef.value.adtube = true;
  } else if (segment === "webtop") {
    isExperienceModalOpenRef.value.webtop = true;
  }
};

const handleHashChange = () => {
  if (isModalOpenRef.value) {
    isModalOpenRef.value = false;
    isExperienceModalOpenRef.value = {
      fotballfeber: false,
      svanhildstub: false,
      cheffelo: false,
      adtube: false,
      webtop: false,
    };
  }

  if (!isModalOpenRef.value) {
    const segment = router.currentRoute.value.hash.replace("#/", "").replace("#", "");

    scrollRefs.forEach((ref) => {
      if (ref.value?.id === segment) {
        currentSegmentRef.value = segment;
        ref.value?.scrollIntoView({ behavior: "smooth" });
        openModalBySegment(segment as ModalSegment);
      }
    });
  }
};

const onFirstLoad = () => {
  const segment = router.currentRoute.value.hash.replace("#/", "").replace("#", "");

  if (segment) {
    scrollRefs.forEach((ref) => {
      if (ref.value?.id === segment) {
        currentSegmentRef.value = segment;
        if (hasFinishedLoading.value) {
          setTimeout(() => {
            ref.value?.scrollIntoView({ behavior: "smooth" });
            openModalBySegment(segment as ModalSegment);
          }, 1000);
        }
      }
    });
  }
};

watch(
  isExperienceModalOpenRef,
  (isExperienceModalOpen) => {
    isModalOpenRef.value = Object.values(isExperienceModalOpen).some((x) => x);
  },
  {
    deep: true,
  },
);

watch(router.currentRoute.value, handleHashChange);

watch(hasFinishedLoading, (hasFinishedLoading) => {
  if (hasFinishedLoading) {
    onFirstLoad();
  }
});

const toggleExperienceModal = (experience: "fotballfeber" | "svanhildstub" | "cheffelo" | "adtube" | "webtop" | "") => {
  switch (experience) {
    case "fotballfeber":
      isExperienceModalOpenRef.value.fotballfeber = !isExperienceModalOpenRef.value.fotballfeber;
      if (isExperienceModalOpenRef.value.fotballfeber) window.history.pushState({}, "", "/#fotballfeber");
      else window.history.pushState({}, "", "/");
      break;
    case "svanhildstub":
      isExperienceModalOpenRef.value.svanhildstub = !isExperienceModalOpenRef.value.svanhildstub;
      if (isExperienceModalOpenRef.value.svanhildstub) window.history.pushState({}, "", "/#svanhildstub");
      else window.history.pushState({}, "", "/");
      break;
    case "cheffelo":
      isExperienceModalOpenRef.value.cheffelo = !isExperienceModalOpenRef.value.cheffelo;
      if (isExperienceModalOpenRef.value.cheffelo) window.history.pushState({}, "", "/#cheffelo");
      else window.history.pushState({}, "", "/");
      break;
    case "adtube":
      isExperienceModalOpenRef.value.adtube = !isExperienceModalOpenRef.value.adtube;
      if (isExperienceModalOpenRef.value.adtube) window.history.pushState({}, "", "/#adtube");
      else window.history.pushState({}, "", "/");
      break;
    case "webtop":
      isExperienceModalOpenRef.value.webtop = !isExperienceModalOpenRef.value.webtop;
      if (isExperienceModalOpenRef.value.webtop) window.history.pushState({}, "", "/#webtop");
      else window.history.pushState({}, "", "/");
      break;
    default:
      break;
  }

  document.body.style.overflow = isExperienceModalOpenRef.value.fotballfeber ? "hidden" : "auto";
};

const onScroll = (event: Event & { target: { scrollTop: number } }) => {
  scrollY.value = event.target?.scrollTop;
};

const onUpdateProgress = (prog: number) => {
  progress.value = prog;
};

const onHasFinishedLoading = () => {
  hasFinishedLoading.value = true;
};

const onUpdateCurrentSegment = (segment: string) => {
  currentSegmentRef.value = segment;
};
</script>

<template>
  <Html lang="en" class="scroll-smooth bg-[#00040C] font-sans selection:bg-red-400/80 selection:text-zinc-900">
    <Head>
      <Meta charset="UTF-8" />
      <Meta
        name="description"
        content="Full-Stack Developer - A Portfolio Website built with TresJS, Nuxt, Vue, TypeScript, Tailwind CSS and Three.js"
      />
      <Meta name="viewport" content="width=device-width" interactive-widget="overlays-content" />
      <Link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <Link rel="manifest" href="/site.webmanifest" />
      <Link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <Link rel="canonical" href="https://mowebdev.com" />
      <Meta name="msapplication-TileColor" content="#223d4a" />
      <Meta name="theme-color" content="#223d4a" />
      <Title>Eirik Mo - Full-Stack Developer</Title>

      <Meta property="og:title" content="Eirik Mo - Full-Stack Developer" />
      <Meta property="og:description" content="Remotely building & deploying web apps across the globe." />
      <Meta property="og:type" content="website" />
      <Meta property="og:url" content="https://mowebdev.com" />
      <Meta property="og:image" content="https://mowebdev.com/images/ogImage.webp" />
      <Meta property="og:image:alt" content="Eirik Mo - Full-Stack Developer, Remote Web Development" />

      <Meta property="twitter:title" content="Eirik Mo - Full-Stack Developer" />
      <Meta name="twitter:creator" content="@eirikm0" />
      <Meta
        property="twitter:description"
        content="Full-Stack Developer - A Portfolio Website built with TresJS, Nuxt, Vue, TypeScript, Tailwind CSS and Three.js"
      />
      <Meta property="twitter:image" content="https://mowebdev.com/images/ogImage.webp" />
      <Meta property="twitter:card" content="summary" />
    </Head>

    <Body class="relative">
      <ClientOnly>
        <CoolConsoleLog />
      </ClientOnly>

      <!-- eslint-disable-next-line vue/attribute-hyphenation -->
      <VueSimplebar ref="simpleBarRef" class="h-screen" :onScroll="onScroll">
        <div ref="containerRef" class="flex justify-center">
          <div class="w-full px-2 text-zinc-200 max-w-screen-3xl">
            <Transition
              enter-active-class="delay-[2000ms] duration-[2000ms] ease-in-out opacity-0"
              enter-to-class="opacity-100"
            >
              <NavBarComponent v-show="hasFinishedLoading" :current-segment="currentSegmentRef" />
            </Transition>
            <Transition
              enter-active-class="delay-[2000ms] duration-[2000ms] ease-in-out opacity-0"
              enter-to-class="opacity-100"
            >
              <div
                v-show="hasFinishedLoading"
                class="hidden md:flex flex-col fixed bottom-0 left-0 space-y-6 font-light px-3 lg:px-5 text-zinc-400 z-50"
              >
                <SocialsComponent />
                <div class="mx-3 h-32 lg:h-40 w-[2px] bg-zinc-400"></div>
              </div>
            </Transition>

            <main
              class="flex flex-col pl-4 pr-8 md:px-12 lg:px-16 overflow-x-hidden items-center transition-opacity ease-in-out duration-500"
              :class="{ 'opacity-0': isModalOpenRef, 'opacity-100': !isModalOpenRef }"
            >
              <section id="top" ref="topRef" class="min-h-[100lvh] h-[100lvh] container flex items-center">
                <HeaderComponent />
              </section>
              <section id="me" ref="meRef" class="min-h-screen container flex items-center justify-end scroll-mt-12">
                <MeComponent />
              </section>

              <section
                id="expertise"
                ref="expertiseRef"
                class="min-h-screen container flex flex-col w-full scroll-mt-12 my-12 gap-8 lg:gap-12"
              >
                <ExpertiseComponent />
              </section>

              <section
                id="projects"
                ref="projectsRef"
                class="min-h-[50vh] container flex items-center scroll-mt-12 my-12"
              >
                <div class="flex flex-col w-full">
                  <h2 v-motion-slide-visible-once-left-custom class="text-4xl font-extrabold mb-4">Projects</h2>
                  <div v-motion-slide-visible-once-left-custom class="gap-3 flex">
                    <div class="h-3 w-16 bg-gradient-to-r from-green-300 to-green-400 rounded-sm" />
                    <div class="h-3 w-11 bg-gradient-to-r from-blue-300 to-blue-400 rounded-sm" />
                    <div class="size-3 bg-zinc-400 rounded-full" />
                  </div>

                  <div
                    class="md:pl-10 md:border-l border-gray-500 mt-4 mb-2 pt-10 md:mt-8 md:mb-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 w-full gap-x-8 gap-y-14"
                  >
                    <div id="fotballfeber" ref="fotballFeberRef" class="flex h-full scroll-mt-12">
                      <FotballFeberCard
                        v-motion-fade-visible-once-custom
                        :on-click="() => toggleExperienceModal('fotballfeber')"
                        :on-mouse-over="() => (hoverTargetRef = 'fotballfeber')"
                        :on-mouse-leave="() => (hoverTargetRef = '')"
                      />
                    </div>
                    <div id="svanhildstub" ref="svanhildStubRef" class="flex h-full scroll-mt-12">
                      <SvanhildStubCard
                        v-motion-fade-visible-once-custom
                        :on-click="() => toggleExperienceModal('svanhildstub')"
                        :on-mouse-over="() => (hoverTargetRef = 'svanhildstub')"
                        :on-mouse-leave="() => (hoverTargetRef = '')"
                      />
                    </div>
                  </div>

                  <div v-motion-slide-visible-once-left-custom class="gap-3 flex">
                    <div class="h-3 w-16 bg-gradient-to-r from-green-300 to-green-400 rounded-sm" />
                    <div class="h-3 w-11 bg-gradient-to-r from-blue-300 to-blue-400 rounded-sm" />
                    <div class="size-3 bg-zinc-400 rounded-full" />
                  </div>
                </div>
              </section>

              <section id="work" ref="workRef" class="min-h-[50vh] container flex items-center scroll-mt-12">
                <div class="flex flex-col w-full">
                  <h2 v-motion-slide-visible-once-left-custom class="text-4xl font-extrabold mb-4">Work</h2>
                  <div v-motion-slide-visible-once-left-custom class="gap-3 flex">
                    <div class="h-3 w-6 bg-gradient-to-r from-green-300 to-green-400 rounded-sm" />
                    <div class="h-3 w-8 bg-gradient-to-r from-purple-300 to-purple-400 rounded-sm" />
                    <div class="h-3 w-4 bg-gradient-to-r from-red-300 to-red-400 rounded-sm" />
                  </div>
                  <div
                    class="md:pl-10 md:border-l border-gray-500 mt-4 mb-2 pt-10 md:mt-8 md:mb-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 w-full gap-x-8 gap-y-14"
                  >
                    <div id="cheffelo" ref="cheffeloRef" class="flex h-full scroll-mt-12">
                      <CheffeloCard
                        v-motion-fade-visible-once-custom
                        :on-click="() => toggleExperienceModal('cheffelo')"
                        :on-mouse-over="() => (hoverTargetRef = 'cheffelo')"
                        :on-mouse-leave="() => (hoverTargetRef = '')"
                      />
                    </div>
                    <div id="adtube" ref="adtubeRef" class="flex h-full scroll-mt-12">
                      <AdtubeCard
                        v-motion-fade-visible-once-custom
                        :on-click="() => toggleExperienceModal('adtube')"
                        :on-mouse-over="() => (hoverTargetRef = 'adtube')"
                        :on-mouse-leave="() => (hoverTargetRef = '')"
                      />
                    </div>
                    <div id="webtop" ref="webtopRef" class="flex h-full scroll-mt-12">
                      <WebtopCard
                        v-motion-fade-visible-once-custom
                        :on-click="() => toggleExperienceModal('webtop')"
                        :on-mouse-over="() => (hoverTargetRef = 'webtop')"
                        :on-mouse-leave="() => (hoverTargetRef = '')"
                      />
                    </div>
                  </div>

                  <div v-motion-slide-visible-once-left-custom class="gap-3 flex mt-4">
                    <div class="h-3 w-6 bg-gradient-to-r from-green-300 to-green-400 rounded-sm" />
                    <div class="h-3 w-8 bg-gradient-to-r from-purple-300 to-purple-400 rounded-sm" />
                    <div class="h-3 w-4 bg-gradient-to-r from-red-300 to-red-400 rounded-sm" />
                  </div>
                </div>
              </section>

              <section id="contact" ref="contactRef" class="min-h-screen container flex items-center scroll-mt-12">
                <ContactComponent />
              </section>
              <FooterComponent />
            </main>
          </div>

          <Transition
            name="fade-overlay"
            enter-active-class="opacity-1 transition-opacity duration-1000"
            leave-active-class="opacity-0 transition-opacity duration-1000 delay-1000"
          >
            <div
              v-show="!hasFinishedLoading"
              class="fixed bg-[#00040C] inset-0 size-full text-center flex flex-col justify-center items-center z-[80]"
            >
              <div class="max-w-xl" :style="fillerStyles"></div>
            </div>
          </Transition>
        </div>
      </VueSimplebar>

      <MyModal
        :show="hasFinishedLoading && isExperienceModalOpenRef.fotballfeber"
        :close="() => toggleExperienceModal('fotballfeber')"
      >
        <FotballFeberContent />
      </MyModal>

      <MyModal
        :show="hasFinishedLoading && isExperienceModalOpenRef.svanhildstub"
        :close="() => toggleExperienceModal('svanhildstub')"
      >
        <SvanhildStubContent />
      </MyModal>

      <MyModal
        :show="hasFinishedLoading && isExperienceModalOpenRef.cheffelo"
        :close="() => toggleExperienceModal('cheffelo')"
      >
        <CheffeloContent />
      </MyModal>

      <MyModal
        :show="hasFinishedLoading && isExperienceModalOpenRef.adtube"
        :close="() => toggleExperienceModal('adtube')"
      >
        <AdtubeContent />
      </MyModal>

      <MyModal
        :show="hasFinishedLoading && isExperienceModalOpenRef.webtop"
        :close="() => toggleExperienceModal('webtop')"
      >
        <WebtopContent />
      </MyModal>

      <ModalsContainer />

      <ClientOnly>
        <CanvasComponent
          :me-offset-top="meRef?.offsetTop || 0"
          :me-offset-height="meRef?.offsetHeight || 0"
          :expertise-offset-top="expertiseRef?.offsetTop || 0"
          :projects-offset-top="projectsRef?.offsetTop || 0"
          :top-offset-height="topRef?.offsetHeight || 0"
          :expertise-offset-height="expertiseRef?.offsetHeight || 0"
          :fotball-feber-offset-height="fotballFeberRef?.offsetHeight || 0"
          :svanhild-stub-offset-height="svanhildStubRef?.offsetHeight || 0"
          :cheffelo-offset-height="cheffeloRef?.offsetHeight || 0"
          :adtube-offset-height="adtubeRef?.offsetHeight || 0"
          :webtop-offset-height="webtopRef?.offsetHeight || 0"
          :fotball-feber-offset-top="fotballFeberRef?.offsetTop || 0"
          :svanhild-stub-offset-top="svanhildStubRef?.offsetTop || 0"
          :cheffelo-offset-top="cheffeloRef?.offsetTop || 0"
          :adtube-offset-top="adtubeRef?.offsetTop || 0"
          :webtop-offset-top="webtopRef?.offsetTop || 0"
          :hover-target="hoverTargetRef"
          :is-modal-open="isModalOpenRef"
          :scroll-y="scrollY"
          :is-experience-modal-open="isExperienceModalOpenRef"
          :scroll-refs="scrollRefs"
          :current-segment="currentSegmentRef"
          @update-progress="onUpdateProgress"
          @has-finished-loading="onHasFinishedLoading"
          @update-current-segment="onUpdateCurrentSegment"
        />
      </ClientOnly>
    </Body>
  </Html>
</template>
./components/CoolConsoleLog.ts
