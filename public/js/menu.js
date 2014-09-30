/*global Monster,game,pi,cos,sin,def,isDef,rand,inh from utils.js*/
var menuState = {
	preload: function() {
	},

	create: function() {

		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.gravity.y = 300;
		game.physics.p2.setImpactEvents(true);
		game.global.playerCollisionGroup = game.physics.p2.createCollisionGroup();
		game.global.wallsCollisionGroup = game.physics.p2.createCollisionGroup();
		game.global.enemiesCollisionGroup = game.physics.p2.createCollisionGroup();
		game.global.limbsCollisionGroup = game.physics.p2.createCollisionGroup();
		game.global.voidCollisionGroup = game.physics.p2.createCollisionGroup();
		game.global.onBottom = [];
		game.global.onTop = [];
		game.global.fade_out = [];
		game.physics.p2.updateBoundsCollisionGroup();

		console.log("Entrée dans le menu");
		var data = new GameData();

		// Display the name of the game
		var nameLabel = game.add.text(game.world.centerX, 80, 'Flounce', {
			font: '50px Arial',
			fill: '#ffffff'
		});
		nameLabel.anchor.setTo(0.5, 0.5);


		//Menu
		color = 'black';
		restart = new LabelButton(game, game.world.centerX, game.world.centerY, 'wood_frame', 'Level 1', function(){game.state.start('level1');}, game, color);
		restart.scale.x = 0.5;
		restart.scale.y = 0.5;

		//Animation du menu
		var monstersToCreate = [
		{"number": 7, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 }
		];

		var wave1 = new Wave(monstersToCreate, 1);
		wave1.start();
	},
};