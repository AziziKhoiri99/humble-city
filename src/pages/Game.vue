<template>
  <div class="body">
    <Nearby />
    <Game :onlineUser="onlineUser" :isLoaded="loadingStep[0]" />
    <BotBar
      :my="my"
      :corner="corner"
      :sideMenu="sideMenu"
      :unreadMsg="unreadMsg"
      :comsInput="comsInput"
      @toggleInput="toggleInput"
      @toggleSideMenu="(val) => (sideMenu = val)"
      @changeSideMenu="(val) => (corner = val)"
      @readMessage="unreadMsg = 0"
    />
    <SideMenu
      :corner="corner"
      :sideMenu="sideMenu"
      :room="$route.params.roomName"
      :onlineUser="onlineUser"
      :unreadMsg="unreadMsg"
      :socket="socket"
      @toggleSideMenu="sideMenu = false"
      @newMessage="unreadMsg++"
    />
    <LoadingScreen v-if="!loadingStep[1]" :loadingStep="loadingStep" />
  </div>
</template>

<script>
import Game from "../components/Game.vue";
import BotBar from "../components/BotBar.vue";
import SideMenu from "../components/SideMenu.vue";
import Nearby from "../components/Nearby.vue";
import axios from "axios";
import { API_URL, serverIp } from "../components/utils";
import { doneLoading, myDevices } from "../components/game/gamescene";
import io from "socket.io-client";
export let onlineUser;
export let socketId;
export let comsInput;
export let socket;
import LoadingScreen from "../components/Loading.vue";

export default {
  name: "game-page",
  components: {
    Game,
    BotBar,
    SideMenu,
    Nearby,
    LoadingScreen,
  },
  props: {
    my: Object,
  },
  data() {
    return {
      onlineUser: [],
      socketId: "",
      socket: null,
      corner: 0,
      unreadMsg: 0,
      sideMenu: false,
      comsInput: [false, false],
      loadingStep: [false, false],
    };
  },
  async created() {
    //set socket data to backend websocket before used in mounted
    this.socket = io(`ws://${serverIp}:3001`);
    socket = this.socket;

    this.socket.on("new-user", (player, id) => {
      this.onlineUser = [...this.onlineUser, { player, id }];
      onlineUser = this.onlineUser;
    });

    this.socket.on("user-disconnected", (id) => {
      this.onlineUser = this.onlineUser.filter((x) => x.id !== id);
      onlineUser = this.onlineUser;
    });
  },
  mounted() {
    this.loop();

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
      this.socketId = userId;
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

        this.loadingStep[0] = true;
      });
    });
  },
  methods: {
    loop() {
      setTimeout(() => {
        if (doneLoading) {
          return (
            (this.loadingStep[1] = true),
            (this.comsInput[0] = myDevices.mic),
            (this.comsInput[1] = myDevices.cam)
          );
        }
        this.loop();
      }, 500);
    },
    toggleInput(index) {
      if (this.comsInput[index] == null) return alert("device not plugged in");
      this.comsInput[index] = !this.comsInput[index];
      this.socket.emit(
        "toggle-input",
        this.socketId,
        index,
        !this.comsInput[index]
      );
    },
  },
  async unmounted() {
    this.socket.disconnect();
  },
};
</script>
