<template>
  <nav class="sidebar">
    <ul class="navbar-nav">
      <li class="logo">
        <a href="#" class="nav-link">
          <span class="link-text logo-text">Humble</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 133.1 122.3">
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
        </a>
      </li>

      <li class="nav-item">
        <a
          @click="select(0)"
          v-bind:class="selected === 0 && 'selected'"
          class="normal-link nav-link"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <g class="fa-group">
              <path
                d="M156.6 384.9L125.7 353.1C117.2 345.5 114.2 333.1 117.1 321.8C120.1 312.9 124.1 301.3 129.8 288H24C15.38 288 7.414 283.4 3.146 275.9C-1.123 268.4-1.042 259.2 3.357 251.8L55.83 163.3C68.79 141.4 92.33 127.1 117.8 127.1H200C202.4 124 204.8 120.3 207.2 116.7C289.1-4.07 411.1-8.142 483.9 5.275C495.6 7.414 504.6 16.43 506.7 28.06C520.1 100.9 516.1 222.9 395.3 304.8C391.8 307.2 387.1 309.6 384 311.1V394.2C384 419.7 370.6 443.2 348.7 456.2L260.2 508.6C252.8 513 243.6 513.1 236.1 508.9C228.6 504.6 224 496.6 224 488V380.8C209.9 385.6 197.6 389.7 188.3 392.7C177.1 396.3 164.9 393.2 156.6 384.9V384.9zM384 167.1C406.1 167.1 424 150.1 424 127.1C424 105.9 406.1 87.1 384 87.1C361.9 87.1 344 105.9 344 127.1C344 150.1 361.9 167.1 384 167.1z"
                fill="currentColor"
                class="icon"
              />
            </g>
          </svg>
          <span class="link-text">Explore</span>
        </a>
      </li>
      <li class="nav-item">
        <a
          @click="select(1)"
          v-bind:class="selected === 1 && 'selected'"
          class="normal-link nav-link"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <g class="fa-group">
              <path
                d="M160 32V64H288V32C288 14.33 302.3 0 320 0C337.7 0 352 14.33 352 32V64H400C426.5 64 448 85.49 448 112V160H0V112C0 85.49 21.49 64 48 64H96V32C96 14.33 110.3 0 128 0C145.7 0 160 14.33 160 32zM0 192H448V464C448 490.5 426.5 512 400 512H48C21.49 512 0 490.5 0 464V192zM64 304C64 312.8 71.16 320 80 320H112C120.8 320 128 312.8 128 304V272C128 263.2 120.8 256 112 256H80C71.16 256 64 263.2 64 272V304zM192 304C192 312.8 199.2 320 208 320H240C248.8 320 256 312.8 256 304V272C256 263.2 248.8 256 240 256H208C199.2 256 192 263.2 192 272V304zM336 256C327.2 256 320 263.2 320 272V304C320 312.8 327.2 320 336 320H368C376.8 320 384 312.8 384 304V272C384 263.2 376.8 256 368 256H336zM64 432C64 440.8 71.16 448 80 448H112C120.8 448 128 440.8 128 432V400C128 391.2 120.8 384 112 384H80C71.16 384 64 391.2 64 400V432zM208 384C199.2 384 192 391.2 192 400V432C192 440.8 199.2 448 208 448H240C248.8 448 256 440.8 256 432V400C256 391.2 248.8 384 240 384H208zM320 432C320 440.8 327.2 448 336 448H368C376.8 448 384 440.8 384 432V400C384 391.2 376.8 384 368 384H336C327.2 384 320 391.2 320 400V432z"
                fill="currentColor"
                class="icon"
              />
            </g>
          </svg>
          <span class="link-text">Events</span>
        </a>
      </li>
      <li class="nav-item">
        <a
          @click="select(2)"
          v-bind:class="selected === 2 && 'selected'"
          class="normal-link nav-link"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <g class="fa-group">
              <path
                d="M327.5 85.19L384 64L405.2 7.491C406.9 2.985 411.2 0 416 0C420.8 0 425.1 2.985 426.8 7.491L448 64L504.5 85.19C509 86.88 512 91.19 512 96C512 100.8 509 105.1 504.5 106.8L448 128L426.8 184.5C425.1 189 420.8 192 416 192C411.2 192 406.9 189 405.2 184.5L384 128L327.5 106.8C322.1 105.1 320 100.8 320 96C320 91.19 322.1 86.88 327.5 85.19V85.19zM257.8 187.3L371.8 240C377.5 242.6 381.1 248.3 381.1 254.6C381.1 260.8 377.5 266.5 371.8 269.1L257.8 321.8L205.1 435.8C202.5 441.5 196.8 445.1 190.6 445.1C184.3 445.1 178.6 441.5 176 435.8L123.3 321.8L9.292 269.1C3.627 266.5 0 260.8 0 254.6C0 248.3 3.627 242.6 9.292 240L123.3 187.3L176 73.29C178.6 67.63 184.3 64 190.6 64C196.8 64 202.5 67.63 205.1 73.29L257.8 187.3zM405.2 327.5C406.9 322.1 411.2 320 416 320C420.8 320 425.1 322.1 426.8 327.5L448 384L504.5 405.2C509 406.9 512 411.2 512 416C512 420.8 509 425.1 504.5 426.8L448 448L426.8 504.5C425.1 509 420.8 512 416 512C411.2 512 406.9 509 405.2 504.5L384 448L327.5 426.8C322.1 425.1 320 420.8 320 416C320 411.2 322.1 406.9 327.5 405.2L384 384L405.2 327.5z"
                fill="currentColor"
                class="icon"
              />
            </g>
          </svg>
          <span class="link-text">My&nbsp;Spaces</span>
        </a>
      </li>
      <li
        v-if="!my.id"
        v-bind:style="!my.id && 'margin-top: auto;'"
        class="nav-item"
      >
        <a href="/login" class="normal-link nav-link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <g class="fa-group">
              <path
                d="M416 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c17.67 0 32 14.33 32 32v256c0 17.67-14.33 32-32 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c53.02 0 96-42.98 96-96V128C512 74.98 469 32 416 32zM342.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L242.8 224H32C14.31 224 0 238.3 0 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C355.1 266.1 355.1 245.9 342.6 233.4z"
                fill="currentColor"
                class="icon"
              />
            </g>
          </svg>
          <span class="link-text">SignUp</span>
        </a>
      </li>
      <li
        v-bind:style="my.id && 'margin-top: auto;'"
        class="nav-item user-button"
      >
        <div v-if="my.id" class="hover-button">
          <button class="button" @click="userLogout()">Logout</button><br />
          <button class="button">Apperance</button>
        </div>
        <a href="#" class="normal-link nav-link">
          <img src="../assets/image/profile.png" alt="" />
          <span class="link-text">{{ my.username || "Username" }}</span>
        </a>
      </li>
      <li class="nav-item">
        <a href="#" @click="$emit('create-room')" class="nav-link bottom-link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <g class="fa-group">
              <path
                d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 368C269.3 368 280 357.3 280 344V280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H280V168C280 154.7 269.3 144 256 144C242.7 144 232 154.7 232 168V232H168C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H232V344C232 357.3 242.7 368 256 368z"
                fill="#00463a"
              />
            </g>
          </svg>
          <span class="link-text">Create&nbsp;Space</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "navbar-component",
  data() {
    return {
      selected: 2,
    };
  },
  props: {
    my: Object,
  },
  methods: {
    select(clicked) {
      this.selected = clicked;
      this.$emit("clicked", clicked);
    },
    userLogout() {
      window.localStorage.clear();
      this.$emit("loggingOut");
    },
  },
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  background-color: var(--sidebar-color);
  transition: width 600ms ease;
  overflow-x: hidden;
  overflow-y: hidden;
  top: 0;
  width: 5rem;
  height: 100vh;
  z-index: 1;
}
.sidebar:hover {
  width: 16rem;
}
.sidebar:hover .link-text {
  display: inline;
  font-weight: 700;
}

