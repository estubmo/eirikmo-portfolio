<script setup lang="ts">
import { useFetch } from "nuxt/app";

type GithubInfo = {
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  updated_at: string;
};
const { data } = await useFetch<GithubInfo>("https://api.github.com/repos/estubmo/eirikmo-portfolio");
</script>
<template>
  <section id="footer" class="my-20 container flex justify-center items-center scroll-mt-12 text-center">
    <div class="flex flex-col p-4 max-w-xl gap-2 text-sm font-mono text-zinc-300">
      <div class="flex justify-center gap-3 items-center">
        <a
          href="https://github.com/estubmo/eirikmo-portfolio"
          target="_blank"
          class="flex gap-2 items-center hover:text-zinc-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-star"
          >
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            />
          </svg>
          {{ data?.stargazers_count || 0 }}
        </a>
        <a
          href="https://github.com/estubmo/eirikmo-portfolio"
          target="_blank"
          class="flex gap-2 items-center hover:text-zinc-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-git-fork"
          >
            <circle cx="12" cy="18" r="3" />
            <circle cx="6" cy="6" r="3" />
            <circle cx="18" cy="6" r="3" />
            <path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9" />
            <path d="M12 12v3" />
          </svg>
          {{ data?.forks_count || 0 }}
        </a>
      </div>
      <p>
        Designed and developed by
        <a class="hover:text-zinc-200 underline" href="https://github.com/estubmo" target="_blank">Eirik Mo</a>
      </p>

      <p>
        Powered by <a class="hover:text-zinc-200 underline" href="https://nuxt.com/" target="_blank">Nuxt</a>,
        <a class="hover:text-zinc-200 underline" href="https://vuejs.org/" target="_blank">Vue.js</a> and
        <a class="hover:text-zinc-200 underline" href="https://threejs.org/" target="_blank">Three.js</a>
      </p>
      <p>Hosted on <a class="hover:text-zinc-200 underline" href="https://vercel.com/" target="_blank">Vercel</a></p>
      <p>
        Inspired by, among others,
        <a class="hover:text-zinc-200 underline" href="https://guillaumegouessan.com/" target="_blank"
          >Guillaume Gouessan</a
        >
        and
        <a class="hover:text-zinc-200 underline" href="https://brittanychiang.com/" target="_blank">Brittany Chiang</a>.
      </p>
    </div>
  </section>
</template>
