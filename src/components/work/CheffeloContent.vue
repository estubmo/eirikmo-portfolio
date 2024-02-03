<script setup lang="ts">
import AzureIcon from "../icons/AzureIcon.vue";
import GitHubIcon from "../icons/GitHubIcon.vue";
import GraphlQlIcon from "../icons/GraphlQlIcon.vue";
import NextJsIcon from "../icons/NextJsIcon.vue";
import NxIcon from "../icons/NxIcon.vue";
import ReactIcon from "../icons/ReactIcon.vue";
import ReduxToolkitIcon from "../icons/ReduxToolkitIcon.vue";
import TailwindIcon from "../icons/TailwindIcon.vue";
import TypeScriptIcon from "../icons/TypeScriptIcon.vue";
</script>

<template>
  <div class="grid grid-cols-3 gap-x-8 lg:gap-x-12 text-zinc-200 my-12">
    <div class="col-span-2 my-4">
      <h1 class="md:text-3xl text-4xl font-bold">Cheffelo</h1>
      <h2 class="text-sm font-light italic text-zinc-300 break-words wrap">
        Previously known as GodtlevertGruppen AS</h2>
      <h2 class="text-xl font-semibold text-[#e56962] break-words wrap">E-commerce
        Meal Kit Delivery</h2>
      <h2 class="text-xl font-light italic text-sky-200 break-words wrap">May 2021
        - Aug 2022 · 1 yr 4 mos</h2>
      <h2 class="text-xl font-light text-zinc-200 break-words wrap mt-2">Front-end
        Web Developer</h2>
      <h3 class="text-xl font-bold italic text-[#15FF93]">Contract · Remote</h3>
    </div>
    <div class="col-span-1 justify-self-center md:self-end my-4">
      <img
        src="/images/work/cheffelo/cheffelo_logo.svg"
        alt="Cheffelo Logo"
        class="select-none w-full"
      />
    </div>
    <div class="my-4 col-span-3 md:col-span-2 space-y-2">
      <h3 class="text-lg md:text-xl font-bold mt-4">About Cheffelo</h3>
      <p>
        Cheffelo is a leading supplier of meal kits in the Nordic region and a
        leader in Scandinavian food tech. The
        company is the parent organization of several well-established brands,
        including Godtlevert, Adams Matkasse,
        Linas Matkasse, and RetNemt. These brands are synonymous with quality,
        convenience, and customer satisfaction.
      </p>
    </div>
    <div
      class="flex flex-col col-span-3 md:col-span-1 items-center gap-4 relative overflow-visible px-2 sm:px-10 md:px-0 my-6 row-span-2"
    >
      <img
        src="/images/work/cheffelo/godtlevert.jpg"
        alt="Godtlevert Dashboard"
        class="select-none w-full md:w-[150%] md:max-w-[150%] lg:w-[125%] lg:max-w-[125%] md:floating md:hover:floating-hover shadow-xl z-20"
      />
    </div>

    <div class="flex flex-col col-span-3 md:col-span-2 gap-2">
      <h3 class="text-lg md:text-xl font-bold mt-4">My Role and Responsibilities
      </h3>
      <p>
        During my tenure as a Front-end Web Developer at Cheffelo, I had the
        privilege of being a key contributor to the
        development of the RetNemt front end. My responsibilities extended beyond
        RetNemt as I later became an integral
        part of projects for all the brands under the Cheffelo umbrella.
      </p>
      <p>
        Within this role, I played a pivotal part in shaping the digital presence
        of these renowned brands. This
        encompassed the creation of web applications and user interfaces that not
        only met high industry standards but
        also contributed to enhancing the overall user experience. I was also
        responsible for the development of new
        features and the maintenance of existing ones. This included the
        implementation of new designs, the optimization
        of existing code, and the resolution of bugs and issues.
      </p>
    </div>
    <div class="flex flex-col col-span-3 md:col-span-2 gap-2">
      <h3 class="text-lg md:text-xl font-bold mt-4">Main Contributions</h3>
      <ul class="pl-4 list-disc">
        <li>
          Ported legacy front-end RetNemt to a modern stack. Built from scratch
          with Next.js, React, Redux Toolkit,
          TypeScript and Tailwind CSS.
        </li>
        <li>Transitioned four front-ends from multiple repositories to a single Nx
          monorepo.</li>
        <li>
          Developed over 20 reusable and responsive interface components in React
          with Typescript, such as a food
          delivery calendar, various meal cards, and multiple components related
          to account settings and navigation.
        </li>
        <li>Worked closely with the design department to improve UX by
          collaborating in Figma.</li>
      </ul>
    </div>
    <div class="flex flex-col col-span-3 md:col-span-2 gap-2">
      <h3 class="text-lg md:text-xl font-bold mt-4">The Tech Stack</h3>
      <div class="space-y-4">
        The development stack for these projects was a blend of cutting-edge
        technologies:

        <ul class="space-y-2">
          <li><strong>GraphQL:</strong> Leveraging GraphQL for efficient data
            retrieval and manipulation.</li>
          <li><strong>React:</strong> Utilizing React for building interactive and
            dynamic user interfaces.</li>
          <li><strong>Next.js:</strong> Employing Next.js to create performant and
            SEO-friendly web applications.</li>
          <li>
            <strong>Redux Toolkit:</strong> Utilizing Redux Toolkit for state
            management, ensuring data consistency and
            efficient updates.
          </li>
          <li>
            <strong>Nx Monorepo:</strong> Organizing the projects within a Nx
            Monorepo structure, which simplifies code
            sharing and collaboration.
          </li>
        </ul>
      </div>
    </div>
    <div
      class="flex flex-col col-span-3 md:col-span-1 items-center gap-4 relative overflow-visible px-2 sm:px-10 md:px-0 my-6"
    >
      <img
        src="/images/work/cheffelo/retnemt.jpg"
        alt="Retnemt Menu Item"
        class="select-none w-full md:w-[150%] md:max-w-[150%] lg:w-[135%] lg:max-w-[135%] md:floating md:hover:floating-hover shadow-xl z-20"
      />
    </div>
    <div class="flex flex-col col-span-3 md:col-span-2 gap-2">
      <div class="w-fit mt-4 flex gap-2 flex-wrap">
        <a
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
            <line
              x1="10"
              x2="21"
              y1="14"
              y2="3"
            />
          </svg>
        </a>
        <a
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
            <line
              x1="10"
              x2="21"
              y1="14"
              y2="3"
            />
          </svg>
        </a>

        <a
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
            <line
              x1="10"
              x2="21"
              y1="14"
              y2="3"
            />
          </svg>
        </a>

        <a
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
            <line
              x1="10"
              x2="21"
              y1="14"
              y2="3"
            />
          </svg>
        </a>
      </div>

      <div class="flex flex-wrap gap-2 mt-4">
        <a
          href="https://www.typescriptlang.org/"
          target="_blank"
          class="group flex flex-col items-center w-16"
        >
          <div class="p-3 bg-gray-800 rounded-full">
            <TypeScriptIcon
              :height="32"
              :width="32"
            />
          </div>
          <div
            class="text-xs text-zinc-200 font-medium group-hover:underline text-center"
          >TypeScript</div>
        </a>

        <a
          href="https://nextjs.org/"
          target="_blank"
        class="group flex flex-col items-center w-16"
      >
        <div class="p-3 bg-gray-800 rounded-full">
          <NextJsIcon
            :height="32"
            :width="32"
          />
        </div>
        <div
          class="text-xs text-zinc-200 font-medium group-hover:underline text-center"
        >Next.js</div>
      </a>

      <a
        href="https://react.dev/"
        target="_blank"
        class="group flex flex-col items-center w-16"
      >
        <div class="p-3 bg-gray-800 rounded-full">
          <ReactIcon
            :height="32"
            :width="32"
          />
        </div>
        <div
          class="text-xs text-zinc-200 font-medium group-hover:underline text-center"
        >React</div>
      </a>

      <a
        href="https://tailwindcss.com/"
        target="_blank"
        class="group flex flex-col items-center w-16"
      >
        <div class="p-3 bg-gray-800 rounded-full">
          <TailwindIcon
            :height="32"
            :width="32"
          />
        </div>
        <div
          class="text-xs text-zinc-200 font-medium group-hover:underline text-center"
        >Tailwind CSS</div>
      </a>

      <a
        href="https://graphql.org/"
        target="_blank"
        class="group flex flex-col items-center w-16"
      >
        <div class="p-3 bg-gray-800 rounded-full">
          <GraphlQlIcon
            :height="32"
            :width="32"
          />
        </div>
        <div
          class="text-xs text-zinc-200 font-medium group-hover:underline text-center"
        >GraphQL</div>
      </a>

      <a
        href="https://redux-toolkit.js.org/"
        target="_blank"
        class="group flex flex-col items-center w-16"
      >
        <div class="p-3 bg-gray-800 rounded-full">
          <ReduxToolkitIcon
            :height="32"
            :width="32"
          />
        </div>
        <div
          class="text-xs text-zinc-200 font-medium group-hover:underline text-center"
        >Redux Toolkit</div>
      </a>

      <a
        href="https://nx.dev/"
        target="_blank"
        class="group flex flex-col items-center w-16"
      >
        <div class="p-3 bg-gray-800 rounded-full">
          <NxIcon
            :height="32"
            :width="32"
          />
        </div>
        <div
          class="text-xs text-zinc-200 font-medium group-hover:underline text-center"
        >Nx</div>
      </a>

      <a
        href="https://azure.microsoft.com/en-us"
        target="_blank"
        class="group flex flex-col items-center w-16"
      >
        <div class="p-3 bg-gray-800 rounded-full">
          <AzureIcon
            :height="32"
            :width="32"
          />
        </div>
        <div
          class="text-xs text-zinc-200 font-medium group-hover:underline text-center"
        >Azure</div>
      </a>

      <a
        href="https://github.com/"
        target="_blank"
        class="flex flex-col items-center"
      >
        <div class="p-3 bg-gray-800 rounded-full">
          <GitHubIcon
            :height="32"
            :width="32"
          />
        </div>
        <div
          class="text-xs text-zinc-200 font-medium group-hover:underline text-center"
        >GitHub</div>
      </a>
    </div>
  </div>
</div></template>
