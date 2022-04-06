<template>
  <div class="content">
    <div v-for="n in 6" :key="n" style="margin: 10px">
      <div class="card">
        <div class="card-image">
          &nbsp;
          <span class="online-counter">
            0
            <div class="green"></div>
          </span>
        </div>
        <div class="room-name">Room Name</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "main-content",
  props: {
    page: Object,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.content {
  max-width: calc(100vw - 5rem);
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(var(--number-of-col), auto);
}
.card {
  border: var(--border);
  border-radius: 16px;
  height: calc(
    (100vw - 5rem - 20px) / var(--number-of-col) - (100vh - 20px) / 7
  );
  width: 100%;
  position: relative;
  overflow: hidden;
  gap: 10px;
}
.card-image {
  height: calc(100%);
  background-image: url("../assets/image/placeholder.png");
  background-size: cover;
  background-repeat: no-repeat;
  height: calc(100% - 2rem);
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
  margin: 0.5rem 0 0 10px;
  color: var(--text-primary);
  font-weight: 600;
}
</style>

<style>
@media (min-width: 768px) {
  :root {
    --number-of-col: 2;
  }
}
@media (min-width: 1024px) {
  :root {
    --number-of-col: 3;
  }
}
@media (min-width: 1200px) {
  :root {
    --number-of-col: 4;
  }
}
@media (min-width: 1920px) {
  :root {
    --number-of-col: 5;
  }
}
</style>
