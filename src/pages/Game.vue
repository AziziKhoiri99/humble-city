<template>
  <div>
    <Game />
    <BotBar
      :my="this.my"
      :corner="this.corner"
      :sideMenu="this.sideMenu"
      @toggleSideMenu="(val) => (this.sideMenu = val)"
      @changeSideMenu="(val) => (this.corner = val)"
    />
    <SideMenu
      :corner="this.corner"
      :sideMenu="this.sideMenu"
      :room="this.$route.params.roomName"
      :onlineUser="this.onlineUser"
      :socket="this.socket"
      @toggleSideMenu="this.sideMenu = false"
    />
  </div>
</template>

<script>
import Game from "../components/Game.vue";
import BotBar from "../components/BotBar.vue";
import SideMenu from "../components/SideMenu.vue";
import axios from "axios";
import { API_URL } from "../components/utils";
import io from "socket.io-client";

export default {
  name: "game-page",
  components: {
    Game,
    BotBar,
    SideMenu,
  },
  props: {
    my: Object,
  },
  data() {
    return {
      onlineUser: [],
      socket: "",
      corner: 0,
      sideMenu: false,
    };
  },
  async created() {
    //set socket data to backend websocket before used in mounted
    this.socket = io("ws://192.168.6.208:3001");

    this.socket.on("move to", (x) => {
      console.log(x);
    });

    addEventListener("keydown", (e) => {
      switch (e.code) {
        case "KeyW":
          this.socket.emit("character move", "up");
          break;
        case "KeyA":
          this.socket.emit("character move", "left");
          break;
        case "KeyS":
          this.socket.emit("character move", "down");
          break;
        case "KeyD":
          this.socket.emit("character move", "right");
          break;
      }
    });
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

        //use socket to join room
        this.socket.emit(
          "join-room",
          this.my.username,
          userId,
          this.$route.params.roomId
        );
        this.onlineUser = res.data.results;

        //update room history locally
        //check is user logged in and has visited the room before
        if (this.my.roomHistory.filter((x) => x.roomId == roomId).length == 0) {
          if (this.my.id > 0) {
            const user = JSON.parse(window.localStorage.getItem("user"));
            window.localStorage.setItem(
              "user",
              JSON.stringify({
                ...user,
                roomHistory: [
                  ...user.roomHistory,
                  { name: roomName, roomId, creator: res.data.creator },
                ],
              })
            );
          }
          this.$emit("addRoomHistory", [
            this.my.roomHistory,
            { name: roomName, roomId },
          ]);
        }
      });
    });
  },
  unmounted() {
    this.socket.disconnect();
  },
};
</script>
