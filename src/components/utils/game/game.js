import Phaser from "phaser";
// import GameScene from "./gridMovement";
import GameScene from "./gamescene";

function launch(containerId) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: innerWidth,
    height: innerHeight - 44,
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0 },
      },
    },
    parent: containerId,
    // scene: [GameScene],
    scene: [GameScene],
    scale: {
      mode: Phaser.Scale.FIT,
    },
  });
}

export default launch;
export { launch };
