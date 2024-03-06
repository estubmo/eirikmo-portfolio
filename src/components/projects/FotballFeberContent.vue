<script setup lang="ts">
import DockerIcon from "../icons/DockerIcon.vue";
import DrizzleIcon from "../icons/DrizzleIcon.vue";
import FlyIoIcon from "../icons/FlyIoIcon.vue";
import GitHubIcon from "../icons/GitHubIcon.vue";
import NextJsIcon from "../icons/NextJsIcon.vue";
import NodeJsIcon from "../icons/NodeJsIcon.vue";
import PlanetscaleIcon from "../icons/PlanetscaleIcon.vue";
import PlaywrightIcon from "../icons/PlaywrightIcon.vue";
import ReactIcon from "../icons/ReactIcon.vue";
import RedisIcon from "../icons/RedisIcon.vue";
import SqlIcon from "../icons/SqlIcon.vue";
import TailwindIcon from "../icons/TailwindIcon.vue";
import TanstackIcon from "../icons/TanstackIcon.vue";
import TrpcIcon from "../icons/TrpcIcon.vue";
import TurbopackIcon from "../icons/TurbopackIcon.vue";
import TurborepoIcon from "../icons/TurborepoIcon.vue";
import TypeScriptIcon from "../icons/TypeScriptIcon.vue";
import VercelIcon from "../icons/VercelIcon.vue";
import VitestIcon from "../icons/VitestIcon.vue";
</script>

