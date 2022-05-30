/* eslint-disable */
import Phaser from "phaser";

export let doneLoading = false,
  players = [],
  onCall = [],
  myDevices = { mic: null, cam: null, share: false },
  peer = null,
  mySprite = null;
let dirInput;

export const setPlayers = (newValue) => {
    players = newValue;
  },
  setOnCall = (newValue) => {
    onCall = newValue;
  };

import { onlineUser, socketId, socket } from "../../pages/Game.vue";
import handlers from "./eventHandler";
import { serverIp } from "../utils";
import Peer from "peerjs";

const {
  move,
  removePlayer,
  keydown,
  keyup,
  askToLeave,
  passDevice,
  toggleMic,
  toggleCam,
  connectToNewUser,
} = handlers;

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

  async create() {
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
    for (let i = 0; i < onlineUser.length; i++) {
      const ou = onlineUser[i];
      players.push({
        info: { id: ou.id, username: ou.player },
        sprite: this.physics.add
          .sprite(spawnPoint.x, spawnPoint.y, "atlas", "chara-front")
          .setSize(20, 30)
          .setOffset(5, 14),
        followText: this.add.text(0, 0, ou.player, {
          backgroundColor: "#00000070",
          fontFamily: "arial",
          fontSize: 15,
        }),
      });
    }

    socket.on("new-user", (player, id) => {
      players.push({
        info: { id, username: player },
        sprite: this.physics.add
          .sprite(spawnPoint.x, spawnPoint.y, "atlas", "chara-front")
          .setSize(20, 30)
          .setOffset(5, 14),
        followText: this.add.text(0, 0, player, {
          backgroundColor: "#00000070",
          fontFamily: "arial",
          fontSize: 15,
        }),
      });
    });

    this.physics.add.collider(
      players.map((x) => x.sprite),
      worldLayer
    );

    mySprite = players.filter((x) => x.info.id === socketId)[0].sprite;

    socket.on("user-disconnected", removePlayer);
    socket.on("give-coords", (id) => {
      socket.emit("get-coord", mySprite.x, mySprite.y, id);
    });
    socket.on("get-coord", (x, y, id) => {
      const who = players.filter((x) => x.info.id === id)[0].sprite;
      who.setPosition(x, y);
    });
    //DON'T TOUCH LINE ABOVE! EDIT BELOW!
    this.physics.add.collider(
      players.map((x) => x.sprite),
      worldLayer
    );

    dirInput.on("keydown", keydown);
    dirInput.on("keyup", keyup);

    const anims = this.anims;
    anims.create({
      key: "chara-left-walk",
      frames: anims.generateFrameNames("atlas", {
        prefix: "chara-left-walk.",
        start: 0,
        end: 1,
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
        end: 1,
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
        end: 1,
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
        end: 1,
        zeroPad: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    socket.on("character-move", move);

    socket.on("share-coord", (x, y, userId) => {
      const playerSprite = players.filter((x) => x.info.id === userId)[0]
        .sprite;
      playerSprite.setPosition(x, y);
    });

    const camera = this.cameras.main;
    camera.startFollow(players.filter((x) => x.info.id === socketId)[0].sprite);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    //VIDEO CHAT PART

    peer = new Peer(socketId, {
      host: serverIp,
      port: 3002,
    });

    const devices = await navigator.mediaDevices.enumerateDevices();

    devices.forEach((device) => {
      switch (device.kind) {
        case "audioinput":
          myDevices.mic = true;
          break;
        case "videoinput":
          myDevices.cam = true;
          break;
      }
    });

    if (!myDevices.mic && !myDevices.cam) {
      alert(
        "currently the app doesn't support running without any audio or video device \n please connect input device then refresh this page"
      );
    } else {
      navigator.mediaDevices
        .getUserMedia({
          video: myDevices.cam,
          audio: myDevices.mic,
        })
        .then((stream) => {
          connectToNewUser(stream);
        });
    }

    socket.on("ask-to-leave", askToLeave);

    socket.on("pass-device", passDevice);

    socket.on("toggle-mic", toggleMic);

    socket.on("toggle-cam", toggleCam);

    socket.emit("done-loading");
    doneLoading = true;
  }

  update() {
    for (let i = 0; i < players.length; i++) {
      const player = players[i],
        playerSprite = player.sprite,
        above = players.filter((x) => x.sprite.y < playerSprite.y),
        below = players.filter((x) => x.sprite.y > playerSprite.y);

      player.followText.setPosition(
        Math.floor(playerSprite.x - player.followText.width / 2),
        Math.floor(playerSprite.y - 30)
      );

      if (players.length - below.length - 1 !== playerSprite.depth) {
        playerSprite.setDepth(above.length);
      }
    }

    const radius = 100,
      nearby = players.filter(
        (x) =>
          x.sprite.y > mySprite.y - radius &&
          x.sprite.y < mySprite.y + radius &&
          x.sprite.x > mySprite.x - radius &&
          x.sprite.x < mySprite.x + radius &&
          x.info.id !== socketId
      );

    if (mySprite.body.velocity.x != 0 || mySprite.body.velocity.y != 0) {
      if (nearby.length > onCall.length) {
        const who = nearby.filter(
          (x) => !onCall.map((y) => y.id).includes(x.info.id)
        )[0].info.id;
        socket.emit("calling", who, myDevices.mic, myDevices.cam, true);
        onCall.push({ id: who });
      } else if (nearby.length < onCall.length) {
        const who = onCall.filter(
            (x) => !nearby.map((y) => y.info.id).includes(x.id)
          )[0].id,
          userBox = document.getElementById(who),
          called = onCall.filter((x) => x.id === who)[0].called;
        socket.emit("leaving-call", who, called);
        if (userBox) userBox.remove();
        const index = onCall.map((x) => x.id).indexOf(who);
        onCall.splice(index, 1);
      }
    }
  }
}
