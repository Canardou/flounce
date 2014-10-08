/*global Phaser game*/
var level1State = {
	preload: function() {
		//var button;
		//var niveau1;
		//var hero;
	},

	create: function() {

		var waves = [
			[{
				"number": 4,
				"type": "Guy",
				"life": 200,
				"gold": 200,
				"value": 10,
				"strength": 10,
				"entry": 'all'
			}],
			[{
				"number": 8,
				"type": "Guy",
				"life": 30,
				"gold": 200,
				"value": 5,
				"strength": 2,
				"entry": 1
			}],
			[{
				"number": 10,
				"type": "Guy",
				"life": 15,
				"gold": 200,
				"value": 5,
				"strength": 2,
				"entry": 'all'
			}],
			[{
				"number": 3,
				"type": "Guy",
				"life": 25,
				"gold": 200,
				"value": 5,
				"strength": 2,
				"entry": 'all'
			}],
			[{
				"number": 2,
				"type": "Guy",
				"life": 20,
				"gold": 100,
				"value": 5,
				"strength": 1,
				"entry": 0
			}],
		];

		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setBoundsToWorld(true, true, false, true, false);
		game.physics.p2.gravity.y = 300;
		game.physics.p2.setImpactEvents(true);
		
		game.global.sensors=[];
		game.physics.p2.world.on("beginContact",function(event){
          for(var i=0; i<game.global.sensors.length; i++){
            var s = game.global.sensors[i];
            if(event.bodyA.parent == s || event.bodyB.parent == s){
               console.log("in");
              s.overlap++;
            }
          }
        });
        game.physics.p2.world.on("endContact",function(event){
          for(var i=0; i<game.global.sensors.length; i++){
            var s = game.global.sensors[i];
            if(event.bodyA.parent == s || event.bodyB.parent == s){
				console.log("out");
				s.overlap--;
            }
          }
        });

		game.global.playerCollisionGroup = game.physics.p2.createCollisionGroup();
		game.global.wallsCollisionGroup = game.physics.p2.createCollisionGroup();
		game.global.enemiesCollisionGroup = game.physics.p2.createCollisionGroup();
		game.global.limbsCollisionGroup = game.physics.p2.createCollisionGroup();
		game.global.voidCollisionGroup = game.physics.p2.createCollisionGroup();
		game.global.checkCollisionGroup = game.physics.p2.createCollisionGroup();
		game.global.depth = [];
		for (var i = 0; i < 10; i++) {
			game.global.depth[i] = game.add.group();
			game.world.bringToTop(game.global.depth[i]);
		}
		game.global.fade_out = [];


		//game.physics.setBoundsToWorld(true, true, false, true, false);
		game.physics.p2.updateBoundsCollisionGroup();

		//Design of the level//

		//Background
		var background = game.add.sprite(0, 100, 'background');

		//Locations
		var walls = game.add.sprite(320, 570, 'walllvl1');
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

		var P_hint = new Hint("P", 5, 430, 1000);
		var Q_hint = new Hint("Q", 5, 230, 1000);

		var infos = new InfoPanel();

		game.physics.p2.enableBody(walls);
		game.global.depth[0].add(background);
		game.global.depth[0].add(walls);
		walls.body.static = true;
		walls.body.clearShapes();
		walls.body.loadPolygon('paddle_physics', 'right_wall');
		walls.body.loadPolygon('paddle_physics', 'left_wall');
		walls.body.loadPolygon('paddle_physics', 'left_little_thing');
		walls.body.loadPolygon('paddle_physics', 'right_thing');
		walls.body.loadPolygon('paddle_physics', 'middle_diamond');
		walls.body.loadPolygon('paddle_physics', 'lower_pipe');
		walls.body.loadPolygon('paddle_physics', 'higer_pipe');
		walls.body.setCollisionGroup(game.global.playerCollisionGroup);

		walls.body.collides(game.global.enemiesCollisionGroup, function(wall, part) {
			part.sprite.entity.combo = 0;
		}, this);

		walls.body.collides(game.global.limbsCollisionGroup);
		walls.body.collides(game.global.checkCollisionGroup);
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
			if(game.global.currentLevel.phase === "beginning"){
				game.global.currentLevel.defend();
			}
			if (game.global.currentLevel.phase === "constructing" && !game.global.currentLevel.hero.dead) {
				game.global.currentLevel.defend();
			}
		});


		//Begining of the level
		niveau1 = game.global.currentLevel = new Niveau(waves, 1);
		button = new LabelButton(game, game.world.centerX, game.world.centerY-100, 'wood_frame', 'Spacebar ?', game.global.currentLevel.defend, game.global.currentLevel, 'black');
		button.onInputUp.add(function(){
			if(game.global.currentLevel.countWave === 1)
				var firstBumperHint = new TextHint('Ho... poor enemies...', 150, 350);
		}, this);
		button.scale.x = 0.4;
		button.scale.y = 0.4;
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

		var groupFadeOut = game.global.fade_out;
		for (var p in groupFadeOut) {
			var element = groupFadeOut[p];
			if (element.lifespan < element.fadespan)
				element.alpha = element.lifespan / element.fadespan;
		}

	},

	render: function() {
		game.debug.text('Points: ' + game.global.currentLevel.hero.points, 495, 990);
		game.debug.text('Health Points: ' + game.global.currentLevel.hero.life, 495, 1010);
		game.debug.text('Gold: ' + game.global.currentLevel.hero.gold, 495, 1030);
	},
};