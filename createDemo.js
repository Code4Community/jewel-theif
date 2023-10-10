arr0 = getLevel(0);

function createDemo() {
  array_levDemo = getLevel(0);
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
    
    
    
      generateCheckerboard(this, 8); // Generate background
      setup(this);
    
      // GENERATE WALLS ---------------------------------------------------------------------
      // Create the horizontal walls and the vertical walls
      wall = this.physics.add.staticGroup();

      for (i = 0; i < arr0.length; i++){
        for(j=0; j < arr0[i].length; j++){
          if (arr0[i][j] ==1){
            wall.create(j*40+20, i*40+20, "wall");

          }
          //adding robber to that position
          else if(arr0[i][j]==2){
            player = this.physics.add.sprite(j*40+20,i*40+8, "dude").setScale(playerScale);
            playerRow = i;
            playerCol = j;
          }
          //adding robber to that position
          else if(arr0[i][j]==3){
            guards = this.physics.add.sprite(j*40+20,i*40+20, "guard").setScale(guardScale);
          }
          //adding gem to that position
          else if(arr0[i][j]==4){
            jewel = this.physics.add.sprite(j*40+20,i*40+20, "jewel").setScale(0.125);
          }
        }
      }
    
      // The player and its settings
      //player = this.physics.add
      //  .sprite(20 + 6 * 40, CENTER_VERTICAL - 12, "dude")
      //  .setScale(playerScale);
      //  Player physics properties. Give the little guy a slight bounce.
      //player.setBounce(0.2);
      //player.setCollideWorldBounds(true);
      //player.body.onWorldBounds = true;
    
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
      //   800 - 20 - 6 * 40,
      //   CENTER_VERTICAL - 10,
      //   "jewel"
      // );
      // jewel.setScale(jewelScale);
    
      guards = this.physics.add.group();
    
      this.physics.add.collider(guards, wall);
    
      //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
      this.physics.add.overlap(player, jewel, collectJewel1, null, this);
      
      //this.physics.add.collider(player, guards, hitGuard, null, this);
    
      //Collision event
    }