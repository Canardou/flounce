// Initialise Phaser
var game;
window.onload = function(){
	var gameHeight = 1138;
	var gameWidth = 640;
	game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'gameDiv');
	
	var preload = function() {
		
	};
	
	var create = function(){};

	var update = function(){};

	// Define all the global variables here
	game.global = {
		EXPDATE: 42,
		score: 0,
	};

	// Add all the states
	game.state.add('boot', bootState);
	game.state.add('load', loadState);
	game.state.add('menu', menuState);
	game.state.add('play', playState);

	// Start the 'boot' state
	game.state.start('boot');
};