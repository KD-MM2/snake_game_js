// 餌のコンストラクタ
class Food{
    constructor () {
       this.newFood();
    }
    newFood(){
       this.x = Math.floor(random(width));
       this.y = Math.floor(random(height));
 
       this.x = Math.floor(this.x / GRID_SIZE) * GRID_SIZE;
       this.y = Math.floor(this.y / GRID_SIZE) * GRID_SIZE;
    }
    // 固定餌　-　赤色と位置
    show(){
       fill(255, 40, 0);
       rect(this.x, this.y, GRID_SIZE, GRID_SIZE, BORDER_RADIUS);
    }
    // ランダム餌　-　黄色と位置
    showRd(){
      fill(255, 255, 0);
      rect(this.x, this.y, GRID_SIZE, GRID_SIZE, BORDER_RADIUS);
    }
 }