function create1() {

    arr1 = getLevel(1);

    generateCheckerboard(this, 8); // Generate background
    setup(this);
    
   // GENERATE WALLS ---------------------------------------------------------------------
    // Create the horizontal walls and the vertical walls
    wall = this.physics.add.staticGroup();

    for(i=0; i<arr1.length; i++){
     for(j=0;j<arr1[i].length;j++){
    if(arr1[i][j]==1){
     wall.create(j*40+20,i*40+20, "wall");
    }
     //adding robber to that position
     else if(arr1[i][j]==2){
      player = this.physics.add.sprite(j*40+20,i*40+8, "dude").setScale(playerScale);
      playerRow = i;
      playerCol = j;
     }
     //adding gem to that position
     else if(arr1[i][j]==4){
      jewel = this.physics.add.sprite(j*40+20,i*40+20, "jewel").setScale(0.125);
      }
     }
    }  

  const LEVEL_TWO_BOTTOM = 2 * CENTER_VERTICAL - 100;

    // Input Events
    cursors = this.input.keyboard.createCursorKeys();
     
    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, jewel, collectJewel, null, this);
  
    this.hitGuard = hitGuard.bind(this);

    // Collision event
  }

