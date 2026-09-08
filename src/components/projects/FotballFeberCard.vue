<script setup lang="ts">
import { toRefs } from "vue";
import ExperienceCard from "../ExperienceCard.vue";
import DockerIcon from "../icons/DockerIcon.vue";
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
        ref="fotballFeberRef"
        v-motion-fade-visible-once-custom
        :on-click="onClick"
        :on-mouse-over="onMouseOver"
        :on-mouse-leave="onMouseLeave"
        :work-in-progress="false"
    >
        <template #logo>
            <NuxtImg
                src="/images/projects/fotballfeber/logo.png"
                loading="lazy"
                alt="Fotballfeber Logo"
                class="select-none w-full"
            />
        </template>
        <template #default>
            <div class="leading-7 text-white/90 w-full">
                <h2 class="text-2xl font-bold">Fotballfeber</h2>
                <p class="text-xl font-semibold text-[#55E9B5] break-words wrap">Live · Online Community</p>
                <p class="font-light italic text-sky-200 break-words wrap">Dec 2022 - Current</p>
                <p class="font-light text-zinc-200 break-words wrap mt-2">
                    Founder, System Architect and Full-Stack Developer
                </p>
                <!-- Visible without opening the modal: this is the evidence that
                     separates the profile from every other React contractor. -->
                <p class="font-light text-sky-200/80 break-words wrap mt-1 text-sm">
                    Self-hosted platform · 104 containers · prod and non-prod on Hetzner
                </p>
            </div>
        </template>

        <template #tech>
            <TechIcon v-slot="slotProps" href="https://www.typescriptlang.org/" name="TypeScript" :size="24">
                <TypeScriptIcon :height="slotProps.height" :width="slotProps.width" />
            </TechIcon>

            <TechIcon v-slot="slotProps" href="https://nextjs.org/" name="Next.js" :size="24">
                <NextJsIcon :height="slotProps.height" :width="slotProps.width" />
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
