function create2() {
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
  
    // Generate the end caps of the level
    wallsH.create(CENTER_HORIZONTAL-220, CENTER_HORIZONTAL -20, "wallH");
    wallsH.create(CENTER_HORIZONTAL-220, CENTER_HORIZONTAL - 180, "wallH");
    wallsH.create(CENTER_HORIZONTAL+220, CENTER_HORIZONTAL - 180, "wallH");
   wallsH.create(CENTER_HORIZONTAL+220, CENTER_HORIZONTAL -20, "wallH");
  
    //generate the center bubble of the level
    wallsV.create(580, CENTER_VERTICAL+160, "wallV");
    wallsV.create(580, CENTER_VERTICAL-160, "wallV");
    wallsV.create(220, CENTER_VERTICAL+160, "wallV");
    wallsV.create(220, CENTER_VERTICAL-160, "wallV");
    
   for (let i = 20; i < 800; i+=40){
    wallsV.create(i, 60, "wallV");
  }
  for (let i = 20; i < 800; i+=40){
    wallsV.create(i, 540, "wallV");
  }
  for (let i = 140; i < 480; i+=40){
    wallsV.create(60, i, "wallH");
  }
  for (let i = 140; i < 480; i+=40){
    wallsV.create(740, i, "wallH");
  }
  wallsV.create(180, 140, "wallV");
  wallsV.create(140, 140, "wallV");
  
  wallsV.create(180, 420, "wallV");
  wallsV.create(140, 420, "wallV");
  
  wallsV.create(620, 140, "wallV");
  wallsV.create(660, 140, "wallV");
  
  wallsV.create(620, 420, "wallV");
  wallsV.create(660, 420, "wallV");
  
    console.log(wallsH.getChildren());
  
    // The player and its settings
    player = this.physics.add.sprite(180, CENTER_VERTICAL - 12, "dude").setScale(playerScale);
  
    //  Player physics properties. Give the little guy a slight bounce.
    //player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.onWorldBounds = true;
  
    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();
  
    //var jewel = this.physics.add.sprite(620, CENTER_VERTICAL - 10,"jewel").setScale(jewelScale);
  
    var guard1 = this.physics.add.sprite( CENTER_HORIZONTAL, CENTER_VERTICAL - 20, "guard").setScale(guardScale);
    this.physics.add.overlap(player, guard1, hitGuard, null, this);
  
    guards = this.physics.add.group();
  
    this.physics.add.collider(guards, wallsH);
  
    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, jewel, collectJewel, null, this);
  
    //this.physics.add.collider(player, guards, hitGuard, null, this);
  
    //Collision event
  }