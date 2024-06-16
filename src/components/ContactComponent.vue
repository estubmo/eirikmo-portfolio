<script setup lang="ts">
import SocialsComponent from "./SocialsComponent.vue";
</script>

<template>
    <div class="flex flex-col p-4 max-w-xl gap-2">
        <h2 ref="target" v-motion-slide-visible-once-left-custom class="text-4xl font-extrabold mb-4">Contact</h2>
        <div v-motion-slide-visible-once-left-custom class="gap-3 flex">
            <div class="h-3 w-16 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-sm" />
            <div class="h-3 w-8 bg-gradient-to-r from-purple-300 to-purple-400 rounded-sm" />
            <div class="h-3 w-10 bg-gradient-to-r from-green-300 to-green-400 rounded-sm" />
        </div>
        <div v-motion-slide-visible-once-left-custom class="flex">
            <h3 class="text-4xl">Let’s Work Together</h3>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M14 14L34 34"
                    stroke="#F9FAFB"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M34 14V34H14"
                    stroke="#F9FAFB"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </div>
        <p v-motion-slide-visible-once-left-custom class="text-lg">
            I am currently open to interesting remote projects
        </p>
        <p v-motion-slide-visible-once-left-custom class="text-lg">
            I operate under the legal entity of Mo Web Dev AS.
        </p>
        <div v-motion-slide-visible-once-left-custom>
            <p>Call me:</p>
            <a class="hover:underline font-mono" href="tel:+4797602278">+47 976 02 278</a>
        </div>
        <div v-motion-slide-visible-once-left-custom>
            <p>Email me:</p>
            <a class="hover:underline font-mono" href="mailto:eirik@mowebdev.com">eirik@mowebdev.com</a>
        </div>
        <div v-motion-slide-visible-once-left-custom class="md:hidden block">
            <p>Follow me:</p>
            <div class="flex space-x-6 font-light text-zinc-400 mt-2">
                <SocialsComponent />
            </div>
        </div>
    </div>
</template>
