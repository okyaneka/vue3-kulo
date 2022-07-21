<script setup>
const props = defineProps({
  text: { type: String, default: "Button" },
  tag: {
    type: String,
    default: "button",
    validator(value) {
      return ["button", "a"].includes(value);
    },
  },
});
</script>

<template>
  <button
    class="rounded px-4 h-9 text-white bg-primary-default hover:bg-primary-accent-1 focus:bg-primary-accent-2 transition-all"
  >
    {{ props.text }}
  </button>
</template>
