<template>
  <ul class="nav fixed-bottom navbar-dark bg-success">
    <li
      class="nav-link active"
      aria-current="page"
      href="#"
      style="margin: 0px"
    >
      <svg
        width="30px"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 133.1 122.3"
      >
        <g>
          <g>
            <path
              fill="currentColor"
              class="icon"
              d="M65,0C65,0,65,0,65,0C65.1,0,65.1,0,65,0L65,0z"
            />
            <path
              fill="currentColor"
              class="icon"
              d="M65.1,0c-4,0-8,0.7-11.8,2.1c-17.5,6.5-26.3,26-19.8,43.5c12.6,0.4,24.3,6.6,31.7,16.7
                  c7.7-8.4,18.6-13.3,30-13.3c2.4-4.7,3.6-9.9,3.6-15.2C98.8,15.2,83.7,0.1,65.1,0z M73.5,44.3C73.5,44.4,73.5,44.4,73.5,44.3
                  L69,48.7c-0.7,0.7-1.7,0.7-2.4,0c0,0,0,0,0,0l-1.2-1.2l-1.2,1.2c-0.7,0.7-1.8,0.7-2.4,0l-4.5-4.3c-0.7-0.7-0.7-1.8,0-2.4l1.3-1.3
                  l-1.3-1.3c-0.7-0.7-0.7-1.7,0-2.4c0,0,0,0,0,0l4.4-4.4c0.7-0.7,1.7-0.7,2.4,0c0,0,0,0,0,0l1.2,1.2l1.2-1.2c0.7-0.7,1.8-0.7,2.4,0
                  l4.5,4.3c0.7,0.7,0.7,1.8,0,2.4l-1.3,1.3l1.3,1.3C74.1,42.6,74.1,43.7,73.5,44.3z"
            />
          </g>
          <path
            fill="currentColor"
            class="icon"
            d="M62.3,67.1c-6.2-9.8-16.9-15.7-28.5-15.7c-11.1,0-21.5,5.5-27.8,14.7c-10.5,15.4-6.6,36.4,8.7,46.9
                c15.4,10.5,36.4,6.6,46.9-8.7C55.9,92.5,56.1,78.7,62.3,67.1z M32.9,99.4C32.9,99.5,32.9,99.5,32.9,99.4l-4.4,4.4
                c-0.7,0.7-1.7,0.7-2.4,0c0,0,0,0,0,0l-1.2-1.2l-1.2,1.2c-0.7,0.7-1.8,0.7-2.4,0l-4.4-4.3c-0.7-0.7-0.7-1.8,0-2.4l1.3-1.3l-1.3-1.3
                c-0.7-0.6-0.7-1.7-0.1-2.4c0,0,0,0,0,0l4.4-4.4c0.7-0.7,1.7-0.7,2.4,0c0,0,0,0,0,0l1.2,1.2l1.2-1.2c0.7-0.7,1.8-0.7,2.4,0l4.4,4.4
                c0.7,0.7,0.7,1.8,0,2.4l-1.3,1.3l1.3,1.3C33.6,97.7,33.6,98.8,32.9,99.4z"
          />
          <path
            fill="currentColor"
            class="icon"
            d="M99.4,54.8c-18.6,0-33.8,15.1-33.8,33.8s15.1,33.8,33.8,33.8s33.8-15.1,33.8-33.8S118,54.8,99.4,54.8z
                M112.5,97.3C112.5,97.3,112.5,97.3,112.5,97.3l-4.4,4.4c-0.7,0.7-1.7,0.7-2.4,0c0,0,0,0,0,0l-1.2-1.2l-1.2,1.2
                c-0.7,0.7-1.8,0.7-2.4,0l-4.5-4.3c-0.7-0.7-0.7-1.8,0-2.4l1.3-1.3l-1.3-1.3c-0.6-0.7-0.6-1.7,0-2.4l4.4-4.4c0.7-0.7,1.7-0.7,2.4,0
                c0,0,0,0,0,0l1.2,1.2l1.2-1.2c0.7-0.7,1.8-0.7,2.4,0l4.5,4.3c0.7,0.7,0.7,1.8,0,2.4l-1.3,1.3l1.3,1.3
                C113.2,95.6,113.2,96.7,112.5,97.3z"
          />
          <path
            fill="currentColor"
            class="icon"
            d="M116.4,46.4c4.1-6.4,16.3-26.9,11-33c-6.3-7.3-25.8,1-25.8,1v0.1c3.8,9.3,3.8,19.7,0.1,29h0.1
                C106.8,43.5,111.7,44.5,116.4,46.4z"
          />
        </g>
      </svg>
    </li>

    <li class="nav-link" href="#">
      <span>{{ this.my.username }}</span>
    </li>

    <div class="desc">
      <li
        v-bind:class="!isMic && 'disable'"
        class="nav-link"
        @click="isMic = !isMic"
      >
        <i
          :class="
            'fa-solid icon ' + (isMic ? 'fa-microphone' : 'fa-microphone-slash')
          "
        ></i>
      </li>
      <div class="popuptext">{{ isMic ? "Mute" : "Unmute" }}</div>
    </div>
    <div class="desc">
      <li
        v-bind:class="!isVideo && 'disable'"
        class="nav-link"
        @click="isVideo = !isVideo"
      >
        <i
          :class="'fa-solid icon ' + (isVideo ? 'fa-video' : 'fa-video-slash')"
        ></i>
      </li>
      <div class="popuptext">{{ isVideo ? "Video on" : "Video off" }}</div>
    </div>
    <div class="desc">
      <li class="nav-link">
        <i class="fa-solid icon fa-tv"></i>
      </li>
      <div class="popuptext">Share Screen</div>
    </div>
    <div class="right-corner">
      <div class="desc">
        <li
          class="nav-link"
          v-bind:style="
            sideMenu && corner == 0 && 'background-color: var(--bg-primary);'
          "
          @click="this.toggleSideMenu(0)"
        >
          <i class="fa-solid fa-comments"></i>
          <span
            v-if="unreadMsg > 0"
            class="position-absolute translate-middle badge rounded-pill bg-danger"
            style="font-size: 0.7em; top: 5px; left: 69%"
          >
            {{ unreadMsg }}
          </span>
        </li>
        <div class="popuptext">Chat</div>
      </div>
      <div class="desc">
        <li
          class="nav-link"
          v-bind:style="
            sideMenu && corner == 1 && 'background-color: var(--bg-primary);'
          "
          @click="this.toggleSideMenu(1)"
        >
          <i class="fa-solid fa-user-group"></i>
        </li>
        <div class="popuptext">Particiants</div>
      </div>
    </div>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      isMic: false,
      isVideo: false,
    };
  },
  props: {
    my: Object,
    corner: Number,
    sideMenu: Boolean,
    unreadMsg: Number,
  },
  methods: {
    toggleSideMenu(clicked) {
      if (this.corner === clicked) {
        if (clicked === 0 && !this.sideMenu) {
          this.$emit("readMessage");
        }
        return this.$emit("toggleSideMenu", this.sideMenu ? false : true);
      }
      if (clicked === 0) {
        this.$emit("readMessage");
      }
      this.$emit("changeSideMenu", clicked);
    },
  },
};
</script>

