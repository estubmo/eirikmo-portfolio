<script setup lang="ts">
import TechContainer from "./TechContainer.vue";
</script>

<template>
    <div class="flex flex-col w-full max-w-3xl gap-2 backdrop-blur-sm bg-gray-600/5 p-6 rounded-lg">
        <a v-motion-slide-visible-once-left-custom href="#expertise">
            <h2 class="text-4xl font-extrabold mb-4">Expertise</h2>
        </a>
        <div v-motion-slide-visible-once-left-custom class="gap-3 flex">
            <div class="h-3 w-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-sm" />
            <div class="h-3 w-16 bg-gradient-to-r from-green-300 to-green-400 rounded-sm" />
            <div class="h-3 w-8 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-sm" />
        </div>
        <p v-motion-slide-visible-once-left-custom class="md:text-lg">
            Are you in need of a pragmatic enthusiast to drive your project forward?
        </p>
        <p v-motion-slide-visible-once-left-custom class="md:text-lg">
            I work with AI agents daily, which by now is unremarkable. What decides whether that helps is the ground it
            runs on.
            <a
                href="https://dora.dev/"
                target="_blank"
                rel="noopener"
                class="underline decoration-sky-200/40 underline-offset-4 hover:decoration-sky-200"
                >DORA's 2025 research</a
            >
            found that where platform quality is high, AI adoption has a strong positive effect on performance, and
            where platform quality is low, the effect is negligible.
        </p>
        <p v-motion-slide-visible-once-left-custom class="md:text-lg">
            So the time goes into the parts that decide it: a spec before the code, infrastructure in git, changes that
            land with the tests that cover them, and monitoring defined as code. The speed is downstream of that, not a
            substitute for it. It is also why I operate my own platform rather than only writing code for someone
            else's. If you need one person who can take a product from an empty repo to something that stays up, that is
            the work I do.
        </p>
    </div>
    <div class="w-full flex flex-col">
        <div class="w-full flex-flex-col shadow-xl rounded-lg backdrop-blur-sm bg-gray-600/5 p-6">
            <h2 v-motion-slide-visible-once-right-custom class="text-2xl font-bold mb-4">Tech</h2>
            <p v-motion-slide-visible-once-right-custom class="md:text-lg mb-2">
                These are just some of the technologies I am familiar with.
            </p>
            <TechContainer />
            <p v-motion-slide-visible-once-right-custom class="mt-2 max-w-3xl">
                <span class="italic">
                    Thank you to those who contributed to any of these technologies, especially the open-source ones.
                    You allow me, and many others, to do what we love.
                </span>
                ❤️
            </p>
        </div>

        <div v-motion-slide-visible-once-right-custom class="gap-3 flex w-full mt-4">
            <div class="h-3 w-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-sm" />
            <div class="h-3 w-16 bg-gradient-to-r from-green-300 to-green-400 rounded-sm" />
            <div class="h-3 w-8 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-sm" />
        </div>
    </div>
</template>
