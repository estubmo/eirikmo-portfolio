<script setup lang="ts">
import AzureIcon from "./icons/AzureIcon.vue";
import GitHubIcon from "./icons/GitHubIcon.vue";
import GraphlQlIcon from "./icons/GraphlQlIcon.vue";
import NextJsIcon from "./icons/NextJsIcon.vue";
import NxIcon from "./icons/NxIcon.vue";
import ReactIcon from "./icons/ReactIcon.vue";
import ReduxToolkitIcon from "./icons/ReduxToolkitIcon.vue";
import TypeScriptIcon from "./icons/TypeScriptIcon.vue";
</script>
<template>
  <div class="grid grid-cols-3 gap-x-8 lg:gap-x-12">
    <div class="drop-shadow col-span-2 my-4">
      <h1 class="md:text-3xl text-xl font-bold drop-shadow">Cheffelo</h1>
      <h2 class="text-sm font-light italic text-zinc-300 drop-shadow break-words wrap">
        Previously known as GodtlevertGruppen AS
      </h2>
      <h2 class="text-xl font-light italic text-sky-200 drop-shadow break-words wrap">
        May 2021 - Aug 2022 · 1 yr 4 mos
      </h2>
      <h2 class="text-xl font-light text-zinc-200 drop-shadow break-words wrap">Frontend Web Developer</h2>
      <h3 class="text-xl font-bold italic text-[#15FF93] drop-shadow">Contract · Remote</h3>
    </div>
    <div class="col-span-1 justify-self-center md:self-end my-4">
      <img src="/images/work/cheffelo/cheffelo_logo.svg" alt="Cheffelo Logo" class="select-none w-full" />
    </div>
    <div class="my-4 col-span-3 md:col-span-2 space-y-2">
      <h3 class="text-lg md:text-xl drop-shadow font-bold mt-4">About Cheffelo</h3>
      <p class="drop-shadow">
        Cheffelo is a leading supplier of meal kits in the Nordic region and a leader in Scandinavian food tech. The
        company is the parent organization of several well-established brands, including Godtlevert, Adams Matkasse,
        Linas Matkasse, and RetNemt. These brands are synonymous with quality, convenience, and customer satisfaction.
      </p>
    </div>
    <div class="flex flex-col col-span-3 md:col-span-1 items-center gap-4 relative overflow-visible row-span-2">
      <img
        src="/images/work/cheffelo/godtlevert.jpg"
        alt="Godtlevert Dashboard"
        class="select-none md:w-[150%] md:max-w-[150%] lg:w-[125%] lg:max-w-[125%] floating drop-shadow-lg shadow-xl z-20"
      />
    </div>

    <div class="flex flex-col col-span-3 md:col-span-2 gap-2">
      <h3 class="text-lg md:text-xl drop-shadow font-bold mt-4">My Contribution</h3>
      <p class="drop-shadow">
        During my tenure as a Frontend Web Developer at Cheffelo, I had the privilege of being a key contributor to the
        development of the RetNemt frontend. My responsibilities extended beyond RetNemt as I later became an integral
        part of projects for all the brands under the Cheffelo umbrella.
      </p>
      <p class="drop-shadow">
        Within this role, I played a pivotal part in shaping the digital presence of these renowned brands. This
        encompassed the creation of web applications and user interfaces that not only met high industry standards but
        also contributed to enhancing the overall user experience. I was also responsible for the development of new
        features and the maintenance of existing ones. This included the implementation of new designs, the optimization
        of existing code, and the resolution of bugs and issues.
      </p>
    </div>
    <div class="flex flex-col col-span-3 md:col-span-2 gap-2">
      <h3 class="text-lg md:text-xl drop-shadow font-bold mt-4">The Tech Stack</h3>
      <div class="drop-shadow space-y-4">
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
    <div class="flex flex-col col-span-3 md:col-span-1 items-center gap-4 relative overflow-visible">
      <img
        src="/images/work/cheffelo/retnemt.jpg"
        alt="Retnemt Menu Item"
        class="select-none md:w-[150%] md:max-w-[150%] lg:w-[135%] lg:max-w-[135%] floating drop-shadow-lg shadow-xl z-20"
      />
    </div>
    <div class="flex flex-col col-span-3 md:col-span-2 gap-2">
      <div class="w-fit mt-4 flex gap-2 flex-wrap">
        <a
          href="https://www.godtlevert.no/"
          target="_blank"
          class="text-[#15FF93] font-medium flex-nowrap border-[#15FF93] border rounded-md px-4 py-2 space-x-4 flex hover:bg-[#15FF93] hover:text-black transition-all duration-200 ease-in-out items-center"
        >
          <span>Go to Godtlevert</span>
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
          href="https://www.retnemt.dk/"
          target="_blank"
          class="text-[#15FF93] font-medium flex-nowrap border-[#15FF93] border rounded-md px-4 py-2 space-x-4 flex hover:bg-[#15FF93] hover:text-black transition-all duration-200 ease-in-out items-center"
        >
          <span>Go to RetNemt</span>
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
          href="https://www.adamsmatkasse.no/"
          target="_blank"
          class="text-[#15FF93] font-medium flex-nowrap border-[#15FF93] border rounded-md px-4 py-2 space-x-4 flex hover:bg-[#15FF93] hover:text-black transition-all duration-200 ease-in-out items-center"
        >
          <span>Go to Adams Matkasse</span>
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
          href="https://www.linasmatkasse.no/"
          target="_blank"
          class="text-[#15FF93] font-medium flex-nowrap border-[#15FF93] border rounded-md px-4 py-2 space-x-4 flex hover:bg-[#15FF93] hover:text-black transition-all duration-200 ease-in-out items-center"
        >
          <span>Go to Linas Matkasse</span>
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
          <GraphlQlIcon :height="32" :width="32" />
        </div>
        <div class="p-2 bg-gray-800 rounded-md">
          <ReduxToolkitIcon :height="32" :width="32" />
        </div>
        <div class="p-2 bg-gray-800 rounded-md">
          <NxIcon :height="32" :width="32" />
        </div>
        <div class="p-2 bg-gray-800 rounded-md">
          <AzureIcon :height="32" :width="32" />
        </div>
        <div class="p-2 bg-gray-800 rounded-md">
          <GitHubIcon :height="32" :width="32" />
        </div>
      </div>
    </div>
  </div>
</template>
