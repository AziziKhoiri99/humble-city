<template>
<div class="card fixed-top mx-auto" style="width: 50px; height: 50px;">
  <video></video>
</div>
</template>

<style scoped>
.video{
    background-color: black
}
</style>

<script>
export default {
    name: "my-camera",
    methods: {
      camera() {
        this.$name.querySelector('video').addEventListener('click', async () => {
        navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        })
})
      }
    },
}
</script>