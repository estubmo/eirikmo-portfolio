<script setup lang="ts">
import TechContainer from "./TechContainer.vue";
</script>

<template>
  <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full">
    <div class="lg:w-1/2">
      <div class="flex flex-col max-w-xl gap-2">
        <a v-motion-slide-visible-once-left-custom href="#expertise"
          ><h2 class="text-4xl font-extrabold mb-4">Expertise</h2></a
        >
        <div v-motion-slide-visible-once-left-custom class="gap-3 flex">
          <div class="h-3 w-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-sm" />
          <div class="h-3 w-16 bg-gradient-to-r from-green-300 to-green-400 rounded-sm" />
          <div class="h-3 w-8 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-sm" />
        </div>
        <p v-motion-slide-visible-once-left-custom class="md:text-lg">
          Are you in need of a pragmatic enthusiast to drive your project forward?
        </p>
        <p v-motion-slide-visible-once-left-custom class="md:text-lg">
          Fluent in the languages of engineering and aesthetics, I'm uniquely equipped to chart a course for a practical
          product that prioritizes the customer's experience. My forte is full-stack development, and I'm committed to
          choosing the most fitting tools for each project, whether it's a robust framework or the latest web
          innovations.
        </p>
        <p v-motion-slide-visible-once-left-custom class="md:text-lg">
          I understand that the key lies not only in impressive interfaces and blazing performance but also in striking
          a harmonious balance between sustainable implementation and user-centric functionality. Let's collaborate to
          bring your project to life.
        </p>
      </div>
    </div>
    <div class="flex flex-col gap-2 lg:w-1/2">
      <div class="max-w-xl">
        <h2 v-motion-slide-visible-once-right-custom class="text-2xl font-bold mb-4">Tech</h2>
        <p v-motion-slide-visible-once-right-custom class="md:text-lg mb-2">
          These are just some of the technologies I am familiar with.
        </p>
        <TechContainer />
        <p v-motion-slide-visible-once-right-custom class="mt-2">
          <span class="italic">
            Thank you to those who contributed to any of these technologies, especially the open-source ones. You allow
            me, and many others, to do what we love.
          </span>
          ❤️
        </p>

        <div v-motion-slide-visible-once-right-custom class="gap-3 flex w-full lg:justify-end mt-4">
          <div class="h-3 w-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-sm" />
          <div class="h-3 w-16 bg-gradient-to-r from-green-300 to-green-400 rounded-sm" />
          <div class="h-3 w-8 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-sm" />
        </div>
      </div>
    </div>
  </div>
</template>
