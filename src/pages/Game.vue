<template>
  <div>
    <Game />
  </div>
</template>

<script>
import Game from "../components/Game.vue";
import axios from "axios";
import { API_URL } from "../components/utils";
import io from "socket.io-client";

export default {
  name: "game-page",
  components: {
    Game,
  },
  props: {
    my: Object,
  },
  data() {
    return {
      onlineUser: [],
      socket: "",
    };
  },
  created() {
    //set socket data to backend websocket before used in mounted
    this.socket = io("ws://localhost:3001");
  },
  mounted() {
    const { roomId, roomName } = this.$route.params;

    //update room history locally
    const user = JSON.parse(window.localStorage.getItem("user"));
    window.localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        roomHistory: [...user.roomHistory, { name: roomName, roomId }],
      })
    );
    this.$emit("addRoomHistory", [
      ...user.roomHistory,
      { name: roomName, roomId },
    ]);

    //get socket id
    this.socket.on("joining-room", async (userId) => {
      const payload = {
        room: roomName,
        roomId: roomId,
        user: {
          name: this.my.username,
          id: this.my.id,
        },
        playerId: userId,
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
