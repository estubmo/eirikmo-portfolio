<script setup lang="ts">
import BitbucketIcon from "../icons/BitbucketIcon.vue";
import GraphlQlIcon from "../icons/GraphlQlIcon.vue";
import MongoDbIcon from "../icons/MongoDbIcon.vue";
import NodeJsIcon from "../icons/NodeJsIcon.vue";
import ReactIcon from "../icons/ReactIcon.vue";
import TypeScriptIcon from "../icons/TypeScriptIcon.vue";
</script>

<template>
  <div class="grid grid-cols-3 gap-x-8 lg:gap-x-12 text-zinc-200 my-12">
    <div class="col-span-2 my-4">
      <h1 class="md:text-3xl text-4xl font-bold">Adtube Solutions</h1>
      <h2 class="text-2xl font-semibold text-[#40c0c2] break-words wrap">Digital Advertisement Solution</h2>
      <h2 class="text-xl font-light italic text-sky-200 break-words wrap">May 2020 - Apr 2021 · 1 yr</h2>
      <h2 class="text-xl font-light text-zinc-200 break-words wrap mt-2">Full-Stack Developer</h2>
      <h3 class="text-xl font-bold italic">Contract · Remote</h3>
    </div>
    <div class="col-span-1 justify-self-center md:self-end my-4">
      <NuxtImg
        loading="lazy"
        src="/images/work/adtube/logo.png"
        alt="Adtube Logo"
        class="select-none w-full max-w-[160px]"
      />
    </div>
    <div class="my-4 col-span-3 md:col-span-2 space-y-2">
      <h3 class="text-lg md:text-xl font-bold mt-4">About Adtube Solutions</h3>
      <p>
        Adtube Solutions is a forward-thinking technology company specializing in the development of innovative and
        efficient solutions for advertising products across various digital channels, including social media, online
        newspapers, and websites. The company's primary focus is on providing programmatic advertising solutions that
        cater to diverse industries, including e-commerce, real estate, and the automotive sector. Adtube's cutting-edge
        platform streamlines and automates the entire advertising process, making it both smart and effective.
      </p>
    </div>
    <div
      class="flex flex-col col-span-3 md:col-span-1 items-center gap-4 relative overflow-visible px-2 sm:px-10 md:px-0 my-6 row-span-2"
    >
      <NuxtImg
        loading="lazy"
        src="/images/work/adtube/adtube.webp"
        alt="Adtube Marketing"
        class="select-none w-full md:w-[150%] md:max-w-[150%] lg:w-[125%] lg:max-w-[125%] md:floating md:hover:floating-hover shadow-xl z-20"
      />
    </div>

    <div class="flex flex-col col-span-3 md:col-span-2 gap-2">
      <h3 class="text-lg md:text-xl font-bold mt-4">My Role and Responsibilities</h3>
      <div class="space-y-2">
        <p c>
          During my time at Adtube Solutions as a remotely contracted Full-Stack Developer, I held a multifaceted role
          that extended beyond conventional development tasks. Here's a breakdown of my responsibilities:
        </p>
        <ul class="space-y-2">
          <li>
            <strong>Full-Stack Development:</strong> I had the privilege of contributing to both the front end and
            backend aspects of projects. This role involved developing complete modules from their conceptualization and
            design phases to the actual implementation and deployment.
          </li>
          <li>
            <strong>Team Leadership:</strong> As a team lead, I was responsible for guiding and managing a group of
            developers, ensuring that projects were executed efficiently and meeting high-quality standards. My
            leadership helped facilitate collaboration and promote a cohesive work environment.
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
      <h3 class="text-lg md:text-xl font-bold mt-4">The Tech Stack</h3>
      <div class="space-y-4">
        <p>
          Adtube Solutions relied on a well-rounded and cutting-edge technology stack to power its innovative
          advertising solutions. The primary technologies employed were:
        </p>
        <ul class="space-y-2">
          <li>
            <strong>MongoDB:</strong> For data storage and management, MongoDB was the database of choice. Its
            flexibility and scalability made it ideal for handling diverse data requirements.
          </li>
          <li>
            <strong>Node.js:</strong> The backend of the platform was built on Node.js, which provided a robust and
            efficient runtime environment for server-side logic.
          </li>
          <li>
            <strong>GraphQL:</strong> GraphQL served as the query language for APIs, allowing for precise and efficient
            data retrieval and manipulation. It enhanced flexibility and responsiveness in data exchanges.
          </li>
          <li>
            <strong>React:</strong>The front end of the platform was constructed using React, a popular library for
            building dynamic and user-friendly user interfaces. It ensured a responsive and engaging user experience.
          </li>
        </ul>
      </div>
    </div>
    <div class="flex flex-col col-span-3 md:col-span-2 gap-2">
      <div class="flex flex-wrap gap-2 mt-4">
        <a href="https://www.typescriptlang.org/" target="_blank" class="group flex flex-col items-center w-16">
          <div class="p-3 bg-gray-800 rounded-full">
            <TypeScriptIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">TypeScript</div>
        </a>

        <a href="https://nodejs.org/" target="_blank" class="group flex flex-col items-center w-16">
          <div class="p-3 bg-gray-800 rounded-full">
            <NodeJsIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Node.js</div>
        </a>

        <a href="https://react.dev/" target="_blank" class="group flex flex-col items-center w-16">
          <div class="p-3 bg-gray-800 rounded-full">
            <ReactIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">React</div>
        </a>

        <a href="https://graphql.org/" target="_blank" class="group flex flex-col items-center w-16">
          <div class="p-3 bg-gray-800 rounded-full">
            <GraphlQlIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">GraphQL</div>
        </a>

        <a href="https://www.mongodb.com//" target="_blank" class="group flex flex-col items-center w-16">
          <div class="p-3 bg-gray-800 rounded-full">
            <MongoDbIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">MongoDB</div>
        </a>

        <a href="https://bitbucket.org/" target="_blank" class="group flex flex-col items-center w-16">
          <div class="p-3 bg-gray-800 rounded-full">
            <BitbucketIcon :height="32" :width="32" />
          </div>
          <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Bitbucket</div>
        </a>
      </div>
    </div>
  </div>
</template>
