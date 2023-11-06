<script setup lang="ts">
import AzureIcon from "./icons/AzureIcon.vue";
import GitHubIcon from "./icons/GitHubIcon.vue";
import GraphlQlIcon from "./icons/GraphlQlIcon.vue";
import NextJsIcon from "./icons/NextJsIcon.vue";
import NxIcon from "./icons/NxIcon.vue";
import ReactIcon from "./icons/ReactIcon.vue";
import ReduxToolkitIcon from "./icons/ReduxToolkitIcon.vue";
import TailwindIcon from "./icons/TailwindIcon.vue";
import TypeScriptIcon from "./icons/TypeScriptIcon.vue";
</script>
<template>
  <div class="grid grid-cols-3 gap-x-8 lg:gap-x-12">
    <div class="col-span-2 my-4">
      <h1 v-motion-slide-visible-once-left-custom class="md:text-3xl text-xl font-bold">Cheffelo</h1>
      <h2 v-motion-slide-visible-once-left-custom class="text-sm font-light italic text-zinc-300 break-words wrap">
        Previously known as GodtlevertGruppen AS
      </h2>
      <h2 v-motion-slide-visible-once-left-custom class="text-xl font-light italic text-sky-200 break-words wrap">
        May 2021 - Aug 2022 · 1 yr 4 mos
      </h2>
      <h2 v-motion-slide-visible-once-left-custom class="text-xl font-light text-zinc-200 break-words wrap">
        Frontend Web Developer
      </h2>
      <h3 v-motion-slide-visible-once-left-custom class="text-xl font-bold italic text-[#15FF93]">Contract · Remote</h3>
    </div>
    <div v-motion-slide-visible-once-right-custom class="col-span-1 justify-self-center md:self-end my-4">
      <img src="/images/work/cheffelo/cheffelo_logo.svg" alt="Cheffelo Logo" class="select-none w-full" />
    </div>
    <div class="my-4 col-span-3 md:col-span-2 space-y-2">
      <h3 v-motion-slide-visible-once-left-custom class="text-lg md:text-xl font-bold mt-4">About Cheffelo</h3>
      <p v-motion-slide-visible-once-left-custom>
        Cheffelo is a leading supplier of meal kits in the Nordic region and a leader in Scandinavian food tech. The
        company is the parent organization of several well-established brands, including Godtlevert, Adams Matkasse,
        Linas Matkasse, and RetNemt. These brands are synonymous with quality, convenience, and customer satisfaction.
      </p>
    </div>
    <div
      v-motion-slide-visible-once-right-custom
      class="flex flex-col col-span-3 md:col-span-1 items-center gap-4 relative overflow-visible row-span-2"
    >
      <img
        src="/images/work/cheffelo/godtlevert.jpg"
        alt="Godtlevert Dashboard"
        class="select-none md:w-[150%] md:max-w-[150%] lg:w-[125%] lg:max-w-[125%] floating shadow-xl z-20"
      />
    </div>

    <div class="flex flex-col col-span-3 md:col-span-2 gap-2">
      <h3 v-motion-slide-visible-once-left-custom class="text-lg md:text-xl font-bold mt-4">My Contribution</h3>
      <p v-motion-slide-visible-once-left-custom>
        During my tenure as a Frontend Web Developer at Cheffelo, I had the privilege of being a key contributor to the
        development of the RetNemt frontend. My responsibilities extended beyond RetNemt as I later became an integral
        part of projects for all the brands under the Cheffelo umbrella.
      </p>
      <p v-motion-slide-visible-once-left-custom>
        Within this role, I played a pivotal part in shaping the digital presence of these renowned brands. This
        encompassed the creation of web applications and user interfaces that not only met high industry standards but
        also contributed to enhancing the overall user experience. I was also responsible for the development of new
        features and the maintenance of existing ones. This included the implementation of new designs, the optimization
        of existing code, and the resolution of bugs and issues.
      </p>
    </div>
    <div class="flex flex-col col-span-3 md:col-span-2 gap-2">
      <h3 v-motion-slide-visible-once-left-custom class="text-lg md:text-xl font-bold mt-4">The Tech Stack</h3>
      <div v-motion-slide-visible-once-left-custom class="space-y-4">
        The development stack for these projects was a blend of cutting-edge technologies:

        <ul class="space-y-2">
          <li><strong>GraphQL:</strong> Leveraging GraphQL for efficient data retrieval and manipulation.</li>
          <li><strong>React:</strong> Utilizing React for building interactive and dynamic user interfaces.</li>
          <li><strong>Next.js:</strong> Employing Next.js to create performant and SEO-friendly web applications.</li>
          <li>
            <strong>Redux Toolkit:</strong> Utilizing Redux Toolkit for state management, ensuring data consistency and
            efficient updates.
          </li>
          <li>
            <strong>Nx Monorepo:</strong> Organizing the projects within an Nx Monorepo structure, which simplifies code
            sharing and collaboration.
          </li>
        </ul>
      </div>
    </div>
    <div
      v-motion-slide-visible-once-right-custom
      class="flex flex-col col-span-3 md:col-span-1 items-center gap-4 relative overflow-visible"
    >
      <img
        src="/images/work/cheffelo/retnemt.jpg"
        alt="Retnemt Menu Item"
        class="select-none md:w-[150%] md:max-w-[150%] lg:w-[135%] lg:max-w-[135%] floating shadow-xl z-20"
      />
    </div>
    <div class="flex flex-col col-span-3 md:col-span-2 gap-2">
      <div class="w-fit mt-4 flex gap-2 flex-wrap">
        <a
          v-motion-pop-visible-once-custom
          href="https://www.godtlevert.no/"
          target="_blank"
          class="text-amber-400 font-medium flex-nowrap border-amber-400 border-2 rounded-md px-4 py-2 space-x-4 flex hover:bg-gradient-to-r from-amber-400 to-amber-500 hover:text-black transition-all duration-200 ease-in-out items-center"
        >
          <span>Godtlevert</span>
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
        <a
          v-motion-pop-visible-once-custom
          href="https://www.retnemt.dk/"
          target="_blank"
          class="text-orange-400 font-medium flex-nowrap border-orange-400 border-2 rounded-md px-4 py-2 space-x-4 flex hover:bg-gradient-to-r from-orange-400 to-orange-500 hover:text-black transition-all duration-200 ease-in-out items-center"
        >
          <span>RetNemt</span>
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

        <a
          v-motion-pop-visible-once-custom
          href="https://www.adamsmatkasse.no/"
          target="_blank"
          class="text-blue-400 font-medium flex-nowrap border-blue-400 border-2 rounded-md px-4 py-2 space-x-4 flex hover:bg-gradient-to-r from-blue-400 to-blue-500 hover:text-black transition-all duration-200 ease-in-out items-center"
        >
          <span>Adams Matkasse</span>
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

        <a
          v-motion-pop-visible-once-custom
          href="https://www.linasmatkasse.no/"
          target="_blank"
          class="text-red-400 font-medium flex-nowrap border-red-400 border-2 rounded-md px-4 py-2 space-x-4 flex hover:bg-gradient-to-r from-red-400 to-red-500 hover:text-black transition-all duration-200 ease-in-out items-center"
        >
          <span>Linas Matkasse</span>
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
        <a
          v-motion-pop-visible-once-custom
          href="https://www.typescriptlang.org/"
          target="_blank"
          class="group flex flex-col items-center w-16"
        >
          <div class="p-3 bg-gray-800 rounded-full">
            <TypeScriptIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">TypeScript</div>
        </a>

        <a
          v-motion-pop-visible-once-custom
          href="https://nextjs.org/"
          target="_blank"
          class="group flex flex-col items-center w-16"
        >
          <div class="p-3 bg-gray-800 rounded-full">
            <NextJsIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Next.js</div>
        </a>

        <a
          v-motion-pop-visible-once-custom
          href="https://react.dev/"
          target="_blank"
          class="group flex flex-col items-center w-16"
        >
          <div class="p-3 bg-gray-800 rounded-full">
            <ReactIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">React</div>
        </a>

        <a
          v-motion-pop-visible-once-custom
          href="https://tailwindcss.com/"
          target="_blank"
          class="group flex flex-col items-center w-16"
        >
          <div class="p-3 bg-gray-800 rounded-full">
            <TailwindIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Tailwind CSS</div>
        </a>

        <a
          v-motion-pop-visible-once-custom
          href="https://graphql.org/"
          target="_blank"
          class="group flex flex-col items-center w-16"
        >
          <div class="p-3 bg-gray-800 rounded-full">
            <GraphlQlIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">GraphQL</div>
        </a>

        <a
          v-motion-pop-visible-once-custom
          href="https://redux-toolkit.js.org/"
          target="_blank"
          class="group flex flex-col items-center w-16"
        >
          <div class="p-3 bg-gray-800 rounded-full">
            <ReduxToolkitIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Redux Toolkit</div>
        </a>

        <a
          v-motion-pop-visible-once-custom
          href="https://nx.dev/"
          target="_blank"
          class="group flex flex-col items-center w-16"
        >
          <div class="p-3 bg-gray-800 rounded-full">
            <NxIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Nx</div>
        </a>

        <a
          v-motion-pop-visible-once-custom
          href="https://azure.microsoft.com/en-us"
          target="_blank"
          class="group flex flex-col items-center w-16"
        >
          <div class="p-3 bg-gray-800 rounded-full">
            <AzureIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Azure</div>
        </a>

        <a
          v-motion-pop-visible-once-custom
          href="https://github.com/"
          target="_blank"
          class="flex flex-col items-center"
        >
          <div class="p-3 bg-gray-800 rounded-full">
            <GitHubIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">GitHub</div>
        </a>
      </div>
    </div>
  </div>
</template>
