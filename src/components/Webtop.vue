<script setup lang="ts">
import AngularIcon from "./icons/AngularIcon.vue";
import CSharpIcon from "./icons/CSharpIcon.vue";
import DotNetIcon from "./icons/DotNetIcon.vue";
import GitHubIcon from "./icons/GitHubIcon.vue";
import SqlIconVue from "./icons/SqlIcon.vue";
import TypeScriptIcon from "./icons/TypeScriptIcon.vue";
</script>
<template>
  <div class="grid grid-cols-3 gap-x-8 lg:gap-x-12">
    <div class="drop-shadow col-span-2 my-4">
      <h1 class="md:text-3xl text-xl font-bold drop-shadow">Webtop Solutions</h1>
      <h2 class="text-xl font-light italic text-sky-200 drop-shadow break-words wrap">
        Jul 2016 - Dec 2018 · 2 yrs 6 mos
      </h2>
      <h2 class="text-xl font-light text-zinc-200 drop-shadow break-words wrap">System Developer</h2>
      <h3 class="text-xl font-bold italic text-[#15FF93] drop-shadow">Full-time Employment · Trondheim, Norway</h3>
    </div>
    <div class="col-span-1 justify-self-center md:self-end my-4">
      <img src="/images/work/webtop/logo.png" alt="Webtop Logo" class="select-none w-full" />
    </div>
    <div class="my-4 col-span-3 md:col-span-2 space-y-2">
      <h3 class="text-lg md:text-xl drop-shadow font-bold mt-4">About Webtop Solutions AS</h3>
      <p class="drop-shadow">
        Webtop Solutions AS is a company specializing in the development of Customer Relationship Management (CRM)
        systems tailored for the real estate industry. The company's solutions are designed to streamline and optimize
        business processes within this sector.
      </p>
    </div>
    <div class="flex flex-col col-span-3 md:col-span-1 items-center gap-4 relative overflow-visible row-span-2">
      <img
        src="/images/work/webtop/webtop.png"
        alt="Webtop Marketing"
        class="select-none md:w-[150%] md:max-w-[150%] lg:w-[125%] lg:max-w-[125%] floating drop-shadow-lg z-20"
      />
    </div>

    <div class="flex flex-col col-span-3 md:col-span-2 gap-2">
      <h3 class="text-lg md:text-xl drop-shadow font-bold mt-4">My Role and Responsibilities</h3>
      <div class="space-y-2">
        <p class="drop-shadow">
          As a full-time System Developer at Webtop Solutions AS, I had the opportunity to contribute to various aspects
          of the CRM system development process. My role was diverse and encompassed responsibilities that spanned the
          entire software development lifecycle. Here's a breakdown of my key responsibilities:
        </p>
        <ul class="space-y-2">
          <li>
            <strong>Full-Stack Development:</strong> My role demanded expertise in both frontend and backend
            development. I was responsible for developing modules that spanned from backend to frontend, covering
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
      <h3 class="text-lg md:text-xl drop-shadow font-bold mt-4">The Tech Stack</h3>
      <div class="drop-shadow space-y-4">
        <p>
          Webtop Solutions AS employed a robust and versatile technology stack to power their CRM system development.
          The core technologies included:
        </p>
        <ul class="space-y-2">
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
            <strong>AngularJS:</strong>The frontend of the system was constructed using AngularJS. This choice enabled
            the development of dynamic and responsive user interfaces that met the high standards of the real estate
            industry.
          </li>
        </ul>
      </div>
    </div>
    <div class="flex flex-col col-span-3 md:col-span-2 gap-2">
      <div class="flex flex-wrap gap-2 mt-4">
        <div class="p-2 bg-gray-800 rounded-md">
          <TypeScriptIcon :height="32" :width="32" />
        </div>
        <div class="p-2 bg-gray-800 rounded-md">
          <CSharpIcon :height="32" :width="32" />
        </div>
        <div class="p-2 bg-gray-800 rounded-md">
          <AngularIcon :height="32" :width="32" />
        </div>
        <div class="p-2 bg-gray-800 rounded-md">
          <SqlIconVue :height="32" :width="32" />
        </div>
        <div class="p-2 bg-gray-800 rounded-md">
          <DotNetIcon :height="32" :width="32" />
        </div>
        <div class="p-2 bg-gray-800 rounded-md">
          <GitHubIcon :height="32" :width="32" />
        </div>
      </div>
    </div>
  </div>
</template>
