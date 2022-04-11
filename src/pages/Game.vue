<template>
  <div>
    <Game />
    <BotBar/>
  </div>
</template>

<script>
import Game from "../components/Game.vue";
import BotBar from "../components/BotBar.vue";
import axios from "axios";
import { API_URL } from "../components/utils";
import io from "socket.io-client";

export default {
  name: "game-page",
  components: {
    Game,
    BotBar
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
    this.socket = io("ws://192.168.6.208:3001");
  },
  mounted() {
    const { roomId, roomName } = this.$route.params;

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
      await axios.post(API_URL + "connect-room", payload).then((res) => {
        if (res.data.failed) return alert(res.data.failed);

        this.onlineUser = res.data;

        //update room history locally
        //check is user logged in and has visited the room before
        if (this.my.id && !this.my.roomHistory.filter((x) => x.id == roomId)) {
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
        }

        //use socket to join room
        this.socket.emit(
          "join-room",
          this.my.username,
          this.myId,
          this.$route.params.roomId
        );
      });
    });
  },
  unmounted() {
    this.socket.disconnect();
  },
};
</script>
