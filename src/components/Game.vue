<template>
  <div :id="containerId" v-if="downloaded" />
</template>
<script>
export default {
  name: "MyGame",
  data: function () {
    return {
      downloaded: false,
      gameInstance: null,
      containerId: "game-container",
    };
  },
  props: {
    onlineUser: Array,
    isLoaded: Boolean,
  },
  watch: {
    isLoaded: async function () {
      const game = await import("./game/game");
      this.downloaded = true;
      this.$nextTick(() => {
        this.gameInstance = game.launch(this.containerId);
      });
    },
  },
};
</script>
