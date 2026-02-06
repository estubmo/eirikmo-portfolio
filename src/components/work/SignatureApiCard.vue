<script setup lang="ts">
import { toRefs } from "vue";
import ExperienceCard from "../ExperienceCard.vue";
import NextJsIcon from "../icons/NextJsIcon.vue";
import ReactIcon from "../icons/ReactIcon.vue";
import TypeScriptIcon from "../icons/TypeScriptIcon.vue";
import ZustandIcon from "../icons/ZustandIcon.vue";
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
        ref="signatureApiRef"
        v-motion-fade-visible-once-custom
        :on-click="onClick"
        :on-mouse-over="onMouseOver"
        :on-mouse-leave="onMouseLeave"
    >
        <template #logo>
            <NuxtImg
                src="/images/work/signatureapi/logo.png"
                loading="lazy"
                alt="Signature API Logo"
                class="select-none w-full"
            />
        </template>

        <template #default>
            <div class="leading-7 text-white/90 w-full">
                <h2 class="text-2xl font-bold">Signature API</h2>
                <p class="text-xl font-semibold text-[#60a5fa] break-words wrap">Software Development</p>
                <p class="font-light italic text-sky-200 break-words wrap">Jul 2024 · 1 mo</p>
                <p class="font-light text-zinc-200 break-words wrap mt-2">Senior Frontend Developer</p>
                <p class="font-bold italic">Contract · Remote</p>
            </div>
        </template>

        <template #tech>
            <TechIcon v-slot="slotProps" href="https://www.typescriptlang.org/" name="TypeScript" :size="24">
                <TypeScriptIcon :height="slotProps.height" :width="slotProps.width" />
            </TechIcon>

            <TechIcon v-slot="slotProps" href="https://nextjs.org/" name="Next.js" :size="24">
                <NextJsIcon :height="slotProps.height" :width="slotProps.width" />
            </TechIcon>

            <TechIcon v-slot="slotProps" href="https://react.dev/" name="React" :size="24">
                <ReactIcon :height="slotProps.height" :width="slotProps.width" />
            </TechIcon>

            <TechIcon v-slot="slotProps" href="https://zustand-demo.pmnd.rs/" name="Zustand" :size="24">
                <ZustandIcon :height="slotProps.height" :width="slotProps.width" />
            </TechIcon>
        </template>
    </ExperienceCard>
</template>
