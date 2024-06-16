<script setup lang="ts">
import { onMounted, ref } from "vue";

const { height, width } = defineProps({
    height: { type: Number, required: true },
    width: { type: Number, required: true },
});

const uniqueId = ref("");

onMounted(() => {
    uniqueId.value = Math.random().toString(36).substring(2, 15);
});
</script>

<template>
    <svg :width="width" :height="height" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g :clip-path="`url(#${uniqueId}_clip0_102_1483)`">
            <path
                d="M171.333 512C218.437 512 256.667 473.771 256.667 426.667V341.333H171.333C124.229 341.333 86 379.563 86 426.667C86 473.771 124.229 512 171.333 512Z"
                fill="#0ACF83"
            />
            <path
                d="M86 256C86 208.896 124.229 170.667 171.333 170.667H256.667V341.333H171.333C124.229 341.333 86 303.104 86 256Z"
                fill="#A259FF"
            />
            <path
                d="M86 85.3333C86 38.2293 124.229 0 171.333 0H256.667V170.667H171.333C124.229 170.667 86 132.437 86 85.3333Z"
                fill="#F24E1E"
            />
            <path
                d="M256.667 0H342C389.104 0 427.333 38.2293 427.333 85.3333C427.333 132.437 389.104 170.667 342 170.667H256.667V0Z"
                fill="#FF7262"
            />
            <path
                d="M427.333 256C427.333 303.104 389.104 341.333 342 341.333C294.896 341.333 256.667 303.104 256.667 256C256.667 208.896 294.896 170.667 342 170.667C389.104 170.667 427.333 208.896 427.333 256Z"
                fill="#1ABCFE"
            />
        </g>
        <defs>
            <clipPath :id="`${uniqueId}_clip0_102_1483`">
                <rect width="512" height="512" fill="white" />
            </clipPath>
        </defs>
    </svg>
</template>
