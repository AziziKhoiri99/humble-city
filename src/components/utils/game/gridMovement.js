import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: "GameScene",
    });
  }

  preload() {
    this.load.image(
      "tiles",
      "https://raw.githubusercontent.com/photonstorm/phaser3-examples/master/public/assets/tilemaps/tiles/drawtiles-spaced.png"
    );
    this.load.image(
      "car",
      "https://raw.githubusercontent.com/photonstorm/phaser3-examples/master/public/assets/sprites/car90.png"
    );
    this.load.tilemapCSV(
      "map",
      "https://raw.githubusercontent.com/photonstorm/phaser3-examples/master/public/assets/tilemaps/csv/grid.csv"
    );
  }

  create() {
    let map = this.make.tilemap({ key: "map", tileWidth: 32, tileHeight: 32 });
    let tileset = map.addTilesetImage("tiles", null, 32, 32, 1, 2);
    let layer = map.createLayer(0, tileset, 0, 0);
    layer;

    let player = this.add.image(32 + 16, 32 + 16, "car");

    let movingProgress = 16;
    let heldDirections = [];
    let facing = "";

    function move() {
      if (movingProgress <= 0) return;
      switch (facing) {
        case "up":
          player.y -= 2;
          break;
        case "left":
          player.x -= 2;
          break;
        case "down":
          player.y += 2;
          break;
        case "right":
          player.x += 2;
          break;
      }

      movingProgress--;
      requestAnimationFrame(() => {
        move();
      });
    }

    function loop() {
      if (heldDirections[0] && movingProgress <= 0) {
        facing = heldDirections[0];
        movingProgress = 16;
        move(facing);
      }
      requestAnimationFrame(() => {
        loop();
      });
    }
    loop();
    const directions = {
      ArrowUp: "up",
      KeyW: "up",
      ArrowDown: "down",
      KeyS: "down",
      ArrowLeft: "left",
      KeyA: "left",
      ArrowRight: "right",
      KeyD: "right",
    };

    this.input.keyboard.on("keydown", (e) => {
      const dir = directions[e.code];
      if (dir && heldDirections.indexOf(dir) === -1) {
        heldDirections.unshift(dir);
        move();
      }
    });
    this.input.keyboard.on("keyup", (e) => {
      const dir = directions[e.code];
      const index = heldDirections.indexOf(dir);
      if (index > -1) {
        heldDirections.splice(index, 1);
      }
    });
    // //  Up
    // this.input.keyboard.on("keydown-W", function () {
    //   const getTile = layer.getTileAtWorldXY(player.x, player.y - 32, true);
    //   player.angle = -90;

    //   if (getTile.index === 2) return;
    //   player.y -= 32;
    // });

    // //  Down
    // this.input.keyboard.on("keydown-S", function () {
    //   const getTile = layer.getTileAtWorldXY(player.x, player.y + 32, true);
    //   player.angle = 90;

    //   if (getTile.index === 2) return;
    //   player.y += 32;
    // });
  }
}
