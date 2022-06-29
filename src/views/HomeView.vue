<script setup>
import { computed } from "vue";

const welcome = computed(() => "Welcome to Vue 3 + Tailwind Kulo");
</script>

<template>
  <div class="m-auto">
    <div class="text-5xl text-center">
      <div
        v-for="(char, i) in welcome"
        :key="i"
        class="animate-pulse inline-block"
        :class="char != ' ' ? '' : 'ml-4'"
        :style="{ animationDelay: i * 0.05 + 's' }"
      >
        {{ char }}
      </div>
    </div>
  </div>
</template>
