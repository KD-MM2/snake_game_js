let snake, food, randomFood;
let prevTime = 0;
var RandomFoodTime = Math.round(Math.random() * 10000) + 5000;
var RandomTimeout = Math.round(Math.random() * 10000) + 5000;
var showrd = 0;
var countdown = 0;

function setup() {
   frameRate(60);
   createCanvas(WITDH, HEIGHT);
   newGame();
}
function draw() {
   background(0);
   if(!snake.isDead){
      drawSnake();
   } else {
      newGame()
   }
}
function stopRD(){
   showrd = 0;
   RandomFoodTime = Math.round(Math.random() * 10000) + 5000;
   //randomFood.remove();
}
function drawSnake() {
   SNAKE_SPEED = 8;
   if(snake.length <= 50){
      SNAKE_SPEED = 8;
   } else if(snake.length <= 100){
      SNAKE_SPEED = 7;
   } else if(snake.length <= 150){
      SNAKE_SPEED = 6;
   } else if(snake.length <= 200){
      SNAKE_SPEED = 5;
   } else if(snake.length <= 250){
      SNAKE_SPEED = 4;
   } else if(snake.length <= 300){
      SNAKE_SPEED = 3;
   } else if(snake.length <= 350) {
      SNAKE_SPEED = 2;
   } else if(snake.length <= 400){
      SNAKE_SPEED = 1;
   }

   // update every SNAKE_SPEED frame
   if(frameCount % SNAKE_SPEED == 0)
   {
      snake.update();
   }
   textSize(15);
   text("Score: " + snake.length, 0, 15);
   //text("Big food Timeout: " + countdown, 0, 31);
   food.show();
   if(showrd == 1){
      randomFood.showRd();
      setTimeout(stopRD, RandomTimeout);
      //for (var i = 0; i <= RandomTimeout; i--){
      //      countdown = i;
      //   }
   }
   snake.show();

   var currentTime = millis();
   if(currentTime - prevTime >= RandomFoodTime && snake.length != 0){
      if(RandomFoodTime>= RandomTimeout) {
         randomFood.newFood();
         showrd = 1;
      } else {
         RandomTimeout = Math.round(Math.random() * 10000) + 5000;
      }
      prevTime = currentTime;
      
      RandomTimeout = Math.round(Math.random() * 10000) + 5000;
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

function newGame() {
   snake = new Snake();
   food = new Food();
   randomFood = new Food();
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
