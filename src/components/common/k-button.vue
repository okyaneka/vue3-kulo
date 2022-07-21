<script setup>
import { computed } from "vue";

const props = defineProps({
  text: String,
  disabled: Boolean,
});

const getClass = computed(() => {
  let classAttr = "";
  classAttr += props.disabled
    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
    : "bg-primary-500 text-white hover:bg-primary-700 cursor-pointer";
  return classAttr;
});
</script>

<template>
  <button
    :disabled="disabled"
    :class="getClass"
    class="py-2 px-4 rounded curso"
  >
    {{ props.text }}
  </button>
</template>
