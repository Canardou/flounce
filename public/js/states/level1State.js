/*global Phaser game*/
var level1State = {
	preload: function() {
		//var button;
		//var niveau1;
		//var hero;
	},

	create: function() {
		
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setBoundsToWorld(true, true, false, true, false);
		game.physics.p2.gravity.y = 300;
		game.physics.p2.setImpactEvents(true);
		game.physics.p2.enableBodySleeping=true;
		
		game.global.playerCollisionGroup = game.physics.p2.createCollisionGroup();
		game.global.wallsCollisionGroup = game.physics.p2.createCollisionGroup();
		game.global.enemiesCollisionGroup = game.physics.p2.createCollisionGroup();
		game.global.limbsCollisionGroup = game.physics.p2.createCollisionGroup();
		game.global.voidCollisionGroup = game.physics.p2.createCollisionGroup();
		game.global.checkCollisionGroup = game.physics.p2.createCollisionGroup();
		game.global.depth = [];
		for (var i = 0; i < 20; i++) {
			game.global.depth[i] = game.add.group();
			game.world.bringToTop(game.global.depth[i]);
		}
		game.global.towers = [];
		game.global.monsters = [];

		var waves = [
			[
			{
				"number": 12,
				"type": "Guy",
				"life": 50,
				"gold": 25,
				"value": 12,
				"strength": 15,
				"damage": 2,
				"entry": 'all'
			},
			{
				"number": 30,
				"type": "Break"
			},
			{
				"number": 12,
				"type": "Guy",
				"life": 50,
				"gold": 25,
				"value": 12,
				"strength": 15,
				"damage": 2,
				"entry": 'all'
			}],
			[
			{
				"number": 12,
				"type": "Guy",
				"life": 30,
				"gold": 25,
				"value": 10,
				"strength": 10,
				"damage": 1,
				"entry": 'all'
			},
			{
				"number": 6,
				"type": "Break"
			},
			{//Boss Wave
				"number": 1,
				"type": "Skeleton",
				"life": 200,
				"gold": 100,
				"value": 25,
				"strength": 20,
				"damage": 5,
				"entry": [0]
			}],
			[
			{
				"number": 10,
				"type": "Guy",
				"life": 30,
				"gold": 25,
				"value": 10,
				"strength": 10,
				"damage": 1,
				"entry": 'all'
			},
			{
				"number": 30,
				"type": "Break"
			},
			{
				"number": 6,
				"type": "Skeleton",
				"life": 20,
				"gold": 15,
				"value": 5,
				"strength": 15,
				"damage": 1,
				"entry": [0,1]
			}],
			[
			{
				"number": 10,
				"type": "Guy",
				"life": 40,
				"gold": 25,
				"value": 10,
				"strength": 10,
				"damage": 1,
				"entry": 'all'
			},
			{
				"number": 10,
				"type": "Guy",
				"life": 40,
				"gold": 25,
				"value": 10,
				"strength": 10,
				"damage": 1,
				"entry": [0,1]
			}],
			[
			{
				"number": 7,
				"type": "Skeleton",
				"life": 20,
				"gold": 15,
				"value": 5,
				"strength": 7,
				"damage": 1,
				"entry": [0,1]
			},
			{
				"number": 3,
				"type": "Guy",
				"life": 30,
				"gold": 25,
				"value": 5,
				"strength": 7,
				"damage": 1,
				"entry": [2]
			},
			{
				"number": 7,
				"type": "Skeleton",
				"life": 20,
				"gold": 15,
				"value": 5,
				"strength": 7,
				"damage": 1,
				"entry": [0,1]
			}
			],
			[{
				"number": 20,
				"type": "Skeleton",
				"life": 20,
				"gold": 15,
				"value": 5,
				"strength": 7,
				"damage": 1,
				"entry": [0,1]
			}],

			[
			{
				"number": 1,
				"type": "Guy",
				"life": 30,
				"gold": 25,
				"value": 5,
				"strength": 7,
				"damage": 1,
				"entry": [2]
			},
			{
				"number": 12,
				"type":"Break"
			},
			{
				"number": 2,
				"type": "Guy",
				"life": 50,
				"gold": 50,
				"value": 10,
				"strength": 10,
				"damage": 2,
				"entry": [0,1]
			}],

			[
			{
				"number": 5,
				"type": "Guy",
				"life": 20,
				"gold": 25,
				"value": 5,
				"strength": 5,
				"damage": 1,
				"entry": [0,1]
			},
			{
				"number": 10,
				"type":"Break"
			},
			{
				"number": 5,
				"type": "Guy",
				"life": 20,
				"gold": 25,
				"value": 5,
				"strength": 5,
				"damage": 1,
				"entry": [0,1]
			}],

			[
			{
				"number": 4,
				"type": "Guy",
				"life": 20,
				"gold": 25,
				"value": 5,
				"strength": 5,
				"damage": 1,
				"entry": [0,1],
			},
			{
				"number": 10,
				"type":"Break"
			},
			{
				"number": 1,
				"type": "Guy",
				"life": 20,
				"gold": 25,
				"value": 5,
				"strength": 5,
				"damage": 1,
				"entry": [1],
				"vx":5000,
				"vy":1
			},
			{
				"number": 9,
				"type":"Break"
			},
			{
				"number": 1,
				"type": "Guy",
				"life": 20,
				"gold": 25,
				"value": 5,
				"strength": 5,
				"damage": 1,
				"entry": [0],
				"vx":500,
				"vy":30
			}]
		];

		

		game.global.sensors = [];
		game.physics.p2.world.on("beginContact", function(event) {
			for (var i = 0; i < game.global.sensors.length; i++) {
				var s = game.global.sensors[i];
				if (event.bodyA.parent == s || event.bodyB.parent == s) {
					s.overlap++;
				}
			}
		});
		game.physics.p2.world.on("endContact", function(event) {
			for (var i = 0; i < game.global.sensors.length; i++) {
				var s = game.global.sensors[i];
				if (event.bodyA.parent == s || event.bodyB.parent == s) {
					s.overlap--;
				}
			}
		});


		//game.physics.setBoundsToWorld(true, true, false, true, false);
		game.physics.p2.updateBoundsCollisionGroup();

		//Design of the level//

		//Locations
		var background = game.add.sprite(game.global.width / 2, game.global.height / 2, 'walls');
		var paddle_right = new Paddle({
			base: 5,
			max: 6
		}, 460, 990, 'right');
		var paddle_left = new Paddle({
			base: 5,
			max: 6
		}, 180, 990, 'left');
		

		var P_hint = new Hint("P", 8, 430, 1000);
		var Q_hint = (game.global.language !== 'fr') ? new Hint("Q", 8, 230, 1000): new Hint("A", 5, 230, 1000);

		game.physics.p2.enableBody(background);

		game.global.depth[2].add(background);

		background.body.static = true;
		background.body.clearShapes();
		background.body.loadPolygon('paddle_physics', 'walls');

		background.body.setCollisionGroup(game.global.playerCollisionGroup);

		var infos = new InfoPanel();
		var dragNdropPanel = new TowerPanel();

		background.body.collides(game.global.enemiesCollisionGroup);

		background.body.collides(game.global.limbsCollisionGroup);
		background.body.collides(game.global.checkCollisionGroup);
		game.physics.p2.world.setGlobalStiffness = Number.MAX_VALUE;
		game.physics.p2.world.setGlobalRelaxation = 1;

		//Add the inputs and the associated functions
		var key_P = game.input.keyboard.addKey(Phaser.Keyboard.P);
		var key_A = game.input.keyboard.addKey(Phaser.Keyboard.A);
		var key_M = game.input.keyboard.addKey(Phaser.Keyboard.M);
		var key_Q = game.input.keyboard.addKey(Phaser.Keyboard.Q);
		var spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		if(game.global.language !== 'fr'){
			key_A = game.input.keyboard.addKey(Phaser.Keyboard.Q);
			key_Q = game.input.keyboard.addKey(Phaser.Keyboard.A);
			key_M = game.input.keyboard.addKey(Phaser.Keyboard.L);
		}



		key_P.onDown.add(function() {
			paddle_right.up();
		});

		key_P.onUp.add(function() {
			paddle_right.down();
		});

		key_P.onHoldCallBack = (function() {
			paddle_right.down();
		});

		key_A.onDown.add(function() {
			paddle_left.up();
		});

		key_A.onUp.add(function() {
			paddle_left.down();
		});


		key_M.onUp.add(function() {
			for (var i in game.global.monsters) {
				game.global.monsters[i].parts[0].body.velocity.x += 1000;
			}
		});

		key_Q.onUp.add(function() {
			for (var i in game.global.monsters) {
				game.global.monsters[i].parts[0].body.velocity.x -= 1000;
			}
		});

		spacebar.onUp.add(function() {
			if (game.global.currentLevel.phase === "beginning") {
				game.global.currentLevel.defend();
			}
			if (game.global.currentLevel.phase === "constructing" && !game.global.currentLevel.hero.dead) {
				game.global.currentLevel.defend();
			}
			button.label.setText('Next Wave');
		});


		//Begining of the level
		game.global.currentLevel = new Niveau(waves, 200, 350, [new Entree(100, -100), new Entree(400, -100), new Entree(0, 280)]);

		button = new LabelButton(game, game.world.centerX, game.world.centerY + 500, 'wood_frame', 'Click or...', game.global.currentLevel.defend, game.global.currentLevel, 'white');
		button.onInputUp.add(function() {
			if (game.global.currentLevel.countWave === 1) {
				var firstBumperHint = new TextHint('Ho... poor enemies...', 300, 750);
				button.label.setText('Spacebar ?');
			}
			else {
				button.label.setText('Next Wave');
			}
		}, this);
		button.scale.x = 0.4;
		button.scale.y = 0.4;
		
		var bumper = new Bumper({
			base: 10,
			max: 20
		}, 155, 650);
		game.global.towers.push(bumper);
		bumper.panel=game.global.currentLevel.panel;

		bumper = new Bumper({
			base: 10,
			max: 20
		}, 420, 550);

		game.global.towers.push(bumper);
		bumper.panel=game.global.currentLevel.panel;

		
	},

	update: function() {
		if (game.global.currentLevel.phase === "defending") {
			button.visible = false;
		}
		else if (game.global.currentLevel.phase === "constructing" && !game.global.currentLevel.hero.dead) {
			button.visible = true;
		}

		if (game.global.currentLevel.hero.monsterKilledDuringCurrentWave === game.global.currentLevel.currentWave.totalMonster) {
			if (game.global.currentLevel.waves.length > 0)
				game.global.currentLevel.construct();
			else if (!game.global.currentLevel.won) {
				game.global.currentLevel.won = true;
				setTimeout(function() {
					game.global.currentLevel.endLevel();
				}, Phaser.Timer.SECOND * 5);
			}
		}
	},

	render: function() {
	
	},
};