<script setup lang="ts">
import { toRefs } from "vue";
import ExperienceCard from "../ExperienceCard.vue";
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
        ref="duckyRef"
        v-motion-fade-visible-once-custom
        :on-click="onClick"
        :on-mouse-over="onMouseOver"
        :on-mouse-leave="onMouseLeave"
    >
        <template #logo>
            <NuxtImg src="/images/work/ducky/logo.png" loading="lazy" alt="Ducky Logo" class="select-none w-full" />
        </template>

        <template #default>
            <div class="leading-7 text-white/90 w-full">
                <h2 class="text-2xl font-bold">Ducky</h2>
                <p class="text-xl font-semibold text-[#4ade80] break-words wrap">Climate Tech Platform</p>
                <p class="font-light italic text-sky-200 break-words wrap">Sep 2024 - Nov 2025 · 1 yr 3 mos</p>
                <p class="font-light text-zinc-200 break-words wrap mt-2">Senior Software Developer</p>
                <p class="font-bold italic">Full-time · Remote</p>
            </div>
        </template>

        <template #tech>
            <TechIcon v-slot="slotProps" href="https://www.typescriptlang.org/" name="TypeScript" :size="24">
                <TypeScriptIcon :height="slotProps.height" :width="slotProps.width" />
            </TechIcon>

            <TechIcon v-slot="slotProps" href="https://react.dev/" name="React" :size="24">
                <ReactIcon :height="slotProps.height" :width="slotProps.width" />
            </TechIcon>
        </template>
    </ExperienceCard>
</template>
