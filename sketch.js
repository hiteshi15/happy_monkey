
var monkey , monkeyImage;
var food ,foodImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;

var setAnimation;
var createSprite;
var spawnFood,spawnObstacles;

function preload(){
    
  monkey_runningImage =loadAnimation ("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png", "sprite_7.png","sprite_8.png");
  
  foodImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
    createCanvas(600,600);

  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("moving",monkey_runningImage);
  monkey.scale = 0.1;
   
  
  ground = createSprite(400,350,1500,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  var survivalTime = 0;
  
  FoodGroup = new Group(); 
 obstaclesGroup = new Group(); 
 
  score = 0;
}

function draw() {
  background(180);
  
  if(ground.x<0) { ground.x=ground.width/2; }

  //food.scale = 0.05;

  if(keyDown("space") ) { 
   monkey.velocityY = -12; 
  } 
   monkey.velocityY = monkey.velocityY + 0.8; 
   monkey.collide(ground);
    
  spawnFood();
  spawnObstacles();   
  
  drawSprites();
  
  text("Score: "+ score, 500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time"+survivalTime, 100,50);
  
  if(obstaclesGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityY = 0; 
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1); 
  } 
}

function spawnFood() { 
   //write code here to spawn the Food 
   if (frameCount % 80 === 0) { 
    banana = createSprite(600,300,40,10);
    banana.addImage("banana",foodImage);
    banana.scale = 0.05;
    banana.y = random(120,200);
    banana.velocityX = -5;
  //assign lifetime to the variable
    banana.lifetime = 300; 
    monkey.depth = banana.depth + 1; 
  //add each banana to the group 
    FoodGroup.add(banana); 
   } 
}

function spawnObstacles() {
  //write code here to spawn the obstacles 
  if (frameCount % 80 === 0) { 
    obstacles = createSprite(600,330,40,10); 
    obstacles.addImage("obstacle",obstacleImage);
    obstacles.scale = 0.1;
    //obstacles.y = random(280,320); 
    obstacles.velocityX = -5; 
    //assign lifetime to the variable 
    obstacles.lifetime = 300; 
    //monkey.depth = obstacles.depth + 1; 
    //add each obstacles to the group 
    obstaclesGroup.add(obstacles); 
   } 
 } 
