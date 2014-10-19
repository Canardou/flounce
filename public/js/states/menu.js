/*global Monster,game,pi,cos,sin,def,isDef,rand,inh from utils.js*/
var menuState = {
    preload: function() {},

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
        game.global.depth = [];
        for (var i = 0; i < 10; i++) {
            game.global.depth[i] = game.add.group();
            game.world.bringToTop(game.global.depth[i]);
        }
        game.global.towers = [];
        game.global.monsters = [];
        game.physics.p2.updateBoundsCollisionGroup();

        var her = new Hero(20000, 1, false);
        //GameData
        var data = new GameData();

        // Display the name of the game
        var nameLabel = game.add.text(game.world.centerX, 80, 'Flounce', {
            font: '100px Indie Flower',
            fill: '#ffffff'
        });
        nameLabel.anchor.setTo(0.5, 0.5);


        //Menu

        var levelButton = game.add.sprite(game.world.centerX, game.world.centerY - 300, 'infobox');
        levelButton.anchor.setTo(0.5, 0.5);
        levelButton.scale.y = 1.5;
        levelButton.scale.x = 1.2;
        levelButton.alpha = 0.9;
        levelButton.inputEnabled = true;
        levelButton.input.useHandCursor = true;
        levelButton.events.onInputUp.add(function() {
            game.state.start('level1');
        }, this);

        var levelText = game.add.text(levelButton.x, levelButton.y, 'Adventure', {
            font: '35px Indie Flower',
            fill: '#ffffff'
        });
        levelText.anchor.setTo(0.5, 0.5);

        var score = game.add.text(50, 1100, "Best score: " + data.getCookie("topScore"));
        score.fill = 'white';
        score.style.font = '35px Indie Flower';

        //Credit
        var creditButton = game.add.sprite(game.world.centerX, game.world.centerY - 150, 'infobox');
        creditButton.anchor.setTo(0.5, 0.5);
        creditButton.scale.y = 1.5;
        creditButton.scale.x = 1.2;
        creditButton.alpha = 0.9;
        creditButton.inputEnabled = true;
        creditButton.input.useHandCursor = true;
        creditButton.events.onInputUp.add(function() {
            game.state.start('credit');
        }, this);

        var creditText = game.add.text(creditButton.x, creditButton.y, 'Credit', {
            font: '35px Indie Flower',
            fill: '#ffffff'
        });
        creditText.anchor.setTo(0.5, 0.5);

        var optimized = game.add.text(game.world.centerX, game.world.centerY + 200, 'Optimized for Chrome');
        optimized.fill = 'white';
        optimized.style.font = '30px Indie Flower';
        optimized.anchor.setTo(0.5, 0.5);

        var score = game.add.text(50, 1100, "Best score: " + data.getCookie("topScore"));
        score.fill = 'white';
        score.style.font = '35px Indie Flower';

        /*var maBumpMode = new LabelButton(game, game.world.centerX, game.world.centerY+300, 'wood_frame', 'Max Bump Mode', function(){game.state.clearCurrentState(); game.state.start('maxBump');}, game, color);
        maBumpMode.scale.x = 0.5;
        maBumpMode.scale.y = 0.5;*/

        game.global.language = window.navigator.userLanguage || window.navigator.language;

        //Animation du menu
        var monstersToCreate = [{
            "number": 2000,
            "type": "Guy",
            "life": 1,
            "gold": 0,
            "value": 0,
            "strength": 0,
            "damage": 0,
            "entry": [0, 1]
        }];

        //var wave1 = new Wave(monstersToCreate, 1);
        //wave1.start();
    },
    update: function() {
        //game.global.currentWave.update();
    }
};
