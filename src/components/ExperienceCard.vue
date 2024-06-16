<script setup lang="ts">
import { ref, toRefs } from "vue";

const props = defineProps<{
    onClick: () => void;
    onMouseOver: () => void;
    onMouseLeave: () => void;
    workInProgress?: boolean;
}>();

const { onClick, onMouseOver, onMouseLeave, workInProgress } = toRefs(props);
const openModalRef = ref<HTMLDivElement | null>(null);

const handleTouchStart = () => {
    onMouseOver.value();
    openModalRef.value?.focus({ preventScroll: true });
};

const handleTouchEnd = () => {
    onMouseLeave.value();
    openModalRef.value?.blur();
};
</script>

<template>
    <div
        v-motion-fade-visible-once-custom
        class="group/card relative cursor-pointer shadow-xl ring-1 ring-gray-900/5 transition-shadow duration-300 hover:shadow-2xl rounded-lg flex flex-col backdrop-blur-sm w-full"
        @click="onClick"
        @mouseover="onMouseOver"
        @mouseleave="onMouseLeave"
        @touchstart.passive="handleTouchStart"
        @touchend.passive="handleTouchEnd"
    >
        <div
            class="absolute -top-10 left-6 sm:left-10 size-20 transition-all duration-200 flex justify-center items-center rounded-full bg-[#062C3F] border-2 border-gray-200 drop-shadow p-3 z-30"
        >
            <slot name="logo" />
        </div>

        <div class="relative size-full overflow-hidden rounded-lg">
            <div v-if="workInProgress" class="absolute right-0 top-0 size-16">
                <div
                    class="absolute rotate-45 bg-green-600 text-xs text-center text-gray-200 font-semibold py-1 right-[-35px] top-[32px] w-[170px]"
                >
                    Work in Progress
                </div>
            </div>

            <div class="flex flex-col h-full">
                <div
                    class="px-6 pt-12 pb-6 sm:px-10 relative h-full transition-colors duration-300 bg-gray-600/5 group-hover/card:bg-gray-400/10 focus-within:bg-gray-400/10"
                >
                    <div class="relative z-10 flex flex-col size-full">
                        <div class="flex grow flex-col md:flex-row w-full gap-4">
                            <slot />
                        </div>

                        <div class="absolute -bottom-9 sm:-bottom-11 -right-4 sm:-right-8 flex">
                            <div
                                ref="openModalRef"
                                class="font-semibold group-hover/card:bg-gray-200 focus:bg-gray-200 group-hover/card:text-gray-800 focus:text-gray-800 drop-shadow size-10 transition-all duration-300 rounded-full bg-[#062C3F] justify-center items-center flex group-hover/card:-rotate-90 focus:-rotate-90"
                            >
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
                                >
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col justify-end bg-gray-900/40 px-4 pt-6 pb-4">
                    <div class="flex flex-wrap gap-4">
                        <slot name="tech" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
