class Grid{
  constructor(x,y){
    this.width = x;
    this.height = y;
    this.grid = [];
    for(let i = 0; i < y; i++){
      let col = [];
      for(let j= 0; j < x; j++){
        col.push(0);
      }
      this.grid.push(col);
    }
  }
}
