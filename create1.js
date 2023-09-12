function create1() {
    generateCheckerboard(this, 8); // Generate background
    setup(this)
  
  
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
    wallsH = this.physics.add.staticGroup();
    wallsV = this.physics.add.staticGroup();
  
    for (let i = 0; i < 5; ++i) {
      wallsV.create(20, 60 + i*120, "wallV");
      wallsV.create(60, 60 + i*120, "wallV");
      wallsV.create(700, 60 + i*120, "wallV");
      wallsV.create(740, 60 + i*120, "wallV");
      wallsV.create(780, 60 + i*120, "wallV");
    }
  
    for (let i = 0; i < 5; ++i) {
      wallsV.create(140 + i*120, 20, "wallH");
      wallsV.create(140 + i*120, 60, "wallH");
      wallsV.create(140 + i*120, 540, "wallH");
      wallsV.create(140 + i*120, 580, "wallH");
      wallsV.create(20+i*120, 300, "wallH");
    }
  
    // Horizontal maze walls
    // Bottom walls
    const LEVEL_TWO_BOTTOM = 2 * CENTER_VERTICAL - 100;
  
    for (let i = 180; i < 480; i += 120) {
      wall = wallsH.create(i, LEVEL_TWO_BOTTOM, "wallH");
      wall = wallsH.create(i, LEVEL_TWO_BOTTOM - 160, "wallH");
    }
    wallsH.create(660, LEVEL_TWO_BOTTOM, "wallH");
    wallsH.create(540, LEVEL_TWO_BOTTOM, "wallH");
  
    // Middle overflow
    wallsH.create(500, LEVEL_TWO_BOTTOM - 160, "wallH");
    wallsH.create(500, LEVEL_TWO_BOTTOM - 240, "wallH");
  
    // Top walls
    for (let i = 180; i < 480; i += 120) {
      wall = wallsH.create(i, LEVEL_TWO_BOTTOM - 240, "wallH");
      wall = wallsH.create(i, LEVEL_TWO_BOTTOM - 400, "wallH");
    }
    wallsH.create(660, LEVEL_TWO_BOTTOM - 400, "wallH");
    wallsH.create(540, LEVEL_TWO_BOTTOM - 400, "wallH");
  
    // Vertical walls
    // Bottom left
    wall = wallsH.create(100, LEVEL_TWO_BOTTOM - 40, "wallV");
    wall = wallsH.create(100, LEVEL_TWO_BOTTOM - 120, "wallV");
  
    // Top left
    wall = wallsH.create(100, LEVEL_TWO_BOTTOM - 280, "wallV");
    wall = wallsH.create(100, LEVEL_TWO_BOTTOM - 360, "wallV");
  
    // Right side
    for (let i = LEVEL_TWO_BOTTOM - 80; i > LEVEL_TWO_BOTTOM - 400; i -= 120) {
      wall = wallsH.create(700, i, "wallV");
    }
  
    // Middle wall
    wall = wallsH.create(540, LEVEL_TWO_BOTTOM - 200, "wallV");
  
    // The player and its settings
    player = this.physics.add.sprite(180, 410, "dude").setScale(playerScale);
  
    //  Player physics properties. Give the little guy a slight bounce.
    //player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.onWorldBounds = true;
  
    // Input Events
    cursors = this.input.keyboard.createCursorKeys();
    jewel = this.physics.add.sprite(180, LEVEL_TWO_BOTTOM - 322, "jewel");
    jewel.setScale(0.125);
    guards = this.physics.add.group();
  
    // this.physics.add.collider(guards, platforms);
  
    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, jewel, collectJewel, null, this);
  
    // this.physics.add.collider(player, guards, hitGuard, null, this);
  
    // Collision event
  }