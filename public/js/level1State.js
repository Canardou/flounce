var level1State = {
	preload: function() {

	var button;
	var niveau1;
	var hero;
	},

	create: function() {

		var waves = [
	/*[
	{"number": 12, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 }
	],
	[
	{"number": 8, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 }
	],*/
	[
	{"number": 2, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 },
	{"number": 1, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 },
	{"number": 1, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 },
	{"number": 1, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 }
	]
	];
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
        
        //Design of the level

        //Locations
        var background = game.add.sprite(320,520,'background');
        var paddle_right= new Paddle({base:50,max:150},430,930,'right');
        var paddle_left= new Paddle({base:50,max:150},190,930,'left');

        game.physics.p2.enableBody(background,true);
        background.body.static = true;
        background.body.clearShapes();
        background.body.loadPolygon('paddle_physics','right_wall');
        background.body.loadPolygon('paddle_physics','left_wall');
        background.body.loadPolygon('paddle_physics','left_little_thing');
        background.body.loadPolygon('paddle_physics','right_thing');
        background.body.loadPolygon('paddle_physics','middle_diamond');
        background.body.loadPolygon('paddle_physics','lower_pipe');
        background.body.loadPolygon('paddle_physics','higer_pipe');
        background.body.setCollisionGroup(game.global.playerCollisionGroup);
		background.body.collides(game.global.enemiesCollisionGroup, this.hit, this);
		background.body.collides(game.global.limbsCollisionGroup);

        //Add the inputs and the associated functions
        var key_P = game.input.keyboard.addKey(Phaser.Keyboard.P);
        var key_A = game.input.keyboard.addKey(Phaser.Keyboard.A);

		key_P.onDown.add(function() {
			paddle_right.up();
		});
    
		key_P.onUp.add(function() {
			paddle_right.down();
		});

		key_A.onDown.add(function() {
			paddle_left.up();
		});
    
		key_A.onUp.add(function() {
			paddle_left.down();
		});




		//Begining of the level
		niveau1 = new Niveau(waves, true);

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

		if(niveau1.hero.monsterKilledDuringCurrentWave === niveau1.currentWave.totalMonster)
		{
			niveau1.construct();
		}

	},
};