
arr3 = getLevel(3);
var guards = []

function create3() {

    guards = []
    array_lev3 = getLevel(3);
    generateCheckerboard(this, 8); // Generate background
    setup(this);

    document.getElementById("nextLevel").addEventListener("click", (event) => {
      switchLevel("5");
    });

    document.getElementById("respawn").addEventListener("click", (event) => {
      gameOver = false;
      this.scene.restart();
    });

    document.getElementById("nextLevel").disabled = true;

    document.getElementById('level-select').value = '4';
  
    // GENERATE WALLS ---------------------------------------------------------------------
    // Create the horizontal walls and the vertical walls
    wall = this.physics.add.staticGroup();

    //Sets framework for multiple guards, adds them to an array to be used in collisions
        guardIndex = 0;

      for (i = 0; i < arr3.length; i++){
        for(j=0; j < arr3[i].length; j++){
          if(arr3[i][j]==9){
            wall.create(j*40+20,i*40+20, "wall");
           }
           else if (arr3[i][j] == 1){
             wall.create(j*40+20, i*40+20, "void");
           }
          //adding guard to that position
          else if(arr3[i][j]==3){
            //adds the guards to the array of guards
            guards[guardIndex] = this.physics.add.sprite(j*40+20,i*40+8, "guard").setScale(guardScale);
            guardIndex++;
          }
          //adding gem to that position
          else if(arr3[i][j]==4){
            jewel = this.physics.add.sprite(j*40+20,i*40+20, "jewel").setScale(0.125);
          }
        }
      }
      for(i=0; i<arr3.length; i++){
        for(j=0;j<arr3[i].length;j++){
         //adding ROBBER to that position
         if(arr3[i][j]==2){
           player = this.physics.add.sprite(j*40+20,i*40+8, "dude").setScale(playerScale);
           playerRow = i;
           playerCol = j;
           player_start_current_level = [j*40+20,i*40+8];
          }
        }
      }
    player.setDepth(2);
    for (i = 0; i < guards.length; i++){
      guards[i].setDepth(3);
    }
    jewel.setDepth(1);
  
    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();
    
    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    // this.physics.add.overlap(player, jewel, collectJewel, null, this);
  }