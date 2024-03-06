<script setup lang="ts">
import { toRefs } from "vue";
import ExperienceCard from "../ExperienceCard.vue";
import NextJsIcon from "../icons/NextJsIcon.vue";
import NodeJsIcon from "../icons/NodeJsIcon.vue";
import SqlIcon from "../icons/SqlIcon.vue";
import TypeScriptIcon from "../icons/TypeScriptIcon.vue";
import VercelIcon from "../icons/VercelIcon.vue";
import TechIcon from "../TechIcon.vue";

const props = defineProps<{
  onClick: () => void;
  onMouseOver: () => void;
  onMouseLeave: () => void;
}>();

const { onClick, onMouseOver, onMouseLeave } = toRefs(props);
</script>

<template>
  <ExperienceCard
    ref="fotballFeberRef"
    v-motion-fade-visible-once-custom
    :on-click="onClick"
    :on-mouse-over="onMouseOver"
    :on-mouse-leave="onMouseLeave"
    :work-in-progress="true"
  >
    <template #logo>
      <NuxtImg src="/images/projects/fotballfeber/logo.png" alt="FotballFeber Logo" class="select-none w-full" />
    </template>
    <template #default>
      <div class="leading-7 text-white/90 w-full">
        <h2 class="text-2xl font-bold">FotballFeber</h2>
        <h3 class="text-xl font-semibold text-[#55E9B5] break-words wrap">Online Community</h3>
        <h3 class="font-light italic text-sky-200 break-words wrap">Jan 2023 - Current</h3>
        <h4 class="font-light text-zinc-200 break-words wrap mt-2">
          Founder, System Architect and Full-Stack Developer
        </h4>
      </div>
    </template>

    <template #tech>
      <TechIcon v-slot="slotProps" href="https://www.typescriptlang.org/" name="TypeScript" :size="24">
        <TypeScriptIcon :height="slotProps.height" :width="slotProps.width" />
      </TechIcon>

      <TechIcon v-slot="slotProps" href="https://nextjs.org/" name="Next.js" :size="24">
        <NextJsIcon :height="slotProps.height" :width="slotProps.width" />
      </TechIcon>

      <TechIcon v-slot="slotProps" href="https://www.mysql.com/" name="MySQL" :size="24">
        <SqlIcon :height="slotProps.height" :width="slotProps.width" />
      </TechIcon>

      <TechIcon v-slot="slotProps" href="https://nodejs.org/" name="Node.js" :size="24">
        <NodeJsIcon :height="slotProps.height" :width="slotProps.width" />
      </TechIcon>

      <TechIcon v-slot="slotProps" href="https://vercel.com/" name="Vercel" :size="24">
        <VercelIcon :height="slotProps.height" :width="slotProps.width" />
      </TechIcon>
    </template>
  </ExperienceCard>
</template>
