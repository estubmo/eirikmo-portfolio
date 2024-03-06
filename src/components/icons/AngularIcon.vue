<script setup lang="ts">
const { height, width } = defineProps({
  height: { type: Number, required: true },
  width: { type: Number, required: true },
});
</script>

<template>
  <svg :width="width" :height="height" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Type=Default">
      <path
        id="angular_icon_Shape"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M21.1831 89.6805L252.449 7.28174L489.94 88.2156L451.488 394.189L252.449 504.421L56.523 395.654L21.1831 89.6805Z"
        fill="#E23237"
      />
      <path
        id="angular_icon_Shape_2"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M489.94 88.2156L252.449 7.28174V504.421L451.487 394.373L489.94 88.2156Z"
        fill="#B52E31"
      />
      <path
        id="angular_icon_Shape_3"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M252.815 65.3271L108.709 385.95L162.543 385.034L191.474 312.706H252.998H253.181H320.748L352.426 385.95L403.88 386.865L252.815 65.3271ZM253.181 168.051L301.888 269.859H255.196H252.815H210.334L253.181 168.051Z"
        fill="white"
      />
    </g>
  </svg>
</template>
