<template>
  <div
    v-bind:style="!this.sideMenu && 'right: -270px'"
    class="sidemenu text-light"
  >
    <div class="offcanvas-header">
      <h5 id="offcanvasRightLabel">
        {{ this.corner === 0 ? "Chat" : this.room }}
      </h5>
      <button @click="this.$emit('toggleSideMenu')">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
    <hr style="margin: 0 0 20px 0; border-top: solid #fff 2px" />
    <div v-if="this.corner === 0" class="offcanvas-body">
      <div v-for="(text, index) in this.chat" :key="index" class="chat">
        <img src="../assets/image/placeholder.png" alt="" />
        <div>
          <span>{{ text.username }}</span>
          <div>
            {{ text.message }}
          </div>
        </div>
      </div>
      <form @submit="this.sendMessage" class="position-absolute bottom-0">
        <hr style="border: var(--border); margin: 0" />
        <input
          type="text"
          v-model="message"
          class="text-input"
          placeholder="Message..."
          required
          aria-label="Enter Some.."
          oninvalid="this.setCustomValidity(' ')"
          oninput="setCustomValidity('')"
        />
        <input type="submit" hidden />
      </form>
    </div>
    <div v-else class="offcanvas-body">
      <div class="search" style="margin-bottom: 20px; width: 100%">
        <svg
          width="20"
          viewBox="0 0 24 24"
          fill="none"
          style="margin-right: 8px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.167 17.833a6.667 6.667 0 100-13.333 6.667 6.667 0 000 13.333zM19.5 19.5l-3.625-3.625"
            stroke="#fff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
        <input v-model="this.search" placeholder="Search" type="text" />
      </div>
      <div class="nearby">
        <div class="arrowDown">
          <i class="fa-solid fa-chevron-down"></i>
        </div>
        <span class="areaOnline">
          Nearby - 1
        </span>
      </div>
      <div
        class="user-list"
        v-for="user in this.onlineUser.filter((x) =>
          x.player.toLowerCase().includes(this.search.toLowerCase())
        )"
        :key="user.id"
      >
        <img src="../assets/image/placeholder.png" alt="" />
        {{ user.player }}
      </div>
      <div class="nearby">
        <div class="arrowDown">
          <i class="fa-solid fa-chevron-right"></i>
        </div>
        <span class="areaOnline">
          Offline Members - 0
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
      search: "",
      chat: [],
    };
  },
  props: {
    room: String,
    onlineUser: Array,
    socket: Object,
    corner: Number,
    sideMenu: Boolean,
    unreadMsg: Number,
  },
  created() {
    this.socket.on("send-message", (x) => {
      this.chat = [...this.chat, x];
      if (!this.sideMenu || this.corner === 1) {
        this.$emit("new-message");
      }
    });
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();
      this.chat = [...this.chat, { username: "You", message: this.message }];
      this.socket.emit("message", this.message);
      console.log(this.chat);
      this.message = "";
    },
  },
};
</script>

<style scoped>
.sidemenu {
  bottom: 43.77px;
  transition: var(--transition-speed);
  position: fixed;
  top: 0;
  right: 0;
  left: auto;
}
.sidemenu {
  width: 270px;
  padding: 20px 16px 0 16px;
  background-color: var(--bg-primary);
}
.offcanvas-body {
  padding: 0;
  word-break: break-all;
  width: 230px;
  height: calc(100% - 140px);
  white-space: normal;
}
.offcanvas-header {
  padding: 0;
  margin-bottom: 10px;
}
.offcanvas-header h5 {
  margin-bottom: 0;
}
.offcanvas-header button {
  background-color: transparent;
  border: none;
  color: var(--text-primary);
  font-size: 1.4rem;
  padding: 0;
}
.offcanvas-body img {
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  margin: 0 0.5rem;
}
.user-list {
  margin-bottom: 10px;
}
.chat {
  display: flex;
  margin-bottom: 10px;
}
.chat span {
  font-size: 0.9rem;
}
.chat div {
  font-size: 0.8rem;
}
.text-input {
  margin: 15px 0;
}
.nearby{
  display: flex;
  width: 100%;
  align-items: center;
  cursor: pointer;
  background-color: transparent;
  padding-bottom: 8px;
  padding-right: 8px;
}
.arrowDown {
  display: block;
  width: 20px;
  color: rgb(255, 255, 255);
  flex-shrink: 0;
}
.areaOnline {
  color: rgb(224, 224, 224);
  font-family: "DM Sans", sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
}
</style>

<style>
/* Sizes */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

/* Track */
/* ::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}
  */
/* Handle */
::-webkit-scrollbar-thumb {
  background: #00372d; 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #00372d; 
}
</style>