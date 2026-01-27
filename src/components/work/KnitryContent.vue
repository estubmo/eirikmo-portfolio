<script setup lang="ts">
import ReactIcon from "../icons/ReactIcon.vue";
import TypeScriptIcon from "../icons/TypeScriptIcon.vue";
</script>

<template>
    <div class="grid grid-cols-3 gap-x-8 lg:gap-x-12 text-zinc-200 my-12">
        <div class="col-span-2 my-4">
            <h2 class="md:text-3xl text-4xl font-bold">Knitry</h2>
            <p class="text-2xl font-semibold text-[#f472b6] break-words wrap">Tech Startup</p>
            <p class="text-xl font-light italic text-sky-200 break-words wrap">May 2024 - Aug 2024 · 4 mos</p>
            <p class="text-xl font-light text-zinc-200 break-words wrap mt-2">Senior Frontend Developer</p>
            <p class="text-xl font-bold italic">Contract · Remote</p>
        </div>
        <div class="col-span-1 justify-self-center md:self-end my-4">
            <NuxtImg loading="lazy" src="/images/work/knitry/logo.svg" alt="Knitry Logo" class="select-none w-full" />
        </div>
        <div class="my-4 col-span-3 md:col-span-2 space-y-2">
            <h3 class="text-lg md:text-xl font-bold mt-4">About Knitry</h3>
            <p>Knitry is a tech startup focused on innovative solutions.</p>
        </div>

        <div class="flex flex-col col-span-3 md:col-span-2 gap-2">
            <h3 class="text-lg md:text-xl font-bold mt-4">My Role and Responsibilities</h3>
            <p>
                As a Senior Frontend Developer at Knitry, I worked on building and improving the company's web
                applications, focusing on delivering high-quality user interfaces and experiences.
            </p>
        </div>

        <div class="flex flex-col col-span-3 md:col-span-2 gap-2">
            <h3 class="text-lg md:text-xl font-bold mt-4">The Tech Stack</h3>
            <div class="flex flex-wrap gap-2 mt-4">
                <a href="https://www.typescriptlang.org/" target="_blank" class="group flex flex-col items-center w-16">
                    <div class="p-3 bg-gray-800 rounded-full">
                        <TypeScriptIcon :height="32" :width="32" />
                    </div>
                    <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">TypeScript</div>
                </a>

                <a href="https://react.dev/" target="_blank" class="group flex flex-col items-center w-16">
                    <div class="p-3 bg-gray-800 rounded-full">
                        <ReactIcon :height="32" :width="32" />
                    </div>
                    <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">React</div>
                </a>
            </div>
        </div>
    </div>
</template>
