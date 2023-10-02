
// Create the C4C editor, inside the given element.
var createtext = C4C.Editor.create(document.body);
document.getElementById("mytest").value = createtext;

// Define new function and store it in the symbol "alert". This
// function can now be called from our little language.
C4C.Interpreter.define("alert", () => {
  alert("hello");
});

C4C.Interpreter.define("moveLeft", () => {
 move("left");
});

C4C.Interpreter.define("moveRight", () => {
  move("right");
});

C4C.Interpreter.define("moveUp", () => {
  move("up");
});

 C4C.Interpreter.define("moveDown", () => {
  move("down");
});


const CENTER_HORIZONTAL = 400;
const CENTER_VERTICAL = 300;
let TILE_WIDTH = 40;
let TILE_HEIGHT = 40;

var config = {
  parent: "game",
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      
      debug: true,
    },
  },
  scene: {
    preload: preload,
    create: createDemo,
    update: update,
  },
};

var player;
var jewels;
var guards;
var cursors;
var gameOver = false;
var tileSize = TILE_WIDTH;
var moveIncrement = 40; //THIS CONTROLS THE SPEED THAT THE GUY WALKS
var moveTimer = 150;

var screenWidth = CENTER_HORIZONTAL * 2;
var screenHeight = CENTER_VERTICAL * 2;
var playerScale;
var pauseKeyboard = false;
var playerCenterX;
var playerCenterY;
var playerScale = 0.2;
var guardScale = 1.5;
var jewelScale = 0.125;
var totalMoved = 0;
var currentDirection;

var playerRow = 10; //the row the player is in in the game board array
var playerCol = 4; //the column the player is in in the game board array

var game = new Phaser.Game(config);

function preload() {
  this.load.image("blueT", "assets/tileBlue.png");
  this.load.image("whiteT", "assets/tileWhite.png");
  this.load.image("wall", "assets/wallBox.png");
  this.load.image("jewel", "assets/jewel.png");
  this.load.image("jewelg", "assets/jewelg.png");
  this.load.image("GameOver", "assets/Gameover.png");
  this.load.image("AvoidGuards", "assets/Avoidtheguards.png");
  this.load.spritesheet("dude", "assets/Robber.png", {
    frameWidth: 190,
    frameHeight: 340,
  });
  this.load.spritesheet("guard", "assets/Guard.png", {
    frameWidth: 28,
    frameHeight: 55,
  });
}

document.getElementById("level-select").addEventListener("change", (event) => {
  switchLevel(event.target.value);
});

function switchLevel(level) {
  game.destroy(true);
  switch (level) {
    case "1":
      config.scene.create = createDemo;
      game = new Phaser.Game(config);
      break;
    case "2":
      config.scene.create = create1;
      game = new Phaser.Game(config);
      break;
    case "3":
      config.scene.create = create2;
      game = new Phaser.Game(config);
      break;
    case "4":
      config.scene.create = create3;
      game = new Phaser.Game(config);
      break;
    case "5":
      config.scene.create = create4;
      game = new Phaser.Game(config);
      break;
    case "6":
      config.scene.create = create5;
      game = new Phaser.Game(config);
      break;
  }
}

function update() {
  if (gameOver) {
    return;
  }
    //Player movement
    if (this.input.keyboard.checkDown(cursors.left, moveTimer)) {
      move("left")
    }
    else if (this.input.keyboard.checkDown(cursors.right, moveTimer)) {
      move("right")
    }
    else if (this.input.keyboard.checkDown(cursors.up, moveTimer)) {
      move("up")
    }
    else if (this.input.keyboard.checkDown(cursors.down, moveTimer)) {
      move("down")
    }
  }

//MAIN MOVE FUNCTION
function move(dir) {
  if (!checkBounds(dir)){
    if (dir == "up") {
      player.y -= moveIncrement  
      playerRow -= 1;
    }
    else if (dir == "down"){
      player.y += moveIncrement  
      playerRow += 1;
    }
    else if (dir == "left"){
      player.x -= moveIncrement
      playerCol -= 1;
    }
    else if (dir == "right"){
      player.x += moveIncrement    
      playerCol += 1;
    }
  }
}