.sidebar:hover .logo svg {
  margin-left: 11rem;
}

.sidebar:hover .logo-text {
  left: 0px;
}
.navbar-nav {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.nav-item {
  width: 100%;
}
.normal-link:hover {
  filter: grayscale(10%) opacity(1);
  background: var(--primary-color);
  color: var(--sidebar-color);
}
.normal-link:hover .icon {
  color: var(--sidebar-color);
}

.nav-item:last-child {
  background-color: #b2d4dd;
  transition: var(--transition-speed);
}
.nav-item:last-child:hover {
  background-color: var(--primary-color);
}

.nav-link {
  transition: var(--transition-speed);
  display: flex;
  align-items: center;
  height: 5rem;
  color: var(--text-color);
  text-decoration: none;
  cursor: pointer;
}
.bottom-link .link-text {
  color: var(--sidebar-color);
  font-weight: 700;
}
.link-text {
  display: none;
  margin-left: 1rem;
  text-overflow: clip;
  cursor: pointer;
}

.nav-link svg {
  width: 2rem;
  min-width: 2rem;
  margin: 0 1.5rem;
}
.nav-link img {
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  min-width: 2.5rem;
  min-height: 2.5rem;
  margin: 0 1.25rem;
}

.icon {
  color: black;
}

.icon {
  transition: var(--transition-speed);
}

.logo {
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 1rem;
  text-align: center;
  color: var(--text-color);
  background: var(--sidebar-color);
  font-size: 1.5rem;
  letter-spacing: 0.3ch;
  width: 100%;
}

.logo svg {
  margin: 0 1rem;
  width: 3rem;
  transform: rotate(0deg);
  transition: var(--transition-speed);
  filter: grayscale(100) brightness(1.5);
}

.logo-text {
  display: inline;
  position: absolute;
  left: -999px;
  transition: var(--transition-speed);
}

.navbar:hover .logo svg {
  transform: rotate(-180deg);
  filter: none;
}
.user-button:hover .hover-button {
  width: 120px;
}
.hover-button {
  transition: var(--transition-speed);
  overflow: hidden;
  left: 16rem;
  position: fixed;
  background-color: var(--primary-color);
  width: 0;
  border-radius: 0 20px 16px 0;
}
.button {
  width: 100%;
  border-radius: 0;
  margin: 0;
}
</style>
