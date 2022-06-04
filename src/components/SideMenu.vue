<template>
  <div v-bind:style="!sideMenu && 'right: -270px'" class="sidemenu text-light">
    <div class="offcanvas-header">
      <h5 id="offcanvasRightLabel">
        {{ corner === 0 ? "Chat" : room }}
      </h5>
      <button @click="this.$emit('toggleSideMenu')" tabindex="-1">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
    <hr style="margin: 0 0 20px 0; border-top: solid #fff 2px" />
    <div v-if="this.corner === 0" class="offcanvas-body">
      <div v-for="(text, index) in this.chat" :key="index" class="chat">
        <img src="../assets/image/profile.png" alt="" />
        <div>
        <img src="../assets/image/profile.png" alt=""/>
        <!-- Date output 1x -->
        <!-- <span>
          {{ text.date }}
        </span> -->

          <span class="user-name">{{ text.username }}</span>
          <span class="date-chat">
            {{ text.time }}
          </span>
          <div class="text-user">
            {{ text.message }}
          </div>
          
        </div>
      </div>
      <hr style="width: 243px; border: 2px solid  #279787; margin: 0px 7px 0px 0px; bottom: 117px; position: absolute" />

      <div class="set-send">
      <span style="position: absolute; margin-top: 10px">To</span>

      <div class="dropup">
        <button class="set-button" v-on:click="setSendTo = !setSendTo">
          <span style="float: left">Everyone</span> 
          <span class="arrow-button">
            <i :class="[setSendTo ? 'fa-chevron-down' : 'fa-chevron-up' , 'fa']"></i> 
          </span>
        </button>
        <!-- <div v-for="(text, index) in this.chat" :key="index"> -->
        <div class="dropup-content" v-if="!setSendTo">
          <span class="zonk-space"></span>
          <a href="#">Everyone</a>
          <a href="#">{{ username }}</a>
          <!-- <a href="#">P2</a> -->
          <span class="zonk-space"></span>
        </div>
        </div>
        <!-- </div> -->

      </div>

      <form @submit="this.sendMessage" class="position-absolute bottom-0">
            <input
              type="text"
              v-model="message"
              class="text-input"
              placeholder="Message..."
              oninvalid="this.setCustomValidity(' ')"
              oninput="setCustomValidity('')"
              title=""
              required
            />
              <svg
              class="icon-emoji"
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg">
              <path d="M11.999 3.496A8.501 8.501 0 003.496 12 8.501 8.501 0 0012 20.502a8.501 8.501 0 008.503-8.503 8.501 8.501 0 00-8.503-8.503zm0 15.36A6.864 6.864 0 015.142 12a6.864 6.864 0 016.857-6.857 6.864 6.864 0 016.857 6.857A6.864 6.864 0 0112 18.856zM9.256 11.45a1.096 1.096 0 100-2.194 1.096 1.096 0 100 2.194zm5.486 0a1.096 1.096 0 100-2.194 1.096 1.096 0 100 2.194zm.137 2.49a3.742 3.742 0 01-2.88 1.35 3.73 3.73 0 01-2.88-1.35.825.825 0 00-1.159-.107.825.825 0 00-.106 1.16 5.382 5.382 0 004.145 1.94 5.382 5.382 0 004.145-1.94.822.822 0 10-1.265-1.053z" fill="currentColor"></path></svg>
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
        <input class="search" v-model="search" placeholder="Search" type="text" />
      </div>
      <div
        class="user-list"
        v-for="user in onlineUser.filter((x) =>
          x.player.toLowerCase().includes(search.toLowerCase())
        )"
        :key="user.id"
      >
        <img src="../assets/image/profile.png" alt="" />
        {{ user.player }}
      </div>
    </div>
  </div>
</template>

<script>
const date = new Date();

export default {
  data() {
    return {
      search: "",
      message: "",
      chat: [],
      setSendTo: true,
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
      x.time = `${date.getHours()}:${date.getMinutes()}`
      this.chat = [...this.chat, x];
      if (!this.sideMenu || this.corner === 1) {
        this.$emit("new-message");
      }
    });
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();
      this.chat = [
        ...this.chat,
        { username: "You", message: this.message, time: `${date.getHours()}:${date.getMinutes()}` },
      ];
      this.socket.emit("message", this.message);
      this.message = "";
    },
  },
};
</script>

<style scoped>
::placeholder {
  color: rgb(201, 199, 199)
}
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
  background-color: var(--primary-color);
}
.search {
color: white; 
}
.offcanvas-body {
  margin: -15px 0 0 0 ;
  padding: 0;
  width: 238px;
  height: calc(95% - 140px);
  word-break: break-all;
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
  color: var(--sidebar-color);
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
/* .user-name{
  margin: 0 0 30px 30px;
  display: flex;
} */
.text-user{
  padding: 0 0 0 10px;
}
.text-input {
  margin: 5px 0 20px -3px;
  float:left;
  padding: 5px 27px 5px 10px;
  color: var(--sidebar-color);
}
.date-chat {
  font-size: 12px;
  padding: 0 0 0 110px;
}
.icon-emoji {
  display: flex;
  width: 24px;
  float: right;
  margin-top: -51px;
  margin-right: 7px;
  cursor: pointer;
}
.set-send {
  position: absolute;
  bottom: 69px;
  padding: 0;
}
.set-button {
  border-radius: 16px;
  height: 41px;
  width: 187px;
  margin: 0 0 0 25px;
  padding: 0 13px 0 15px;
  border: none;
  color: #695CFE;
  font-weight: 600;
  outline: none;
}
.arrow-button {
  margin: 3px 0 0 0;
  float: right;
  font-size: 14px;
  color: black;
}
.dropup {
  position: relative;
  display: inline-block;
}
.dropup-content {
  display: block;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  bottom: 50px;
  left: 25px;
  z-index: 1;
  border-radius: 16px;
  width: 187px;
}
.dropup-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
.dropup-content a:focus {
  background-color:  #695CFE;
  color: #ffffff;
  outline: none;
}
.dropup-content a:hover {
  background-color:  #695CFE;
  color: #ffffff;
}
.zonk-space{
  margin: 10px 0 0 10px;
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
} */
/* Handle */
::-webkit-scrollbar-thumb,
::-webkit-scrollbar-thumb:hover {
  background: #00372d;
  border-radius: 10px;
}
</style>