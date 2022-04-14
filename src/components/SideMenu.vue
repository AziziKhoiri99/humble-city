<template>
  <div
    class="offcanvas offcanvas-end text-light"
    data-bs-scroll="true"
    data-bs-backdrop="false"
    tabindex="-1"
    id="offcanvasRight"
    aria-labelledby="offcanvasRightLabel"
  >
    <div class="offcanvas-header">
      <h5 id="offcanvasRightLabel">{{ this.chat ? "Chat" : this.room }}</h5>
      <button data-bs-dismiss="offcanvas" aria-label="Close">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
    <hr style="margin: 0 0 20px 0; border-top: solid #fff 2px" />
    <div class="search" style="margin-bottom: 20px">
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
      <input placeholder="Search" type="text" />
    </div>
    <div v-if="!this.chat" class="offcanvas-body">
      <div class="user-list" v-for="user in this.onlineUser" :key="user.id">
        <img src="../assets/image/placeholder.png" alt="" />
        {{ user.player }}
      </div>
    </div>
    <div v-else class="offcanvas-body">
      <div class="chat">
        <img src="../assets/image/placeholder.png" alt="" />
        <div>
          <span>Username</span>
          <div>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas
            dolorum labore obcaecati.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chat: true,
    };
  },
  props: {
    room: String,
    onlineUser: Array,
  },
};
</script>

<style scoped>
.offcanvas {
  bottom: 43.77px;
  transition: var(--transition-speed);
}
.offcanvas-end {
  width: 270px;
  padding: 20px 16px 0 16px;
  background-color: var(--bg-primary);
}
.offcanvas-body {
  padding: 0;
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
}
.chat span {
  font-size: 0.9rem;
}
.chat div {
  font-size: 0.8rem;
}
</style>
