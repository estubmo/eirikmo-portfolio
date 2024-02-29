<script setup lang="ts">
import { toRefs } from "vue";
import ExperienceCard from "../ExperienceCard.vue";
import GraphlQlIcon from "../icons/GraphlQlIcon.vue";
import MongoDbIcon from "../icons/MongoDbIcon.vue";
import NodeJsIcon from "../icons/NodeJsIcon.vue";
import ReactIcon from "../icons/ReactIcon.vue";
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
    ref="adtubeRef"
    v-motion-fade-visible-once-custom
    :on-click="onClick"
    :on-mouse-over="onMouseOver"
    :on-mouse-leave="onMouseLeave"
  >
    <template #logo>
      <img src="/images/work/adtube/logo.png" alt="Adtube Logo" class="select-none w-full" />
    </template>
    <template #default>
      <div class="text-base leading-7 text-white/90 w-full">
        <h1 class="text-2xl font-bold">Adtube Solutions</h1>
        <h2 class="text-lg font-semibold text-[#40c0c2] break-words wrap">Digital Advertisement Solution</h2>
        <h2 class="text-lg font-light italic text-sky-200 break-words wrap">May 2020 - Apr 2021 · 1 yr</h2>
        <h3 class="text-lg font-light text-zinc-200 break-words wrap mt-2">Full-Stack Developer</h3>
        <h3 class="text-lg font-bold">Contract · Remote</h3>
      </div>
    </template>

    <template #tech>
      <TechIcon v-slot="slotProps" href="https://www.typescriptlang.org/" name="TypeScript" :size="24">
        <TypeScriptIcon :height="slotProps.height" :width="slotProps.width" />
      </TechIcon>

      <TechIcon v-slot="slotProps" href="https://react.dev/" name="React" :size="24">
        <ReactIcon :height="slotProps.height" :width="slotProps.width" />
      </TechIcon>

      <TechIcon v-slot="slotProps" href="https://graphql.org/" name="GraphQL" :size="24">
        <GraphlQlIcon :height="slotProps.height" :width="slotProps.width" />
      </TechIcon>

      <TechIcon v-slot="slotProps" href="https://nodejs.org/" name="Node.js" :size="24">
        <NodeJsIcon :height="slotProps.height" :width="slotProps.width" />
      </TechIcon>

      <TechIcon v-slot="slotProps" href="https://www.mongodb.com//" name="MongoDB" :size="24">
        <MongoDbIcon :height="slotProps.height" :width="slotProps.width" />
      </TechIcon>
    </template>
  </ExperienceCard>
</template>