//Checks if the player's next move will hit a wall bounding box
//returns false if the path is clear
function checkBounds(dir) {
  wrongMove = false;
  //get potential next move based on the direction
  let currentBoard = getBoardArray(1);
  if (dir == "up"){
    if (currentBoard[playerRow - 1][playerCol] == 1){
      wrongMove = true;
    }
  }
  else if (dir == "down"){
    if (currentBoard[playerRow + 1][playerCol] == 1){
      wrongMove = true;
    }
  }
  else if (dir == "left"){
    if (currentBoard[playerRow][playerCol - 1] == 1){
      wrongMove = true;
    }
  }
  else if (dir == "right"){
    if (currentBoard[playerRow][playerCol + 1] == 1){
      wrongMove = true;
    }
    
  }
  console.log(wrongMove);

<<<<<<< HEAD
  // wall.getChildren().forEach(function (wall) {
  //   //creates variables for each side of the walls for better readability
  //   var wallBoundsTop = wall.y;
  //   var wallBoundsBottom = wall.y + wall.height;
  //   var wallBoundsLeft = wall.x - TILE_WIDTH; //DO NOT TOUCH THESE... they work
  //   var wallBoundsRight = wall.x + wall.width - TILE_WIDTH;

  //   if (
  //     playerCenterX <= wallBoundsRight &&
  //     playerCenterX >= wallBoundsLeft &&
  //     playerCenterY <= wallBoundsBottom &&
  //     playerCenterY >= wallBoundsTop
  //   ) {
  //     wrongMove = true;
  //   }
  // });
  // wallsV.getChildren().forEach(function (wall) {
  //   //creates variables for each side of the walls for better readability
  //   var wallBoundsTop = wall.y - TILE_HEIGHT;
  //   var wallBoundsBottom = wall.y + wall.height - TILE_HEIGHT;
  //   var wallBoundsLeft = wall.x;
  //   var wallBoundsRight = wall.x + wall.width;

  //   if (
  //     playerCenterX <= wallBoundsRight &&
  //     playerCenterX >= wallBoundsLeft &&
  //     playerCenterY <= wallBoundsBottom &&
  //     playerCenterY >= wallBoundsTop
  //   ) {
  //     wrongMove = true;
  //   }
  // });
=======
>>>>>>> 4cbec7dfa330244687c60ffdca44dbaa74305593
  return wrongMove;
}

function collectJewel1(player, jewel){
  jewel.disableBody(true, true);

  //TODO RUN GAMEOVER CODE
  avoidGuard = this.physics.add.staticGroup();
  avoidGuard.create(400, CENTER_VERTICAL + 200, "AvoidGuards").setScale(0.75);
  
  /*spawn guard code*/
  var guard = []
  guard1 = guards.create(100, 300, "guard").setScale(guardScale);
  guard.push(guard1);
  guard2 = guards.create(700, 300, "guard").setScale(guardScale);
  guard.push(guard2);
  this.physics.add.overlap(player, guard, hitGuard, null, this);
  
}


function collectJewel(player, jewel) {
  jewel.disableBody(true, true);

  //TODO RUN GAMEOVER CODE
  player.setTint(0x00ff00);
  gameOver = true;
  
  /*spawn guard array code*/
  // var guard = []
  // guard1 = guards.create(100, 300, "guard").setScale(guardScale);
  // guard.push(guard1);
  // guard2 = guards.create(700, 300, "guard").setScale(guardScale);
  // guard.push(guard2);
//guard.setBounce(1);
//guard.setCollideWorldBounds(true);
  // guard.setVelocity(Phaser.Math.Between(-200, 200), 20);
//guard.allowGravity = false;

  //this.physics.add.overlap(player, guard, hitGuard, null, this);
}

function hitGuard(player, guard, avoidGuard) {
  this.physics.pause();

  player.setTint(0xff0000);

  gameOver = this.physics.add.staticGroup();
  gameOver.create(380, CENTER_VERTICAL + 200, "GameOver").setScale(1.75);

  player.anims.play("turn");
  gameOver = true;
}

//Plays player animations
function animatedMovement(dir, player) { 
  if (dir == "up") {
    player.anims.play("back");
  }
  else if (dir == "down"){
    player.anims.play("front")
  }
  else if (dir == "left"){
    player.anims.play("left")
  }
  else if (dir == "right"){
    player.anims.play("right")
  }
}

function generateCheckerboard(game, numRows) {
  /*
   * Pass "this" as first argument and the number of rows from and including center as the second argument.
   */
  let whiteTile = false;
  // Number of tiles from and including the middle row of tiles
  const bottom = CENTER_VERTICAL + numRows * TILE_HEIGHT;
  const tileScale = 0.99;
  const tileAdjustment = 0;

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
          game.add.image(w, hl, "whiteT").setScale(tileScale);
        } else {
          game.add.image(w, hl, "blueT").setScale(tileScale);
        }
        // Switch colors
        whiteTile = !whiteTile;
      } else {
        // White or blue tile?
        if (whiteTile) {
          game.add.image(w, hu, "whiteT").setScale(tileScale);
          game.add.image(w, hl, "whiteT").setScale(tileScale);
        } else {
          game.add.image(w, hu, "blueT").setScale(tileScale);
          game.add.image(w, hl, "blueT").setScale(tileScale);
        }
        // Switch colors
        whiteTile = !whiteTile;
      }
    }
    // Alternate orders for row
    whiteTile = !whiteTile;
  }
}

function setup(g){ 
  //  Our player animations, turning, walking left and walking right.
  g.anims.create({
    key: "left",
    frames: g.anims.generateFrameNumbers("dude", { start: 1, end: 4 }),
    frameRate: 15,
    repeat: 1,
  });

  g.anims.create({
    key: "right",
    frames: g.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
    frameRate: 15,
    repeat: 1,
  });

  g.anims.create({
    key: "front",
    frames: [{ key: "dude", frame: 0 }],
    frameRate: 20,
  });

  g.anims.create({
    key: "back",
    frames: [{ key: "dude", frame: 9 }],
    frameRate: 20,
  });
}

// TODO Sam - take in a level parameter and return the corresponding board array

function getBoardArray(level) {
  if (level == 1) {
    
  } 
  else if (level == 2) {

  }
  else if (level == 3) {

  }
  else if (level == 4) {
    
  }

}