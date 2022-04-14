<template>
  <div class="content">
    <div
      v-for="(room, index) in this.choosed.filter((x) =>
        x.name.toLowerCase().includes(this.search.toLowerCase())
      )"
      :key="index"
      style="margin: 10px"
    >
      <div
        class="card-component"
        @click="this.$router.push(`/${room.roomId}/${room.name}`)"
      >
        <div class="card-image">
          &nbsp;
          <span class="online-counter">
            0
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
    choosed: Function,
  },
  data() {
    return {
      pages: this.page,
    };
  },
  computed: {
    searched() {
      return this.my.roomHistory.filter((x) => {
        return x.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
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
  border: var(--border);
  border-radius: 16px;
  height: calc(
    (100vw - 5rem - 20px) / var(--number-of-col) - (100vh - 20px) /
      var(--subtract)
  );
  width: 100%;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}
.card-image {
  height: calc(100% - 2rem);
  background-image: url("../assets/image/placeholder.png");
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
