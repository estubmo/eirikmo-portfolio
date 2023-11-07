<script setup lang="ts">
import AngularIcon from "./icons/AngularIcon.vue";
import CSharpIcon from "./icons/CSharpIcon.vue";
import DotNetIcon from "./icons/DotNetIcon.vue";
import GitHubIcon from "./icons/GitHubIcon.vue";
import SqlIcon from "./icons/SqlIcon.vue";
import TypeScriptIcon from "./icons/TypeScriptIcon.vue";
</script>
<template>
  <div class="grid grid-cols-3 gap-x-8 lg:gap-x-12">
    <div class="col-span-2 my-4">
      <h1 v-motion-slide-visible-once-left-custom class="md:text-3xl text-4xl font-bold">Webtop Solutions</h1>
      <h2 v-motion-slide-visible-once-left-custom class="text-xl font-light text-sky-200 break-words wrap">
        Jul 2016 - Dec 2018 · 2 yrs 6 mos
      </h2>
      <h2 v-motion-slide-visible-once-left-custom class="text-xl font-light text-zinc-200 break-words wrap mt-2">
        System Developer
      </h2>
      <h3 v-motion-slide-visible-once-left-custom class="text-xl font-bold italic text-[#15FF93]">
        Full-time Employment · Trondheim, Norway
      </h3>
    </div>
    <div v-motion-slide-visible-once-right-custom class="col-span-1 justify-self-center md:self-end my-4">
      <img src="/images/work/webtop/logo.png" alt="Webtop Logo" class="select-none w-full" />
    </div>
    <div class="my-4 col-span-3 md:col-span-2 space-y-2">
      <h3 v-motion-slide-visible-once-left-custom class="text-lg md:text-xl font-bold mt-4">
        About Webtop Solutions AS
      </h3>
      <p v-motion-slide-visible-once-left-custom>
        Webtop Solutions is AS a company specializing in the development of Customer Relationship Management (CRM)
        systems tailored for the real estate industry. The company's solutions are designed to streamline and optimize
        business processes within this sector.
      </p>
    </div>
    <div
      v-motion-slide-visible-once-right-custom
      class="flex flex-col col-span-3 md:col-span-1 items-center gap-4 relative overflow-visible row-span-2"
    >
      <img
        src="/images/work/webtop/webtop.png"
        alt="Webtop Marketing"
        class="select-none md:w-[150%] md:max-w-[150%] lg:w-[125%] lg:max-w-[125%] floating -lg z-20"
      />
    </div>

    <div class="flex flex-col col-span-3 md:col-span-2 gap-2">
      <h3 v-motion-slide-visible-once-left-custom class="text-lg md:text-xl font-bold mt-4">
        My Role and Responsibilities
      </h3>
      <div class="space-y-2">
        <p v-motion-slide-visible-once-left-custom>
          As a full-time System Developer at Webtop Solutions AS, I had the opportunity to contribute to various aspects
          of the CRM system development process. My role was diverse and encompassed responsibilities that spanned the
          entire software development lifecycle. Here's a breakdown of key my responsibilities:
        </p>
        <ul v-motion-slide-visible-once-left-custom class="space - y - 2">
          <li>
            <strong>Full-Stack Development:</strong> My role demanded expertise in both front end and backend
            development. I was responsible for developing modules that spanned from backend to front end, covering
            aspects such as database design, backend logic, API design, and user interface (UI) design. This end-to-end
            involvement allowed for a holistic approach to system development.
          </li>
          <li>
            <strong>Client Engagement:</strong> I often served as a crucial link between our development team and our
            clients. Effective communication and understanding between technology experts and business professionals
            were paramount for the success of our projects. I played a key role in bridging the gap between tech-speak
            and business-speak, ensuring that client requirements were accurately translated into technical solutions.
          </li>
          <li>
            <strong>Product Ownership:</strong> My role also encompassed product ownership, where I had a say in the
            strategic direction of projects and played a pivotal role in decision-making related to the product's
            features, functionality, and user experience.
          </li>
        </ul>
      </div>
    </div>
    <div class="flex flex-col col-span-3 md:col-span-2 gap-2">
      <h3 v-motion-slide-visible-once-left-custom class="text-lg md:text-xl font-bold mt-4">The Tech Stack</h3>
      <div class="space-y-4">
        <p v-motion-slide-visible-once-left-custom>
          Webtop Solutions AS employed a robust and versatile technology stack to power their CRM system development.
          The core technologies included:
        </p>
        <ul v-motion-slide-visible-once-left-custom class="space - y - 2">
          <li>
            <strong>SQL:</strong> The choice of SQL as the database management system facilitated the storage and
            retrieval of structured data. This was critical for managing the vast amounts of real estate-related
            information.
          </li>
          <li>
            <strong>.NET Framework:</strong> The .NET Framework served as the backbone for building the CRM system. It
            provided a powerful and flexible environment for developing feature-rich and scalable software.
          </li>
          <li>
            <strong>REST APIs::</strong> Representational State Transfer (REST) APIs were instrumental in ensuring
            seamless communication between various components of the CRM system, allowing for efficient data exchange.
          </li>
          <li>
            <strong>AngularJS:</strong>The front end of the system was constructed using AngularJS. This choice enabled
            the development of dynamic and responsive user interfaces that met the high standards of the real estate
            industry.
          </li>
        </ul>
      </div>
    </div>
    <div class="flex flex-col col-span-3 md:col-span-2 gap-2">
      <div v-motion-fade-visible-once-custom class="w-fit mt-4">
        <a
          href="https://www.webtop.no/"
          target="_blank"
          class="text-red-400 font-medium flex-nowrap border-red-400 border-2 rounded-md px-4 py-2 space-x-4 flex hover:bg-gradient-to-r from-red-400 to-red-500 hover:text-black transition-all duration-200 ease-in-out items-center"
        >
          <span>Webtop Solutions</span>
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
        <a
          href="https://learn.microsoft.com/en-us/dotnet/csharp/"
          target="_blank"
          class="group flex flex-col items-center"
        >
          <div class="p-3 bg-gray-800 rounded-full">
            <CSharpIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">C#</div>
        </a>
        <a href="https://angularjs.org/" target="_blank" class="group flex flex-col items-center w-16">
          <div class="p-3 bg-gray-800 rounded-full">
            <AngularIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">AngularJS</div>
        </a>

        <a href="https://www.mysql.com/" target="_blank" class="group flex flex-col items-center w-16">
          <div class="p-3 bg-gray-800 rounded-full">
            <SqlIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">MySQL</div>
        </a>

        <a href="https://dotnet.microsoft.com/en-us/" target="_blank" class="group flex flex-col items-center w-16">
          <div class="p-3 bg-gray-800 rounded-full">
            <DotNetIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">.Net</div>
        </a>

        <a href="https://github.com/" target="_blank" class="group flex flex-col items-center w-16">
          <div class="p-3 bg-gray-800 rounded-full">
            <GitHubIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">GitHub</div>
        </a>
      </div>
    </div>
  </div>
</template>