<template>
  <div class="grid grid-cols-3 gap-x-8 lg:gap-x-12 text-zinc-200 my-12">
    <div class="col-span-2 my-4">
      <h2 class="md:text-3xl text-4xl font-bold">FotballFeber</h2>
      <h3 class="text-2xl font-semibold text-[#55E9B5] break-words wrap">Online Community</h3>
      <h3 class="text-xl font-light italic text-sky-200 break-words wrap">Where Norwegian Football Fans Unite</h3>
      <h3 class="text-xl font-light italic text-sky-200 break-words wrap">Jan 2023 - Current</h3>
      <h4 class="text-xl font-light text-zinc-200 break-words wrap mt-2">
        Founder, System Architect and Full-Stack Developer
      </h4>
      <h4 class="text-xl font-bold italic text-[#15FF93]">Work in progress</h4>
    </div>
    <div class="col-span-1 justify-self-center md:self-end my-4">
      <NuxtImg
        loading="lazy"
        src="/images/projects/fotballfeber/logo.png"
        alt="FotballFeber Logo"
        class="select-none w-16 sm:w-24 md:w-32"
      />
    </div>
    <p class="my-4 col-span-3 md:col-span-2">
      FotballFeber is an upcoming vibrant online community dedicated to Norwegian football enthusiasts. Here, fans can
      engage in discussions on the latest news, matches, transfers, and rumors, delve into tactical strategies, explore
      player development, analyze statistics, delve into fan culture, and dive into the rich history of Norwegian
      football.
    </p>
    <div
      class="flex flex-col col-span-3 md:col-span-1 items-center gap-4 relative row-span-2 px-2 sm:px-10 md:px-0 my-6"
    >
      <NuxtImg
        loading="lazy"
        src="/images/projects/fotballfeber/screenshot001.webp"
        alt="FotballFeber Login Screen"
        class="select-none w-full md:w-[150%] md:max-w-[150%] lg:w-[125%] lg:max-w-[125%] md:floating md:hover:floating-hover shadow-xl z-20"
      />
    </div>

    <div class="flex flex-col col-span-3 md:col-span-2 gap-2">
      <h4 class="text-lg md:text-xl font-bold mt-4">The Vision</h4>
      <p>
        Inspired by the absence of a unified platform for Norwegian football aficionados, I embarked on a mission to
        bring this community to life. My goal was to create a space where supporters from all Norwegian football clubs
        could come together and share their passion for the sport.
      </p>

      <h4 class="text-lg md:text-xl font-bold mt-4">The Technical Journey</h4>
      <p>
        Building FotballFeber from the ground up was a fascinating journey. I chose Next.js, React, and TailwindCSS as
        the core technologies. Everything was meticulously organized in a monorepo using Turborepo, and the website is
        seamlessly hosted on Vercel. For state management and data fetching, I adopted Jotai and Tanstack Query. The UI
        is adorned with shadcn/ui, Radix UI, and Lucide icons, ensuring a sleek and user-friendly experience.
        Wireframing involved low-fidelity designs created in Excalidraw and high-fidelity wireframes crafted in Figma.
        Flowcharts and diagrams were illustrated using Excalidraw.
      </p>
    </div>
    <div class="flex flex-col col-span-3 md:col-span-2 gap-2">
      <h4 class="text-lg md:text-xl font-bold mt-4">News Aggregation Magic</h4>
      <p>
        To keep the platform abuzz with the latest Norwegian football updates, I developed a method to source articles
        from various Norwegian football news sites, leveraging their public APIs. This involves a Python script for
        monitoring updates on the news sites. The articles go through a meticulous processing pipeline with the aid of
        Upstash Redis, a NodeJS server, and an additional Redis database. An exposed GUI, powered by Fastify, keeps
        things transparent, and it's all hosted on Railway. The articles find their permanent home in a MySQL database
        hosted on Planetscale, and they are rapidly indexed in a high-performance Meilisearch instance on Fly.io. This
        setup ensures seamless search and filtering for users, offering an exceptional browsing experience.
      </p>
    </div>
    <div
      class="flex flex-col col-span-3 md:col-span-1 items-center gap-4 relative row-span-2 px-2 sm:px-10 md:px-0 my-6"
    >
      <NuxtImg
        loading="lazy"
        src="/images/projects/fotballfeber/screenshot002.webp"
        alt="FotballFeber News Aggregate"
        class="select-none w-full md:w-[150%] md:max-w-[150%] lg:w-[135%] lg:max-w-[135%] md:floating md:hover:floating-hover shadow-xl z-20"
      />
    </div>
    <div class="flex flex-col col-span-3 md:col-span-2 gap-2">
      <h4 class="text-lg md:text-xl font-bold mt-4">The Road Ahead</h4>

      <p>
        FotballFeber is an ever-evolving project with a comprehensive roadmap. The current focus is on finalizing the
        onboarding process and introducing a crucial discussion forum. The next milestone is implementing a subscription
        and payment service, marking the official launch for public use.
      </p>

      <h4 class="text-lg md:text-xl font-bold mt-4">Beyond Passion</h4>
      <p>
        My commitment to this project extends beyond my love for Norwegian football and online communities. It has
        become a priceless learning experience in entrepreneurship. As a web developer, I've never learned at such a
        rapid pace as I have during this project. Building something from scratch demands a deep understanding of the
        objectives, which can only be achieved through a pragmatic approach. I've encountered my fair share of
        challenges and setbacks, but each one has been a valuable lesson.
      </p>

      <h4 class="text-lg md:text-xl font-bold mt-4">Evolution as a Developer</h4>
      <p>
        I began this project as a regular full-stack web developer. Throughout this project, I've learned how to build
        fully functional systems, from beginning to end. I have improved my understanding of backends, my proficiency in
        the different types of databases, and which to choose when. I've expanded my software engineering skills by
        delving into software architecture, microservices, message queues, and load balancers. I've had to master DevOps
        to manage CI/CD, containerization, orchestration, performance monitoring, issue alerting, and analytical
        insights. It's been great fun.
      </p>
      <p>
        This project has not only created a community but has also been a transformative experience in personal and
        professional growth. FotballFeber is the embodiment of my passion for Norwegian football and the ever-evolving
        world of web development.
      </p>

      <div class="w-fit mt-4">
        <a
          href="https://www.fotballfeber.com/"
          target="_blank"
          class="text-green-400 font-medium flex-nowrap border-green-400 border-2 rounded-md px-4 py-2 space-x-4 flex hover:bg-gradient-to-r from-green-400 to-green-500 hover:text-black transition-all duration-200 ease-in-out items-center"
        >
          <span>FotballFeber</span>
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

        <a href="https://tailwindcss.com/" target="_blank" class="group flex flex-col items-center w-16">
          <div class="p-3 bg-gray-800 rounded-full">
            <TailwindIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Tailwind CSS</div>
        </a>

        <a href="https://orm.drizzle.team/" target="_blank" class="group flex flex-col items-center w-16">
          <div class="p-3 bg-gray-800 rounded-full">
            <DrizzleIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Drizzle ORM</div>
        </a>

        <a href="https://www.mysql.com/" target="_blank" class="group flex flex-col items-center w-16">
          <div class="p-3 bg-gray-800 rounded-full">
            <SqlIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">MySQL</div>
        </a>

        <a href="https://planetscale.com/" target="_blank" class="group flex flex-col items-center w-16">
          <div class="p-3 bg-gray-800 rounded-full">
            <PlanetscaleIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Planetscale</div>
        </a>

        <a href="https://turbo.build/repo" target="_blank" class="group flex flex-col items-center w-16">
          <div class="p-3 bg-gray-800 rounded-full">
            <TurborepoIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Turborepo</div>
        </a>

        <a href="https://turbo.build/pack" target="_blank" class="group flex flex-col items-center w-16">
          <div class="p-3 bg-gray-800 rounded-full">
            <TurbopackIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Turbopack</div>
        </a>

        <a href="https://redis.com/" target="_blank" class="group flex flex-col items-center w-16">
          <div class="p-3 bg-gray-800 rounded-full">
            <RedisIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Redis</div>
        </a>

        <a href="https://nodejs.org/" target="_blank" class="group flex flex-col items-center w-16">
          <div class="p-3 bg-gray-800 rounded-full">
            <NodeJsIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Node.js</div>
        </a>

        <a href="https://tanstack.com/" target="_blank" class="group flex flex-col items-center w-16">
          <div class="p-3 bg-gray-800 rounded-full">
            <TanstackIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Tanstack</div>
        </a>

        <a href="https://trpc.io/" target="_blank" class="group flex flex-col items-center w-16">
          <div class="p-3 bg-gray-800 rounded-full">
            <TrpcIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">tRPC</div>
        </a>

        <a href="https://www.docker.com/" target="_blank" class="group flex flex-col items-center w-16">
          <div class="p-3 bg-gray-800 rounded-full">
            <DockerIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Docker</div>
        </a>

        <a href="https://vitest.dev/" target="_blank" class="group flex flex-col items-center w-16">
          <div class="p-3 bg-gray-800 rounded-full">
            <VitestIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Vitest</div>
        </a>

        <a href="https://playwright.dev/" target="_blank" class="group flex flex-col items-center w-16">
          <div class="p-3 bg-gray-800 rounded-full">
            <PlaywrightIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Playwright</div>
        </a>

        <a href="https://vercel.com/" target="_blank" class="group flex flex-col items-center w-16">
          <div class="p-3 bg-gray-800 rounded-full">
            <VercelIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Vercel</div>
        </a>

        <a href="https://fly.io/" target="_blank" class="group flex flex-col items-center w-16">
          <div class="p-3 bg-gray-800 rounded-full">
            <FlyIoIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Fly.io</div>
        </a>

        <a href="https://github.com/" target="_blank" class="flex flex-col items-center">
          <div class="p-3 bg-gray-800 rounded-full">
            <GitHubIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">GitHub</div>
        </a>
      </div>
    </div>
  </div>
</template>
