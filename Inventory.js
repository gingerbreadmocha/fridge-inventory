/*const Grid = require('./Grid');
const Item = require('./Item');*/

class Inventory{
  constructor(x,y){
    this.grid = new Grid(x,y);
    this.width = 50 * x;
    this.height = 50 * y;
    this.hashu = [];
  }

  drawGrid(startX, startY, game, gameLayer){
	  this.graphics = game.add.graphics(startX, startY);
	  this.graphics.lineStyle(2, 0xFF0000, 1);
	  for(let i = startX; i <= startX + this.width; i+= 50){ //width
          this.graphics.moveTo(i, startY);
          this.graphics.lineTo(i, startY + this.height);
	  }
	  for(let i = startY; i <= startY + this.height; i+= 50){
	    this.graphics.moveTo(startX, i);
	    this.graphics.lineTo(startX + this.width, i);
      }
  }

  dropItem(x,y, item){
    for(let i = y; i < y + item.height; i++){
      for(let j = x; j < x + item.width; j++){
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

//module.exports = Inventory;
