arr4 = getLevel(4);

function create4() {
    generateCheckerboard(this, 8); // Generate background
    setup(this)
  
     // Create some interface to running the interpreter.
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
  
    // The player and its settings
    // GENERATE WALLS ---------------------------------------------------------------------
      // Create the horizontal walls and the vertical walls
      wall = this.physics.add.staticGroup();

      for (i = 0; i < arr4.length; i++){
        for(j=0; j < arr4[i].length; j++){
          if (arr4[i][j] ==1){
            wall.create(j*40+20, i*40+20, "wall");

          }
          //adding robber to that position
          else if(arr4[i][j]==2){
            player = this.physics.add.sprite(j*40+20,i*40+8, "dude").setScale(playerScale);
            playerRow = i;
            playerCol = j;
          }
          //adding robber to that position
          else if(arr4[i][j]==3){
            guards = this.physics.add.sprite(j*40+20,i*40+20, "guard").setScale(guardScale);
          }
          //adding gem to that position
          else if(arr4[i][j]==4){
            jewel = this.physics.add.sprite(j*40+20,i*40+20, "jewel").setScale(0.125);
          }
        }
      }
  
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
  
    // jewel = this.physics.add.sprite(800 - 20 - 3 * 40, CENTER_VERTICAL - 160, "jewel");
    // jewel.setScale(jewelScale);
  
  
    // var guard1 = this.physics.add.sprite(800 - 20 - 3 * 40, CENTER_VERTICAL - 40, "guard").setScale(guardScale);
    // this.physics.add.overlap(player, guard1, hitGuard, null, this);
  
    // guards = this.physics.add.group();
  
    this.physics.add.collider(guards, wall);
  
    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, jewel, collectJewel, null, this);
  
    guards = this.physics.add.group();
  
    this.physics.add.collider(player, guards, hitGuard, null, this);
  
    //Collision event
  }