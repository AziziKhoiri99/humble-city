<template>
  <div class="content">
    <div
      v-for="(room, index) in choosed.filter((x) =>
        x.name.toLowerCase().includes(search.toLowerCase())
      )"
      :key="index"
      style="margin: 10px"
    >
      <div
        class="card-component"
        @click="$router.push(`/${room.roomId}/${room.name}`)"
      >
        <div class="card-image">
          &nbsp;
          <span class="online-counter">
            {{ room.onlineUser }}
            <div class="green"></div>
          </span>
        </div>
        <div class="room-name">{{ room.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "room-lists",
  props: {
    page: Object,
    my: Object,
    search: String,
    choosed: Array,
  },
  data() {
    return {
      pages: this.page,
    };
  },
};
</script>

<style scoped>
.content {
  max-width: calc(100vw - 5rem);
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(
    var(--number-of-col),
    calc((100vw - 5rem - 20px) / var(--number-of-col))
  );
}
.card-component {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  aspect-ratio: 3 / 2;
  width: 100%;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}
.card-component:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.card-image {
  height: calc(100% - 2rem);
  background-image: url("../assets/image/template.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.online-counter {
  position: absolute;
  left: auto;
  right: 8px;
  top: 7px;
  font-size: 13px;
  padding: 4px 8px;
  background-color: rgb(0 0 0 / 61%);
  border-radius: 21px;
  color: var(--text-primary);
  display: flex;
  align-items: center;
}
.green {
  padding: 5px;
  border-radius: 50%;
  top: -2px;
  margin-left: 5px;
  background-color: lime;
}
.room-name {
  padding: 0.25rem 0 0.25rem 10px;
  color: var(--text-primary);
  font-weight: 600;
  background-color: var(--bg-main);
}
</style>

<style>
@media (min-width: 768px) {
  :root {
    --number-of-col: 2;
    --subtract: 2.9;
  }
}
@media (min-width: 1024px) {
  :root {
    --number-of-col: 3;
    --subtract: 4.5;
  }
}
@media (min-width: 1200px) {
  :root {
    --number-of-col: 4;
    --subtract: 6;
  }
}
@media (min-width: 1920px) {
  :root {
    --number-of-col: 5;
    --subtract: 7.4;
  }
}
</style>
