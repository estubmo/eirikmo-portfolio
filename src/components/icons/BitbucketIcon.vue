<script setup>
const { height, width } = defineProps({
  height: { type: Number, required: true },
  width: { type: Number, required: true },
});
</script>

<template>
  <svg :width="width" :height="height" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.6163 26.0014C11.7701 25.9389 7.14425 28.0225 3.97971 31.6934C0.815173 35.3642 -0.564172 40.2466 0.211688 45.0307L69.8491 467.777C71.6401 478.455 80.8399 486.306 91.6672 486.396H425.746C433.873 486.5 440.851 480.639 442.151 472.616L511.788 45.1127C512.564 40.3286 511.185 35.4463 508.02 31.7754C504.856 28.1045 500.23 26.0209 495.384 26.0834L16.6163 26.0014ZM309.848 331.537H203.218L174.346 180.696H335.685L309.848 331.537Z"
      fill="#2684FF"
    />
    <path
      d="M489.222 180.483H335.388L309.571 331.203H203.026L77.2217 480.53C81.2091 483.978 86.2929 485.895 91.5642 485.939H425.459C433.579 486.043 440.552 480.186 441.85 472.17L489.222 180.483Z"
      fill="url(#paint0_linear_333_567)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_333_567"
        x1="524.791"
        y1="222.691"
        x2="347.087"
        y2="475.008"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.18" stop-color="#0052CC" />
        <stop offset="1" stop-color="#2684FF" />
      </linearGradient>
    </defs>
  </svg>
</template>
