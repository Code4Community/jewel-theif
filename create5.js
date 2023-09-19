function create5() {
    generateCheckerboard(this, 8); // Generate background
    setup(this)
  
    if (pauseKeyboard == false) {
      if (this.input.keyboard.checkDown(cursors.left, moveTimer)) {
        //LEFT KEY
        if (checkBounds("left") == false) {
          player.x -= tileSize / 2;
        }
      } else if (this.input.keyboard.checkDown(cursors.right, moveTimer)) {
        if (checkBounds("right") == false) {
          player.x += tileSize / 2;
        }
      }
      if (this.input.keyboard.checkDown(cursors.up, moveTimer)) {
        if (checkBounds("up") == false) {
          player.y -= tileSize / 2;
        }
      } else if (this.input.keyboard.checkDown(cursors.down, moveTimer)) {
        if (checkBounds("down") == false) {
          player.y += tileSize / 2;
        }
      }
    }
  }