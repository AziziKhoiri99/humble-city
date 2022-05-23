/* eslint-disable */
import Phaser from "phaser";

export let doneLoading = false,
  myDevices = { mic: null, cam: null };
let dirInput,
  players = [],
  heldDirection = [],
  onCall = [],
  mySprite = null;

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
        spriteAnim = playerSprite.anims,
        speed = 120;

      switch (direction) {
        case "up":
          spriteAnim.play("chara-back-walk", true);
          spriteBody.setVelocityY(-speed);
          break;
        case "left":
          spriteAnim.play("chara-left-walk", true);
          spriteBody.setVelocityX(-speed);
          break;
        case "down":
          spriteAnim.play("chara-front-walk", true);
          spriteBody.setVelocityY(speed);
          break;
        case "right":
          spriteAnim.play("chara-right-walk", true);
          spriteBody.setVelocityX(speed);
          break;
        default:
          spriteAnim.stop();
          switch (spriteAnim.currentAnim.key) {
            case "chara-back-walk":
              playerSprite.setTexture("atlas", "chara-back");
              break;
            case "chara-left-walk":
              playerSprite.setTexture("atlas", "chara-left");
              break;
            case "chara-front-walk":
              playerSprite.setTexture("atlas", "chara-front");
              break;
            case "chara-right-walk":
              playerSprite.setTexture("atlas", "chara-right");
              break;
          }
      }
    }

    dirInput.on("keydown", (e) => {
      const dir = directions[e.code];
      if (dir && heldDirection.indexOf(dir) === -1) {
        heldDirection.unshift(directions[e.code]);
        socket.emit("character-move", heldDirection[0]);
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
      playerSprite.setPosition(x, y);
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

    const callBox = document.getElementById("call-box"),
      myVideo = document.createElement("video"),
      myAudio = document.createElement("audio"),
      myBox = document.createElement("div"),
      myNameTag = document.createElement("div"),
      myPicture = document.createElement("img"),
      devices = await navigator.mediaDevices.enumerateDevices();

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
          audio: myDevices.mic,
          video: myDevices.cam,
        })
        .then((stream) => {
          connectToNewUser(stream);
        });
    }

    socket.on("ask-to-leave", (userId) => {
      const userBox = document.getElementById(userId);
      socket.emit("leaving-call", userId, true);
      if (userBox) userBox.remove();
      const index = onCall.map((x) => x.id).indexOf(userId);
      if (index > -1) onCall.splice(index, 1);
    });

    socket.on("pass-device", (userId, mic, cam) => {
      onCall = [
        ...onCall.filter((x) => x.id !== userId),
        { id: userId, mic, cam, called: true },
      ];
    });

    socket.on("toggle-mic", (userId, boolean) => {
      if (userId === socketId) {
        myDevices.mic = !boolean;
      } else if (
        onCall.filter((x) => x.id === userId).length > 0 &&
        userId !== socketId
      ) {
        onCall.filter((x) => x.id == userId)[0].mic = !boolean;
        const audio = document.getElementById(userId).childNodes[0];
        audio.muted = boolean;
      }
    });

    socket.on("toggle-cam", (userId, boolean) => {
      if (userId === socketId) {
        myDevices.cam = !boolean;
        const video = document.getElementById(userId).childNodes[1];
        const picture = document.getElementById(userId).childNodes[2];
        video.hidden = boolean;
        picture.hidden = !boolean;
      } else if (
        onCall.filter((x) => x.id === userId).length > 0 &&
        userId !== socketId
      ) {
        onCall.filter((x) => x.id == userId)[0].cam = !boolean;
        const video = document.getElementById(userId).childNodes[1];
        const picture = document.getElementById(userId).childNodes[2];
        video.hidden = boolean;
        picture.hidden = !boolean;
      }
    });

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
        socketId,
        myDevices
      );

      peer.on("call", (call) => {
        call.answer(stream);
        const video = document.createElement("video"),
          audio = document.createElement("audio"),
          userBox = document.createElement("div"),
          nameTag = document.createElement("div"),
          picture = document.createElement("img");
        call.on("stream", (userVideoStream) => {
          const { mic, cam } = onCall.filter((x) => x.id == call.peer)[0];
          addVideoStream(
            { video, audio, userBox, nameTag, picture },
            userVideoStream,
            call.peer,
            { mic, cam }
          );
        });
      });

      socket.on("called", (userId, mic, cam) => {
        socket.emit("calling", userId, myDevices.mic, myDevices.cam);
        onCall.push({ id: userId, mic, cam });
        const call = peer.call(userId, stream),
          video = document.createElement("video"),
          audio = document.createElement("audio"),
          userBox = document.createElement("div"),
          nameTag = document.createElement("div"),
          picture = document.createElement("img");
        call.on("stream", (userVideoStream) => {
          addVideoStream(
            { video, audio, userBox, nameTag, picture },
            userVideoStream,
            userId,
            { mic, cam }
          );
        });
        socket.on("leaved-call", (who) => {
          call.close();
          userBox.remove();
          const index = onCall.map((x) => x.id).indexOf(who);
          if (index > -1) onCall.splice(index, 1);
        });
      });
    }
    function addVideoStream(element, stream, userId, deviceInput) {
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
        if (userId != socketId) {
          audio.muted = !deviceInput.mic;
        } else {
          audio.muted = true;
        }
        userBox.append(audio);
      }
      if (stream && stream.getVideoTracks()[0]) {
        const videoStream = new MediaStream();
        videoStream.addTrack(stream.getVideoTracks()[0]);
        video.srcObject = videoStream;
        video.autoplay = true;
        video.hidden = !deviceInput.cam;
        picture.src = placeholder;
        picture.className = "profile-picture";
        picture.hidden = deviceInput.cam;
        userBox.append(video);
        userBox.append(picture);
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
