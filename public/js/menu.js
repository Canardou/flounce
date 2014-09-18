/*global Monster,game,pi,cos,sin,def,isDef,rand,inh from utils.js*/
var menuState = {
	create: function() {


		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.gravity.y=300;
		// Display the name of the game
		var nameLabel = game.add.text(game.world.centerX, 80, 'Flounce', {
			font: '50px Arial',
			fill: '#ffffff'
		});

		var monstersToCreate = [
	{"number": 3, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 },
	{"number": 4, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 },
	{"number": 8, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 },
	{"number": 3, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 }
	];

	var wave1 = new Wave(monstersToCreate, 1);
	
	wave1.start();
	},
};