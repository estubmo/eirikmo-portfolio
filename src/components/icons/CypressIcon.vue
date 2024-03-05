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
    <g id="Type=Mocha-regular" :clip-path="`url(#${uniqueId}_clip0_339_1470)`">
      <path
        id="Vector"
        d="M283.303 447.887L274.632 468.939C272.91 473.105 268.971 475.927 264.539 476.119C261.613 476.229 258.659 476.311 255.678 476.311C153.629 476.257 63.3409 404.085 40.9673 304.64L6.23047 312.507C18.7849 368.287 50.2942 418.914 94.9595 455.097C140.144 491.689 197.064 511.89 255.295 512C255.377 512 255.815 512 255.815 512C259.233 512 262.625 511.918 266.016 511.781C284.287 511.013 300.617 499.529 307.592 482.507L318.915 454.987L283.303 447.887Z"
        :fill="`url(#${uniqueId}_paint0_linear_339_1470)`"
      />
      <path
        id="Vector_2"
        d="M9.08095 323.827C3.06358 301.844 0 279.011 0 256.014C0 151.031 65.7262 55.04 163.564 17.1862L176.391 50.4899C92.1752 83.0809 35.612 165.668 35.612 256.014C35.612 275.831 38.2376 295.457 43.4071 314.37L9.08095 323.827Z"
        :fill="`url(#${uniqueId}_paint1_linear_339_1470)`"
      />
      <path
        id="Vector_3"
        d="M451.386 154.595C413.312 81.272 338.368 35.7158 255.849 35.7158C226.61 35.7158 198.191 41.3623 171.441 52.4636L157.793 19.4887C188.892 6.57847 221.878 0 255.849 0C351.716 0 438.749 52.9022 482.977 138.094L451.386 154.595Z"
        :fill="`url(#${uniqueId}_paint2_linear_339_1470)`"
      />
      <path
        id="Vector_4"
        d="M179.455 203.194C200.106 203.194 216.928 214.24 225.57 233.509L226.254 235.018L260.936 223.203L260.197 221.422C246.767 188.611 215.833 168.218 179.455 168.218C153.882 168.218 133.094 176.442 115.917 193.326C98.8499 210.101 90.207 231.207 90.207 256.068C90.207 280.71 98.8499 301.707 115.917 318.482C133.094 335.367 153.882 343.59 179.455 343.59C215.833 343.59 246.767 323.197 260.197 290.414L260.936 288.633L226.2 276.79L225.543 278.353C217.803 297.294 200.571 308.614 179.455 308.614C165.069 308.614 152.925 303.571 143.296 293.648C133.56 283.588 128.636 270.953 128.636 256.096C128.636 241.13 133.45 228.74 143.296 218.214C152.897 208.238 165.069 203.194 179.455 203.194Z"
        fill="#09293F"
      />
      <path
        id="Vector_5"
        d="M396.682 171.453L347.258 296.91L297.504 171.453H256.805L326.579 342.686L276.935 463.456L312.52 470.556L435.138 171.453H396.682Z"
        fill="#09293F"
      />
      <path
        id="Vector_6"
        d="M482.977 138.094C500.983 173.171 512 214.37 512 256.542C512 354.941 456.658 440.375 375.494 483.228L357.958 452.132C428.34 415.428 476.412 341.616 476.412 256.542C476.412 219.624 467.386 185.159 451.386 154.595L482.977 138.094Z"
        :fill="`url(#${uniqueId}_paint3_linear_339_1470)`"
      />
    </g>
    <defs>
      <linearGradient
        :id="`${uniqueId}_paint0_linear_339_1470`"
        x1="25.9919"
        y1="395.937"
        x2="270.427"
        y2="461.203"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#315C55" />
        <stop offset="1" stop-color="#09293F" />
      </linearGradient>
      <linearGradient
        :id="`${uniqueId}_paint1_linear_339_1470`"
        x1="95.7762"
        y1="100.783"
        x2="73.0274"
        y2="322.269"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#4FB38D" />
        <stop offset="1" stop-color="#315C55" />
      </linearGradient>
      <linearGradient
        :id="`${uniqueId}_paint2_linear_339_1470`"
        x1="203.023"
        y1="77.2976"
        x2="383.43"
        y2="110.367"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#4FB38D" />
        <stop offset="1" stop-color="#97DEC0" />
      </linearGradient>
      <linearGradient
        :id="`${uniqueId}_paint3_linear_339_1470`"
        x1="440.925"
        y1="244.713"
        x2="342.553"
        y2="428.899"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#97DEC0" />
        <stop offset="1" stop-color="#FFFFF0" stop-opacity="0" />
      </linearGradient>
      <clipPath :id="`${uniqueId}_clip0_339_1470`">
        <rect width="512" height="512" fill="white" />
      </clipPath>
    </defs>
  </svg>
</template>
