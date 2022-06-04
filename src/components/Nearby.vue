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
  background-color: transparent;
  padding: 8px 4px;
  border-radius: 15px;
}
.user-box {
  height: 150px;
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--body-color);
  border-radius: 15px;
  overflow: hidden;
  margin: 0 4px;
}
.muted {
  border: var(--border);
  border-color: #d7694b
}
.name-tag {
  color: var(--text-primary);
  position: absolute;
  top: calc(150px - 1rem - 5px);
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0 5px;
}
video {
  width: 100%;
}
.profile-picture {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
