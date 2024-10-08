var guards = []

function create1() {

  guards = []

  document.getElementById("nextLevel").addEventListener("click", (event) => {
    switchLevel("3");
  });

  document.getElementById("respawn").addEventListener("click", (event) => {
    gameOver = false;
    this.scene.restart();
  });

  document.getElementById("nextLevel").disabled = true;

  document.getElementById('level-select').value = '2';

  // document.getElementById("nextLevel").addEventListener("click", (event) => {
  //   //something to load level 2
  //   this.scene.start("level2");
  // });

    arr1 = getLevel(1);

    generateCheckerboard(this, 8); // Generate background
    setup(this);
    
   // GENERATE WALLS ---------------------------------------------------------------------
    // Create the horizontal walls and the vertical walls
    wall = this.physics.add.staticGroup();
        guardIndex = 0;
    for(i=0; i<arr1.length; i++){
     for(j=0;j<arr1[i].length;j++){
    if(arr1[i][j]==9){
      wallkind = Math.floor(Math.random() * (10 - 1 + 1) + 1);
        if (wallkind == 1 || wallkind == 4 || wallkind == 7){
          wall.create(j*40+20, i*40+20, "wallS");
        }
        else if (wallkind == 2 || wallkind == 5 || wallkind == 8){
          wall.create(j*40+20, i*40+20, "wallSR");
        }
        else if (wallkind == 3 || wallkind == 6 || wallkind == 9){
          wall.create(j*40+20, i*40+20, "wallDS");
        }
        else if (wallkind == 10){
          wallkind = Math.floor(Math.random() * (4 - 1 + 1) + 1);
          if (wallkind == 1){
            wall.create(j*40+20, i*40+20, "painting1");
          }
          else if (wallkind == 2){
            wall.create(j*40+20, i*40+20, "painting2");
          }
          else if (wallkind == 3){
            wall.create(j*40+20, i*40+20, "painting3");
          }
          else if (wallkind == 4){
            wall.create(j*40+20, i*40+20, "painting4");
          }
          else if (wallkind == 5){
            wall.create(j*40+20, i*40+20, "wall_light");
          }
        }
      //wall.create(j*40+20,i*40+20, "wall");
    }
    else if (arr1[i][j] == 1){
      wall.create(j*40+20, i*40+20, "void");
    }
     //adding gem to that position
     else if(arr1[i][j]==4){
      jewel = this.physics.add.sprite(j*40+20,i*40+20, "jewel").setScale(0.125);
      }
     }
    }  
    for(i=0; i<arr1.length; i++){
      for(j=0;j<arr1[i].length;j++){
       //adding ROBBER to that position
       if(arr1[i][j]==2){
         player = this.physics.add.sprite(j*40+20,i*40+8, "dude").setScale(playerScale);
         playerRow = i;
         playerCol = j;
         player_start_current_level = [j*40+20,i*40+8];
        }
      }
    }
    player.setDepth(2);
    jewel.setDepth(1);
    for (i = 0; i < guards.length; i++){
      guards[i].setDepth(3);
    }

  const LEVEL_TWO_BOTTOM = 2 * CENTER_VERTICAL - 100;

    // Input Events
    cursors = this.input.keyboard.createCursorKeys();
     
    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    // this.physics.add.overlap(player, jewel, collectJewel, null, this);
  
    //this.hitGuard = hitGuard.bind(this);

    // Collision event
  }

