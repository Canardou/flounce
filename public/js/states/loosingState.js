/*global Phaser game*/
var loosingState = {
	create: function() {
		color = 'black';
		//Score
		var scoreToPrint =
			'Score: '+(game.global.currentLevel.hero.points);

		var printScore = game.add.text(game.world.centerX, 150, scoreToPrint, { font: '30px Arial', fill: '#ffffff' });
		printScore.anchor.setTo(0.5, 0.5);

		//Menu
		restart = new LabelButton(game, game.world.centerX, game.world.centerY, 'wood_frame', 'Try Again', function(){game.state.start('level1');}, game, color);
		restart.scale.x = 0.5;
		restart.scale.y = 0.5;

		mainMenu = new LabelButton(game, game.world.centerX, game.world.centerY - 200, 'wood_frame', 'Menu', function(){game.state.start('menu');}, game, color);
		mainMenu.scale.x = 0.5;
		mainMenu.scale.y = 0.5;

		//Reset global var
		game.global.currentLevel = null;
		game.global.towers = [];
		game.global.monsters = [];

	},
};