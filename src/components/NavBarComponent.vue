<script setup lang="ts">
import { ref, toRefs, watch } from "vue";

const props = defineProps<{
  currentSegment: string;
  scrollY: number;
  isModalOpen: boolean;
}>();

const { currentSegment, scrollY, isModalOpen } = toRefs(props);

const previousScrollTop = ref(0);
const navBarRef = ref<HTMLElement | null>(null);

watch(
  () => props.scrollY,
  () => {
    if (navBarRef.value) {
      if (scrollY.value > previousScrollTop.value || !previousScrollTop.value) {
        navBarRef.value.style.transform = "translateY(-80px)";
      } else {
        navBarRef.value.style.transform = "translateY(0)";
      }
      previousScrollTop.value = scrollY.value;
    }
  },
);

watch(
  () => props.isModalOpen,
  () => {
    if (navBarRef.value) {
      if (isModalOpen.value) {
        navBarRef.value.style.transform = "translateY(-80px)";
      } else {
        navBarRef.value.style.transform = "translateY(0)";
      }
    }
  },
);
</script>
<template>
  <div
    ref="navBarRef"
    class="fixed top-4 inset-x-0 flex font-light justify-center select-none z-50 text-sm transition-transform ease-out duration-500"
  >
    <nav
      class="flex space-y-0.5 gap-2 sm:gap-4 py-2 px-3 sm:px-5 items-center bg-[#00040C]/45 backdrop-blur-lg rounded-full border border-zinc-200/50"
    >
      <NuxtLink href="#top" aria-label="Go to top">
        <div
          class="size-3 hover:bg-zinc-200 rounded-full transition-colors ease-in-out drop-shadow"
          :class="[currentSegment === 'top' ? 'bg-zinc-100' : 'bg-zinc-400']"
        />
      </NuxtLink>
      <NuxtLink
        class="hover:text-zinc-200 transition-colors ease-in-out drop-shadow"
        href="#me"
        :class="[currentSegment === 'me' ? 'text-zinc-100' : 'text-zinc-400']"
        >Me</NuxtLink
      >
      <NuxtLink
        class="hover:text-zinc-200 hover:underline underline-offset-4 transition-colors ease-in-out drop-shadow"
        href="#expertise"
        :class="[currentSegment === 'expertise' ? 'text-zinc-100 underline' : 'text-zinc-400']"
        >Expertise</NuxtLink
      >
      <NuxtLink
        class="hover:text-zinc-200 hover:underline underline-offset-4 transition-colors ease-in-out drop-shadow"
        href="#projects"
        :class="[currentSegment === 'projects' ? 'text-zinc-100 underline' : 'text-zinc-400']"
        >Projects</NuxtLink
      >
      <NuxtLink
        class="hover:text-zinc-200 hover:underline underline-offset-4 transition-colors ease-in-out drop-shadow"
        href="#work"
        :class="[currentSegment === 'work' ? 'text-zinc-100 underline' : 'text-zinc-400']"
        >Work</NuxtLink
      >
      <NuxtLink
        class="hover:text-zinc-200 hover:underline underline-offset-4 transition-colors ease-in-out drop-shadow-"
        href="#contact"
        :class="[currentSegment === 'contact' ? 'text-zinc-100 underline' : 'text-zinc-400']"
        >Contact</NuxtLink
      >
      <a
        href="https://storage.mowebdev.com/main/Eirik_Mo_CV.pdf"
        target="_blank"
        class="text-white-300 font-sm flex-nowrap border-zinc-100 hover:border-[#00040C] border rounded-md px-2 py-1 space-x-2 flex hover:bg-zinc-100 hover:text-[#00040C] transition-all duration-200 ease-in-out items-center"
        download
      >
        <span>CV</span>
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
          class="lucide lucide-download"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" x2="12" y1="15" y2="3" />
        </svg>
      </a>
    </nav>
  </div>
  <div class="fixed top-0 right-0 font-light h-screen flex flex-col justify-end select-none z-50 text-sm">
    <div class="hidden md:flex flex-col space-y-6 font-light px-3 lg:px-5 items-center">
      <a
        class="text-zinc-200 hover:text-zinc-100"
        style="writing-mode: vertical-rl; -webkit-writing-mode: vertical-rl"
        href="mailto:eirik@mowebdev.com"
        >eirik@mowebdev.com</a
      >
      <div class="mx-3 h-32 lg:h-40 w-[2px] shrink bg-zinc-400"></div>
    </div>
  </div>
</template>
