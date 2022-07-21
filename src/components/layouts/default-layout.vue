<script setup>
import { computed } from "vue";

const appTitle = computed(() => {
  return import.meta.env.VITE_APP_TITLE;
});
</script>

<template>
  <header
    class="h-14 flex items-center bg-green-50 border-b border-green-100 px-4"
  >
    <div class="">
      <router-link to="/" class="text-lg font-semibold">
        {{ appTitle }}
      </router-link>
    </div>
    <div class="ml-auto rtl:mr-auto"></div>
  </header>

  <section class="flex flex-col" style="min-height: calc(100vh - (56px * 2))">
    <router-view />
  </section>

  <footer
    class="h-14 flex items-center bg-green-50 border-b border-green-100 px-4"
  >
    <div class="text-center w-full">&copy; 2022 - {{ appTitle }}</div>
  </footer>
</template>
