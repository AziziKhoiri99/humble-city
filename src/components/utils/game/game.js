import Phaser from "phaser";
// import GameScene from "./gridMovement";
import GameScene from "./gamescene";

function launch(containerId) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: 1000,
    height: 640,
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
      width: "80%",
      height: "90%",
    },
  });
}

export default launch;
export { launch };
