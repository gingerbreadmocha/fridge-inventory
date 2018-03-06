class Item{
  constructor(width, height, name, xPos, yPos, game, gamestate){
    this.width = width;
    this.height = height;
    this.name = name;
    this.xPos = xPos;
    this.yPos = yPos;
    this.game = game;
    this.gamestate = gamestate;

    this.sprite = this.game.add.sprite(xPos, yPos, name);
    const poop = height * this.gamestate.inventory.tileSize / this.sprite.height;
    const poop2 = width * this.gamestate.inventory.tileSize / this.sprite.width;
    this.sprite.height = height * this.gamestate.inventory.tileSize;
    this.sprite.width = width * this.gamestate.inventory.tileSize;
    this.sprite.scale.set(Math.min(poop, poop2));
    this.sprite.inputEnabled = true;
    this.sprite.input.enableDrag(true);
    this.sprite.events.onDragStop.add(this.stopDrag, this);
    this.sprite.events.onDragStart.add(this.onDrag,this);
  }

  onDrag(){
    const newX = Math.max(0,Math.round((this.xPos-this.gamestate.inventory.startX)/this.gamestate.inventory.tileSize));
    const newY = Math.max(0,Math.round((this.yPos-this.gamestate.inventory.startY)/this.gamestate.inventory.tileSize));
	this.game.world.bringToTop(this.sprite);
    this.gamestate.inventory.removeItem(newX, newY);
  }

  stopDrag(){
    const newX = Math.round((this.sprite.x-this.gamestate.inventory.startX)/this.gamestate.inventory.tileSize);
    const newY = Math.round((this.sprite.y-this.gamestate.inventory.startY)/this.gamestate.inventory.tileSize);
	if(!this.gamestate.inventory.dropItem(newX, newY, this)){
	  this.setPos(10,10);
    }
  }

  setPos(xPos, yPos){
    this.sprite.x = xPos;
    this.sprite.y = yPos;
  }
}