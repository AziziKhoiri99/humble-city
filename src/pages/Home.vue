<template>
  <div style="height: 100%">
    <Sidebar
      @clicked="(value) => (this.selected = value)"
      @create-room="this.modal = true"
    />
    <main>
      <Navbar :buttons="this.page[this.selected].buttons" />
      <Content :page="this.page[this.selected]" />
    </main>
    <Modal @close-modal="this.modal = false" v-if="this.modal" />
  </div>
</template>

<script>
import Content from "../components/Content.vue";
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import Modal from "../components/Modal.vue";
import { API_URL, randomName } from "../components/utils";
import io from "socket.io-client";
import axios from "axios";

export default {
  name: "App",
  components: {
    Content,
    Navbar,
    Modal,
    Sidebar,
  },
  data() {
    return {
      my: { username: randomName() },
      socket: io("ws://localhost:3001"),
      modal: false,
      selected: 2,
      page: [
        {
          buttons: ["Experience", "Community Spaces", "Events"],
          page: 0,
          notFoundMsg:
            'Our explore page is currently under maintenance, but you can create a space instead by clicking on the "Create" button in the top right corner!',
        },
        {
          buttons: ["My Events", "Saved Events"],
          page: 1,
          notFoundMsg:
            "You haven't created any events. Create your first event!",
        },
        {
          buttons: ["Last Visited", "Created Space"],
          page: 2,
          notFoundMsg:
            "You haven't visited any spaces. Create a Space to get started!",
        },
      ],
    };
  },
  mounted() {
    this.socket.on("joining-room", (userId) => {
      this.my.id = userId;
    });
  },
  methods: {
    join(room) {
      this.socket.emit("join-room", this.my.id, room);

      axios.post(API_URL + "connect-room", {
        room,
        username: this.my.name,
        id: this.my.id,
      });
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
  --bg-secondary: #066b5b;
  --transition-speed: 600ms;
  --border: 2px solid #279787;
}
main {
  margin-left: 5rem;
}
*,
*::before,
*::after {
  box-sizing: border-box;
}
body {
  margin: 0;
  background-color: #00372d;
  font-weight: 500;
}
.selected {
  background-color: #146153;
}
</style>
