function create4() {
    generateCheckerboard(this, 8); // Generate background
    setup(this)
  
    // GENERATE WALLS ---------------------------------------------------------------------
    // Create the horizontal walls and the vertical walls
    wallsH = this.physics.add.staticGroup();
    wallsV = this.physics.add.staticGroup();
  
    // Generate the vertical maze walls
    for (let i = 60; i < 800; i += 120) {
      wallsV.create(20, i, "wallV");
      wallsV.create(screenWidth - 20, i, "wallV");
    }
  
    for (let i = 60; i < 800; i += 120) {
      wallsH.create(i, 20, "wallH");
      wallsH.create(i, screenHeight - 20, "wallH");
      wallsH.create(i, 60, "wallH");
      wallsH.create(i, screenHeight - 60, "wallH");
    }
    
    wallsH.create(260, 100, "wallH");
    wallsH.create(380, 100, "wallH");
    wallsH.create(500, 100, "wallH");
  
    wallsH.create(40, 140, "wallH");
  
    for (let i = 0; i < 5; ++i) {
      wallsV.create(180 + 80 * i, 100 + 80 * i, "wallV");
      wallsV.create(100 + 80 * i, 180 + 80 * i, "wallV");
      wallsH.create(220 + 80 * i, 140 + 80 * i, "wallH");
      wallsH.create(140 + 80 * i, 220 + 80 * i, "wallH");
    }
  
    for (let i = 0; i < 4; ++i) {
      wallsV.create(580, 60 + i*120, "wallV");
      wallsV.create(540, 60 + i*120, "wallV");
    }
  
    for (let i = 0; i < 3; ++i) {
      wallsV.create(500, 60 + i*120, "wallV");
      wallsV.create(460, 60 + i*120, "wallV");
    }
  
    for (let i = 0; i < 2; ++i) {
      wallsV.create(420, 100 + i*120, "wallV");
      wallsV.create(380, 100 + i*120, "wallV");
      wallsV.create(340, 100 + i*120, "wallV");
      wallsV.create(300, 60 + i*120, "wallV");
    }
  
    for (let i = 0; i < 4; ++i) {
      wallsV.create(60, 180 + i*120, "wallV");
      wallsV.create(100, 180 + i*120, "wallV");
      wallsV.create(140, 260 + i*120, "wallV");
      wallsV.create(180, 340 + i*120, "wallV");
      wallsV.create(220, 340 + i*120, "wallV");
      wallsV.create(260, 420 + i*120, "wallV");
      wallsV.create(300, 420 + i*120, "wallV");
      wallsV.create(340, 500 + i*120, "wallV");
      wallsV.create(380, 500 + i*120, "wallV");
    }
  
  
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
    player = this.physics.add.sprite(60, 80, "dude").setScale(playerScale);
  
    //Player physics properties. Give the little guy a slight bounce.
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
  
    jewel = this.physics.add.sprite(800 - 20 - 3 * 40, CENTER_VERTICAL - 160, "jewel");
    jewel.setScale(jewelScale);
  
  
    var guard1 = this.physics.add.sprite(800 - 20 - 3 * 40, CENTER_VERTICAL - 40, "guard").setScale(guardScale);
    this.physics.add.overlap(player, guard1, hitGuard, null, this);
  
    guards = this.physics.add.group();
  
    this.physics.add.collider(guards, wallsH);
  
    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, jewel, collectJewel, null, this);
  
    guards = this.physics.add.group();
  
    this.physics.add.collider(player, guards, hitGuard, null, this);
  
    //Collision event
  }