<template>
  <div>
  <h1>Realtime communication with WebRTC</h1>
  <button @click="start()" >Start</button>
  <video ref="videoBackup" autoplay></video>

  </div>
</template>

<script>
export default {
  name: "MyCamera",
 data() {
    return {
      localStream: null,
    };
  },
  methods: {
    async method(){
      this.localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
      });
    },
    start() {
      this.camera();
    },
    camera() {
      this.$nextTick(function() { 
          this.$refs.videoBackup.srcObject = this.localStream; 
      })
    }
  },
  mounted() {
    this.method();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
video {
  max-width: 100%;
  width: 320px;
}
</style>
