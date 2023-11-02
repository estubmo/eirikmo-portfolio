<script setup lang="ts">
import DockerIcon from "./icons/DockerIcon.vue";
import DrizzleIcon from "./icons/DrizzleIcon.vue";
import FlyIoIcon from "./icons/FlyIoIcon.vue";
import GitHubIcon from "./icons/GitHubIcon.vue";
import NextJsIcon from "./icons/NextJsIcon.vue";
import NodeJsIcon from "./icons/NodeJsIcon.vue";
import PlanetscaleIcon from "./icons/PlanetscaleIcon.vue";
import PlaywrightIcon from "./icons/PlaywrightIcon.vue";
import ReactIcon from "./icons/ReactIcon.vue";
import RedisIcon from "./icons/RedisIcon.vue";
import SqlIcon from "./icons/SqlIcon.vue";
import TailwindIcon from "./icons/TailwindIcon.vue";
import TanstackIcon from "./icons/TanstackIcon.vue";
import TrpcIcon from "./icons/TrpcIcon.vue";
import TurbopackIcon from "./icons/TurbopackIcon.vue";
import TurborepoIcon from "./icons/TurborepoIcon.vue";
import TypeScriptIcon from "./icons/TypeScriptIcon.vue";
import VercelIcon from "./icons/VercelIcon.vue";
import VitestIcon from "./icons/VitestIcon.vue";
</script>
<template>
  <div class="grid grid-cols-3 gap-x-8 lg:gap-x-12">
    <div class="drop-shadow col-span-2 my-4">
      <h1 class="md:text-3xl text-4xl font-bold drop-shadow">FotballFeber</h1>
      <h2 class="text-xl font-light italic text-sky-200 drop-shadow break-words wrap">
        Where Norwegian Football Fans Unite
      </h2>
      <h3 class="text-lg font-bold mt-2 text-zinc-200 drop-shadow">Bootstrapped Solo Enerepeneur Endevour</h3>
      <h3 class="text-xl font-bold italic text-[#15FF93] drop-shadow">Work in progress</h3>
    </div>
    <div class="col-span-1 justify-self-center md:self-end my-4">
      <img
        src="/images/projects/fotballfeber/logo.png"
        alt="FotballFeber Logo"
        class="select-none w-16 sm:w-24 md:w-32"
      />
    </div>
    <p class="drop-shadow my-4 col-span-3 md:col-span-2">
      FotballFeber is a vibrant online community dedicated to Norwegian football enthusiasts. Here, fans can engage in
      discussions on the latest news, matches, transfers, and rumors, delve into tactical strategies, explore player
      development, analyze statistics, delve into fan culture, and dive into the rich history of Norwegian football.
    </p>
    <div class="flex flex-col col-span-3 md:col-span-1 items-center gap-4 relative row-span-2">
      <img
        src="/images/projects/fotballfeber/screenshot.jpg"
        alt="FotballFeber Login Screen"
        class="select-none md:w-[150%] md:max-w-[150%] lg:w-[125%] lg:max-w-[125%] floating drop-shadow-lg shadow-xl z-20"
      />
    </div>

    <div class="flex flex-col col-span-3 md:col-span-2 gap-2">
      <h3 class="text-lg md:text-xl drop-shadow font-bold mt-4">The Vision</h3>
      <p class="drop-shadow">
        Inspired by the absence of a unified platform for Norwegian football aficionados, I embarked on a mission to
        bring this community to life. My goal was to create a space where supporters from all Norwegian football clubs
        could come together and share their passion for the sport.
      </p>

      <h3 class="text-lg md:text-xl drop-shadow font-bold mt-4">The Technical Journey</h3>
      <p class="drop-shadow">
        Building FotballFeber from the ground up was a fascinating journey. I chose Next.js, React, and TailwindCSS as
        the core technologies. Everything was meticulously organized in a monorepo using Turborepo, and the website is
        seamlessly hosted on Vercel. For state management and data fetching, I adopted Jotai and Tanstack Query. The UI
        is adorned with shadcn/ui, Radix UI, and Lucide icons, ensuring a sleek and user-friendly experience.
        Wireframing involved low-fidelity designs created in Excalidraw and high-fidelity wireframes crafted in Figma.
        Flowcharts and diagrams were illustrated using Excalidraw.
      </p>
    </div>
    <div class="flex flex-col col-span-3 md:col-span-2 gap-2">
      <h3 class="text-lg md:text-xl drop-shadow font-bold mt-4">News Aggregation Magic</h3>
      <p class="drop-shadow">
        To keep the platform abuzz with the latest Norwegian football updates, I developed a method to source articles
        from various Norwegian football news sites, leveraging their public APIs. This involves a Python script for
        monitoring updates on the news sites. The articles go through a meticulous processing pipeline with the aid of
        Upstash Redis, a NodeJS server, and an additional Redis database. An exposed GUI, powered by Fastify, keeps
        things transparent, and it's all hosted on Railway. The articles find their permanent home in a MySQL database
        hosted on Planetscale, and they are rapidly indexed in a high-performance Meilisearch instance on Fly.io. This
        setup ensures seamless search and filtering for users, offering an exceptional browsing experience.
      </p>
    </div>
    <div class="flex flex-col col-span-3 md:col-span-1 items-center gap-4 relative row-span-2">
      <img
        src="/images/projects/fotballfeber/screenshot2.jpg"
        alt="FotballFeber Login Screen"
        class="select-none md:w-[150%] md:max-w-[150%] lg:w-[135%] lg:max-w-[135%] floating drop-shadow-lg shadow-xl z-20"
      />
    </div>
    <div class="flex flex-col col-span-3 md:col-span-2 gap-2">
      <h3 class="text-lg md:text-xl drop-shadow font-bold mt-4">The Road Ahead</h3>

      <p class="drop-shadow">
        FotballFeber is an ever-evolving project with a comprehensive roadmap. The current focus is on finalizing the
        onboarding process and introducing a crucial discussion forum. The next milestone is implementing a subscription
        and payment service, marking the official launch for public use.
      </p>

      <h3 class="text-lg md:text-xl drop-shadow font-bold mt-4">Beyond Passion</h3>
      <p class="drop-shadow">
        The commitment to this project extends beyond my love for Norwegian football and online communities. It has
        become a priceless learning experience in entrepreneurship. As a web developer, I've never learned at such a
        rapid pace as I have during this project. Building something from scratch demands a deep understanding of the
        objectives, which can only be achieved through a pragmatic approach. I've encountered my fair share of
        challenges and setbacks, but each one has been a valuable lesson.
      </p>

      <h3 class="text-lg md:text-xl drop-shadow font-bold mt-4">Evolution as a Developer</h3>
      <p class="drop-shadow">
        I began this project as a regular full-stack web developer. Throughout this project I've learned how to build
        fully functional systems, from beginning to end. I have improved my understandig of backends, my proficiency in
        the different types of databases and which to choose when. I've expanded my software engineering skills by
        delving into software architecture, microservices, message queues, and load balancers. I've had to master DevOps
        as to manage CI/CD, containerization, orchestration, performance monitoring, issue alerting, and analytical
        insights. It's been great fun.
      </p>
      <p class="drop-shadow">
        This project has not only created a community but has also been a transformative experience in personal and
        professional growth. FotballFeber is the embodiment of my passion for Norwegian football and the ever-evolving
        world of web development.
      </p>

      <div class="w-fit mt-4">
        <a
          href="https://www.fotballfeber.com/"
          target="_blank"
          class="text-[#15FF93] font-medium border-[#15FF93] border rounded-md px-4 py-2 space-x-4 flex hover:bg-[#15FF93] hover:text-black transition-all duration-200 ease-in-out items-center"
        >
          <span>Go to FotballFeber </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-external-link"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" x2="21" y1="14" y2="3" />
          </svg>
        </a>
      </div>

      <div class="flex flex-wrap gap-2 mt-4">
        <div class="p-2 bg-gray-800 rounded-md">
          <TypeScriptIcon :height="32" :width="32" />
        </div>
        <div class="p-2 bg-gray-800 rounded-md">
          <NextJsIcon :height="32" :width="32" />
        </div>
        <div class="p-2 bg-gray-800 rounded-md">
          <ReactIcon :height="32" :width="32" />
        </div>
        <div class="p-2 bg-gray-800 rounded-md">
          <TailwindIcon :height="32" :width="32" />
        </div>
        <div class="p-2 bg-gray-800 rounded-md">
          <DrizzleIcon :height="32" :width="32" />
        </div>
        <div class="p-2 bg-gray-800 rounded-md">
          <SqlIcon :height="32" :width="32" />
        </div>
        <div class="p-2 bg-gray-800 rounded-md">
          <PlanetscaleIcon :height="32" :width="32" />
        </div>
        <div class="p-2 bg-gray-800 rounded-md">
          <TurborepoIcon :height="32" :width="32" />
        </div>
        <div class="p-2 bg-gray-800 rounded-md">
          <TurbopackIcon :height="32" :width="32" />
        </div>
        <div class="p-2 bg-gray-800 rounded-md">
          <RedisIcon :height="32" :width="32" />
        </div>
        <div class="p-2 bg-gray-800 rounded-md">
          <NodeJsIcon :height="32" :width="32" />
        </div>
        <div class="p-2 bg-gray-800 rounded-md">
          <TanstackIcon :height="32" :width="32" />
        </div>
        <div class="p-2 bg-gray-800 rounded-md">
          <TrpcIcon :height="32" :width="32" />
        </div>
        <div class="p-2 bg-gray-800 rounded-md">
          <DockerIcon :height="32" :width="32" />
        </div>
        <div class="p-2 bg-gray-800 rounded-md">
          <VitestIcon :height="32" :width="32" />
        </div>
        <div class="p-2 bg-gray-800 rounded-md">
          <PlaywrightIcon :height="32" :width="32" />
        </div>
        <div class="p-2 bg-gray-800 rounded-md">
          <VercelIcon :height="32" :width="32" />
        </div>
        <div class="p-2 bg-gray-800 rounded-md">
          <FlyIoIcon :height="32" :width="32" />
        </div>
        <div class="p-2 bg-gray-800 rounded-md">
          <GitHubIcon :height="32" :width="32" />
        </div>
      </div>
    </div>
  </div>
</template>
