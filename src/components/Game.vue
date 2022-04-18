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
  async mounted() {
    const game = await import("./utils/game/game");
    this.downloaded = true;
    this.$nextTick(() => {
      this.gameInstance = game.launch(this.containerId);
    });
  },
};
</script>
