/*global Monster,game,pi,cos,sin,def,isDef,rand,inh from utils.js*/
var menuState = {
	preload: function() {
	},

	create: function() {

		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setBoundsToWorld(true, true, false, false, false);
		game.physics.p2.gravity.y = 300;
		game.physics.p2.setImpactEvents(true);
		game.global.playerCollisionGroup = game.physics.p2.createCollisionGroup();
		game.global.wallsCollisionGroup = game.physics.p2.createCollisionGroup();
		game.global.enemiesCollisionGroup = game.physics.p2.createCollisionGroup();
		game.global.limbsCollisionGroup = game.physics.p2.createCollisionGroup();
		game.global.voidCollisionGroup = game.physics.p2.createCollisionGroup();
		game.global.depth=[];
		for(var i=0;i<10;i++){
			game.global.depth[i] = game.add.group();
			game.world.bringToTop(game.global.depth[i]);
		}
		game.global.towers = [];
		game.global.monsters = [];
		game.physics.p2.updateBoundsCollisionGroup();

		var her = new Hero(20000,1, false);
		//GameData
		var data = new GameData();

		// Display the name of the game
		var nameLabel = game.add.text(game.world.centerX, 80, 'Flounce', {
			font: '50px moderne_frakturregular',
			fill: '#ffffff'
		});
		nameLabel.anchor.setTo(0.5, 0.5);


		//Menu
		color = 'white';
		restart = new LabelButton(game, game.world.centerX, game.world.centerY, 'wood_frame', 'Level 1', function(){game.state.clearCurrentState(); game.state.start('level1');}, game, color);
		restart.scale.x = 0.5;
		restart.scale.y = 0.5;

		var score = game.add.text(50, 1100, "Best score: "+data.getCookie("topScore"));
		score.fill = color;
		score.style.font = '35px moderne_frakturregular';


		game.global.language = window.navigator.userLanguage || window.navigator.language;

		//Animation du menu
		var monstersToCreate = [
		{"number": 2000, "type": "Guy", "life":1,"gold":0, "value": 0, "strength":0,"damage": 0,  "entry": [0,1]}
		];

		//var wave1 = new Wave(monstersToCreate, 1);
		//wave1.start();
	},
	update:function(){
	//game.global.currentWave.update();
	}
};