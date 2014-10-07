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
				"value": 1000,
				"strength": 10,
				"entry": 'all'
			}],
			[{
				"number": 8,
				"type": "Guy",
				"life": 30,
				"gold": 200,
				"value": 200,
				"strength": 2,
				"entry": 1
			}],
			[{
				"number": 10,
				"type": "Guy",
				"life": 15,
				"gold": 200,
				"value": 170,
				"strength": 2,
				"entry": 'all'
			}],
			[{
				"number": 3,
				"type": "Guy",
				"life": 25,
				"gold": 200,
				"value": 150,
				"strength": 2,
				"entry": 'all'
			}],
			[{
				"number": 2,
				"type": "Guy",
				"life": 20,
				"gold": 100,
				"value": 100,
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

		var P_hint = new Hint("P", 5, 430, 1000);
		var Q_hint = new Hint("Q", 5, 230, 1000);

		game.physics.p2.enableBody(background);
		game.global.depth[0].add(background);
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

		background.body.collides(game.global.enemiesCollisionGroup, function(wall, part) {
			part.sprite.entity.combo = 0;
		}, this);

		background.body.collides(game.global.limbsCollisionGroup);
		background.body.collides(game.global.checkCollisionGroup);
		game.physics.p2.world.setGlobalStiffness = Number.MAX_VALUE;
		game.physics.p2.world.setGlobalRelaxation = 1;

		//Add the inputs and the associated functions
		var key_P = game.input.keyboard.addKey(Phaser.Keyboard.P);
		var key_A = game.input.keyboard.addKey(Phaser.Keyboard.A);
		var key_M = game.input.keyboard.addKey(Phaser.Keyboard.M);
		var key_Q = game.input.keyboard.addKey(Phaser.Keyboard.Q);

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


		//Begining of the level
		niveau1 = game.global.currentLevel = new Niveau(waves);
		button = new LabelButton(game, game.world.centerX - 95, 400, 'wood_frame', 'Start Wave', game.global.currentLevel.defend, game.global.currentLevel, 'black');
		button.onInputUp.add(function(){
			if(game.global.currentLevel.countWave === 1)
				var firstBumperHint = new TextHint('Ho... poor enemies...', 150, 350);
		}, this);
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

		if(game.global.currentLevel.hero.life <= 0){
			//Play sound You loose + New state to create...
			var gameOver = game.add.text(game.world.centerX, game.world.centerY, "You lose");
			gameOver.fill = '#700E0D';
			gameOver.anchor.setTo(0.5);
			gameOver.fontSize = 80;
			gameOver.tween = game.add.tween(gameOver);
			gameOver.tween.to({angle : 360}, 2000, null, true, 0, 1, false);
			gameOver.scale.x = 0.1;
			gameOver.scale.y = 0.1;
			gameOver.scaleTween = game.add.tween(gameOver.scale);
			gameOver.scaleTween.to({x: 1, y: 1}, 6000, null, true).onComplete.add(function() {gameOver.destroy(); /* Start new state*/}, this);
		}

	},

	render: function() {
		game.debug.text('Monsters Score: ' + game.global.currentLevel.hero.points, 10, 10);
		game.debug.text('Health Point: ' + game.global.currentLevel.hero.life, 10, 25);
		game.debug.text('Gold: ' + game.global.currentLevel.hero.gold, 10, 40);
	},
};