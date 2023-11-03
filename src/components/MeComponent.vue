<template>
  <div class="lg:w-1/2 lg:pl-6">
    <div class="flex flex-col max-w-xl gap-2">
      <h2 class="text-4xl font-extrabold mb-4">Who I am</h2>
      <div class="gap-3 flex">
        <div class="h-3 w-8 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-sm" />
        <div class="h-3 w-10 bg-gradient-to-r from-red-300 to-red-400 rounded-sm" />
        <div class="h-3 w-2 bg-gradient-to-r from-green-300 to-green-400 rounded-sm" />
        <div class="h-3 w-8 bg-gradient-to-r from-blue-300 to-blue-400 rounded-sm" />
        <div class="h-3 w-3 bg-zinc-400 rounded-full" />
      </div>
      <p class="md:text-lg">
        I am a lifelong learner who enjoy exploring new technologies and approaches to web development. I am also an
        avid traveler, language learner, and I enjoy hiking up sunny mountains in my free time.
      </p>
      <p class="md:text-lg">
        I'm privileged enough to do all of my work remotely. And I can effectively communicate and collaborate with
        clients and team members remotely. This allows me to take on projects from anywhere in the world and deliver
        high-quality results.
      </p>
      <p>
        I also like to contribute to Open Source projects, fixing bugs or adding features when there's something I need
        that is missing.
      </p>

      <div class="w-fit mt-4">
        <!-- <a
          href="/cv.pdf"
          class="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
        >
          <span
            class="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"
          ></span>
          <span
            class="relative px-4 py-2 space-x-4 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400"
          >
            <span class="relative text-white">Button Text</span>
          </span>
        </a> -->

        <a
          href="/cv.pdf"
          target="_blank"
          class="text-yellow-300 font-medium flex-nowrap border-yellow-300 border-2 rounded-md px-4 py-2 space-x-4 flex hover:bg-gradient-to-r from-yellow-300 to-yellow-400 hover:text-black transition-all duration-200 ease-in-out items-center"
          download
        >
          <span>Download CV</span>
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
            class="lucide lucide-download"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" x2="12" y1="15" y2="3" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>
