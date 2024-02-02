<script setup lang="ts">
import { defineProps, toRefs } from "vue";

const props = defineProps<{
  href: string;
  name: string;
  size: number;
}>();

const { href, name, size } = toRefs(props);
</script>
<template>
  <a :href="href" target="_blank" class="group flex flex-col items-center w-12" @click="(e) => e.stopPropagation()">
    <div class="p-1">
      <slot :height="size" :width="size" />
    </div>
    <div class="text-xs text-zinc-200 font-medium group-hover:underline underline-offset-2 text-center">{{ name }}</div>
  </a>
</template>
