// Initialise Phaser
var game;
window.onload = function(){
	var gameHeight = 1138;
	var gameWidth = 640;
	game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'gameDiv');
	
	var preload = function() {
		game.scale.maxHeight = document.body.scrollHeight<1138?document.body.scrollHeight:1138;
    	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    	game.scale.setScreenSize(true);
    	game.stage.smoothed = false;
	};
	
	var create = function(){};

	var update = function(){};

	// Define all the global variables here
	game.global = {
		EXPDATE: 42,
		score: 0
	};

	// Add all the states
	game.state.add('boot', bootState);
	game.state.add('load', loadState);
	game.state.add('menu', menuState);
	game.state.add('play', playState);

	// Start the 'boot' state
	game.state.start('boot');
};