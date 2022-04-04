import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHashHistory } from "vue-router";

import Home from "@/pages/Home";
import Game from "@/pages/Game";

const routes = [
  { path: "/", component: Home },
  { path: "/:roomId/:roomName", component: Game },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);

app.use(router);

app.mount("#app");
