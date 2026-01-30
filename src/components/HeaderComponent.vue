<template>
    <!-- <Transition class="transition-opacity duration-[5000ms]" enter-from-class="opacity-0" enter-to-class="opacity-1"> -->
    <div class="min-h-screen container flex items-center">
        <div class="flex flex-col p-4 max-w-xl">
            <div class="space-y-4">
                <div class="gap-3 flex">
                    <div class="h-3 w-16 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-sm" />
                    <div class="h-3 w-8 bg-gradient-to-r from-purple-300 to-purple-400 rounded-sm" />
                </div>
                <div class="gap-3 flex">
                    <div class="h-3 w-8 bg-gradient-to-r from-red-300 to-red-400 rounded-sm" />
                    <div class="h-3 w-20 bg-gradient-to-r from-green-300 to-green-400 rounded-sm" />
                    <div class="h-3 w-8 bg-gradient-to-r from-blue-300 to-blue-400 rounded-sm" />
                    <div class="size-3 bg-zinc-400 rounded-full" />
                </div>
                <div class="gap-3 flex">
                    <div class="h-3 w-40 bg-gradient-to-r from-blue-300 to-blue-400 rounded-sm" />
                    <div class="h-3 w-20 bg-gradient-to-r from-green-300 to-green-400 rounded-sm" />
                    <div class="h-3 w-4 bg-gradient-to-r from-purple-300 to-purple-400 rounded-sm" />
                </div>
                <div class="gap-3 flex">
                    <div class="h-3 w-5 bg-zinc-400 rounded-sm" />
                    <div class="h-3 w-10 bg-zinc-400 rounded-sm" />
                    <div class="h-3 w-5 bg-zinc-400 rounded-sm" />
                    <div class="size-3 bg-zinc-400 rounded-sm" />
                    <div class="h-3 w-6 bg-zinc-400 rounded-sm" />
                </div>
            </div>
            <div class="pl-4 md:pl-8 lg:pl-16 py-6 space-y-4">
                <p class="font-mono text-zinc-400">Hello, I am</p>
                <h2 class="text-4xl lg:text-7xl font-extrabold">Eirik Mo</h2>
                <div class="gap-3 flex">
                    <div class="h-3 w-8 bg-zinc-400 rounded-sm" />
                    <div class="h-3 w-5 bg-zinc-400 rounded-sm" />
                    <div class="size-3 bg-zinc-400 rounded-sm" />
                    <div class="h-3 w-12 bg-zinc-400 rounded-sm" />
                </div>
                <h1 class="font-mono text-zinc-200 font-light text-xl">&lt; Senior Full-Stack Developer /></h1>
                <p class="text-zinc-400 text-lg max-w-md">
                    9+ years building & deploying scalable web applications for startups and enterprises worldwide.
                </p>
                <NuxtLink
                    href="#contact"
                    class="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/20 border border-green-500/50 rounded-full w-fit"
                >
                    <span class="relative flex size-2">
                        <span
                            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
                        ></span>
                        <span class="relative inline-flex rounded-full size-2 bg-green-500"></span>
                    </span>
                    <span class="text-green-400 text-sm font-medium">Open to remote opportunities</span>
                </NuxtLink>
            </div>
            <div class="space-y-4">
                <div class="gap-3 flex">
                    <div class="size-3 bg-zinc-400 rounded-sm" />
                    <div class="h-3 w-8 bg-zinc-400 rounded-sm" />
                    <div class="h-3 w-4 bg-zinc-400 rounded-sm" />
                </div>
                <div class="gap-3 flex">
                    <div class="h-3 w-40 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-sm" />
                    <div class="h-3 w-20 bg-gradient-to-r from-blue-300 to-blue-400 rounded-sm" />
                    <div class="size-3 bg-zinc-400 rounded-full" />
                </div>
                <div class="gap-3 flex">
                    <div class="h-3 w-10 bg-gradient-to-r from-green-300 to-green-400 rounded-sm" />
                    <div class="h-3 w-14 bg-gradient-to-r from-purple-300 to-purple-400 rounded-sm" />
                    <div class="h-3 w-12 bg-gradient-to-r from-red-300 to-red-400 rounded-sm" />
                </div>
                <div class="gap-3 flex">
                    <div class="h-3 w-6 bg-gradient-to-r from-blue-300 to-blue-400 rounded-sm" />
                    <div class="h-3 w-4 bg-gradient-to-r from-red-300 to-red-400 rounded-sm" />
                    <div class="h-3 w-8 bg-gradient-to-r from-green-300 to-green-400 rounded-sm" />
                    <div class="size-3 bg-zinc-400 rounded-full" />
                </div>
            </div>
        </div>
    </div>
    <!-- </Transition> -->
</template>
