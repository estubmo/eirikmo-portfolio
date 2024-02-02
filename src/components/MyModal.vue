<script setup lang="ts">
import { toRefs } from "vue";
import { VueFinalModal } from "vue-final-modal";

const props = defineProps<{
  title?: string;
  show: boolean;
  close: () => void;
}>();

const { show, close } = toRefs(props);
</script>

<template>
  <VueFinalModal
    v-model="show"
    class="pointer-events-none"
    :hide-overlay="true"
    :content-transition="'vfm-slide-down'"
    :esc-to-close="false"
  >
    <VueSimplebar v-show="show" data-simplebar-auto-hide="false" class="h-screen">
      <div class="fixed top-2 left-2 flex">
        <button
          ref="openModalRef"
          class="font-semibold text-gray-200 pointer-events-auto hover:bg-gray-900/50 focus:bg-gray-900/50 drop-shadow w-10 h-10 transition-all duration-300 rounded-full bg-gray-900/15 justify-center items-center flex rotate-180"
          @click="() => close()"
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
        </button>
      </div>
      <div class="max-w-screen-3xl self-center mx-auto">
        <div
          class="ml-4 mr-8 md:mx-12 lg:mx-16 flex flex-col pointer-events-auto items-center justify-start overflow-x-hidden"
        >
          <slot />
        </div>
      </div>
    </VueSimplebar>
  </VueFinalModal>
</template>

<style></style>
