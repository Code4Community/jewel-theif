arr2 = getLevel(2);

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
  wall = this.physics.add.staticGroup();



  for(i=0; i<arr2.length; i++){
   for(j=0;j<arr2[i].length;j++){
    if(arr2[i][j]==1){
     wall.create(j*40+20,i*40+20, "wall");
    }
    //adding robber to that position
    else if(arr2[i][j]==2){
      player = this.physics.add.sprite(j*40+20,i*40+8, "dude").setScale(playerScale);
      playerRow = i;
      playerCol = j;
     }
     //adding robber to that position
    else if(arr2[i][j]==3){
      guards = this.physics.add.sprite(j*40+20,i*40+20, "guard").setScale(guardScale);
     }
     //adding gem to that position
    else if(arr2[i][j]==4){
      jewel = this.physics.add.sprite(j*40+20,i*40+20, "jewel").setScale(0.125);
      }
   }
  }  

const LEVEL_TWO_BOTTOM = 2 * CENTER_VERTICAL - 100;

  // The player and its settings

  //  Player physics properties. Give the little guy a slight bounce.
  //player.setBounce(0.2);
  // player.setCollideWorldBounds(true);
  // player.body.onWorldBounds = true;

  // Input Events
  cursors = this.input.keyboard.createCursorKeys();
  //guards = this.physics.add.group();

  // this.physics.add.collider(guards, platforms);

  //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
  this.physics.add.overlap(player, jewel, collectJewel, null, this);
  
  this.physics.add.collider(player, guards, hitGuard, null, this);

  // Collision event
}

