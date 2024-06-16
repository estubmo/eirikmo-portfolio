<script setup lang="ts">
const { height, width } = defineProps({
    height: { type: Number, required: true },
    width: { type: Number, required: true },
});
</script>

<template>
    <svg :width="width" :height="height" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M409.6 36H512L256 477.6L0 36H101.12H195.84L256 138.4L314.88 36H409.6Z" fill="#41B883" />
        <path d="M0 36L256 477.6L512 36H409.6L256 300.96L101.12 36H0Z" fill="#41B883" />
        <path d="M101.12 36L256 302.24L409.6 36H314.88L256 138.4L195.84 36H101.12Z" fill="#35495E" />
    </svg>
</template>
