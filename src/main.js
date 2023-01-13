import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { vfmPlugin } from "vue-final-modal";

import Toast from "vue-toastification";

import "./assets/index.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vfmPlugin);
app.use(Toast);

app.mount("#app");
