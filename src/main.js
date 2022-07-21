import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import i18n from "./lang";
import components from "./components/global";

import "./styles/index.css";

const app = createApp(App);

app.use(createPinia());
app.use(i18n);
app.use(router);

Object.entries(components).forEach(([name, component]) =>
  app.component(name, component)
);

app.mount("#app");
