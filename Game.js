class Game{
	preload(){
		//put some stuff in here
		this.load.image("kfc","assets/kfc.png");
		this.load.image("soup","assets/soup_sprite.png")
		this.load.image("bacon", "assets/bacanator.png");
		this.load.image("milk", "assets/MILK.png");
		this.load.image("cola", "assets/cola.png");
	}

	create(){
		this.game.stage.backgroundColor = "#000000";
		this.inventoryLayer = this.game.add.group();
		this.inventory = new Inventory(5,7, 50);
		this.inventory.drawGrid(100, 100, this.game, this.inventoryLayer);
		this.milk = new Item(1,2,"milk",10,10,this.game, this);
		this.cola = new Item(1,1,"cola",10,10,this.game, this);
		this.kfc = new Item(2,3,"kfc",10,10, this.game, this);
		this.bacon = new Item(1,1,"bacon",10,10, this.game, this);
	}

	update(){

	}
}

var states = {
	game: "game"
}

window.onload =  _=> {
	var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');
	game.state.add("game", Game);
	game.state.start("game");
}
