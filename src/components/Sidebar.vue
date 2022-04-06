<template>
  <nav class="sidebar">
    <ul class="navbar-nav">
      <li class="logo">
        <a href="#" class="nav-link">
          <span class="link-text logo-text">Humble</span>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fad"
            data-icon="angle-double-right"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            class="svg-inline--fa fa-angle-double-right fa-w-14 fa-5x"
          >
            <g class="fa-group">
              <path
                fill="#41aa79"
                d="M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94 23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1 0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94 23.94 0 0 1 .1 34z"
              ></path>
              <path
                fill="#418e6e"
                d="M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224 386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94 0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24 0 0 1-.11 34z"
              ></path>
            </g>
          </svg>
        </a>
      </li>

      <li class="nav-item">
        <a
          @click="this.select(0)"
          v-bind:class="this.selected === 0 && 'selected'"
          class="normal-link nav-link"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <g class="fa-group">
              <path
                d="M156.6 384.9L125.7 353.1C117.2 345.5 114.2 333.1 117.1 321.8C120.1 312.9 124.1 301.3 129.8 288H24C15.38 288 7.414 283.4 3.146 275.9C-1.123 268.4-1.042 259.2 3.357 251.8L55.83 163.3C68.79 141.4 92.33 127.1 117.8 127.1H200C202.4 124 204.8 120.3 207.2 116.7C289.1-4.07 411.1-8.142 483.9 5.275C495.6 7.414 504.6 16.43 506.7 28.06C520.1 100.9 516.1 222.9 395.3 304.8C391.8 307.2 387.1 309.6 384 311.1V394.2C384 419.7 370.6 443.2 348.7 456.2L260.2 508.6C252.8 513 243.6 513.1 236.1 508.9C228.6 504.6 224 496.6 224 488V380.8C209.9 385.6 197.6 389.7 188.3 392.7C177.1 396.3 164.9 393.2 156.6 384.9V384.9zM384 167.1C406.1 167.1 424 150.1 424 127.1C424 105.9 406.1 87.1 384 87.1C361.9 87.1 344 105.9 344 127.1C344 150.1 361.9 167.1 384 167.1z"
                fill="currentColor"
                class="fa-secondary"
              />
            </g>
          </svg>
          <span class="link-text">Explore</span>
        </a>
      </li>
      <li class="nav-item">
        <a
          @click="this.select(1)"
          v-bind:class="this.selected === 1 && 'selected'"
          class="normal-link nav-link"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <g class="fa-group">
              <path
                d="M160 32V64H288V32C288 14.33 302.3 0 320 0C337.7 0 352 14.33 352 32V64H400C426.5 64 448 85.49 448 112V160H0V112C0 85.49 21.49 64 48 64H96V32C96 14.33 110.3 0 128 0C145.7 0 160 14.33 160 32zM0 192H448V464C448 490.5 426.5 512 400 512H48C21.49 512 0 490.5 0 464V192zM64 304C64 312.8 71.16 320 80 320H112C120.8 320 128 312.8 128 304V272C128 263.2 120.8 256 112 256H80C71.16 256 64 263.2 64 272V304zM192 304C192 312.8 199.2 320 208 320H240C248.8 320 256 312.8 256 304V272C256 263.2 248.8 256 240 256H208C199.2 256 192 263.2 192 272V304zM336 256C327.2 256 320 263.2 320 272V304C320 312.8 327.2 320 336 320H368C376.8 320 384 312.8 384 304V272C384 263.2 376.8 256 368 256H336zM64 432C64 440.8 71.16 448 80 448H112C120.8 448 128 440.8 128 432V400C128 391.2 120.8 384 112 384H80C71.16 384 64 391.2 64 400V432zM208 384C199.2 384 192 391.2 192 400V432C192 440.8 199.2 448 208 448H240C248.8 448 256 440.8 256 432V400C256 391.2 248.8 384 240 384H208zM320 432C320 440.8 327.2 448 336 448H368C376.8 448 384 440.8 384 432V400C384 391.2 376.8 384 368 384H336C327.2 384 320 391.2 320 400V432z"
                fill="currentColor"
                class="fa-secondary"
              />
            </g>
          </svg>
          <span class="link-text">Events</span>
        </a>
      </li>
      <li class="nav-item">
        <a
          @click="this.select(2)"
          v-bind:class="this.selected === 2 && 'selected'"
          class="normal-link nav-link"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <g class="fa-group">
              <path
                d="M327.5 85.19L384 64L405.2 7.491C406.9 2.985 411.2 0 416 0C420.8 0 425.1 2.985 426.8 7.491L448 64L504.5 85.19C509 86.88 512 91.19 512 96C512 100.8 509 105.1 504.5 106.8L448 128L426.8 184.5C425.1 189 420.8 192 416 192C411.2 192 406.9 189 405.2 184.5L384 128L327.5 106.8C322.1 105.1 320 100.8 320 96C320 91.19 322.1 86.88 327.5 85.19V85.19zM257.8 187.3L371.8 240C377.5 242.6 381.1 248.3 381.1 254.6C381.1 260.8 377.5 266.5 371.8 269.1L257.8 321.8L205.1 435.8C202.5 441.5 196.8 445.1 190.6 445.1C184.3 445.1 178.6 441.5 176 435.8L123.3 321.8L9.292 269.1C3.627 266.5 0 260.8 0 254.6C0 248.3 3.627 242.6 9.292 240L123.3 187.3L176 73.29C178.6 67.63 184.3 64 190.6 64C196.8 64 202.5 67.63 205.1 73.29L257.8 187.3zM405.2 327.5C406.9 322.1 411.2 320 416 320C420.8 320 425.1 322.1 426.8 327.5L448 384L504.5 405.2C509 406.9 512 411.2 512 416C512 420.8 509 425.1 504.5 426.8L448 448L426.8 504.5C425.1 509 420.8 512 416 512C411.2 512 406.9 509 405.2 504.5L384 448L327.5 426.8C322.1 425.1 320 420.8 320 416C320 411.2 322.1 406.9 327.5 405.2L384 384L405.2 327.5z"
                fill="currentColor"
                class="fa-secondary"
              />
            </g>
          </svg>
          <span class="link-text">My&nbsp;Spaces</span>
        </a>
      </li>
      <li class="nav-item">
        <a class="normal-link nav-link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <g class="fa-group">
              <path
                d="M416 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c17.67 0 32 14.33 32 32v256c0 17.67-14.33 32-32 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c53.02 0 96-42.98 96-96V128C512 74.98 469 32 416 32zM342.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L242.8 224H32C14.31 224 0 238.3 0 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C355.1 266.1 355.1 245.9 342.6 233.4z"
                fill="currentColor"
                class="fa-secondary"
              />
            </g>
          </svg>
          <span class="link-text">SignUp</span>
        </a>
      </li>
      <li class="nav-item">
        <a href="#" class="normal-link nav-link">
          <img src="../assets/placeholder.png" />
          <span class="link-text">Username</span>
        </a>
      </li>
      <li class="nav-item">
        <a
          href="#"
          @click="this.$emit('create-room')"
          class="nav-link bottom-link"
        >
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
  methods: {
    select(clicked) {
      this.selected = clicked;
      this.$emit("clicked", clicked);
    },
  },
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  background-color: var(--bg-primary);
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
  background: var(--bg-secondary);
  color: #53daff;
}
.normal-link:hover .fa-secondary {
  color: #53daff;
}

.nav-item:nth-last-child(3) {
  margin-top: auto;
}
.nav-item:last-child {
  background-color: #2f9dbb;
  transition: var(--transition-speed);
}
.nav-item:last-child:hover {
  background-color: #53daff;
}

.nav-link {
  transition: var(--transition-speed);
  display: flex;
  align-items: center;
  height: 5rem;
  color: var(--text-primary);
  text-decoration: none;
}

.bottom-link .link-text {
  color: var(--bg-primary);
  font-weight: 700;
}
.link-text {
  display: none;
  margin-left: 1rem;
  text-overflow: clip;
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

.fa-secondary {
  color: var(--text-primary);
}

.fa-primary,
.fa-secondary {
  transition: var(--transition-speed);
}

.logo {
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 1rem;
  text-align: center;
  color: var(--text-primary);
  background: var(--bg-secondary);
  font-size: 1.5rem;
  letter-spacing: 0.3ch;
  width: 100%;
}

.logo svg {
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
</style>
