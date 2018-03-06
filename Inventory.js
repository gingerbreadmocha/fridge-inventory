class Inventory{
  constructor(x,y,tileSize){
    this.grid = new Grid(x,y);
    this.tileSize = tileSize;
    this.width = this.tileSize * x;
    this.height = this.tileSize * y;
    this.hashu = [];
  }

  drawGrid(startX, startY, game, gameLayer){
	  this.graphics = game.add.graphics(startX, startY);
	  this.graphics.lineStyle(2, 0xFF0000, 1);
	  for(let i = 0; i <= 0 + this.width; i+= this.tileSize){ //width
          this.graphics.moveTo(i, 0);
          this.graphics.lineTo(i, 0 + this.height);
	  }
	  for(let i = 0; i <= 0 + this.height; i+= this.tileSize){
	    this.graphics.moveTo(0, i);
	    this.graphics.lineTo(0 + this.width, i);
      }
      this.startX = startX;
	  this.startY = startY;
  }

  dropItem(x,y, item){
    for(let i = y; i < y + item.height; i++){
      for(let j = x; j < x + item.width; j++){
        if(i >= this.grid.height || j >= this.grid.width || i < 0 || j < 0){
          return false;
        }
        if(this.grid.grid[i][j] !== 0){ //if theres something here already
          return false;
        }
      }
    }
    //otherwise, if there is da required space
    if(!this.hashu[item.name]){
      //if our item doesnt exist in our hash yet add it in
      this.hashu[item.name] = [{startX: x,startY: y}];
    } else {
      this.hashu[item.name].push({startX: x, startY: y});
    }
    for(let i = y; i < y + item.height; i++){
      for(let j = x; j < x + item.width; j++){
        //put the item in your inventory
        this.grid.grid[i][j] = item;
      }
    }
    //we gotta drop it in the graphic too now
    item.xPos = this.startX + (this.tileSize * x);
    item.yPos = this.startY + (this.tileSize * y);
    const offX = Math.abs((this.tileSize * item.width) - item.sprite.width);
    const offY = Math.abs((this.tileSize * item.height) - item.sprite.height);
    item.setPos(this.startX + (this.tileSize * x) + offX/2, this.startY + (this.tileSize * y) + offY/2);
    return true;
  }

  checkItem(x,y){
    if(this.grid.grid[y][x] !== 0) return this.grid.grid[y][x];
    else return 0;
  }

  removeItem(x,y){
    if(this.grid.grid[y][x] === 0) return;
    //if der be item there
    let item = this.grid.grid[y][x]; //the item at that point
    let hashuItem = this.hashu[item.name];
    let startX, startY;
    if(hashuItem.length === 1){ //if theres only ONE of this item
      startX = hashuItem[0].startX;
      startY = hashuItem[0].startY;
    } else {
      for(let i = 0; i < hashuItem.length; i++){
        if(Math.abs(x - hashuItem[i].startX) < item.width && Math.abs(y - hashuItem[i].startY) < item.height){
          startX = hashuItem[i].startX;
          startY = hashuItem[i].startY;
        }
      }
    }
    for(let i = startY; i < startY + item.height; i++){
      for(let j = startX; j < startX + item.width; j++){
        this.grid.grid[i][j] = 0;
      }
    }
    return item;
  }
}