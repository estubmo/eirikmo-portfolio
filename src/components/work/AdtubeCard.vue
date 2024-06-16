<script setup lang="ts">
import CSharpIcon from "~/components/icons/CSharpIcon.vue";
import { toRefs } from "vue";
import ExperienceCard from "../ExperienceCard.vue";
import GraphlQlIcon from "../icons/GraphlQlIcon.vue";
import MongoDbIcon from "../icons/MongoDbIcon.vue";
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
            <NuxtImg src="/images/work/adtube/logo.png" loading="lazy" alt="Adtube Logo" class="select-none w-full" />
        </template>
        <template #default>
            <div class="leading-7 text-white/90 w-full">
                <h2 class="text-2xl font-bold">Adtube Solutions</h2>
                <p class="text-xl font-semibold text-[#40c0c2] break-words wrap">Digital Advertisement Solution</p>
                <p class="font-light italic text-sky-200 break-words wrap">May 2019 - Apr 2021 · 2 yrs</p>
                <p class="font-light text-zinc-200 break-words wrap mt-2">Full-Stack Developer</p>
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

            <TechIcon v-slot="slotProps" href="https://graphql.org/" name="GraphQL" :size="24">
                <GraphlQlIcon :height="slotProps.height" :width="slotProps.width" />
            </TechIcon>

            <TechIcon v-slot="slotProps" href="https://learn.microsoft.com/en-us/dotnet/csharp/" name="C#" :size="24">
                <CSharpIcon :height="slotProps.height" :width="slotProps.width" />
            </TechIcon>

            <TechIcon v-slot="slotProps" href="https://www.mongodb.com//" name="MongoDB" :size="24">
                <MongoDbIcon :height="slotProps.height" :width="slotProps.width" />
            </TechIcon>
        </template>
    </ExperienceCard>
</template>
