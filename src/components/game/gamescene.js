import Phaser from "phaser";

export let doneLoading = false;
let dirInput;
let players = [];
let heldDirection = [];
let onCall = [];

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

import { onlineUser, socketId, socket } from "../../pages/Game.vue";
import { serverIp } from "../utils";
import placeholder from "../../assets/image/placeholder.png";
import Peer from "peerjs";

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
    onlineUser.map((ou) => {
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
    });

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
      this.physics.add.collider(
        players.map((x) => x.sprite),
        worldLayer
      );
    });
    const mySprite = players.filter((x) => x.info.id === socketId)[0].sprite;
    socket.on("user-disconnected", (id) => {
      const who = players.filter((x) => x.info.id === id)[0];
      who.sprite.destroy();
      who.followText.destroy();
      players = players.filter((x) => x.info.id !== id);
    });
    socket.on("give-coords", (id) => {
      socket.emit("get-coord", mySprite.x, mySprite.y, id);
    });
    socket.on("get-coord", (x, y, id) => {
      const who = players.filter((x) => x.info.id === id)[0].sprite;
      who.x = x;
      who.y = y;
    });
    //DON'T TOUCH LINE ABOVE! EDIT BELOW!
    this.physics.add.collider(
      players.map((x) => x.sprite),
      worldLayer
    );

    function move(direction, userId) {
      const playerSprite = players.filter((x) => x.info.id === userId)[0]
          .sprite,
        spriteBody = playerSprite.body,
        speed = 120,
        prevVelocity = playerSprite.body.velocity.clone();

      switch (direction) {
        case "up":
          playerSprite.anims.play("chara-back-walk", true);
          spriteBody.setVelocityY(-speed);
          break;
        case "left":
          playerSprite.anims.play("chara-left-walk", true);
          spriteBody.setVelocityX(-speed);
          break;
        case "down":
          playerSprite.anims.play("chara-front-walk", true);
          spriteBody.setVelocityY(speed);
          break;
        case "right":
          playerSprite.anims.play("chara-right-walk", true);
          spriteBody.setVelocityX(speed);
          break;
        default:
          playerSprite.anims.stop();

          // If we were moving, pick and idle frame to use
          if (prevVelocity.x < 0)
            playerSprite.setTexture("atlas", "chara-left");
          else if (prevVelocity.x > 0)
            playerSprite.setTexture("atlas", "chara-right");
          else if (prevVelocity.y < 0)
            playerSprite.setTexture("atlas", "chara-back");
          else if (prevVelocity.y > 0)
            playerSprite.setTexture("atlas", "chara-front");

          if (userId === socketId) {
            socket.emit("share-coord", mySprite.x, mySprite.y);
          }
          break;
      }
    }

    dirInput.on("keydown", (e) => {
      const dir = directions[e.code];
      if (dir && heldDirection.indexOf(dir) === -1) {
        heldDirection.unshift(directions[e.code]);
        socket.emit("character-move", heldDirection[0]);
        // socket.emit("share-coord", mySprite.x, mySprite.y);
      }
    });
    dirInput.on("keyup", (e) => {
      const dir = directions[e.code];
      const index = heldDirection.indexOf(dir);
      if (index > -1) {
        heldDirection.splice(index, 1);
        socket.emit("character-move", heldDirection[0]);
        socket.emit("share-coord", mySprite.x, mySprite.y);
      }
    });

    //setting up animation for the sprite
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

    socket.on("character-move", (userId, direction) => {
      players.filter((x) => x.info.id === userId)[0].sprite.setVelocity(0);
      move(direction, userId);
    });

    socket.on("share-coord", (x, y, userId) => {
      const playerSprite = players.filter((x) => x.info.id === userId)[0]
        .sprite;
      playerSprite.x = x;
      playerSprite.y = y;
    });

    socket.on("change-index", (fromWho, depth) => {
      players.filter((x) => x.info.id === fromWho)[0].sprite.setDepth(depth);
      const above = players.filter((x) => x.sprite.y < mySprite.y).length;
      players.filter((x) => x.info.id === socketId)[0].sprite.setDepth(above);
    });

    const camera = this.cameras.main;
    camera.startFollow(players.filter((x) => x.info.id === socketId)[0].sprite);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    //VIDEO CHAT PART

    const peer = new Peer(socketId, {
      host: serverIp,
      port: 3002,
    });
    /* eslint-disable */
    const callBox = document.getElementById("call-box"),
      myVideo = document.createElement("video"),
      myAudio = document.createElement("audio"),
      myBox = document.createElement("div"),
      myNameTag = document.createElement("div"),
      myPicture = document.createElement("img");
    myAudio.muted = true;

    const devices = await navigator.mediaDevices.enumerateDevices();

    let hasMic = false;
    let hasWebcam = false;

    devices.forEach((device) => {
      switch (device.kind) {
        case "audioinput":
          hasMic = true;
          break;
        case "videoinput":
          hasWebcam = true;
          break;
      }
    });

    if (!hasMic && !hasWebcam) {
      alert(
        "currently the code doesn't support without any audio or video device and can cause error \n please connect input device then refresh this page"
      );
    } else {
      navigator.mediaDevices
        .getUserMedia({
          video: hasWebcam,
          audio: hasMic,
        })
        .then((stream) => {
          connectToNewUser(stream);
        });
    }

    function connectToNewUser(stream) {
      addVideoStream(
        {
          video: myVideo,
          audio: myAudio,
          userBox: myBox,
          nameTag: myNameTag,
          picture: myPicture,
        },
        stream,
        socketId
      );

      peer.on("call", (call) => {
        call.answer(stream);
        const video = document.createElement("video"),
          audio = document.createElement("audio"),
          userBox = document.createElement("div"),
          nameTag = document.createElement("div"),
          picture = document.createElement("img");
        call.on("stream", (userVideoStream) => {
          addVideoStream(
            { video, audio, userBox, nameTag, picture },
            userVideoStream,
            call.peer
          );
        });
      });

      socket.on("called", (userId) => {
        onCall = [...onCall, userId];
        const call = peer.call(userId, stream),
          video = document.createElement("video"),
          audio = document.createElement("audio"),
          userBox = document.createElement("div"),
          nameTag = document.createElement("div"),
          picture = document.createElement("img");
        call.on("stream", (stream) => {
          addVideoStream(
            { video, audio, userBox, nameTag, picture },
            stream,
            userId
          );
        });
        call.on("close", () => {
          document.getElementById(userId).remove();
        });
        socket.on("leaved-call", (who) => {
          call.close();
          onCall = onCall.filter((x) => x !== who);
        });
      });
    }
    function addVideoStream(element, stream, userId) {
      const { video, audio, userBox, nameTag, picture } = element;
      nameTag.textContent = players.filter(
        (x) => x.info.id === userId
      )[0].info.username;
      nameTag.setAttribute("class", "name-tag");
      userBox.setAttribute("id", userId);
      userBox.setAttribute("class", "user-box");
      if (stream && stream.getAudioTracks()[0]) {
        const audioStream = new MediaStream();
        audioStream.addTrack(stream.getAudioTracks()[0]);
        audio.srcObject = audioStream;
        audio.autoplay = true;
        userBox.append(audio);
      }
      if (stream && stream.getVideoTracks()[0]) {
        const videoStream = new MediaStream();
        videoStream.addTrack(stream.getVideoTracks()[0]);
        video.srcObject = videoStream;
        video.autoplay = true;
        userBox.append(video);
      } else {
        picture.src = placeholder;
        picture.setAttribute("class", "profile-picture");
        userBox.append(picture);
      }
      userBox.append(nameTag);
      callBox.append(userBox);
    }

    socket.emit("done-loading");
    doneLoading = true;
  }

  update() {
    players.forEach((player) => {
      const playerSprite = player.sprite,
        above = players.filter((x) => x.sprite.y < playerSprite.y),
        below = players.filter((x) => x.sprite.y > playerSprite.y);

      if (playerSprite.body.velocity != { x: 0, y: 0 }) {
        player.followText.setPosition(playerSprite.x - 25, playerSprite.y - 30);

        //check how much sprite above me
        if (players.length - below.length - 1 !== playerSprite.depth) {
          playerSprite.setDepth(above.length);
        }
      }
    });
    const mySprite = players.filter((x) => x.info.id === socketId)[0].sprite,
      radius = 100,
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
        const who = nearby.filter((x) => !onCall.includes(x.info.id))[0].info
          .id;
        socket.emit("calling", who);
        onCall = nearby.map((x) => x.info.id);
      }
      if (nearby.length < onCall.length) {
        const who = onCall.filter(
            (x) => !nearby.map((y) => y.info.id).includes(x)
          )[0],
          userBox = document.getElementById(who);
        if (userBox) {
          userBox.remove();
        }
        socket.emit("leaving-call", who);
        onCall = nearby.map((x) => x.info.id);
      }
    }
  }
}
