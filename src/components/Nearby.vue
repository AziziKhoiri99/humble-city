<template>
  <div class="camera">
    <div id="call-box" class="background"></div>
  </div>
</template>

<script>
export default {
  name: "camera-component",
};
</script>

<style>
.camera {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  position: fixed;
}
.background {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: var(--bg-main);
  padding: 8px 4px;
  border-radius: 15px;
}
.video,
video {
  height: 150px;
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-secondary);
  border-radius: 15px;
  overflow: hidden;
  margin: 0 4px;
  border: 2px solid lime;
}
.profile-picture {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
