<script setup>
import { computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import KButton from "../components/common/k-button.vue";

const router = useRouter();
const welcome = computed(() => "Welcome to Vue 3 + Tailwind Kulo");

onMounted(() => {});

onUnmounted(() => {});
</script>

<script></script>

<template>
  <div class="m-auto">
    <div class="text-5xl text-center mt-4">
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
    <div class="text-center mt-4 space-x-4">
      <KButton text="PLAY" @click="router.push('/playground')" />
      <KButton text="AUTH" @click="router.push('/auth')" />
    </div>
  </div>
</template>
