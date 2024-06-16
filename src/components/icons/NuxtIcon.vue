<script setup lang="ts">
const { height, width } = defineProps({
    height: { type: Number, required: true },
    width: { type: Number, required: true },
});
</script>

<template>
    <svg :width="height" :height="width" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 298">
        <g fill="none">
            <path
                fill="#00C58E"
                d="m228 82-13.8 23.8-46.8-81.1L23.7 273.6H121c0 13 10.6 23.7 23.7 23.7h-121a23.7 23.7 0 0 1-20.5-35.6L146.9 12.8a23.7 23.7 0 0 1 41 0l40 69.3z"
            />
            <path
                fill="#2F495E"
                d="m331.7 261.7-90-156-13.8-23.6-13.7 23.7-90 156a23.7 23.7 0 0 0 20.5 35.5h166.4a23.7 23.7 0 0 0 20.5-35.6zm-187 11.9L228 129.5l83.2 144H144.7z"
            />
            <path
                fill="#108775"
                d="M396 285.4a23.7 23.7 0 0 1-20.5 11.9h-64.4a23.7 23.7 0 0 0 23.7-23.7h40.7L260 73.7l-18.5 32L228 82.2 239.7 62a23.7 23.7 0 0 1 41 0L396 261.7a23.7 23.7 0 0 1 0 23.7z"
            />
        </g>
    </svg>
</template>
