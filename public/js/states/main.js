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
		heigth:gameHeight,
		width:gameWidth
	};

	// Add all the states
	game.state.add('boot', bootState);
	game.state.add('load', loadState);
	game.state.add('menu', menuState);
	game.state.add('level1', level1State);
	game.state.add('gameStats', gameStatsState);
	game.state.add('loose', loosingState);
	
	// Start the 'boot' state
	game.state.start('boot');
};