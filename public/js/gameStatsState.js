/*global Phaser game*/
var gameStatsState = {
	create: function() {
		
		color = 'black';
		console.log(game.global.scoreMonster);
		console.log(game.global.scoreLife);

		//Score
		var scoreToPrint = 'Monsters Score: '+
			game.global.scoreMonster+'\nLife Score: '+
			game.global.scoreLife+' x 100 = '+
			game.global.scoreLife*100+
			'\nTotal: '+(game.global.scoreMonster+game.global.scoreLife*100);

		var printScore = game.add.text(game.world.centerX, 150, scoreToPrint, { font: '30px Arial', fill: '#ffffff' });
		printScore.anchor.setTo(0.5, 0.5);

		//Menu
		restart = new LabelButton(game, game.world.centerX, game.world.centerY, 'wood_frame', 'Restart', function(){game.state.start('level1');}, game, color);
		restart.scale.x = 0.5;
		restart.scale.y = 0.5;

		mainMenu = new LabelButton(game, game.world.centerX, game.world.centerY - 200, 'wood_frame', 'Menu', function(){game.state.start('menu');}, game, color);
		mainMenu.scale.x = 0.5;
		mainMenu.scale.y = 0.5;

	},
};