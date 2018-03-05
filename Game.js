class Game{
	preload(){
		//put some stuff in here
		this.load.image("kfc","assets/kfc.png");
		this.load.image("soup","assets/soup_sprite.png")
		this.load.image("bacon", "assets/bacanator.png");
	}

	create(){
		this.game.stage.backgroundColor = "#000000";
		this.inventoryLayer = this.game.add.group();
		this.inventory = new Inventory(5,7);
		this.inventory.drawGrid(100, 100, this, this.inventoryLayer);
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
