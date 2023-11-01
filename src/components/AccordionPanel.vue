<script setup>
import { ref } from "vue";

const props = defineProps({
  title: { type: String, required: true },
  titleClose: { type: String, required: true },
  ariaTitle: { type: String, required: true },
});

const showPanel = ref(false);

const togglePanel = (event) => {
  showPanel.value = !showPanel.value;
};
</script>

<template>
  <div class="panel">
    <Transition appear>
      <div class="content" v-if="showPanel">
        <slot></slot>
      </div>
    </Transition>
    <button
      @click.prevent="togglePanel"
      class="text-[#15FF93] font-medium border-[#15FF93] border rounded-md px-4 py-2"
    >
      {{ showPanel ? titleClose : title }}
    </button>
  </div>
</template>

<style>
.v-enter-active,
.v-leave-active {
  /* transition: opacity 0.5s ease; */
  transition: all 0.2s;
  max-height: 100vh;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  max-height: 0px;
}
</style>
