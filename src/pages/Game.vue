<template>
  <div>
    <Game :onlineUser="onlineUser" :isLoaded="isLoaded" />
    <BotBar
      :my="my"
      :corner="corner"
      :sideMenu="sideMenu"
      @toggleSideMenu="(val) => (sideMenu = val)"
      @changeSideMenu="(val) => (corner = val)"
    />
    <SideMenu
      :corner="corner"
      :sideMenu="sideMenu"
      :room="$route.params.roomName"
      :onlineUser="onlineUser"
      :socket="socket"
      @toggleSideMenu="sideMenu = false"
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
export let onlineUser;
export let socketId;
export const socket = io("ws://localhost:3001");

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
      isLoaded: false,
    };
  },
  async created() {
    //set socket data to backend websocket before used in mounted
    this.socket = socket;

    this.socket.on("new-user", (player, id) => {
      this.onlineUser = [...this.onlineUser, { player, id }];
      console.log(this.onlineUser);
      onlineUser = this.onlineUser;
    });

    this.socket.on("user-disconnected", (id) => {
      console.log("a");
      this.onlineUser = this.onlineUser.filter((x) => x.id !== id);
      console.log(this.onlineUser);
      onlineUser = this.onlineUser;
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

      socketId = userId;

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
        onlineUser = res.data.results;
        this.onlineUser = onlineUser;

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
          this.isLoaded = true;
        }
      });
    });
  },
  async unmounted() {
    this.socket.disconnect();
  },
};
</script>
