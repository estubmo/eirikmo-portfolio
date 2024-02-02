<script setup lang="ts">
import { toRefs } from "vue";
import ExperienceCard from "../ExperienceCard.vue";
import DockerIcon from "../icons/DockerIcon.vue";
import MedusaIcon from "../icons/MedusaIcon.vue";
import NextJsIcon from "../icons/NextJsIcon.vue";
import NodeJsIcon from "../icons/NodeJsIcon.vue";
import PostgreSqlIcon from "../icons/PostgreSqlIcon.vue";
import TypeScriptIcon from "../icons/TypeScriptIcon.vue";
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
    ref="svanhildstubRef"
    v-motion-fade-visible-once-custom
    :on-click="onClick"
    :on-mouse-over="onMouseOver"
    :on-mouse-leave="onMouseLeave"
  >
    <template #logo>
      <img src="/images/projects/svanhildstub/logo.png" alt="SvanhildStub Logo" class="select-none w-full" />
    </template>
    <template #default>
      <div class="text-base leading-7 text-white/90 w-full">
        <h1 class="text-2xl font-bold">Svanhild Stub</h1>
        <h2 class="text-lg font-semibold text-[#d4c76c] break-words wrap">E-commerce Store & Gallery</h2>
        <h2 class="text-lg font-light italic text-sky-200 break-words wrap">Jan 2024</h2>
        <h3 class="text-lg font-light text-zinc-200 break-words wrap mt-2">Developer and System Administrator</h3>
      </div>
    </template>

    <template #tech>
      <TechIcon v-slot="slotProps" href="https://www.typescriptlang.org/" name="TypeScript" :size="24">
        <TypeScriptIcon :height="slotProps.height" :width="slotProps.width" />
      </TechIcon>

      <TechIcon v-slot="slotProps" href="https://nextjs.org/" name="Next.js" :size="24">
        <NextJsIcon :height="slotProps.height" :width="slotProps.width" />
      </TechIcon>

      <TechIcon v-slot="slotProps" href="https://medusajs.com/" name="Medusa.js" :size="24">
        <MedusaIcon :height="slotProps.height" :width="slotProps.width" />
      </TechIcon>

      <TechIcon v-slot="slotProps" href="https://www.postgresql.org/" name="PostgreSQL" :size="24">
        <PostgreSqlIcon :height="slotProps.height" :width="slotProps.width" />
      </TechIcon>

      <TechIcon v-slot="slotProps" href="https://nodejs.org/" name="Node.js" :size="24">
        <NodeJsIcon :height="slotProps.height" :width="slotProps.width" />
      </TechIcon>

      <TechIcon v-slot="slotProps" href="https://www.docker.com/" name="Docker" :size="24">
        <DockerIcon :height="slotProps.height" :width="slotProps.width" />
      </TechIcon>
    </template>
  </ExperienceCard>
</template>
