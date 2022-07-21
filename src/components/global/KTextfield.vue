<script setup>
const props = defineProps({
  modelValue: String,
  placeholder: String,
  type: {
    type: String,
    default: "text",
    validator(value) {
      return ["text", "email", "password"].includes(value);
    },
  },
});
</script>

<template>
  <input
    class="h-9 px-4 block w-full rounded border-2 focus:border-primary-default outline-none transition-all"
    :value="modelValue"
    :type="props.type"
    :placeholder="placeholder"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
