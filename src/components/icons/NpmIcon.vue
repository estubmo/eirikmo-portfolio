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
        <g :clip-path="`url(#${uniqueId}_clip0_325_554)`">
            <path d="M0 512V0H512V512H0Z" fill="#C12127" />
            <path d="M96 96H416V416H352V160H256V416H96V96Z" fill="white" />
        </g>
        <defs>
            <clipPath :id="`${uniqueId}_clip0_325_554`">
                <rect width="512" height="512" fill="white" />
            </clipPath>
        </defs>
    </svg>
</template>
