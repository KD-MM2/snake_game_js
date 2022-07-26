let snake, food, randomFood;
let prevTime = 0;
let level_score = 0;
var RandomFoodTime = Math.round(Math.random() * 7000) + 5000;
var RandomTimeout = Math.round(Math.random() * 7000) + 5000;
var showrd = 0;

function setup() {
   frameRate(60);
   bg = loadImage('./bg.png');
   myFont = loadFont('./ARCADECLASSIC.TTF');
   createCanvas(WITDH, HEIGHT);
   newGame();
}
function draw() {
   background(bg);
   if(!snake.isDead){
      drawSnake();
   } else {
      pg = createGraphics(460, 460);
      pg.background(51);
      pg.noFill();
      pg.stroke(255);
   
      pg.fill(255, 255, 0);
      pg.textSize(50);
      pg.textAlign(CENTER);
      pg.textFont(myFont);
      pg.text('Game  Over !!!', 250, 150);
   
      pg.textSize(25);
      pg.textAlign(CENTER);
      pg.textFont(myFont);
      pg.fill(255, 0, 0);
      if(frameCount % 120 < 80){
         pg.text('Press  Enter  to  play  again !!!', 230, 270);
      }
      if (keyCode == ENTER && snake.isDead == 1) {
         newGame();
      }

      
      image(pg, 20, 20);
   }
}
function stopRD(){
   showrd = 0;
   RandomFoodTime = Math.round(Math.random() * 7000) + 5000;

}
function updateGameStats(score, level){
   document.getElementById("scoreText").innerHTML = score +"/"+ level_score;

   
   switch(level){
      case 8:  document.getElementById("levelText").innerHTML = "1"; level_score = 50; break;
      case 7:  document.getElementById("levelText").innerHTML = "2"; level_score = 100; break;
      case 6:  document.getElementById("levelText").innerHTML = "3"; level_score = 150; break;
      case 5:  document.getElementById("levelText").innerHTML = "4"; level_score = 200; break;
      case 4:  document.getElementById("levelText").innerHTML = "5"; level_score = 250; break;
      case 3:  document.getElementById("levelText").innerHTML = "6"; level_score = 300; break;
      case 2:  document.getElementById("levelText").innerHTML = "7"; level_score = 350; break;
      case 1:  document.getElementById("levelText").innerHTML = "MAX LEVEL"; level_score = "400 MAX"; break;
   }
}
function drawSnake() {
   SNAKE_SPEED = 8;
   if(snake.length < 50){
      SNAKE_SPEED = 8;
   } else if(snake.length < 100){
      SNAKE_SPEED = 7;
   } else if(snake.length < 150){
      SNAKE_SPEED = 6;
   } else if(snake.length < 200){
      SNAKE_SPEED = 5;
   } else if(snake.length < 250){
      SNAKE_SPEED = 4;
   } else if(snake.length < 300){
      SNAKE_SPEED = 3;
   } else if(snake.length < 350) {
      SNAKE_SPEED = 2;
   } else if(snake.length < 400){
      SNAKE_SPEED = 1;
   }

   // update every SNAKE_SPEED frame
   if(frameCount % SNAKE_SPEED == 0)
   {
      snake.update();
   }
   
   updateGameStats(snake.length, SNAKE_SPEED);
   food.show();
   
   if(showrd == 1){
      randomFood.showRd();
      setTimeout(stopRD, RandomTimeout);
   }
   snake.show();


   var currentTime = millis();
   if(currentTime - prevTime >= RandomFoodTime && snake.length != 0){
      if(RandomFoodTime>=RandomTimeout) {
         randomFood.newFood();
         showrd = 1;
      } else {
         while(RandomFoodTime<=RandomTimeout){
            RandomTimeout = Math.round(Math.random() * 7000) + 5000;
            if(RandomFoodTime>=RandomTimeout){
               break;
            }
         }
      }
      prevTime = currentTime;
      RandomTimeout = Math.round(Math.random() * 7000) + 5000;
   }

   // Handle when snake eat food
   if(snake.head.x == food.x && snake.head.y == food.y){
      eatFood();
   }
   if(snake.head.x == randomFood.x && snake.head.y == randomFood.y){
      eatRandomFood();
      showrd = 0;
   }
}
class Count{
   constructor(s,w){
     this.s = s
     this.w = w
     this.p = createP('')
   }
   start(){
     if (!this.done) {
       setInterval(() => this.counter(),this.w)
     }
   }
   counter(){
     if(this.s < 100){
       this.s ++
     }
   }
   reset(){
     this.s = 0
   }
 } 
function newGame() {
   snake = new Snake();
   food = new Food();
   randomFood = new Food();
   level_score = 0;
}
function eatFood() {
   snake.length++;
   food.newFood();
}
function eatRandomFood(){
   snake.length += 2;
   randomFood.newFood();
}

function keyPressed() {
   if (keyCode == UP_ARROW && snake.vel.y != 1) {
      snake.vel.y = -1;
      snake.vel.x = 0;
   } else if (keyCode == DOWN_ARROW && snake.vel.y != -1) {
      snake.vel.y = 1;
      snake.vel.x = 0;
   }  else if (keyCode == LEFT_ARROW && snake.vel.x != 1) {
      snake.vel.y = 0;
      snake.vel.x = -1;
   } else if (keyCode == RIGHT_ARROW && snake.vel.x != -1) {
      snake.vel.y = 0;
      snake.vel.x = 1;
   }
}
