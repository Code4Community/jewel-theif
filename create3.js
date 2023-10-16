
arr3 = getLevel(3);

function create3() {
    array_lev3 = getLevel(3);
    generateCheckerboard(this, 8); // Generate background
    setup(this);
  
    const logo = this.add.image(400, 150, 'jewelg');
    
    logo.setInteractive();
    logo.on("pointerdown", () => {
    const programText = C4C.Editor.getText();
    // HERE'S THE IMPORTANT PART!!
    //C4C.Interpreter.run(programText);
    runner.setProgram(programText);
    runner.reset();
    });
    console.log(C4C);
  
  const runner = C4C.Runner.createRunner();
  
  const timer = this.time.addEvent({
    delay: 400,
    callback: () => {runner.step();},
    loop: true
    });
  
    // GENERATE WALLS ---------------------------------------------------------------------
    // Create the horizontal walls and the vertical walls
    wall = this.physics.add.staticGroup();

      for (i = 0; i < arr3.length; i++){
        for(j=0; j < arr3[i].length; j++){
          if (arr3[i][j] == 1){
            wall.create(j*40+20, i*40+20, "wall");
          }
          //adding robber to that position
          else if(arr3[i][j]==2){
            player = this.physics.add.sprite(j*40+20,i*40+8, "dude").setScale(playerScale);
            playerRow = i;
            playerCol = j;
          }
          //adding robber to that position
          else if(arr3[i][j]==3){
            guards = this.physics.add.sprite(j*40+20,i*40+20, "guard").setScale(guardScale);
          }
          //adding gem to that position
          else if(arr3[i][j]==4){
            jewel = this.physics.add.sprite(j*40+20,i*40+20, "jewel").setScale(0.125);
          }
        }
      }

    // The player and its settings
    //player = this.physics.add
      //.sprite(20 + 15 * 40, CENTER_VERTICAL - 12, "dude")
      //.setScale(playerScale);
    //Player physics properties. Give the little guy a slight bounce.
    //player.setBounce(0.2);
    //player.setCollideWorldBounds(true);
    //player.body.onWorldBounds = true;
  
    // var guard1 = this.physics.add.sprite( CENTER_HORIZONTAL+20, CENTER_VERTICAL + 100, "guard").setScale(guardScale);
    // this.physics.add.overlap(player, guard1, hitGuard, null, this);
  
    // var guard2 = this.physics.add.sprite( CENTER_HORIZONTAL+ (4*40 -20), CENTER_VERTICAL -60, "guard").setScale(guardScale);
    // this.physics.add.overlap(player, guard2, hitGuard, null, this);
  
    // var guard3 = this.physics.add.sprite( CENTER_HORIZONTAL- (4*40+20), CENTER_VERTICAL -60, "guard").setScale(guardScale);
    // this.physics.add.overlap(player, guard3, hitGuard, null, this);
  
    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 2, end: 2 }),
      frameRate: 15,
      repeat: 1,
    });
  
    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 0 }],
      frameRate: 20,
    });
  
    this.anims.create({
      key: "back",
      frames: [{ key: "dude", frame: 9 }],
      frameRate: 20,
    });
  
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 6, end: 6 }),
      frameRate: 15,
      repeat: 1,
    });
    
    // Guard animations
    this.anims.create({
      key: "front",
      frames: [{ key: "guard", frame: 0 }],
      frameRate: 20,
    });
  
    this.anims.create({
      key: "back",
      frames: [{ key: "guard", frame: 1 }],
      frameRate: 20,
    });
  
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("guard", { start: 2, end: 5 }),
      frameRate: 15,
      repeat: 1,
    });
  
    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();
  
    // jewel = this.physics.add.sprite(
    //   820 - 15 * 40,
    //   CENTER_VERTICAL + 120,
    //   "jewel"
    // );
    // jewel.setScale(jewelScale);
  
    // guards = this.physics.add.group();
  
    //this.physics.add.collider(guards, wall);
  
    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, jewel, collectJewel, null, this);
  
    this.physics.add.collider(player, guards, hitGuard, null, this);
  
    //Collision event
  }