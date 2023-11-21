arr5 = getLevel(5);

function create5() {
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

    //Sets framework for multiple guards, adds them to an array to be used in collisions
    var guards = []
    guardIndex = 0;

    //Sets framework for the laser, adds them to an array to be used in collisions
    var lasers = []
    lasersIndex = 0;

    for(i=0; i<arr5.length; i++){
      for(j=0;j<arr5[i].length;j++){
        if(arr5[i][j]==1){
          wall.create(j*40+20,i*40+20, "wall");
         }
        //adding GUARD to that position
        else if(arr5[i][j]==3){
          //adds the guards to the array of guards
          guards[guardIndex] = this.physics.add.sprite(j*40+20,i*40+8, "guard").setScale(guardScale);
          guardIndex++;
          }
        else if(arr5[i][j]==7){
          //adds the guards to the array of guards
          guards[guardIndex] = this.physics.add.sprite(j*40+20,i*40+8, "GuardLightH").setScale(guardScale);
          guardIndex++;
          }
        else if(arr5[i][j]==8){
          //adds the guards to the array of guards
          guards[guardIndex] = this.physics.add.sprite(j*40+20,i*40+8, "GuardLightV").setScale(guardScale);
          guardIndex++;
          }
        //adding GEM to that position
        else if(arr5[i][j]==4){
          jewel = this.physics.add.sprite(j*40+20,i*40+20, "jewel").setScale(0.125);
          }
          //adding HORIZONTAL LASER to that position
        else if(arr5[i][j]==5){
          lasers[lasersIndex] = this.physics.add.sprite(j*40+20,i*40+20, "laserH");
          lasersIndex++;
          }
          //adding VERTICAL LASER to that position
        else if(arr5[i][j]==6){
          lasers[lasersIndex] = this.physics.add.sprite(j*40+20,i*40+20, "laserV");
          lasersIndex++;
          }
        }
       }  
     
       for(i=0; i<arr5.length; i++){
         for(j=0;j<arr5[i].length;j++){
          //adding ROBBER to that position
          if(arr5[i][j]==2){
            player = this.physics.add.sprite(j*40+20,i*40+8, "dude").setScale(playerScale);
            playerRow = i;
            playerCol = j;
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
  
    //guards = this.physics.add.group();

    //guard collision statement
    this.physics.add.collider(player, guards, hitGuard, null, this);
    //laser collision statement
    this.physics.add.collider(player, lasers, hitGuard, null, this);
  
    //Collision event
  }