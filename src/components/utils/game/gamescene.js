import Phaser from "phaser";

let cursors;
let player;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: "GameScene",
    });
  }

  preload() {
    this.load.image("gather_floors", "https://raw.githubusercontent.com/AziziKhoiri99/humble-city/main/src/assets/tilesets/gather_floors.png");
    this.load.image("gather_chairs", "https://raw.githubusercontent.com/AziziKhoiri99/humble-city/main/src/assets/tilesets/gather_chairs.png");
    this.load.image("gather_tables", "https://raw.githubusercontent.com/AziziKhoiri99/humble-city/main/src/assets/tilesets/gather_tables.png");
    this.load.image("gather_decoration", "https://raw.githubusercontent.com/AziziKhoiri99/humble-city/main/src/assets/tilesets/gather_decoration.png");
    this.load.image("gather_games", "https://raw.githubusercontent.com/AziziKhoiri99/humble-city/main/src/assets/tilesets/gather_games.png")

    this.load.tilemapTiledJSON("map", "https://raw.githubusercontent.com/AziziKhoiri99/humble-city/main/src/assets/tilemap/humble-city.json");
    // this.load.atlas(
    //   "atlas",
    //   "https://mikewesthad.github.io/phaser-3-tilemap-blog-posts/post-1/assets/atlas/atlas.png",
    //   "https://mikewesthad.github.io/phaser-3-tilemap-blog-posts/post-1/assets/atlas/atlas.json"
    // );
    this.load.atlas(
      "atlas", 
      "https://raw.githubusercontent.com/AziziKhoiri99/humble-city/main/src/assets/avatars/chara.png", 
      "https://raw.githubusercontent.com/AziziKhoiri99/humble-city/main/src/assets/avatars/chara.json");
  }

  create() {
    const map = this.make.tilemap({ key: "map" });

    const floors = map.addTilesetImage("gather_floors", "gather_floors");
    const chairs = map.addTilesetImage("gather_chairs", "gather_chairs");
    const tables = map.addTilesetImage("gather_tables", "gather_tables");
    const decoration = map.addTilesetImage("gather_decoration", "gather_decoration");
    const games = map.addTilesetImage("gather_games", "gather_games");


    const belowLayer = map.createLayer("Below Player", [floors, chairs, tables, decoration, games], 0, 0);
    const secondLayer = map.createLayer("Second Layer", [floors, chairs, tables, decoration, games], 0, 0);
    const worldLayer = map.createLayer("World", [floors, chairs, tables, decoration, games], 0, 0);
    const interactLayer = map.createLayer("Interact", [floors, chairs, tables, decoration, games], 0, 0); 
    const aboveLayer = map.createLayer("Above Player", [floors, chairs, tables, decoration, games], 0, 0);

    belowLayer;
    secondLayer;
    worldLayer.setCollisionByProperty({ collides: true });
    interactLayer;
    aboveLayer.setDepth(10);

    const spawnPoint = map.findObject(
      "Spawn",
      (obj) => obj.name === "Spawn Point"
    );


    
// var sprite = game.add.sprite(0, 0, 'button');
// var text = game.add.text(0, 0, "Some text", {font: "16px Arial", fill: "#ffffff"});
// sprite.addChild(text);

    player = this.physics.add
      .sprite(spawnPoint.x, spawnPoint.y, "atlas", "chara-front.png")
      .setSize(20, 30)
      .setOffset(5, 14);

    this.followText = this.add.text(0, 0, "My Name");

    this.physics.add.collider(player, worldLayer);

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
    camera.startFollow(player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    cursors = this.input.keyboard.createCursorKeys();

    this.add
      .text(16, 16, 'Arrow keys to move\nPress "D" to show hitboxes', {
        font: "18px monospace",
        fill: "#000000",
        padding: { x: 20, y: 10 },
        backgroundColor: "#ffffff",
      })
      .setScrollFactor(0)
      .setDepth(30);

    this.input.keyboard.once("keydown-D", () => {
    this.physics.world.createDebugGraphic();

    const graphics = this.add.
    graphics().
    setAlpha(0.75).
    setDepth(20);
    worldLayer.renderDebug(graphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });
  });
  
  }

  update() {
    const speed = 120;
    const prevVelocity = player.body.velocity.clone();

    this.followText.setPosition(player.x - 30, player.y - 40);
    
    player.body.setVelocity(0);

    if (cursors.left.isDown) {
      player.body.setVelocityX(-speed);
    } else if (cursors.right.isDown) {
      player.body.setVelocityX(speed);
    }

    if (cursors.up.isDown) {
      player.body.setVelocityY(-speed);
    } else if (cursors.down.isDown) {
      player.body.setVelocityY(speed);
    }

    player.body.velocity.normalize().scale(speed);

    if (cursors.left.isDown) {
      player.anims.play("chara-left-walk", true);
    } else if (cursors.right.isDown) {
      player.anims.play("chara-right-walk", true);
    } else if (cursors.up.isDown) {
      player.anims.play("chara-back-walk", true);
    } else if (cursors.down.isDown) {
      player.anims.play("chara-front-walk", true);
    } else {
      player.anims.stop();

      if (prevVelocity.x < 0) player.setTexture("atlas", "chara-left.png");
      else if (prevVelocity.x > 0) player.setTexture("atlas", "chara-right.png");
      else if (prevVelocity.y < 0) player.setTexture("atlas", "chara-back.png");
      else if (prevVelocity.y > 0) player.setTexture("atlas", "chara-front.png");
    }
  }
}
