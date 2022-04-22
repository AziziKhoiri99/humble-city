import Phaser from "phaser";

let dirInput;
let players = {};
let heldDirection = [];
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

import App from "../../../App.vue";
import { onlineUser, socketId, socket } from "../../../pages/Game.vue";

const my = {
  ...App.data().my,
  socketId,
};
console.log(socket);

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: "GameScene",
    });
  }

  preload() {
    this.load.image(
      "gather_floors",
      "https://raw.githubusercontent.com/AziziKhoiri99/humble-city/main/src/assets/tilesets/gather_floors.png"
    );
    this.load.image(
      "gather_chairs",
      "https://raw.githubusercontent.com/AziziKhoiri99/humble-city/main/src/assets/tilesets/gather_chairs.png"
    );
    this.load.image(
      "gather_tables",
      "https://raw.githubusercontent.com/AziziKhoiri99/humble-city/main/src/assets/tilesets/gather_tables.png"
    );
    this.load.image(
      "gather_decoration",
      "https://raw.githubusercontent.com/AziziKhoiri99/humble-city/main/src/assets/tilesets/gather_decoration.png"
    );
    this.load.image(
      "gather_games",
      "https://raw.githubusercontent.com/AziziKhoiri99/humble-city/main/src/assets/tilesets/gather_games.png"
    );

    this.load.tilemapTiledJSON(
      "map",
      "https://raw.githubusercontent.com/AziziKhoiri99/humble-city/main/src/assets/tilemap/humble-city.json"
    );
    this.load.atlas(
      "atlas",
      "https://raw.githubusercontent.com/AziziKhoiri99/humble-city/main/src/assets/avatars/chara.png",
      "https://raw.githubusercontent.com/AziziKhoiri99/humble-city/main/src/assets/avatars/chara.json"
    );
  }

  create() {
    dirInput = this.input.keyboard;
    const map = this.make.tilemap({ key: "map" });

    const floors = map.addTilesetImage("gather_floors", "gather_floors");
    const chairs = map.addTilesetImage("gather_chairs", "gather_chairs");
    const tables = map.addTilesetImage("gather_tables", "gather_tables");
    const decoration = map.addTilesetImage(
      "gather_decoration",
      "gather_decoration"
    );
    const games = map.addTilesetImage("gather_games", "gather_games");

    const belowLayer = map.createLayer(
      "Below Player",
      [floors, chairs, tables, decoration, games],
      0,
      0
    );
    const secondLayer = map.createLayer(
      "Second Layer",
      [floors, chairs, tables, decoration, games],
      0,
      0
    );
    const worldLayer = map.createLayer(
      "World",
      [floors, chairs, tables, decoration, games],
      0,
      0
    );
    const interactLayer = map.createLayer(
      "Interact",
      [floors, chairs, tables, decoration, games],
      0,
      0
    );
    const aboveLayer = map.createLayer(
      "Above Player",
      [floors, chairs, tables, decoration, games],
      0,
      0
    );

    belowLayer;
    secondLayer;
    worldLayer.setCollisionByProperty({ collides: true });
    interactLayer;
    aboveLayer.setDepth(10);

    const spawnPoint = map.findObject(
      "Spawn",
      (obj) => obj.name === "Spawn Point"
    );

    onlineUser.map((ou) => {
      players[ou.id] = {
        sprite: this.physics.add
          .sprite(spawnPoint.x, spawnPoint.y, "atlas", "chara-front")
          .setSize(20, 30)
          .setOffset(5, 14),
        followText: this.add.text(0, 0, ou.player),
      };
    });

    socket.on("new-user", (player, id) => {
      players[id] = {
        sprite: this.physics.add
          .sprite(spawnPoint.x, spawnPoint.y, "atlas", "chara-front")
          .setSize(20, 30)
          .setOffset(5, 14),
        followText: this.add.text(0, 0, player),
      };
    });

    socket.on("user-disconnected", (id) => {
      players[id].sprite.destroy();
      players[id].followText.destroy();
      delete players[id];
      console.log(players);
    });

    dirInput.on("keydown", (e) => {
      if (
        directions[e.code] &&
        heldDirection.indexOf(directions[e.code]) === -1
      ) {
        players[my.socketId].sprite.body.setVelocity(0);
        heldDirection.unshift(directions[e.code]);
      }
    });
    dirInput.on("keyup", (e) => {
      const index = heldDirection.indexOf(directions[e.code]);
      if (index > -1) {
        players[my.socketId].sprite.body.setVelocity(0);
        heldDirection.splice(index, 1);
      }
    });

    console.log(players);

    this.physics.add.collider(players[my.socketId].sprite, worldLayer);

    //setting up animation for the sprite
    const anims = this.anims;
    anims.create({
      key: "chara-left-walk",
      frames: anims.generateFrameNames("atlas", {
        prefix: "chara-left-walk.",
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    anims.create({
      key: "chara-right-walk",
      frames: anims.generateFrameNames("atlas", {
        prefix: "chara-right-walk.",
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    anims.create({
      key: "chara-front-walk",
      frames: anims.generateFrameNames("atlas", {
        prefix: "chara-front-walk.",
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    anims.create({
      key: "chara-back-walk",
      frames: anims.generateFrameNames("atlas", {
        prefix: "chara-back-walk.",
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    const camera = this.cameras.main;
    camera.startFollow(players[my.socketId].sprite);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    const speed = 120;
    const mySprite = players[my.socketId].sprite;
    const spriteBody = mySprite.body;
    const prevVelocity = spriteBody.velocity.clone();

    switch (heldDirection[0]) {
      case "up":
        mySprite.anims.play("chara-back-walk", true);
        spriteBody.setVelocityY(-speed);
        break;
      case "left":
        mySprite.anims.play("chara-left-walk", true);
        spriteBody.setVelocityX(-speed);
        break;
      case "down":
        mySprite.anims.play("chara-front-walk", true);
        spriteBody.setVelocityY(speed);
        break;
      case "right":
        mySprite.anims.play("chara-right-walk", true);
        spriteBody.setVelocityX(speed);
        break;
      default:
        mySprite.anims.stop();
        spriteBody.setVelocity(0);

        if (prevVelocity.x < 0) mySprite.setTexture("atlas", "chara-left");
        else if (prevVelocity.x > 0)
          mySprite.setTexture("atlas", "chara-right");
        else if (prevVelocity.y < 0) mySprite.setTexture("atlas", "chara-back");
        else if (prevVelocity.y > 0)
          mySprite.setTexture("atlas", "chara-front");
        break;
    }

    onlineUser.map((ou) => {
      players[ou.id].followText.setPosition(
        players[ou.id].sprite.x - 25,
        players[ou.id].sprite.y - 40
      );
    });

    // if (cursors.left.isDown) {
    //   mySprite.body.setVelocityX(-speed);
    // } else if (cursors.right.isDown) {
    //   mySprite.body.setVelocityX(speed);
    // }

    // if (cursors.up.isDown) {
    //   mySprite.body.setVelocityY(-speed);
    // } else if (cursors.down.isDown) {
    //   mySprite.body.setVelocityY(speed);
    // }

    // mySprite.body.velocity.normalize().scale(speed);

    // if (cursors.left.isDown) {
    //   mySprite.anims.play("chara-left-walk", true);
    // } else if (cursors.right.isDown) {
    //   mySprite.anims.play("chara-right-walk", true);
    // } else if (cursors.up.isDown) {
    //   mySprite.anims.play("chara-back-walk", true);
    // } else if (cursors.down.isDown) {
    //   mySprite.anims.play("chara-front-walk", true);
    // } else {
    //   mySprite.anims.stop();

    // }
  }
}
