import {
  players,
  setPlayers,
  onCall,
  setOnCall,
  myDevices,
  mySprite,
  peer,
} from "./gamescene";
import { socket, socketId } from "../../pages/Game.vue";
import placeholder from "../../assets/image/placeholder.png";

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

let heldDirection = [];

export default {
  move(direction, userId) {
    const playerSprite = players.filter((x) => x.info.id === userId)[0].sprite,
      spriteBody = playerSprite.body,
      spriteAnim = playerSprite.anims,
      speed = 120;

    playerSprite.setVelocity(0);

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
  },

  removePlayer(id) {
    const who = players.filter((x) => x.info.id === id)[0];
    who.sprite.destroy();
    who.followText.destroy();
    setPlayers(players.filter((x) => x.info.id !== id));
  },

  keydown(e) {
    const dir = directions[e.code];
    if (dir && heldDirection.indexOf(dir) === -1) {
      heldDirection.unshift(directions[e.code]);
      socket.emit("character-move", heldDirection[0]);
    }
  },
  keyup(e) {
    const dir = directions[e.code];
    const index = heldDirection.indexOf(dir);
    if (index > -1) {
      heldDirection.splice(index, 1);
      socket.emit("character-move", heldDirection[0]);
      socket.emit("share-coord", mySprite.x, mySprite.y);
    }
  },
  askToLeave(userId) {
    const userBox = document.getElementById(userId);
    socket.emit("leaving-call", userId, true);
    if (userBox) userBox.remove();
    const index = onCall.map((x) => x.id).indexOf(userId);
    if (index > -1) onCall.splice(index, 1);
  },

  passDevice(userId, mic, cam) {
    setOnCall([
      ...onCall.filter((x) => x.id !== userId),
      { id: userId, mic, cam, called: true },
    ]);
  },

  toggleMic(userId, boolean) {
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
  },

  toggleCam(userId, boolean) {
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
  },

  connectToNewUser(stream) {
    const myElements = {
      video: document.createElement("video"),
      audio: document.createElement("audio"),
      userBox: document.createElement("div"),
      nameTag: document.createElement("div"),
      picture: document.createElement("img"),
    };
    addVideoStream(myElements, stream, socketId, {
      mic: false,
      cam: myDevices.cam,
    });

    peer.on("call", (call) => {
      call.answer(stream);
      const elements = {
        video: document.createElement("video"),
        audio: document.createElement("audio"),
        userBox: document.createElement("div"),
        nameTag: document.createElement("div"),
        picture: document.createElement("img"),
      };
      call.on("stream", (userVideoStream) => {
        const { mic, cam } = onCall.filter((x) => x.id == call.peer)[0];
        addVideoStream(elements, userVideoStream, call.peer, { mic, cam });
      });
    });

    socket.on("called", (userId, mic, cam) => {
      socket.emit("calling", userId, myDevices.mic, myDevices.cam);
      setOnCall([...onCall, { id: userId, mic, cam }]);
      const elements = {
          video: document.createElement("video"),
          audio: document.createElement("audio"),
          userBox: document.createElement("div"),
          nameTag: document.createElement("div"),
          picture: document.createElement("img"),
        },
        call = peer.call(userId, stream);
      call.on("stream", (userVideoStream) => {
        addVideoStream(elements, userVideoStream, userId, { mic, cam });
      });
      socket.on("leaved-call", (who) => {
        call.close();
        elements.userBox.remove();
        setOnCall(onCall.filter((x) => x.id != who));
      });
    });
  },
};
function addVideoStream(elements, stream, userId, deviceInput) {
  const { video, audio, userBox, nameTag, picture } = elements,
    callBox = document.getElementById("call-box");
  nameTag.textContent = players.filter(
    (x) => x.info.id === userId
  )[0].info.username;
  nameTag.className = "name-tag";
  userBox.id = userId;
  userBox.className = "user-box";
  if (!stream.getVideoTracks()[0]) {
    video.remove();
    audio.srcObject = stream;
    audio.autoplay = true;
    audio.muted = !deviceInput.mic;
    userBox.append(audio);
  } else {
    audio.remove();
    video.srcObject = stream;
    video.autoplay = true;
    video.hidden = !deviceInput.cam;
    video.muted = !deviceInput.mic;
    picture.hidden = deviceInput.cam;
    userBox.append(video);
  }
  picture.src = placeholder;
  picture.className = "profile-picture";
  userBox.append(picture);
  userBox.append(nameTag);
  callBox.append(userBox);
}
