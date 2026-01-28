<script setup lang="ts">
const { height, width } = defineProps({
    height: { type: Number, required: true },
    width: { type: Number, required: true },
});
</script>

<template>
    <svg :width="width" :height="height" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <path
            fill="#764ABC"
            d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm0 115.2c-28.2 0-51.2-23-51.2-51.2S35.8 12.8 64 12.8s51.2 23 51.2 51.2-23 51.2-51.2 51.2z"
        />
        <circle fill="#764ABC" cx="64" cy="64" r="32" />
        <ellipse fill="#F5F5F5" cx="52" cy="56" rx="6" ry="8" />
        <ellipse fill="#F5F5F5" cx="76" cy="56" rx="6" ry="8" />
        <ellipse fill="#1a1a1a" cx="53" cy="57" rx="3" ry="4" />
        <ellipse fill="#1a1a1a" cx="77" cy="57" rx="3" ry="4" />
        <path fill="#F5F5F5" d="M52 72c0 0 6 10 24 0" stroke="#F5F5F5" stroke-width="3" stroke-linecap="round" />
    </svg>
</template>
