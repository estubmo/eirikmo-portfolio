<script setup lang="ts">
import { toRefs } from "vue";

const props = defineProps<{
  currentSegment: string;
}>();

const { currentSegment } = toRefs(props);
</script>
<template>
  <div class="fixed top-0 right-0 font-light h-screen flex flex-col justify-between select-none z-50 text-sm">
    <div class="flex flex-col space-y-0.5 gap-4 p-3 lg:px-5 items-center">
      <NuxtLink href="#top" aria-label="Go to top">
        <div
          class="size-3 hover:bg-zinc-200 rounded-full transition-colors ease-in-out drop-shadow"
          :class="[currentSegment === 'top' ? 'bg-zinc-100' : 'bg-zinc-400']"
        />
      </NuxtLink>
      <NuxtLink
        class="hover:text-zinc-200 transition-colors ease-in-out drop-shadow"
        style="writing-mode: vertical-rl; -webkit-writing-mode: vertical-rl"
        href="#me"
        :class="[currentSegment === 'me' ? 'text-zinc-100' : 'text-zinc-400']"
        >Me</NuxtLink
      >
      <NuxtLink
        class="hover:text-zinc-200 transition-colors ease-in-out drop-shadow"
        style="writing-mode: vertical-rl; -webkit-writing-mode: vertical-rl"
        href="#expertise"
        :class="[currentSegment === 'expertise' ? 'text-zinc-100' : 'text-zinc-400']"
        >Expertise</NuxtLink
      >
      <NuxtLink
        class="hover:text-zinc-200 transition-colors ease-in-out drop-shadow"
        style="writing-mode: vertical-rl; -webkit-writing-mode: vertical-rl"
        href="#projects"
        :class="[currentSegment === 'projects' ? 'text-zinc-100' : 'text-zinc-400']"
        >Projects</NuxtLink
      >
      <NuxtLink
        class="hover:text-zinc-200 transition-colors ease-in-out drop-shadow"
        style="writing-mode: vertical-rl; -webkit-writing-mode: vertical-rl"
        href="#work"
        :class="[currentSegment === 'work' ? 'text-zinc-100' : 'text-zinc-400']"
        >Work</NuxtLink
      >
      <NuxtLink
        class="hover:text-zinc-200 transition-colors ease-in-out drop-shadow-"
        style="writing-mode: vertical-rl; -webkit-writing-mode: vertical-rl"
        href="#contact"
        :class="[currentSegment === 'contact' ? 'text-zinc-100' : 'text-zinc-400']"
        >Contact</NuxtLink
      >
    </div>

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
