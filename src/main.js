<<<<<<< HEAD
import { createApp } from 'vue'
import App from './App.vue'
 
createApp(App).mount('#app')
=======
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
>>>>>>> 976383b029448896517a2f8e74798fe69739178d
