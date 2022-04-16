<template>
  <router-view
    :my="this.my"
    @loggingIn="this.setUser"
    @loggingOut="this.userLogout"
    @addRoomHistory="(value) => (this.my.roomHistory = value)"
  />
</template>

<script>
import { randomName } from "./components/utils";
const user = JSON.parse(window.localStorage.getItem("user"));

export default {
  name: "App",
  data() {
    return {
      my: {
        username: (user && user.username) || randomName(),
        id: (user && user.id) || false,
        roomHistory: (user && user.roomHistory) || [],
      },
    };
  },
  methods: {
    setUser(value) {
      this.my = {
        username: value.username,
        id: value.id,
        roomHistory: value.roomHistory,
      };
    },
    userLogout() {
      this.my = {
        username: randomName(),
        id: false,
        roomHistory: [],
      };
    },
  },
};
</script>

<style>
:root {
  font-size: 16px;
  font-family: "DM Sans", sans-serif, "Open Sans";
  --text-primary: #fff;
  --text-secondary: #41aa79;
  --bg-primary: #00463a;
  --bg-main: #00372d;
  --bg-secondary: #066b5b;
  --transition-speed: 600ms;
  --border: 2px solid #279787;
}
*,
*::before,
*::after {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-weight: 500;
  background-color: var(--bg-main);
}
.selected {
  background-color: #146153;
}
.text-input {
  border: var(--border);
  height: 40px;
  border-radius: 16px;
  width: 100%;
  font-size: inherit;
  color: var(--text-primary);
  background-color: transparent;
  padding: 0 15px;
}
.text-input:focus-visible {
  outline: none;
}
</style>
