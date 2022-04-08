<template>
  <div>
    <Game />
  </div>
</template>

<script>
// import HelloWorld from "../components/HelloWorld.vue";
import Game from '../components/Game.vue'; 
import axios from "axios";
import { API_URL } from "../components/utils";
import io from "socket.io-client";

export default {
  name: "game-page",
  components: {
    // HelloWorld,
    Game
  },
  data() {
    return {
      onlineUser: [],
      myId: "",
      socket: "",
    };
  },
  props: {
    my: Object,
  },
  created() {
    //set socket data to backend websocket before used in mounted
    this.socket = io("ws://localhost:3001");
  },
  mounted() {
    const { roomId, roomName } = this.$route.params;

    //get socket id
    this.socket.on("joining-room", async (userId) => {
      this.myId = userId;

      const payload = {
        room: roomName,
        roomId: roomId,
        username: this.my.username,
        id: userId,
      };

      //posting to room that a new user joined
      const res = await axios.post(API_URL + "connect-room", payload);
      this.onlineUser = res.data;

      //use socket to join room
      this.socket.emit(
        "join-room",
        this.my.username,
        this.myId,
        this.$route.params.roomId
      );
    });
  },
  unmounted() {
    this.socket.disconnect();
  },
};
</script>
