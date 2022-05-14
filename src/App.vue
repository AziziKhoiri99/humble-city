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
        username: (user && user.username) || randomName(),
        id: (user && user.id) || false,
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
  font-family: "DM Sans", sans-serif, "Open Sans";
  --text-primary: #fff;
  --text-secondary: #41aa79;
  --bg-primary: #00463a;
  --bg-main: #00372d;
  --bg-secondary: #066b5b;
  --transition-speed: 600ms;
  --border: 2px solid #070707;

      /* ===== Colors ===== */
    --body-color: #E4E9F7;
    --sidebar-color: #FFF;
    --primary-color: #695CFE;
    --primary-color-light: #F6F5FF;
    --toggle-color: #DDD;
    --text-color: #070707;

    /* ====== Transition ====== */
    --tran-03: all 0.2s ease;
    --tran-03: all 0.3s ease;
    --tran-04: all 0.3s ease;
    --tran-05: all 0.3s ease;
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

::selection{
    background-color: var(--primary-color);
    color: var(--sidebar-color);
}

body.dark{
    --body-color: #18191a;
    --sidebar-color: #242526;
    --primary-color: #3a3b3c;
    --primary-color-light: #3a3b3c;
    --toggle-color: #fff;
    --text-color: #ccc;
}

body {
  margin: 0;
  font-weight: 500;
  min-height: 100vh;
  background-color: var(--body-color);
}
.selected {
  background-color: var(--primary-color);
  color: green;
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
