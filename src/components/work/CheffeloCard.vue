<script setup lang="ts">
import { toRefs } from "vue";
import ExperienceCard from "../ExperienceCard.vue";
import AzureIcon from "../icons/AzureIcon.vue";
import GraphlQlIcon from "../icons/GraphlQlIcon.vue";
import NextJsIcon from "../icons/NextJsIcon.vue";
import NxIcon from "../icons/NxIcon.vue";
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
    ref="cheffeloRef"
    v-motion-fade-visible-once-custom
    :on-click="onClick"
    :on-mouse-over="onMouseOver"
    :on-mouse-leave="onMouseLeave"
  >
    <template #logo>
      <img src="/images/work/cheffelo/cheffelo_logo.svg" alt="Cheffelo Logo" class="select-none w-full" />
    </template>
    <template #default>
      <div class="text-base leading-7 text-white/90 w-full">
        <h1 class="text-2xl font-bold">Cheffelo</h1>
        <h2 class="text-sm font-light italic text-zinc-300 break-words wrap">
          Previously known as GodtlevertGruppen AS
        </h2>
        <h2 class="text-lg font-semibold text-[#e56962] break-words wrap">E-commerce Meal Kit Delivery</h2>
        <h2 class="text-lg font-light italic text-sky-200 break-words wrap">May 2021 - Aug 2022 · 1 yr 4 mos</h2>
        <h3 class="text-lg font-light text-zinc-200 break-words wrap mt-2">Front-end Web Developer</h3>
        <h3 class="text-lg font-bold">Contract · Remote</h3>
      </div>
    </template>

    <template #tech>
      <TechIcon v-slot="slotProps" href="https://www.typescriptlang.org/" name="TypeScript" :size="24">
        <TypeScriptIcon :height="slotProps.height" :width="slotProps.width" />
      </TechIcon>

      <TechIcon v-slot="slotProps" href="https://nextjs.org/" name="Next.js" :size="24">
        <NextJsIcon :height="slotProps.height" :width="slotProps.width" />
      </TechIcon>

      <TechIcon v-slot="slotProps" href="https://graphql.org/" name="GraphQL" :size="24">
        <GraphlQlIcon :height="slotProps.height" :width="slotProps.width" />
      </TechIcon>

      <TechIcon v-slot="slotProps" href="https://nx.dev/" name="Nx" :size="24">
        <NxIcon :height="slotProps.height" :width="slotProps.width" />
      </TechIcon>

      <TechIcon v-slot="slotProps" href="https://azure.microsoft.com/en-us" name="Azure" :size="24">
        <AzureIcon :height="slotProps.height" :width="slotProps.width" />
      </TechIcon>
    </template>
  </ExperienceCard>
</template>