<script setup lang="ts">
import AngularIcon from "./icons/AngularIcon.vue";
import AstroIcon from "./icons/AstroIcon.vue";
import AzureIcon from "./icons/AzureIcon.vue";
import BiomeIcon from "./icons/BiomeIcon.vue";
import BitbucketIcon from "./icons/BitbucketIcon.vue";
import BunIcon from "./icons/BunIcon.vue";
import CSharpIcon from "./icons/CSharpIcon.vue";
import CssIcon from "./icons/CssIcon.vue";
import CypressIcon from "./icons/CypressIcon.vue";
import DockerIcon from "./icons/DockerIcon.vue";
import DotNetIcon from "./icons/DotNetIcon.vue";
import DrizzleIcon from "./icons/DrizzleIcon.vue";
import EslintIcon from "./icons/EslintIcon.vue";
import ExcalidrawIcon from "./icons/ExcalidrawIcon.vue";
import FigmaIcon from "./icons/FigmaIcon.vue";
import FlyIoIcon from "./icons/FlyIoIcon.vue";
import GitHubIcon from "./icons/GitHubIcon.vue";
import GitIcon from "./icons/GitIcon.vue";
import GraphlQlIcon from "./icons/GraphlQlIcon.vue";
import HtmlIcon from "./icons/HtmlIcon.vue";
import HtmxIcon from "./icons/HtmxIcon.vue";
import JavaScriptIcon from "./icons/JavaScriptIcon.vue";
import JestIcon from "./icons/JestIcon.vue";
import MedusaIcon from "./icons/MedusaIcon.vue";
import MongoDbIcon from "./icons/MongoDbIcon.vue";
import NextJsIcon from "./icons/NextJsIcon.vue";
import NodeJsIcon from "./icons/NodeJsIcon.vue";
import NpmIcon from "./icons/NpmIcon.vue";
import NuxtIcon from "./icons/NuxtIcon.vue";
import NxIcon from "./icons/NxIcon.vue";
import PlanetscaleIcon from "./icons/PlanetscaleIcon.vue";
import PlaywrightIcon from "./icons/PlaywrightIcon.vue";
import PnpmIcon from "./icons/PnpmIcon.vue";
import PostgreSqlIcon from "./icons/PostgreSqlIcon.vue";
import PrettierIcon from "./icons/PrettierIcon.vue";
import PrismaIcon from "./icons/PrismaIcon.vue";
import ReactIcon from "./icons/ReactIcon.vue";
import RedisIcon from "./icons/RedisIcon.vue";
import ReduxToolkitIcon from "./icons/ReduxToolkitIcon.vue";
import SanityIcon from "./icons/SanityIcon.vue";
import SqlIcon from "./icons/SqlIcon.vue";
import StrapiIcon from "./icons/StrapiIcon.vue";
import SupabaseIcon from "./icons/SupabaseIcon.vue";
import TailwindIcon from "./icons/TailwindIcon.vue";
import TanstackIcon from "./icons/TanstackIcon.vue";
import ThreeJsIcon from "./icons/ThreeJsIcon.vue";
import MyTresJsIcon from "./icons/TresJsIcon.vue";
import TrpcIcon from "./icons/TrpcIcon.vue";
import TurbopackIcon from "./icons/TurbopackIcon.vue";
import TurborepoIcon from "./icons/TurborepoIcon.vue";
import TursoIcon from "./icons/TursoIcon.vue";
import TypeScriptIcon from "./icons/TypeScriptIcon.vue";
import VercelIcon from "./icons/VercelIcon.vue";
import VitestIcon from "./icons/VitestIcon.vue";
import VueIcon from "./icons/VueIcon.vue";
import TechItem from "./TechItem.vue";
</script>

