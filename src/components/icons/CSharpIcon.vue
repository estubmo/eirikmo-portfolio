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
        <g :clip-path="`url(#${uniqueId}_clip0_334_613)`">
            <path
                d="M256 512C397.385 512 512 397.385 512 256C512 114.615 397.385 0 256 0C114.615 0 0 114.615 0 256C0 397.385 114.615 512 256 512Z"
                fill="#05930C"
            />
            <path
                d="M77.8052 72.1993L439.472 434.533C392.965 482.319 327.949 512 256 512C114.615 512 0 397.385 0 256C0 183.882 29.8212 118.729 77.8052 72.1993Z"
                fill="white"
                fill-opacity="0.1"
            />
            <path
                d="M243.44 348.4C226.024 356.873 206.794 360.939 187.44 360.24C161.563 361.374 136.456 351.285 118.56 332.56C100.777 312.626 91.5023 286.525 92.7196 259.84C91.4679 230.922 101.972 202.729 121.84 181.68C141.261 161.81 168.151 151.037 195.92 152C212.141 151.381 228.315 154.104 243.44 160V185.2C228.771 177.047 212.22 172.882 195.44 173.12C174.301 172.419 153.889 180.876 139.44 196.32C124.46 213.396 116.713 235.632 117.84 258.32C116.731 279.761 123.955 300.801 138 317.04C151.626 331.691 170.967 339.667 190.96 338.88C209.395 339.338 227.594 334.657 243.52 325.36L243.44 348.4ZM422.08 211.68L418.88 226.56H382.08L373.28 268.8H412.8L409.04 283.68H370.32L357.92 339.68H340.24L352.32 283.68H317.12L305.28 339.68H288L299.84 283.68H262.72L265.52 268.8H302.8L311.36 226.64H272.4L275.36 211.76H314.32L326.16 155.2H344L332.16 211.76H367.6L379.68 155.2H396.96L385.12 211.76L422.08 211.68ZM364.72 226.56H329.2L320 268.8H355.68L364.72 226.56Z"
                fill="white"
            />
        </g>
        <defs>
            <clipPath :id="`${uniqueId}_clip0_334_613`">
                <rect width="512" height="512" fill="white" />
            </clipPath>
        </defs>
    </svg>
</template>
