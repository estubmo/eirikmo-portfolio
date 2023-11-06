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
import MongoDbIcon from "./icons/MongoDbIcon.vue";
import NextJsIcon from "./icons/NextJsIcon.vue";
import NodeJsIcon from "./icons/NodeJsIcon.vue";
import NpmIcon from "./icons/NpmIcon.vue";
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
  <div class="md:text-lg space-y-4">
    <span v-motion-fade-visible-once-custom class="whitespace-nowrap font-bold text-gray-200">Essentials</span>
    <div>
      <ul v-motion-fade-visible-once-custom class="flex flex-wrap gap-2 mt-2">
        <TechItem>
          JavaScript
          <JavaScriptIcon :height="16" :width="16" />
        </TechItem>
        <TechItem
          >HTML
          <HtmlIcon :height="16" :width="16" />
        </TechItem>
        <TechItem
          >CSS
          <CssIcon :height="16" :width="16" />
        </TechItem>
      </ul>
    </div>
    <div>
      <span v-motion-fade-visible-once-custom class="whitespace-nowrap font-bold text-gray-200">Languages</span>
      <ul v-motion-fade-visible-once-custom class="flex flex-wrap gap-2 mt-2">
        <TechItem
          >TypeScript
          <TypeScriptIcon :height="16" :width="16" />
        </TechItem>
        <TechItem
          >C#
          <CSharpIcon :height="16" :width="16" />
        </TechItem>
      </ul>
    </div>
    <div>
      <span v-motion-fade-visible-once-custom class="whitespace-nowrap font-bold text-gray-200">Frameworks</span>
      <ul v-motion-fade-visible-once-custom class="flex flex-wrap gap-2 mt-2">
        <TechItem
          >Next.js
          <NextJsIcon :height="16" :width="16" />
        </TechItem>
        <TechItem
          >React
          <ReactIcon :height="16" :width="16" />
        </TechItem>
        <TechItem
          >Astro
          <AstroIcon :height="16" :width="16" />
        </TechItem>
        <TechItem
          >Angular
          <AngularIcon :height="16" :width="16" />
        </TechItem>
        <TechItem
          >Vue
          <VueIcon :height="16" :width="16" />
        </TechItem>
        <TechItem
          >HTMX
          <HtmxIcon :height="16" :width="16" />
        </TechItem>
        <TechItem
          >Tailwind CSS
          <TailwindIcon :height="16" :width="16" />
        </TechItem>
      </ul>
    </div>
    <div>
      <span v-motion-fade-visible-once-custom class="whitespace-nowrap font-bold text-gray-200">Databases</span>
      <ul v-motion-fade-visible-once-custom class="flex flex-wrap gap-2 mt-2">
        <TechItem>SQL<SqlIcon :height="16" :width="16" /></TechItem>
        <TechItem
          >Redis
          <RedisIcon :height="16" :width="16" />
        </TechItem>
        <TechItem
          >PostgreSQL
          <PostgreSqlIcon :height="16" :width="16" />
        </TechItem>
        <TechItem
          >MongoDB
          <MongoDbIcon :height="16" :width="16" />
        </TechItem>
        <TechItem
          >Prisma
          <PrismaIcon :height="16" :width="16" />
        </TechItem>
        <TechItem
          >Drizzle ORM
          <DrizzleIcon :height="16" :width="16" />
        </TechItem>
        <TechItem
          >Planetscale
          <PlanetscaleIcon :height="16" :width="16" />
        </TechItem>
        <TechItem
          >Supabase
          <SupabaseIcon :height="16" :width="16" />
        </TechItem>
        <TechItem>Turso<TursoIcon :height="16" :width="16" /></TechItem>
      </ul>
    </div>
    <div>
      <span v-motion-fade-visible-once-custom class="whitespace-nowrap font-bold text-gray-200"
        >Content Management Systems</span
      >
      <ul v-motion-fade-visible-once-custom class="flex flex-wrap gap-2 mt-2">
        <TechItem>Sanity<SanityIcon :height="16" :width="16" /></TechItem>
        <TechItem>Strapi<StrapiIcon :height="16" :width="16" /></TechItem>
      </ul>
    </div>
    <div>
      <span v-motion-fade-visible-once-custom class="whitespace-nowrap font-bold text-gray-200">Testing</span>
      <ul v-motion-fade-visible-once-custom class="flex flex-wrap gap-2 mt-2">
        <TechItem>Vitest<VitestIcon :height="16" :width="16" /></TechItem>
        <TechItem
          >Playwright
          <PlaywrightIcon :height="16" :width="16" />
        </TechItem>
        <TechItem>Jest<JestIcon :height="16" :width="16" /></TechItem>
        <TechItem>Cypress<CypressIcon :height="16" :width="16" /></TechItem>
      </ul>
    </div>
    <div>
      <span v-motion-fade-visible-once-custom class="whitespace-nowrap font-bold text-gray-200">Tooling</span>
      <ul v-motion-fade-visible-once-custom class="flex flex-wrap gap-2 mt-2">
        <TechItem>Bun<BunIcon :height="16" :width="16" /></TechItem>
        <TechItem>NodeJS<NodeJsIcon :height="16" :width="16" /></TechItem>
        <TechItem>PNPM<PnpmIcon :height="16" :width="16" /></TechItem>
        <TechItem>NPM<NpmIcon :height="16" :width="16" /></TechItem>
        <TechItem>Turbopack<TurbopackIcon :height="16" :width="16" /></TechItem>
        <TechItem>Turborepo<TurborepoIcon :height="16" :width="16" /></TechItem>
        <TechItem>Nx<NxIcon :height="16" :width="16" /></TechItem>
        <TechItem>Prettier<PrettierIcon :height="16" :width="16" /></TechItem>
        <TechItem>eslint<EslintIcon :height="16" :width="16" /></TechItem>
        <TechItem>Biome<BiomeIcon :height="16" :width="16" /></TechItem>
        <TechItem>git<GitIcon :height="16" :width="16" /></TechItem>
      </ul>
    </div>
    <div>
      <span v-motion-fade-visible-once-custom class="whitespace-nowrap font-bold text-gray-200">Platforms</span>
      <ul v-motion-fade-visible-once-custom class="flex flex-wrap gap-2 mt-2">
        <TechItem>Vercel<VercelIcon :height="16" :width="16" /></TechItem>
        <TechItem>.Net<DotNetIcon :height="16" :width="16" /></TechItem>
        <TechItem>Azure<AzureIcon :height="16" :width="16" /></TechItem>
        <TechItem>GitHub<GitHubIcon :height="16" :width="16" /></TechItem>
        <TechItem>Bitbucket<BitbucketIcon :height="16" :width="16" /></TechItem>
        <TechItem>Fly.io<FlyIoIcon :height="16" :width="16" /></TechItem>
      </ul>
    </div>
    <div>
      <span v-motion-fade-visible-once-custom class="whitespace-nowrap font-bold text-gray-200">Other</span>
      <ul v-motion-fade-visible-once-custom class="flex flex-wrap gap-2 mt-2">
        <TechItem>GraphQL<GraphlQlIcon :height="16" :width="16" /></TechItem>
        <TechItem>Docker<DockerIcon :height="16" :width="16" /></TechItem>
        <TechItem>Three.js<ThreeJsIcon :height="16" :width="16" /></TechItem>
        <TechItem>TanStack Query<TanstackIcon :height="16" :width="16" /></TechItem>
        <TechItem>tRPC<TrpcIcon :height="16" :width="16" /></TechItem>
        <TechItem>Redux Toolkit<ReduxToolkitIcon :height="16" :width="16" /></TechItem>
      </ul>
    </div>
    <div>
      <span v-motion-fade-visible-once-custom class="whitespace-nowrap font-bold text-gray-200">Design</span>
      <ul v-motion-fade-visible-once-custom class="flex flex-wrap gap-2 mt-2">
        <TechItem>Figma<FigmaIcon :height="16" :width="16" /></TechItem>
        <TechItem>Excalidraw<ExcalidrawIcon :height="16" :width="16" /></TechItem>
      </ul>
    </div>
  </div>
</template>
