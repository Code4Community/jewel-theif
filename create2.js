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
  

  wall = this.physics.add.staticGroup();



  for(i=0; i<arr2.length; i++){
   for(j=0;j<arr2[i].length;j++){
    if(arr2[i][j]==1){
   wall.create(j*40+20,i*40+20, "wall");
    }
   }
  }  

const LEVEL_TWO_BOTTOM = 2 * CENTER_VERTICAL - 100;

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

