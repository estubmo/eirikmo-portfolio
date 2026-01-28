<script setup lang="ts">
import { toRefs } from "vue";
import ExperienceCard from "../ExperienceCard.vue";
import MuiIcon from "../icons/MuiIcon.vue";
import ReactIcon from "../icons/ReactIcon.vue";
import StripeIcon from "../icons/StripeIcon.vue";
import TanstackIcon from "../icons/TanstackIcon.vue";
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
        ref="knitryRef"
        v-motion-fade-visible-once-custom
        :on-click="onClick"
        :on-mouse-over="onMouseOver"
        :on-mouse-leave="onMouseLeave"
    >
        <template #logo>
            <NuxtImg src="/images/work/knitry/logo.svg" loading="lazy" alt="Knitry Logo" class="select-none w-full" />
        </template>

        <template #default>
            <div class="leading-7 text-white/90 w-full">
                <h2 class="text-2xl font-bold">Knitry</h2>
                <p class="text-xl font-semibold text-[#ceff1a] break-words wrap">Tech Startup</p>
                <p class="font-light italic text-sky-200 break-words wrap">May 2024 - Aug 2024 · 4 mos</p>
                <p class="font-light text-zinc-200 break-words wrap mt-2">Senior Frontend Developer</p>
                <p class="font-bold italic">Contract · Remote</p>
            </div>
        </template>

        <template #tech>
            <TechIcon v-slot="slotProps" href="https://www.typescriptlang.org/" name="TypeScript" :size="24">
                <TypeScriptIcon :height="slotProps.height" :width="slotProps.width" />
            </TechIcon>

            <TechIcon v-slot="slotProps" href="https://react.dev/" name="React" :size="24">
                <ReactIcon :height="slotProps.height" :width="slotProps.width" />
            </TechIcon>

            <TechIcon v-slot="slotProps" href="https://tanstack.com/query" name="TanStack Query" :size="24">
                <TanstackIcon :height="slotProps.height" :width="slotProps.width" />
            </TechIcon>

            <TechIcon v-slot="slotProps" href="https://mui.com/" name="MUI" :size="24">
                <MuiIcon :height="slotProps.height" :width="slotProps.width" />
            </TechIcon>

            <TechIcon v-slot="slotProps" href="https://stripe.com/" name="Stripe" :size="24">
                <StripeIcon :height="slotProps.height" :width="slotProps.width" />
            </TechIcon>
        </template>
    </ExperienceCard>
</template>
