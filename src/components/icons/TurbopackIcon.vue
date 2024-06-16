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
        <path
            d="M255.672 0L112.662 81.7243L112.941 145.946L255.672 64.3897L423.427 160.261L479.345 192.218V127.801L255.672 0ZM230.509 432.47L87.9181 350.998V160.401L87.8622 160.373L87.5546 96.0673L32 127.801V213.02V298.239V383.43L174.731 464.987L230.509 432.47ZM423.427 350.998V189.255L479.345 221.212V298.239V383.43L255.672 511.259L199.95 479.414L255.672 446.925V446.841L423.427 350.998Z"
            :fill="`url(#${uniqueId}_paint0_linear_401_604)`"
        />
        <path d="M125.747 167.616L255.673 93.3844L398.264 174.857L268.367 249.116L125.747 167.616Z" fill="black" />
        <path d="M113.082 336.376V189.368L255.673 270.84V417.877L113.082 336.376Z" fill="black" />
        <defs>
            <linearGradient
                :id="`${uniqueId}_paint0_linear_401_604`"
                x1="255.672"
                y1="0"
                x2="255.44"
                y2="512"
                gradientUnits="userSpaceOnUse"
            >
                <stop stop-color="#0096FF" />
                <stop offset="1" stop-color="#FF1E56" />
            </linearGradient>
        </defs>
    </svg>
</template>
