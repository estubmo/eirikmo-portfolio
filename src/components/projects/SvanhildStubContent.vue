<script setup lang="ts">
import DockerIcon from "../icons/DockerIcon.vue";
import GitHubIcon from "../icons/GitHubIcon.vue";
import MedusaIcon from "../icons/MedusaIcon.vue";
import NextJsIcon from "../icons/NextJsIcon.vue";
import NodeJsIcon from "../icons/NodeJsIcon.vue";
import PostgreSqlIcon from "../icons/PostgreSqlIcon.vue";
import ReactIcon from "../icons/ReactIcon.vue";
import RedisIcon from "../icons/RedisIcon.vue";
import TailwindIcon from "../icons/TailwindIcon.vue";
import TypeScriptIcon from "../icons/TypeScriptIcon.vue";
import VercelIcon from "../icons/VercelIcon.vue";
</script>

<template>
  <div class="grid grid-cols-3 gap-x-8 lg:gap-x-12 text-zinc-200 my-12">
    <div class="col-span-2 my-4">
      <h2 class="md:text-3xl text-4xl font-bold">Svanhild Stub</h2>
      <p class="text-2xl font-semibold text-[#d4c76c] break-words wrap">E-commerce Store & Gallery</p>
      <p class="text-xl font-light italic text-sky-200 break-words wrap">Jan 2024</p>
      <p class="text-xl font-light text-zinc-200 break-words wrap mt-2">
        Full-Stack Developer and System Administrator
      </p>
    </div>
    <div class="col-span-1 justify-self-center md:self-end my-4">
      <NuxtImg
        loading="lazy"
        src="/images/projects/svanhildstub/logo.png"
        alt="SvanhildStub Logo"
        class="select-none w-16 sm:w-24 md:w-32"
      />
    </div>
    <div class="my-4 col-span-3 md:col-span-2">
      <h4 class="text-lg md:text-xl font-bold mt-4">About Svanhild Stub</h4>
      <p>
        The Svanhild Stub website is an e-commerce store and gallery for the Norwegian artist Svanhild Stub. The website
        is built with Next.js, React, TypeScript, Framer-Motion and Tailwind CSS. The backend is powered by open source
        Shopify alternative, Medusa.js, Minio S3 file hosting, Meilisearch, Redis and PostgreSQL.
      </p>

      <h4 class="text-lg md:text-xl font-bold mt-4">Development Process</h4>
      <p>
        I spent a lot of time finding the right technology for this project. I wanted to use a modern stack, but I also
        wanted to use a headless e-commerce solution. I ended up using Medusa.js, which is a headless e-commerce
        solution built with Node.js and TypeScript. Medusa.js is a great alternative to Shopify, as it is open source
        and self-hosted. It also has a great community and is under active development.
      </p>
      <p>
        I used a starter repository for the Medusa.js storefront, powered by Next.js, which I modified to fit with my
        clients requirements. As an artist, Svanhild wanted a website that would showcase her art in a beautiful,
        animated yet minimalistic way. I worked closely with her to ensure that the website would meet her expectations.
        I put in a lot of effort to ensure that the website would be as performant and accessible as possible.
      </p>
      <p>
        The greatest challenge was hosting, as I did not want to use an expensive provider. I ended up using a VPS on
        Hetzner, where I installed Docker and Docker Compose. I then used Docker Compose to run the Medusa.js
        storefront, Minio S3 file hosting, Meilisearch, Redis and PostgreSQL. I also used Docker Compose to run a
        reverse proxy with Traefik, which I used to serve the website and handle SSL certificates from Let's Encrypt!.
      </p>
    </div>
    <div
      class="flex flex-col col-span-3 md:col-span-1 items-center gap-4 relative row-span-2 px-2 sm:px-10 md:px-0 my-6"
    >
      <NuxtImg
        loading="lazy"
        src="/images/projects/svanhildstub/screenshot001.webp"
        alt="SvanhildStub Home Page"
        class="select-none w-full md:w-[150%] md:max-w-[150%] lg:w-[125%] lg:max-w-[125%] md:floating md:hover:floating-hover shadow-xl z-20"
      />

      <NuxtImg
        loading="lazy"
        src="/images/projects/svanhildstub/screenshot002.webp"
        alt="SvanhildStub Store"
        class="select-none w-full md:w-[150%] md:max-w-[150%] lg:w-[135%] lg:max-w-[135%] md:floating md:hover:floating-hover shadow-xl z-20"
      />
    </div>

    <div class="flex flex-col col-span-3 md:col-span-2 gap-2">
      <div class="w-fit mt-4">
        <a
          href="https://www.svanhildstub.com/"
          target="_blank"
          class="text-amber-400 font-medium flex-nowrap border-amber-400 border-2 rounded-md px-4 py-2 space-x-4 flex hover:bg-gradient-to-r from-amber-400 to-amber-500 hover:text-black transition-all duration-200 ease-in-out items-center"
        >
          <span>Svanhild Stub</span>
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
        <a href="https://medusajs.com/" target="_blank" class="group flex flex-col items-center w-16">
          <div class="p-3 bg-gray-800 rounded-full">
            <MedusaIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Medusa.js</div>
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

        <a href="https://www.typescriptlang.org/" target="_blank" class="group flex flex-col items-center w-16">
          <div class="p-3 bg-gray-800 rounded-full">
            <TypeScriptIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">TypeScript</div>
        </a>

        <a href="https://www.postgresql.org/" target="_blank" class="group flex flex-col items-center w-16">
          <div class="p-3 bg-gray-800 rounded-full">
            <PostgreSqlIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">PostgreSQL</div>
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

        <a href="https://www.docker.com/" target="_blank" class="group flex flex-col items-center w-16">
          <div class="p-3 bg-gray-800 rounded-full">
            <DockerIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Docker</div>
        </a>

        <a href="https://vercel.com/" target="_blank" class="group flex flex-col items-center w-16">
          <div class="p-3 bg-gray-800 rounded-full">
            <VercelIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Vercel</div>
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
