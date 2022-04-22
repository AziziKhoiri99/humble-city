<template>
  <div>
    <ul class="nav fixed-bottom navbar-dark bg-success">
      
      <div class="popup">
<li class="nav-link active" aria-current="page" href="#">
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
    <span class="popuptext" id="myPopup">Main Menu</span>
      </div>
      
      <div class="popup">
      <li class="nav-link" href="#">
        {{ this.my.username }}
      </li>
    <span class="popuptext" id="myPopup">Personal menu</span>
      </div>
      <div class="popup">
      <li class="nav-link" href="#">
        <i class="fa-solid fa-microphone"></i>
      </li>
    <span class="popuptext" id="myPopup">Microphone</span>
      </div>
      <div class="popup">

      <li class="nav-link" href="#">
        <i class="fa-solid fa-video"></i>
      </li>
      <li class="nav-link rounded bg-light my-2" style="width: 60px; height: 30px" href="#">
      </li>
      <li class="nav-link" href="#">
        {{ this.my.username }}
      </li>
      <li class="nav-link" href="#" @click="changeMic()">
        <i :class="isMic ? 'fa-solid fa-microphone' : 'fa-solid fa-microphone-slash'"></i>
      </li>    
      <li class="nav-link" href="#" @click="changeVideo()">
        <i :class="isVideo ? 'fa-solid fa-video' : 'fa-solid fa-video-slash'"></i>
      </li>
    <span class="popuptext" id="myPopup">Camera</span>
      </div>
      <div class="popup">
        <li class="nav-link" href="#">
        <i class="fa-solid fa-tv"></i>
      </li>
    <span class="popuptext" id="myPopup">Screen share</span>
      </div>
      <div class="popup">
      <li class="nav-link" href="#">
        <i class="fa-solid fa-face-smile"></i>
      </li>
    <span class="popuptext" id="myPopup">(Emote")</span>
      </div>
      <div class="popup">

      <li class="nav-link" href="#">
        <i class="fa-solid fa-angle-right"></i>
      </li>
    <span class="popuptext" id="myPopup">See more</span>
      </div>
      <div class="popup">
      <li  class="nav-link" href="#">
        <i class="fa-solid fa-hammer"></i>
      </li>
    <span class="popuptext" id="myPopup">Build Tools</span>
      </div>
      <div class="popup">

      <li class="nav-link" href="#">
        <i class="fa-solid fa-calendar-days"></i>
      </li>
    <span class="popuptext" id="myPopup">Calender</span>
      </div>

      <div class="right-corner">

      <div class="popup">
        <li 
          v-bind:style="
            this.sideMenu &&
            this.corner == 0 &&
            'background-color: var(--bg-primary);'
          "
          @click="this.toggleSideMenu(0)"
          class="nav-link"
        >
          <i class="fa-solid fa-comments"></i>
        </li>

    <span class="popuptext" id="myPopup">Chat</span>
      </div>
      
      <div class="popup">
        <li
          v-bind:style="
            this.sideMenu &&
            this.corner == 1 &&
            'background-color: var(--bg-primary);'
          "
          @click="this.toggleSideMenu(1)"
          class="nav-link"
        >
          <i class="fa-solid fa-user-group"></i>
        </li>

    <span class="popuptext" id="myPopup">Particiants</span>
      </div>
      </div>
      <!-- </span> -->
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMic: true,
      isVideo: true
    }
  },
  props: {
    my: Object,
    corner: Number,
    sideMenu: Boolean,
  },
  methods: {
    toggleSideMenu(clicked) {
      if (this.corner === clicked) {
        return this.$emit("toggleSideMenu", this.sideMenu ? false : true);
      }
      this.$emit("changeSideMenu", clicked);
    },
    changeMic(){
      this.isMic = !this.isMic;
    },
    changeVideo(){
      this.isVideo = !this.isVideo;
    },
  },
};
</script>

<style scoped>
li {
  color: white;
  text-decoration: none;
}
li:hover {
  color: white;
  text-decoration: none;
}
.right-corner {
  margin-left: auto;
  display: flex;
  flex-wrap: wrap;
}
.right-corner .nav-link {
  width: 135px;
  text-align: center;
  padding: 0.5rem 0;
  transition: var(--transition-speed);
  cursor: pointer;
}
.right-corner .nav-link:hover {
  background-color: var(--bg-secondary);
}
.popup {-webkit-animation: fadeIn 1s;
  animation: fadeIn 1s;
  position: relative;
  display: inline-block;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
/* The actual popup */
.popup .popuptext {
  width: 160px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 8px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -80px;
}

/* Popup arrow */
.popup .popuptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

/* Toggle this class - hide and show the popup */
.popup .show {
  visibility: visible;
  
}

/* Add animation (fade in the popup) */
@-webkit-keyframes fadeIn {
  from {opacity: 0;} 
  to {opacity: 1;}
}

@keyframes fadeIn {
  from {opacity: 0;}
  to {opacity:1 ;}
}
</style>