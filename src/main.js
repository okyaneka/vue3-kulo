import { createApp } from "vue";
import { createPinia } from "pinia";
import VueKonva from "vue-konva";

import App from "./App.vue";
import router from "./router";
import FontAwesome from "./plugins/fontawesome";

import "./styles/index.css";

const app = createApp(App);

app.use(createPinia());
app.use(VueKonva);
app.use(router);
app.component("fa-icon", FontAwesome);

app.mount("#app");
