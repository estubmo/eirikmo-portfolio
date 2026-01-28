<script setup lang="ts">
import FigmaIcon from "../icons/FigmaIcon.vue";
import MuiIcon from "../icons/MuiIcon.vue";
import ReactIcon from "../icons/ReactIcon.vue";
import StripeIcon from "../icons/StripeIcon.vue";
import TailwindIcon from "../icons/TailwindIcon.vue";
import TanstackIcon from "../icons/TanstackIcon.vue";
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
            <p>
                Knitry is a tech startup building a platform for the knitting community, providing tools for managing
                patterns, yarns, needles, and other crafting resources.
            </p>
        </div>

        <div class="flex flex-col col-span-3 md:col-span-2 gap-2">
            <h3 class="text-lg md:text-xl font-bold mt-4">My Role and Responsibilities</h3>
            <p>
                As a Senior Frontend Developer at Knitry, I was responsible for engineering key features and optimizing
                the application's architecture and state management.
            </p>
            <ul class="pl-4 list-disc">
                <li>
                    Optimized application state management by migrating from Redux to TanStack Query, simplifying data
                    flow and improving performance.
                </li>
                <li>
                    Integrated and configured Stripe for secure payment processing, utilizing the Stripe API for
                    handling payment intents and managing webhooks to reliably update application state following
                    successful transactions.
                </li>
                <li>
                    Engineered key features, such as creation, management and editing of yarns and needles, from the
                    ground up using React.js, TypeScript, and Tailwind CSS.
                </li>
                <li>
                    Collaborated with the design team to translate Figma mockups into pixel-perfect, responsive user
                    interfaces, ensuring a seamless user experience across all devices.
                </li>
                <li>
                    Developed and documented a series of over 15 reusable and accessible UI components, accelerating
                    future development cycles.
                </li>
            </ul>
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

                <a href="https://tanstack.com/query" target="_blank" class="group flex flex-col items-center w-16">
                    <div class="p-3 bg-gray-800 rounded-full">
                        <TanstackIcon :height="32" :width="32" />
                    </div>
                    <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">
                        TanStack Query
                    </div>
                </a>

                <a href="https://mui.com/" target="_blank" class="group flex flex-col items-center w-16">
                    <div class="p-3 bg-gray-800 rounded-full">
                        <MuiIcon :height="32" :width="32" />
                    </div>
                    <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">MUI</div>
                </a>

                <a href="https://tailwindcss.com/" target="_blank" class="group flex flex-col items-center w-16">
                    <div class="p-3 bg-gray-800 rounded-full">
                        <TailwindIcon :height="32" :width="32" />
                    </div>
                    <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Tailwind CSS</div>
                </a>

                <a href="https://stripe.com/" target="_blank" class="group flex flex-col items-center w-16">
                    <div class="p-3 bg-gray-800 rounded-full">
                        <StripeIcon :height="32" :width="32" />
                    </div>
                    <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Stripe</div>
                </a>

                <a href="https://www.figma.com/" target="_blank" class="group flex flex-col items-center w-16">
                    <div class="p-3 bg-gray-800 rounded-full">
                        <FigmaIcon :height="32" :width="32" />
                    </div>
                    <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Figma</div>
                </a>
            </div>
        </div>
    </div>
</template>
