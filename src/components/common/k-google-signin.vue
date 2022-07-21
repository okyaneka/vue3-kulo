<script setup>
import { onMounted, onUnmounted } from "vue";

const emit = defineEmits(["signed-in"]);
const CLIENT_ID = import.meta.env.VITE_APP_G_CLIENT_ID;

onMounted(() => {
  const script = document.createElement("script");
  script.src = "https://accounts.google.com/gsi/client";
  script.async = true;
  script.defer = true;
  document.body.append(script);

  window.signinCallback = function (res) {
    emit("signed-in", res);
  };
});

onUnmounted(() => {
  delete window.signinCallback;
});
</script>

<template>
  <div
    id="g_id_onload"
    :data-client_id="CLIENT_ID"
    data-callback="signinCallback"
    data-auto_prompt="false"
  ></div>
  <div
    class="g_id_signin inline-block"
    data-type="standard"
    data-theme="outline"
    data-text="continue_with"
    data-shape="rectangular"
    data-size="medium"
    data-logo_alignment="left"
  ></div>
</template>
