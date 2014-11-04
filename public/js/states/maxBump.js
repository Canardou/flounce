/*global Phaser game*/
var maxBumpState = {
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
        game.physics.p2.enableBodySleeping = true;

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


        game.physics.p2.updateBoundsCollisionGroup();

        //Design of the level//

        //Locations
        //
        //Ask for a background without center stuff
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
        var Q_hint = (game.global.language !== 'fr') ? new Hint("Q", 8, 230, 1000) : new Hint("A", 5, 230, 1000);

        game.physics.p2.enableBody(background);

        game.global.depth[2].add(background);

        background.body.static = true;
        background.body.clearShapes();
        background.body.loadPolygon('paddle_physics', 'walls');

        background.body.setCollisionGroup(game.global.playerCollisionGroup);

        var infos = new InfoPanel();
        var dragNdropPanel = new TowerPanel();
        var monsterInfoPanel = new MonsterInfoPanel();

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

        if (game.global.language !== 'fr') {
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
            //Pop a new monster to make him bump
        });


        //Begining of the level
        game.global.currentLevel = new Niveau(waves, 20, 20000, [new Entree(100, -100)]);


        game.global.unblocks = [];
        game.global.unblocks.push(new Unblock(100, 740));
        game.global.unblocks.push(new Unblock(540, 700));
    },

    update: function() {

    },

    render: function() {

    },
};
