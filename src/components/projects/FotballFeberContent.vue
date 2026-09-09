<script setup lang="ts">
import DockerIcon from "../icons/DockerIcon.vue";
import DrizzleIcon from "../icons/DrizzleIcon.vue";
import GitHubIcon from "../icons/GitHubIcon.vue";
import NextJsIcon from "../icons/NextJsIcon.vue";
import NodeJsIcon from "../icons/NodeJsIcon.vue";
import PlaywrightIcon from "../icons/PlaywrightIcon.vue";
import PostgreSqlIcon from "../icons/PostgreSqlIcon.vue";
import ReactIcon from "../icons/ReactIcon.vue";
import RedisIcon from "../icons/RedisIcon.vue";
import SupabaseIcon from "../icons/SupabaseIcon.vue";
import TailwindIcon from "../icons/TailwindIcon.vue";
import TanstackIcon from "../icons/TanstackIcon.vue";
import TrpcIcon from "../icons/TrpcIcon.vue";
import TurbopackIcon from "../icons/TurbopackIcon.vue";
import TurborepoIcon from "../icons/TurborepoIcon.vue";
import TypeScriptIcon from "../icons/TypeScriptIcon.vue";
import VitestIcon from "../icons/VitestIcon.vue";
</script>

<template>
    <div class="grid grid-cols-3 gap-x-8 lg:gap-x-12 text-zinc-200 my-12">
        <div class="col-span-2 my-4">
            <h2 class="md:text-3xl text-4xl font-bold">Fotballfeber</h2>
            <p class="text-2xl font-semibold text-[#55E9B5] break-words wrap">Online Community</p>
            <p class="text-xl font-light italic text-sky-200 break-words wrap">Where Norwegian Football Fans Unite</p>
            <p class="text-xl font-light italic text-sky-200 break-words wrap">Dec 2022 - Current</p>
            <p class="text-xl font-light text-zinc-200 break-words wrap mt-2">
                Founder, System Architect and Full-Stack Developer
            </p>
            <p class="text-xl font-bold italic text-[#15FF93]">Live · In Active Development</p>
        </div>
        <div class="col-span-1 justify-self-center md:self-end my-4">
            <NuxtImg
                loading="lazy"
                src="/images/projects/fotballfeber/logo.png"
                alt="Fotballfeber Logo"
                class="select-none w-16 sm:w-24 md:w-32"
            />
        </div>
        <p class="my-4 col-span-3 md:col-span-2">
            Fotballfeber is a live online community for Norwegian football fans, built and operated solo. Here, fans can
            engage in discussions on the latest news, matches, transfers, and rumors, delve into tactical strategies,
            explore player development, analyze statistics, delve into fan culture, and dive into the rich history of
            Norwegian football.
        </p>
        <div
            class="flex flex-col col-span-3 md:col-span-1 items-center gap-4 relative row-span-2 px-2 sm:px-10 md:px-0 my-6"
        >
            <NuxtImg
                loading="lazy"
                src="/images/projects/fotballfeber/screenshot001.webp"
                alt="Fotballfeber homepage"
                class="select-none w-full md:w-[150%] md:max-w-[150%] lg:w-[125%] lg:max-w-[125%] md:floating md:hover:floating-hover shadow-xl z-20"
            />
            <p class="text-sm italic text-zinc-400 text-center">The Fotballfeber homepage</p>
        </div>

        <div class="flex flex-col col-span-3 md:col-span-2 gap-2">
            <h3 class="text-lg md:text-xl font-bold mt-4">The Vision</h3>
            <p>
                Inspired by the absence of a unified platform for Norwegian football aficionados, I embarked on a
                mission to bring this community to life. My goal was to create a space where supporters from all
                Norwegian football clubs could come together and share their passion for the sport.
            </p>

            <h3 class="text-lg md:text-xl font-bold mt-4">The Technical Journey</h3>
            <p>
                Building Fotballfeber from the ground up was a fascinating journey. I chose Next.js, React, and
                TailwindCSS as the core technologies. Everything was meticulously organized in a monorepo using
                Turborepo. For state management and data fetching, I adopted Jotai and Tanstack Query. The UI is adorned
                with shadcn/ui, Radix UI, and Lucide icons, ensuring a sleek and user-friendly experience. Wireframing
                involved low-fidelity designs created in Excalidraw and high-fidelity wireframes crafted in Figma.
                Flowcharts and diagrams were illustrated using Excalidraw.
            </p>
        </div>
        <div class="flex flex-col col-span-3 md:col-span-2 gap-2">
            <h3 class="text-lg md:text-xl font-bold mt-4">Running It In Production</h3>
            <p>
                Fotballfeber is not a demo. It has been live since 2022, and I am the one who gets paged when it breaks.
                It runs on hardware I rent and operate myself: two Hetzner hosts with production and non-production
                separated, and 104 containers in production, for €65.60 a month.
            </p>
            <p>
                Almost every service is self-hosted rather than bought. Supabase, Trigger.dev, Meilisearch, Novu, Flipt
                and Infisical all run on my own infrastructure, managed through Coolify, containerised with Docker and
                routed through Traefik. Only transactional email and product analytics are managed services. Monitoring
                is defined as code and audited for drift, and the infrastructure lives in git, so the platform is
                reproducible rather than hand-tuned.
            </p>
        </div>

        <div class="flex flex-col col-span-3 md:col-span-2 gap-2">
            <h3 class="text-lg md:text-xl font-bold mt-4">News Aggregation Magic</h3>
            <p>
                To keep the platform abuzz with the latest Norwegian football updates, I built a pipeline that sources
                articles from various Norwegian football news sites, leveraging their public APIs. A set of
                Node.js/TypeScript crawler services monitor the news sites and run each article through a processing
                pipeline built on Trigger.dev for background jobs and Redis. The articles find their permanent home in a
                PostgreSQL database on Supabase, and they are rapidly indexed in a high-performance Meilisearch
                instance. This setup ensures seamless search and filtering for users, offering an exceptional browsing
                experience.
            </p>
        </div>
        <div
            class="flex flex-col col-span-3 md:col-span-1 items-center gap-4 relative row-span-2 px-2 sm:px-10 md:px-0 my-6"
        >
            <NuxtImg
                loading="lazy"
                src="/images/projects/fotballfeber/screenshot002.webp"
                alt="Fotballfeber Gjett Spilleren, a daily guess-the-player game"
                class="select-none w-full md:w-[150%] md:max-w-[150%] lg:w-[135%] lg:max-w-[135%] md:floating md:hover:floating-hover shadow-xl z-20"
            />
            <p class="text-sm italic text-zinc-400 text-center">
                Gjett Spilleren, one of three interactive VM 2026 games
            </p>
        </div>
        <div class="flex flex-col col-span-3 md:col-span-2 gap-2">
            <h3 class="text-lg md:text-xl font-bold mt-4">The Road Ahead</h3>

            <p>
                Fotballfeber is live and under continuous development, shipped solo across 78+ engineering phases.
                Current focus: deepening the community (forum, predictions, live match data) and the subscription tier.
                The whole product is built and operated by one engineer orchestrating AI coding agents inside a
                disciplined process: specs, ADRs, and architecture fitness functions that hold a solo-run codebase to
                team-grade quality.
            </p>

            <h3 class="text-lg md:text-xl font-bold mt-4">Beyond Passion</h3>
            <p>
                My commitment to this project extends beyond my love for Norwegian football and online communities. It
                has become a priceless learning experience in entrepreneurship. As a web developer, I've never learned
                at such a rapid pace as I have during this project. Building something from scratch demands a deep
                understanding of the objectives, which can only be achieved through a pragmatic approach. I've
                encountered my fair share of challenges and setbacks, but each one has been a valuable lesson.
            </p>

            <h3 class="text-lg md:text-xl font-bold mt-4">Evolution as a Developer</h3>
            <p>
                I began this project as a regular full-stack web developer. Throughout this project, I've learned how to
                build fully functional systems, from beginning to end. I have improved my understanding of backends, my
                proficiency in the different types of databases, and which to choose when. I've expanded my software
                engineering skills by delving into software architecture, microservices, message queues, and load
                balancers. I've had to master DevOps to manage CI/CD, containerization, orchestration, performance
                monitoring, issue alerting, and analytical insights. It's been great fun.
            </p>
            <p>
                This project has not only created a community but has also been a transformative experience in personal
                and professional growth. Fotballfeber is the embodiment of my passion for Norwegian football and the
                ever-evolving world of web development.
            </p>

            <div class="w-fit mt-4">
                <a
                    href="https://www.fotballfeber.com/"
                    target="_blank"
                    class="text-green-400 font-medium flex-nowrap border-green-400 border-2 rounded-md px-4 py-2 space-x-4 flex hover:bg-gradient-to-r from-green-400 to-green-500 hover:text-black transition-all duration-200 ease-in-out items-center"
                >
                    <span>Fotballfeber</span>
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

                <a href="https://nextjs.org/" target="_blank" class="group flex flex-col items-center w-16">
                    <div class="p-3 bg-gray-800 rounded-full">
                        <NextJsIcon :height="32" :width="32" />
                    </div>
                    <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Next.js</div>
                </a>

                <a href="https://react.dev/" target="_blank" class="group flex flex-col items-center w-16">
                    <div class="p-3 bg-gray-800 rounded-full">
                        <ReactIcon :height="32" :width="32" />
                    </div>
                    <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">React</div>
                </a>

                <a href="https://tailwindcss.com/" target="_blank" class="group flex flex-col items-center w-16">
                    <div class="p-3 bg-gray-800 rounded-full">
                        <TailwindIcon :height="32" :width="32" />
                    </div>
                    <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Tailwind CSS</div>
                </a>

                <a href="https://orm.drizzle.team/" target="_blank" class="group flex flex-col items-center w-16">
                    <div class="p-3 bg-gray-800 rounded-full">
                        <DrizzleIcon :height="32" :width="32" />
                    </div>
                    <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Drizzle ORM</div>
                </a>

                <a href="https://www.postgresql.org/" target="_blank" class="group flex flex-col items-center w-16">
                    <div class="p-3 bg-gray-800 rounded-full">
                        <PostgreSqlIcon :height="32" :width="32" />
                    </div>
                    <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">PostgreSQL</div>
                </a>

                <a href="https://supabase.com/" target="_blank" class="group flex flex-col items-center w-16">
                    <div class="p-3 bg-gray-800 rounded-full">
                        <SupabaseIcon :height="32" :width="32" />
                    </div>
                    <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Supabase</div>
                </a>

                <a href="https://turbo.build/repo" target="_blank" class="group flex flex-col items-center w-16">
                    <div class="p-3 bg-gray-800 rounded-full">
                        <TurborepoIcon :height="32" :width="32" />
                    </div>
                    <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Turborepo</div>
                </a>

                <a href="https://turbo.build/pack" target="_blank" class="group flex flex-col items-center w-16">
                    <div class="p-3 bg-gray-800 rounded-full">
                        <TurbopackIcon :height="32" :width="32" />
                    </div>
                    <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Turbopack</div>
                </a>

                <a href="https://redis.com/" target="_blank" class="group flex flex-col items-center w-16">
                    <div class="p-3 bg-gray-800 rounded-full">
                        <RedisIcon :height="32" :width="32" />
                    </div>
                    <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Redis</div>
                </a>

                <a href="https://nodejs.org/" target="_blank" class="group flex flex-col items-center w-16">
                    <div class="p-3 bg-gray-800 rounded-full">
                        <NodeJsIcon :height="32" :width="32" />
                    </div>
                    <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Node.js</div>
                </a>

                <a href="https://tanstack.com/" target="_blank" class="group flex flex-col items-center w-16">
                    <div class="p-3 bg-gray-800 rounded-full">
                        <TanstackIcon :height="32" :width="32" />
                    </div>
                    <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Tanstack</div>
                </a>

                <a href="https://trpc.io/" target="_blank" class="group flex flex-col items-center w-16">
                    <div class="p-3 bg-gray-800 rounded-full">
                        <TrpcIcon :height="32" :width="32" />
                    </div>
                    <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">tRPC</div>
                </a>

                <a href="https://www.docker.com/" target="_blank" class="group flex flex-col items-center w-16">
                    <div class="p-3 bg-gray-800 rounded-full">
                        <DockerIcon :height="32" :width="32" />
                    </div>
                    <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Docker</div>
                </a>

                <a href="https://vitest.dev/" target="_blank" class="group flex flex-col items-center w-16">
                    <div class="p-3 bg-gray-800 rounded-full">
                        <VitestIcon :height="32" :width="32" />
                    </div>
                    <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Vitest</div>
                </a>

                <a href="https://playwright.dev/" target="_blank" class="group flex flex-col items-center w-16">
                    <div class="p-3 bg-gray-800 rounded-full">
                        <PlaywrightIcon :height="32" :width="32" />
                    </div>
                    <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">Playwright</div>
                </a>

                <a href="https://github.com/" target="_blank" class="flex flex-col items-center">
                    <div class="p-3 bg-gray-800 rounded-full">
                        <GitHubIcon :height="32" :width="32" />
                    </div>
                    <div class="text-xs text-zinc-200 font-medium group-hover:underline text-center">GitHub</div>
                </a>
            </div>
        </div>
    </div>
</template>
