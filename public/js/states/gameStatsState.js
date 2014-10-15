/*global Phaser game*/
var gameStatsState = {
	create: function() {
		color = 'black';

		//Score
		var total = (game.global.currentLevel.hero.points+game.global.currentLevel.hero.life*100+ game.global.currentLevel.hero.gold);
		var scoreToPrint = 'Monsters Score: '+ game.global.currentLevel.hero.points+
			'\nLife Score: '+game.global.currentLevel.hero.life+' x 100 = '+
			game.global.currentLevel.hero.life*100+
			'\nGold Remaining: '+game.global.currentLevel.hero.gold+
			'\nTotal: '+total;

		var printScore = game.add.text(game.world.centerX, 150, scoreToPrint, { font: '30px Arial', fill: '#ffffff' });
		printScore.anchor.setTo(0.5, 0.5);

		var otherStat = 'Life lost per wave :\n';
		for (var i in game.global.currentLevel.hero.lifeLostPerWave) {
			otherStat += 'Wave '+ ((+i)+1)+': '+game.global.currentLevel.hero.lifeLostPerWave[i]+ '\n';
		}

		//And some stats
		var data = new GameData();
		if(total > (data.getCookie('topScore')+0)){
			data.setCookie('topScore', total, game.global.EXPDATE);
		}


		var printStats = game.add.text(game.world.centerX - 100, 250, otherStat, { font: '30px Arial', fill: '#ffffff' });

		//Menu
		restart = new LabelButton(game, game.world.centerX, game.world.centerY+ 100, 'wood_frame', 'Restart', function(){printScore.destroy(); printStats.destroy(); game.state.start('level1');}, game, color);
		restart.scale.x = 0.5;
		restart.scale.y = 0.5;

		mainMenu = new LabelButton(game, game.world.centerX, game.world.centerY + 300, 'wood_frame', 'Menu', function(){printScore.destroy(); printStats.destroy(); game.state.start('menu');}, game, color);
		mainMenu.scale.x = 0.5;
		mainMenu.scale.y = 0.5;

		//Reset global var
		game.global.currentLevel.hero.lifeLostPerWave = [];
		game.global.currentLevel = null;
		game.global.towers = [];
		game.global.monsters = [];


	},
};