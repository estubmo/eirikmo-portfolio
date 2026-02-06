<script setup lang="ts">
import NextJsIcon from "../icons/NextJsIcon.vue";
import ReactIcon from "../icons/ReactIcon.vue";
import TypeScriptIcon from "../icons/TypeScriptIcon.vue";
import ZustandIcon from "../icons/ZustandIcon.vue";
</script>

<template>
    <div class="grid grid-cols-3 gap-x-8 lg:gap-x-12 text-zinc-200 my-12">
        <div class="col-span-2 my-4">
            <h2 class="md:text-3xl text-4xl font-bold">Signature API</h2>
            <p class="text-2xl font-semibold text-[#60a5fa] break-words wrap">Software Development</p>
            <p class="text-xl font-light italic text-sky-200 break-words wrap">Jul 2024 · 1 mo</p>
            <p class="text-xl font-light text-zinc-200 break-words wrap mt-2">Senior Frontend Developer</p>
            <p class="text-xl font-bold italic">Contract · Remote</p>
        </div>
        <div class="col-span-1 justify-self-center md:self-end my-4">
            <NuxtImg
                loading="lazy"
                src="/images/work/signatureapi/logo.png"
                alt="Signature API Logo"
                class="select-none w-full"
            />
        </div>
        <div class="my-4 col-span-3 md:col-span-2 space-y-2">
            <h3 class="text-lg md:text-xl font-bold mt-4">About Signature API</h3>
            <p>
                Signature API is a software company providing digital signature ceremony solutions, enabling businesses
                to handle document signing workflows securely and efficiently.
            </p>
        </div>

        <div class="flex flex-col col-span-3 md:col-span-2 gap-2">
            <h3 class="text-lg md:text-xl font-bold mt-4">My Role and Responsibilities</h3>
            <p>
                I conducted a comprehensive review of Signature API's signature ceremony system, identifying and
                prioritizing a series of critical issues. After careful categorization and time estimation, I focused on
                resolving the highest-impact problems.
            </p>
            <p>
                This involved a substantial codebase overhaul, strictly adhering to SOLID principles, Next.js and React
                best practices, and Zustand for state management. As a result, system performance increased
                significantly, and the client expressed exceptional satisfaction with the work, process, and
                communication.
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

                <a href="https://nextjs.org/" target="_blank" class="group flex flex-col items-center w-16">
                    <div class="p-3 bg-gray-800 rounded-full">
                        <NextJsIcon :height="32" :width="32" />
                    </div>
                    <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Next.js</div>
                </a>

                <a href="https://react.dev/" target="_blank" class="group flex flex-col items-center w-16">
                    <div class="p-3 bg-gray-800 rounded-full">
                        <ReactIcon :height="32" :width="32" />
                    </div>
                    <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">React</div>
                </a>

                <a href="https://zustand-demo.pmnd.rs/" target="_blank" class="group flex flex-col items-center w-16">
                    <div class="p-3 bg-gray-800 rounded-full">
                        <ZustandIcon :height="32" :width="32" />
                    </div>
                    <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Zustand</div>
                </a>
            </div>
        </div>
    </div>
</template>
