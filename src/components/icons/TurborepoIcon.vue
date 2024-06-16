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
        <g :clip-path="`url(#${uniqueId}_clip0_401_583)`">
            <path
                d="M100 54.9736C148.733 16.3956 207.611 -1.87814 266.496 0.152281V34.6694C219.793 32.639 171.067 44.8215 132.486 73.2472L100 54.9736Z"
                :fill="`url(#${uniqueId}_paint0_linear_401_583)`"
            />
            <path
                d="M288.83 2.18278C345.68 8.27404 398.471 34.6695 439.08 77.3083L414.717 101.673C380.202 67.1562 337.563 44.8216 288.83 36.6999V2.18278Z"
                :fill="`url(#${uniqueId}_paint1_linear_401_583)`"
            />
            <path
                d="M512.176 243.802C510.147 191.011 489.842 138.22 455.327 93.5511L430.957 117.916C459.385 156.495 475.632 199.133 477.661 243.802H512.176Z"
                :fill="`url(#${uniqueId}_paint2_linear_401_583)`"
            />
            <path
                d="M512.176 268.167C510.147 320.959 489.842 373.749 455.327 418.418L430.957 394.053C459.385 355.475 475.632 312.837 477.661 268.167H512.176Z"
                :fill="`url(#${uniqueId}_paint3_linear_401_583)`"
            />
            <path
                d="M288.83 509.787C343.651 503.696 398.471 477.301 439.08 434.662L414.717 410.297C380.202 446.844 335.527 469.179 288.83 475.27V509.787Z"
                :fill="`url(#${uniqueId}_paint4_linear_401_583)`"
            />
            <path
                d="M266.496 511.818C207.611 513.848 148.733 495.574 100 456.996L132.486 438.723C173.096 467.148 219.793 479.331 266.496 477.301V511.818Z"
                :fill="`url(#${uniqueId}_paint5_linear_401_583)`"
            />
            <path
                d="M257.224 114.868C278.925 114.868 298.954 118.564 317.312 125.956C335.671 133.109 351.408 143.124 364.525 156C377.876 168.876 388.249 184.018 395.643 201.424C403.037 218.593 406.731 237.192 406.731 257.221C406.731 277.251 403.037 295.969 395.643 313.376C388.249 330.544 377.876 345.566 364.525 358.443C351.408 371.319 335.671 381.453 317.312 388.845C298.954 395.998 278.925 399.575 257.224 399.575C235.289 399.575 215.135 395.998 196.777 388.845C178.653 381.453 163.039 371.319 149.922 358.443C136.805 345.566 126.556 330.544 119.162 313.376C111.768 295.969 108.074 277.251 108.074 257.221C108.074 237.192 111.768 218.593 119.162 201.424C126.556 184.018 136.805 168.876 149.922 156C163.039 143.124 178.653 133.109 196.777 125.956C215.135 118.564 235.289 114.868 257.224 114.868ZM257.224 182.826C246.968 182.826 237.194 184.733 227.894 188.548C218.836 192.125 210.843 197.251 203.93 203.928C197.018 210.605 191.529 218.474 187.477 227.535C183.426 236.595 181.397 246.491 181.397 257.221C181.397 267.952 183.426 277.847 187.477 286.908C191.529 295.969 197.018 303.838 203.93 310.515C210.843 317.191 218.836 322.437 227.894 326.252C237.194 329.829 246.968 331.617 257.224 331.617C267.479 331.617 277.136 329.829 286.195 326.252C295.495 322.437 303.604 317.191 310.517 310.515C317.67 303.838 323.276 295.969 327.327 286.908C331.379 277.847 333.408 267.952 333.408 257.221C333.408 246.491 331.379 236.595 327.327 227.535C323.276 218.474 317.67 210.605 310.517 203.928C303.604 197.251 295.495 192.125 286.195 188.548C277.136 184.733 267.479 182.826 257.224 182.826Z"
                fill="black"
            />
        </g>
        <defs>
            <linearGradient
                :id="`${uniqueId}_paint0_linear_401_583`"
                x1="306.088"
                y1="0"
                x2="306.088"
                y2="511.97"
                gradientUnits="userSpaceOnUse"
            >
                <stop stop-color="#1E90FF" />
                <stop offset="1" stop-color="#FF1E56" />
            </linearGradient>
            <linearGradient
                :id="`${uniqueId}_paint1_linear_401_583`"
                x1="306.088"
                y1="0"
                x2="306.088"
                y2="511.97"
                gradientUnits="userSpaceOnUse"
            >
                <stop stop-color="#1E90FF" />
                <stop offset="1" stop-color="#FF1E56" />
            </linearGradient>
            <linearGradient
                :id="`${uniqueId}_paint2_linear_401_583`"
                x1="306.088"
                y1="0"
                x2="306.088"
                y2="511.97"
                gradientUnits="userSpaceOnUse"
            >
                <stop stop-color="#1E90FF" />
                <stop offset="1" stop-color="#FF1E56" />
            </linearGradient>
            <linearGradient
                :id="`${uniqueId}_paint3_linear_401_583`"
                x1="306.088"
                y1="0"
                x2="306.088"
                y2="511.97"
                gradientUnits="userSpaceOnUse"
            >
                <stop stop-color="#1E90FF" />
                <stop offset="1" stop-color="#FF1E56" />
            </linearGradient>
            <linearGradient
                :id="`${uniqueId}_paint4_linear_401_583`"
                x1="306.088"
                y1="0"
                x2="306.088"
                y2="511.97"
                gradientUnits="userSpaceOnUse"
            >
                <stop stop-color="#1E90FF" />
                <stop offset="1" stop-color="#FF1E56" />
            </linearGradient>
            <linearGradient
                :id="`${uniqueId}_paint5_linear_401_583`"
                x1="306.088"
                y1="0"
                x2="306.088"
                y2="511.97"
                gradientUnits="userSpaceOnUse"
            >
                <stop stop-color="#1E90FF" />
                <stop offset="1" stop-color="#FF1E56" />
            </linearGradient>
            <clipPath :id="`${uniqueId}_clip0_401_583`">
                <rect width="512" height="512" fill="white" />
            </clipPath>
        </defs>
    </svg>
</template>