<style scoped>
.nav {
  z-index: 1;
}
.nav-link {
  top: 5px;
  font-size: 20px;
  padding: 10.61px 14.61px;
  margin: 0 0.25rem;
  border-radius: 50%;
}
.disable {
  background-color: var(--bg-secondary);
  transition: 300ms;
}
li {
  color: white;
  text-decoration: none;
  text-align: center;
}
.icon {
  width: 25px;
}
li:hover {
  color: white;
  text-decoration: none;
  cursor: pointer;
}
.right-corner {
  margin-left: auto;
  display: flex;
  flex-wrap: wrap;
}
.right-corner .nav-link {
  width: 135px;
  text-align: center;
  padding: 10.61px 0;
  transition: var(--transition-speed);
  border-radius: 0;
  margin: 0;
}
.right-corner .nav-link:hover {
  background-color: var(--bg-secondary);
}
.nav-link:hover + .popuptext {
  visibility: visible;
}
.desc {
  position: relative;
}
.popuptext {
  width: 112px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  visibility: hidden;
  transition: 200ms;
  padding: 8px 0;
  position: absolute;
  bottom: 125%;
  left: 50%;
  margin-left: -50px;
}
.popuptext:after {
  content: "";
  position: absolute;
  top: 100%;
  right: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}
</style>