<template>
  <div class="md:text-lg gap-4 grid md:grid-cols-2">
    <div>
      <span v-motion-fade-visible-once-custom class="whitespace-nowrap font-bold text-gray-200">Essentials</span>
      <ul v-motion-fade-visible-once-custom class="flex flex-wrap gap-2 mt-2">
        <TechItem>
          <JavaScriptIcon :height="16" :width="16" />
          JavaScript
        </TechItem>
        <TechItem>
          <HtmlIcon :height="16" :width="16" />
          HTML
        </TechItem>
        <TechItem>
          <CssIcon :height="16" :width="16" />
          CSS
        </TechItem>
      </ul>
    </div>
    <div>
      <span v-motion-fade-visible-once-custom class="whitespace-nowrap font-bold text-gray-200">Languages</span>
      <ul v-motion-fade-visible-once-custom class="flex flex-wrap gap-2 mt-2">
        <TechItem>
          <TypeScriptIcon :height="16" :width="16" />
          TypeScript
        </TechItem>
        <TechItem>
          <CSharpIcon :height="16" :width="16" />
          C#
        </TechItem>
      </ul>
    </div>
    <div>
      <span v-motion-fade-visible-once-custom class="whitespace-nowrap font-bold text-gray-200">Frameworks</span>
      <ul v-motion-fade-visible-once-custom class="flex flex-wrap gap-2 mt-2">
        <TechItem>
          <NextJsIcon :height="16" :width="16" />
          Next.js
        </TechItem>
        <TechItem>
          <ReactIcon :height="16" :width="16" />
          React
        </TechItem>
        <TechItem>
          <DotNetIcon :height="16" :width="16" />
          .Net
        </TechItem>
        <TechItem>
          <AstroIcon :height="16" :width="16" />
          Astro
        </TechItem>
        <TechItem>
          <AngularIcon :height="16" :width="16" />
          Angular
        </TechItem>
        <TechItem>
          <NuxtIcon :height="16" :width="16" />
          Nuxt
        </TechItem>
        <TechItem>
          <VueIcon :height="16" :width="16" />
          Vue
        </TechItem>
        <TechItem>
          <HtmxIcon :height="16" :width="16" />
          HTMX
        </TechItem>
        <TechItem>
          <TailwindIcon :height="16" :width="16" />
          Tailwind CSS
        </TechItem>
      </ul>
    </div>
    <div>
      <span v-motion-fade-visible-once-custom class="whitespace-nowrap font-bold text-gray-200">Databases</span>
      <ul v-motion-fade-visible-once-custom class="flex flex-wrap gap-2 mt-2">
        <TechItem>
          <SqlIcon :height="16" :width="16" />
          SQL
        </TechItem>
        <TechItem>
          <RedisIcon :height="16" :width="16" />
          Redis
        </TechItem>
        <TechItem>
          <PostgreSqlIcon :height="16" :width="16" />
          PostgreSQL
        </TechItem>
        <TechItem>
          <MongoDbIcon :height="16" :width="16" />
          MongoDB
        </TechItem>
        <TechItem>
          <PrismaIcon :height="16" :width="16" />
          Prisma
        </TechItem>
        <TechItem>
          <DrizzleIcon :height="16" :width="16" />
          Drizzle ORM
        </TechItem>
        <TechItem>
          <PlanetscaleIcon :height="16" :width="16" />
          Planetscale
        </TechItem>
        <TechItem>
          <SupabaseIcon :height="16" :width="16" />
          Supabase
        </TechItem>
        <TechItem>
          <TursoIcon :height="16" :width="16" />
          Turso
        </TechItem>
      </ul>
    </div>
    <div>
      <span v-motion-fade-visible-once-custom class="whitespace-nowrap font-bold text-gray-200"
        >Content Management Systems</span
      >
      <ul v-motion-fade-visible-once-custom class="flex flex-wrap gap-2 mt-2">
        <TechItem>
          <SanityIcon :height="16" :width="16" />
          Sanity
        </TechItem>
        <TechItem>
          <StrapiIcon :height="16" :width="16" />
          Strapi
        </TechItem>
      </ul>
    </div>
    <div>
      <span v-motion-fade-visible-once-custom class="whitespace-nowrap font-bold text-gray-200">Testing</span>
      <ul v-motion-fade-visible-once-custom class="flex flex-wrap gap-2 mt-2">
        <TechItem>
          <VitestIcon :height="16" :width="16" />
          Vitest
        </TechItem>
        <TechItem>
          <PlaywrightIcon :height="16" :width="16" />
          Playwright
        </TechItem>
        <TechItem>
          <JestIcon :height="16" :width="16" />
          Jest
        </TechItem>
        <TechItem>
          <CypressIcon :height="16" :width="16" />
          Cypress
        </TechItem>
      </ul>
    </div>
    <div>
      <span v-motion-fade-visible-once-custom class="whitespace-nowrap font-bold text-gray-200">Tooling</span>
      <ul v-motion-fade-visible-once-custom class="flex flex-wrap gap-2 mt-2">
        <TechItem>
          <BunIcon :height="16" :width="16" />
          Bun
        </TechItem>
        <TechItem>
          <NodeJsIcon :height="16" :width="16" />
          NodeJS
        </TechItem>
        <TechItem>
          <PnpmIcon :height="16" :width="16" />
          PNPM
        </TechItem>
        <TechItem>
          <NpmIcon :height="16" :width="16" />
          NPM
        </TechItem>
        <TechItem>
          <TurbopackIcon :height="16" :width="16" />
          Turbopack
        </TechItem>
        <TechItem>
          <TurborepoIcon :height="16" :width="16" />
          Turborepo
        </TechItem>
        <TechItem>
          <NxIcon :height="16" :width="16" />
          Nx
        </TechItem>
        <TechItem>
          <PrettierIcon :height="16" :width="16" />
          Prettier
        </TechItem>
        <TechItem>
          <EslintIcon :height="16" :width="16" />
          eslint
        </TechItem>
        <TechItem>
          <BiomeIcon :height="16" :width="16" />
          Biome
        </TechItem>
        <TechItem>
          <GitIcon :height="16" :width="16" />
          git
        </TechItem>
      </ul>
    </div>
    <div>
      <span v-motion-fade-visible-once-custom class="whitespace-nowrap font-bold text-gray-200">Platforms</span>
      <ul v-motion-fade-visible-once-custom class="flex flex-wrap gap-2 mt-2">
        <TechItem>
          <VercelIcon :height="16" :width="16" />
          Vercel
        </TechItem>
        <TechItem>
          <AzureIcon :height="16" :width="16" />
          Azure
        </TechItem>
        <TechItem>
          <GitHubIcon :height="16" :width="16" />
          GitHub
        </TechItem>
        <TechItem>
          <BitbucketIcon :height="16" :width="16" />
          Bitbucket
        </TechItem>
        <TechItem>
          <FlyIoIcon :height="16" :width="16" />
          Fly.io
        </TechItem>
      </ul>
    </div>
    <div>
      <span v-motion-fade-visible-once-custom class="whitespace-nowrap font-bold text-gray-200">Other</span>
      <ul v-motion-fade-visible-once-custom class="flex flex-wrap gap-2 mt-2">
        <TechItem>
          <DockerIcon :height="16" :width="16" />
          Docker
        </TechItem>
        <TechItem>
          <GraphlQlIcon :height="16" :width="16" />
          GraphQL
        </TechItem>
        <TechItem>
          <MedusaIcon :height="16" :width="16" />
          Medusa.js
        </TechItem>
        <TechItem>
          <ThreeJsIcon :height="16" :width="16" />
          Three.js
        </TechItem>
        <TechItem>
          <MyTresJsIcon :height="16" :width="16" />
          TresJS
        </TechItem>
        <TechItem>
          <TanstackIcon :height="16" :width="16" />
          TanStack Query
        </TechItem>
        <TechItem>
          <TrpcIcon :height="16" :width="16" />
          tRPC
        </TechItem>
        <TechItem>
          <ReduxToolkitIcon :height="16" :width="16" />
          Redux Toolkit
        </TechItem>
      </ul>
    </div>
    <div>
      <span v-motion-fade-visible-once-custom class="whitespace-nowrap font-bold text-gray-200">Design</span>
      <ul v-motion-fade-visible-once-custom class="flex flex-wrap gap-2 mt-2">
        <TechItem>
          <FigmaIcon :height="16" :width="16" />
          Figma
        </TechItem>
        <TechItem>
          <ExcalidrawIcon :height="16" :width="16" />
          Excalidraw
        </TechItem>
      </ul>
    </div>
  </div>
</template>
./icons/TresJsIcon.vue./icons/MyTresJsIcon.vue./icons/TresJsIcon.vue
