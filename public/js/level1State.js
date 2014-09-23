var level1State = {
	preload: function() {

	var button;
	var niveau1;
	var hero;
	},

	create: function() {

		var waves = [
	[
	{"number": 2, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 },
	{"number": 4, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 },
	{"number": 8, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 },
	{"number": 1, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 }
	],
	[
	{"number": 2, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 }
	],
	[
	{"number": 2, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 },
	{"number": 4, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 },
	{"number": 8, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 },
	{"number": 1, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 }
	]];
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.gravity.y=300;
		game.physics.p2.setImpactEvents(true);
		game.global.playerCollisionGroup = game.physics.p2.createCollisionGroup();
		game.global.wallsCollisionGroup = game.physics.p2.createCollisionGroup();
		game.global.enemiesCollisionGroup = game.physics.p2.createCollisionGroup();
		game.global.limbsCollisionGroup = game.physics.p2.createCollisionGroup();
		game.physics.p2.updateBoundsCollisionGroup();
		game.physics.p2.world.setGlobalRelaxation=20;
        // Collision group
        
        var paddle=new Paddle(250,250,'right');
        
        var spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		spacebar.onDown.add(function() {
			paddle.up();
		});
    
		spacebar.onUp.add(function() {
			paddle.down();
		});

		niveau1 = new Niveau(waves, true);
		hero = new Hero(niveau1.initialHeroLife, niveau1.initialGold);

		button = game.add.button(game.world.centerX - 95, 400, 'button', niveau1.defend, niveau1);
		button.scale.x =0.2;
		button.scale.y =0.2;
	},

	update : function(){
		if(niveau1.phase === "defending"){
			button.visible = false;
		}
		else if (niveau1.phase === "constructing"){
			button.visible = true;
		}

	},
};