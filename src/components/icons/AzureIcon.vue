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
      d="M170.687 15.0058H322.192L164.914 481.002C161.6 490.821 152.393 497.434 142.03 497.434H24.1212C16.3526 497.434 9.05927 493.694 4.52798 487.383C-0.00331116 481.073 -1.21769 472.967 1.26562 465.606L147.796 31.4376C151.109 21.6148 160.32 15 170.687 15V15.0058Z"
      :fill="`url(#${uniqueId}_paint0_linear_5_364)`"
    />
    <path
      d="M390.846 327.565H150.595C146.024 327.56 141.915 330.353 140.238 334.605C138.561 338.857 139.658 343.702 143.001 346.819L297.381 490.911C301.876 495.104 307.794 497.434 313.941 497.434H449.98L390.846 327.565Z"
      fill="#0078D4"
    />
    <path
      d="M170.687 15.0056C160.196 14.9656 150.9 21.7535 147.744 31.7576L1.44599 465.21C-1.20528 472.6 -0.088717 480.819 4.43809 487.234C8.9649 493.649 16.3339 497.455 24.1852 497.434H145.137C154.308 495.795 161.888 489.349 164.978 480.56L194.153 394.578L298.365 491.778C302.732 495.39 308.21 497.388 313.877 497.434H449.41L389.967 327.565L216.683 327.606L322.739 15.0056H170.687Z"
      :fill="`url(#${uniqueId}_paint1_linear_5_364)`"
    />
    <path
      d="M364.196 31.4143C360.888 21.6073 351.691 15.0058 341.341 15.0058H172.49C182.84 15.0058 192.036 21.6084 195.346 31.4143L341.882 465.6C344.367 472.962 343.154 481.071 338.623 487.383C334.091 493.696 326.797 497.44 319.026 497.44H487.883C495.652 497.44 502.945 493.693 507.475 487.381C512.005 481.069 513.218 472.961 510.733 465.6L364.196 31.4143Z"
      :fill="`url(#${uniqueId}_paint2_linear_5_364)`"
    />
    <defs>
      <linearGradient
        :id="`${uniqueId}_paint0_linear_5_364`"
        x1="190.002"
        y1="50.7554"
        x2="41.6212"
        y2="489.111"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#114A8B" />
        <stop offset="1" stop-color="#0669BC" />
      </linearGradient>
      <linearGradient
        :id="`${uniqueId}_paint1_linear_5_364`"
        x1="268.395"
        y1="267.377"
        x2="236.321"
        y2="278.222"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-opacity="0.3" />
        <stop offset="0.071" stop-opacity="0.2" />
        <stop offset="0.321" stop-opacity="0.1" />
        <stop offset="0.623" stop-opacity="0.05" />
        <stop offset="1" stop-opacity="0" />
      </linearGradient>
      <linearGradient
        :id="`${uniqueId}_paint2_linear_5_364`"
        x1="299.056"
        y1="37.1981"
        x2="461.005"
        y2="468.66"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#3CCBF4" />
        <stop offset="1" stop-color="#2892DF" />
      </linearGradient>
    </defs>
  </svg>
</template>
