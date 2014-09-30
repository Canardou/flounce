/*global Phaser game*/
var level1State = {
	preload: function() {
		//var button;
		//var niveau1;
		//var hero;
	},

	create: function() {

		var waves = [
			/*[{
				"number": 2,
				"type": "Guy",
				"life": 20,
				"gold": 20,
				"value": 1,
				"strength": 20
			}, {
				"number": 4,
				"type": "Guy",
				"life": 20,
				"gold": 20,
				"value": 1,
				"strength": 20
			}, {
				"number": 8,
				"type": "Guy",
				"life": 20,
				"gold": 20,
				"value": 1,
				"strength": 20
			}, {
				"number": 1,
				"type": "Guy",
				"life": 20,
				"gold": 20,
				"value": 1,
				"strength": 20
			}],*/
			[{
				"number": 12,
				"type": "Guy",
				"life": 200,
				"gold": 20,
				"value": 1,
				"strength": 2
			}],
			[{
				"number": 2,
				"type": "Guy",
				"life": 200,
				"gold": 20,
				"value": 1,
				"strength": 2
			}],
			/*,
						[{
							"number": 2,
							"type": "Guy",
							"life": 20,
							"gold": 20,
							"value": 1,
							"strength": 20
						}, {
							"number": 4,
							"type": "Guy",
							"life": 20,
							"gold": 20,
							"value": 1,
							"strength": 20
						}, {
							"number": 8,
							"type": "Guy",
							"life": 20,
							"gold": 20,
							"value": 1,
							"strength": 20
						}, {
							"number": 1,
							"type": "Guy",
							"life": 20,
							"gold": 20,
							"value": 1,
							"strength": 20
						}]*/
		];

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
		// Collision group

		//Design of the level

		//Locations
		var background = game.add.sprite(320, 520, 'background');
		var paddle_right = new Paddle({
			base: 5,
			max: 6
		}, 460, 950, 'right');
		var paddle_left = new Paddle({
			base: 5,
			max: 6
		}, 200, 950, 'left');

		var bumper = new Bumper({
			base: 10,
			max: 20
		}, 150, 300);

		var test_hint = new Hint("P", 5, 430, 1000);

		

		game.physics.p2.enableBody(background);
		background.body.static = true;
		background.body.clearShapes();
		background.body.loadPolygon('paddle_physics', 'right_wall');
		background.body.loadPolygon('paddle_physics', 'left_wall');
		background.body.loadPolygon('paddle_physics', 'left_little_thing');
		background.body.loadPolygon('paddle_physics', 'right_thing');
		background.body.loadPolygon('paddle_physics', 'middle_diamond');
		background.body.loadPolygon('paddle_physics', 'lower_pipe');
		background.body.loadPolygon('paddle_physics', 'higer_pipe');
		background.body.setCollisionGroup(game.global.playerCollisionGroup);
		background.body.collides(game.global.enemiesCollisionGroup, this.hit, this);
		background.body.collides(game.global.limbsCollisionGroup);
		game.physics.p2.world.setGlobalStiffness = Number.MAX_VALUE;
		game.physics.p2.world.setGlobalRelaxation = 1;

		//Add the inputs and the associated functions
		var key_P = game.input.keyboard.addKey(Phaser.Keyboard.P);
		var key_A = game.input.keyboard.addKey(Phaser.Keyboard.A);

		key_P.onDown.add(function() {
			paddle_right.up();
		});
		
		key_P.onUp.add(function() {
			paddle_right.down();
		});
		
		key_P.onHoldCallBack=(function() {
			paddle_right.down();
		});

		key_A.onDown.add(function() {
			paddle_left.up();
		});

		key_A.onUp.add(function() {
			paddle_left.down();
		});


		
		

		//Begining of the level
		niveau1 = game.global.currentLevel = new Niveau(waves);
		button = new LabelButton(game, game.world.centerX - 95, 400, 'wood_frame', 'Next Wave', game.global.currentLevel.defend, game.global.currentLevel, 'black');
		//button = game.add.button(game.world.centerX - 95, 400, 'button', niveau1.defend, niveau1);
		button.scale.x = 0.3;
		button.scale.y = 0.3;
	},

	update: function() {
		if (game.global.currentLevel.phase === "defending") {
			button.visible = false;
		}
		else if (game.global.currentLevel.phase === "constructing") {
			button.visible = true;
		}

		if (game.global.currentLevel.hero.dead) {
			alert("mouru");
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

		var groupFadeOut = game.global.fade_out;
		for (var p in groupFadeOut) {
			var element = groupFadeOut[p];
			if (element.lifespan < element.fadespan)
				element.alpha = element.lifespan / element.fadespan;
		}

		//game.global.depthGroup.sort();
	},
};