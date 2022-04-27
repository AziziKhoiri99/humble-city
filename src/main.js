import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Game from "@/pages/Game";
import Camera from "@/components/Camera";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/camera", component: Camera },
  { path: "/:roomId/:roomName", component: Game },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);

app.mount("#app");
