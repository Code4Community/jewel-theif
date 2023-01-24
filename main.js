const CENTER_HORIZONTAL = 400;
const CENTER_VERTICAL = 300;
let TILE_WIDTH = 40;
let TILE_HEIGHT = 40;

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var player;
var jewels;
var guards;
var platforms;
var cursors;
var gameOver = false;
var tileSize = 80;
var moveTimer = 150;
var lastPosx = 0;
var lastPosy = 0;
var screenWidth = 800;
var screenHeight = 600;
var playerScale;
var pauseKeyboard = false;
var playerCenterX
var playerCenterY
var playerScale = 0.6


var game = new Phaser.Game(config);

function preload() {
  this.load.image("checkerboard", "assets/checkerboard.png");
  this.load.image("blueT", "assets/tileBlue.png");
  this.load.image("whiteT", "assets/tileWhite.png");
  this.load.image("wallV", "assets/wallV.png");
  this.load.image("wallH", "assets/wallH.png");
  this.load.image("jewel", "assets/jewel.png");
  this.load.image("guard", "assets/bomb.png");
  this.load.spritesheet("dude", "assets/RobberGuySpriteV2.png", {
    frameWidth: 59, //32
    frameHeight: 96, //48
  });
}

document.getElementById("level-select").addEventListener("change", (event) => {
  switchLevel(event.target.value);
});

function switchLevel(level) {
  game.destroy(true);
  switch (level) {
    case "1":
      config.scene.create = create;
      game = new Phaser.Game(config);
      break;
    case "2":
      config.scene.create = create;
      game = new Phaser.Game(config);
      break;
    case "3":
      config.scene.create = create;
      game = new Phaser.Game(config);
      break;
    case "4":
      config.scene.create = create;
      game = new Phaser.Game(config);
      break;
    case "5":
      config.scene.create = create;
      game = new Phaser.Game(config);
      break;
    case "6":
      config.scene.create = create;
      game = new Phaser.Game(config);
      break;
  }
}

function create() {
  /// GENERATE CHECKERBOARD BACKGROUND ---------------------------------------------------
  let whiteTile = false;
  const bottom = 380;
  const tileScale = 0.99;
  const tileAdjustment = 0 * tileScale;

  // Loop through the columns
  for (
    let hl = CENTER_VERTICAL, hu = CENTER_VERTICAL;
    hl < bottom;
    hl += TILE_HEIGHT + tileAdjustment, hu -= TILE_HEIGHT + tileAdjustment
  ) {
    // Loop through the row
    for (
      let w = TILE_WIDTH / 2;
      w < config.width;
      w += TILE_WIDTH + tileAdjustment
    ) {
      // Is the first row being generated?
      if (hl === CENTER_VERTICAL) {
        // White or blue tile?
        if (whiteTile) {
          this.add.image(w, hl, "whiteT").setScale(tileScale);
        } else {
          this.add.image(w, hl, "blueT").setScale(tileScale);
        }
        // Switch colors
        whiteTile = !whiteTile;
      } else {
        // White or blue tile?
        if (whiteTile) {
          this.add.image(w, hu, "whiteT").setScale(tileScale);
          this.add.image(w, hl, "whiteT").setScale(tileScale);
        } else {
          this.add.image(w, hu, "blueT").setScale(tileScale);
          this.add.image(w, hl, "blueT").setScale(tileScale);
        }
        // Switch colors
        whiteTile = !whiteTile;
      }
    }
    // Alternate orders for row
    whiteTile = !whiteTile;
  }

  // GENERATE WALLS ---------------------------------------------------------------------
  // Create the horizontal walls and the vertical walls
  walls = this.physics.add.staticGroup();

  // Generate the vertical maze walls
  walls.create(20, CENTER_VERTICAL, "wallV");
  walls.create(780, CENTER_VERTICAL, "wallV");

  // Generate the horizontal maze walls
  for (let i = 60; i < 800; i += 120) {
    walls.create(i, CENTER_VERTICAL - 80, "wallH");
    walls.create(i, CENTER_VERTICAL + 80, "wallH");
  }

  // The player and its settings
  player = this.physics.add
    .sprite(20 + 6 * 40, CENTER_VERTICAL - 12, "dude")
    .setScale(playerScale);

  //  Player physics properties. Give the little guy a slight bounce.
  //player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  player.body.onWorldBounds = true;

  //  Our player animations, turning, walking left and walking right.
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "dude", frame: 4 }],
    frameRate: 20,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

  //  Input Events
  cursors = this.input.keyboard.createCursorKeys();

  jewel = this.physics.add.sprite(
    800 - 20 - 6 * 40,
    CENTER_VERTICAL - 10,
    "jewel"
  );
  jewel.setScale(0.125);

  guards = this.physics.add.group();


  //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
  this.physics.add.overlap(player, jewel, collectJewel, null, this);

  //this.physics.add.collider(player, guards, hitGuard, null, this);

  //Collision event
}

function update() {
  if (gameOver) {
    return;
  }

  //Player movement
  var invalidMove = false;
  
  
  if (pauseKeyboard == false){
    if (this.input.keyboard.checkDown(cursors.left, moveTimer)) { //LEFT KEY
      if (checkBounds("left") == false){
        player.x -= tileSize/2
      }
    }
    else if (this.input.keyboard.checkDown(cursors.right, moveTimer)) {
      if (checkBounds("right") == false){
        player.x += tileSize/2
      }
    }
    if (this.input.keyboard.checkDown(cursors.up, moveTimer)) {
      if (checkBounds("up") == false){
        player.y -= tileSize/2
      }
    }
    else if (this.input.keyboard.checkDown(cursors.down, moveTimer)) {
      if (checkBounds("down") == false){
        player.y += tileSize/2 
      }
    }
  }
}

function checkBounds(dir){
  wrongMove = false;
  //creates variables for each side of the player
  playerCenterX = player.x + (player.width*playerScale)/2
  playerCenterY = player.y + (player.height*playerScale)/2
  
  if (dir == "up"){
    playerCenterY -= tileSize/2
  }
  else if (dir == "down"){
    playerCenterY =+ tileSize/2
  }
  else if (dir == "left"){
    playerCenterX -= tileSize/2
  }
  else if (dir == "right"){
    playerCenterX += tileSize/2
  }

  walls.getChildren().forEach(function (wall) {
    //creates variables for each side of the walls for better readability
    var wallBoundsTop = wall.y
    var wallBoundsBottom = wall.y + wall.height
    var wallBoundsLeft = wall.x
    var wallBoundsRight = wall.x + wall.width

    

    if ((playerCenterX <= wallBoundsRight) && (playerCenterX >= wallBoundsLeft) && (playerCenterY <= wallBoundsBottom) && playerCenterY >= wallBoundsTop) {
      wrongMove = true;
      console.log("no")
    }
  });
  return wrongMove;
 }
 

function collectJewel(player, jewel) {
  jewel.disableBody(true, true);

  //TODO RUN GAMEOVER CODE

  /*spawn guard code*/
  var guard = guards.create(20, 16, "guard");
  guard = guards.create(200, 500, "guard");
  guard.setBounce(1);
  guard.setCollideWorldBounds(true);
  // guard.setVelocity(Phaser.Math.Between(-200, 200), 20);
  guard.allowGravity = false;

  function hitGuard(player, guard) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play("turn");

    gameOver = true;
  }
}
