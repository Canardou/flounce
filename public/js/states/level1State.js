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
			[{
				"number": 4,
				"type": "Guy",
				"life": 200,
				"gold": 200,
				"value": 10,
				"strength": 20,
				"damage": 2,
				"entry": 'all'
			}],
			[{
				"number": 6,
				"type": "Guy",
				"life": 30,
				"gold": 200,
				"value": 5,
				"strength": 15,
				"damage": 1,
				"entry": 1
			}],
			[{
				"number": 6,
				"type": "Guy",
				"life": 15,
				"gold": 200,
				"value": 5,
				"strength": 12,
				"damage": 1,
				"entry": 'all'
			}],
			[{
				"number": 30,
				"type": "Skeleton",
				"life": 25,
				"gold": 200,
				"value": 5,
				"strength": 10,
				"damage": 1,
				"entry": 'all'
			}],
			[{
				"number": 1,
				"type": "Guy",
				"life": 100,
				"gold": 200,
				"value": 10,
				"strength": 10,
				"damage": 2,
				"entry": 'all'
			}],
			[{
				"number": 2,
				"type": "Guy",
				"life": 10,
				"gold": 100,
				"value": 5,
				"strength": 5,
				"damage": 1,
				"entry": 0
			}],
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

		var bumper = new Bumper({
			base: 10,
			max: 20
		}, 320, 850);
		 game.global.towers.push(bumper);
		

		var P_hint = new Hint("P", 5, 430, 1000);
		var Q_hint = new Hint("Q", 5, 230, 1000);

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

		key_M.onDown.add(function() {
			game.physics.p2.gravity.x += 1000;
		});

		key_M.onUp.add(function() {
			game.physics.p2.gravity.x -= 1000;
		});

		key_Q.onDown.add(function() {
			game.physics.p2.gravity.x -= 1000;
		});

		key_Q.onUp.add(function() {
			game.physics.p2.gravity.x += 1000;
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
		niveau1 = game.global.currentLevel = new Niveau(waves, 20, 2894758);

		button = new LabelButton(game, game.world.centerX, game.world.centerY + 100, 'wood_frame', 'Click or...', game.global.currentLevel.defend, game.global.currentLevel, 'white');
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
		bumper.panel=game.global.currentLevel.panel;
		bumper.allowMouseOver();
		bumper.allowClick();
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
		
		console.log("Monsters : "+game.global.monsters.length);
		console.log("Towers : "+game.global.towers.length);
	},

	render: function() {
		//game.debug.text(game.global.currentLevel.hero.life, 525, 1020, 'rgb(255,255,255)', '20px "moderne_frakturregular"');
		//game.debug.text(game.global.currentLevel.hero.gold, 525, 1055, 'rgb(255,255,255)', '20px "moderne_frakturregular"');
		//game.debug.text(game.global.currentLevel.hero.points, 525, 1090, 'rgb(255,255,255)', '20px "moderne_frakturregular"');
	},
};