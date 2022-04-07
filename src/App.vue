<template>
  <router-view
    :my="this.my"
    @loggingIn="this.setUser"
    @loggingOut="this.userLogout"
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
        isLoggedIn: user ? true : false,
        username: (user && user.username) || randomName(),
      },
    };
  },
  methods: {
    setUser(value) {
      this.my = {
        ...this.my,
        isLoggedIn: true,
        username: value,
      };
    },
    userLogout() {
      this.my = {
        ...this.my,
        isLoggedIn: false,
        username: randomName(),
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
</style>
