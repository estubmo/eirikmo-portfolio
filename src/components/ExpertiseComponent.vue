<script setup>
import TechContainer from "./TechContainer.vue";
</script>

<template>
  <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full">
    <div class="lg:w-1/2">
      <div class="flex flex-col max-w-xl gap-2">
        <a href="#expertise"><h2 class="text-4xl font-extrabold mb-4">Expertise</h2></a>
        <div class="gap-3 flex">
          <div class="h-3 w-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-sm" />
          <div class="h-3 w-16 bg-gradient-to-r from-green-300 to-green-400 rounded-sm" />
          <div class="h-3 w-8 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-sm" />
        </div>
        <p class="md:text-lg">Are you searching for a practical enthusiast for your project?</p>
        <p class="md:text-lg">
          I speak the languages of both engineering and aesthetics, being perfectly positioned to formulate the path of
          a feasible product with customer experience in mind. My preferred work is fullstack development. I'm using the
          best tool for the job, be it a reliable framework or the latest web features.
        </p>
        <p class="md:text-lg">
          Neither impressive interfaces nor blazing performance are the solution, but the balance between a maintainable
          implementation and user-focused functionality.
        </p>
      </div>
    </div>
    <div class="flex flex-col gap-2 lg:w-1/2">
      <div class="max-w-xl">
        <h2 class="text-2xl font-bold mb-4">Tech</h2>
        <p class="md:text-lg mb-2">These are just some of the technologies I am familiar with.</p>
        <TechContainer />
        <p class="mt-2">
          <span class="italic">
            Thank you to those who contributed to any of these technologies, especially the open-source ones. You allow
            me, and many others, to do what we love.
          </span>
          ❤️
        </p>

        <div class="gap-3 flex w-full lg:justify-end mt-4">
          <div class="h-3 w-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-sm" />
          <div class="h-3 w-16 bg-gradient-to-r from-green-300 to-green-400 rounded-sm" />
          <div class="h-3 w-8 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-sm" />
        </div>
      </div>
    </div>
  </div>
</template>
