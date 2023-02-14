var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup = new Group();
  climbersGroup = new Group();
  ghost = createSprite(200,200);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.4; 
  //ghost.setCollider("rectangle",0,0,40,50); 
  invisibleBlockGroup = new Group();
}

function draw() {
  background(200);
  
  if(gameState === "play"){

  if(tower.y > 400){
      tower.y = 300
    }

  if(keyDown("LEFT_ARROW")){
    ghost.x = ghost.x - 3;
  }

  if(keyDown("RIGHT_ARROW")){
    ghost.x = ghost.x + 3;  
  }

  if(keyDown("SPACE")){
    ghost.velocityY = -7;
  }

  ghost.velocityY = ghost.velocityY + 0.7;

  if(climbersGroup.isTouching(ghost) || ghost.y > 600){
    ghost.velociytyY = 0;
    ghost.destroy();
    gameState = "end";
  } 

  spawnDoors();
}

drawSprites();
if(gameState === "end"){
  fill("yellow");
  textSize(50);
  text("GAME OVER",150,300);
  tower.velocityY = 0;
  climbersGroup.destroyEach(0);
  //climbersGroup.visible = false;
  doorsGroup.destroyEach(0);  
 // doorsGroup.visible = false;
  
}
  
}

function spawnDoors(){
  if(frameCount % 250 === 0){ 
  var door = createSprite(200,200);
  door.addImage("door",doorImg);
  var climber = createSprite(200,265);
  climber.addImage("railing",climberImg);
 // var invisibleBlock = createSprite(200,200);
 // invisibleBlock.x = climber.x;
 // invisibleBlock.velocityY = 1;
  // invisibleBlock.visible = false; 
  door.x = Math.round(random(150,400)); 
  climber.x = door.x;
  climber.velocityY = 1;
  door.velocityY = 1;
  door.depth = ghost.depth;
  ghost.depth += 1;
  door.lifetime = 600;
  climber.lifetime = 600;
  climbersGroup.add(climber);
  doorsGroup.add(door);
  
  }
}