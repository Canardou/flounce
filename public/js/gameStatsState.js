/*global Phaser game*/
var gameStatsState = {
	create: function() {
		console.log(game.global.scoreMonster);
		console.log(game.global.scoreLife); // Problème lors du retirage des point de vie ? Héro Mort ? Nan ?!
		var printSocre = game.add.text(game.world.centerX, 150, 'Monsters Score: '+
			game.global.scoreMonster+'\nLife Score: '+
			game.global.scoreLife+' x 100 = '+
			game.global.scoreLife*100+
			'\nTotal: '+game.global.scoreMonster+game.global.scoreLife*100, // cast to int.
			{ font: '30px Arial', fill: '#ffffff' });
		printSocre.anchor.setTo(0.5, 0.5);

	},
};