var loadState = {
	preload: function () {
		// Add a 'loading...' label on the screen
		var loadingLabel = game.add.text(game.world.centerX, 150, 'loading...', { font: '30px Arial', fill: '#ffffff' });
		loadingLabel.anchor.setTo(0.5, 0.5);

		// Display the progress bar
		var progressBar = game.add.sprite(game.world.centerX, 200, 'progressBar');
		progressBar.anchor.setTo(0.5, 0.5);
		game.load.setPreloadSprite(progressBar);


		//Loading assets
		//
		//Loading image
		game.load.image('guy_body', 'asset/sprites/guy_body.png');
		game.load.image('guy_hand', 'asset/sprites/guy_hand.png');
		game.load.image('guy_arm', 'asset/sprites/guy_arm.png');
		game.load.image('guy_leg', 'asset/sprites/guy_leg.png');
		game.load.image('guy_rfoot', 'asset/sprites/guy_right_foot.png');
		game.load.image('guy_lfoot', 'asset/sprites/guy_left_foot.png');
		game.load.image('guy_limb', 'asset/sprites/guy_limb.png');
		game.load.image('guy_head', 'asset/sprites/guy_head.png');
		game.load.image('paddle_right', 'asset/sprites/paddle_right.png');
		game.load.image('paddle_left', 'asset/sprites/paddle_left.png');
		game.load.image('background', 'asset/sprites/patron.png');
		game.load.image('hint', 'asset/sprites/hint.png');
		game.load.image('wood_frame', 'asset/sprites/wood_panel.png');
		game.load.image('delete', 'asset/sprites/deleteButton.png');
		game.load.image('upgrade', 'asset/sprites/upgrade.png');
		game.load.image('bumperError', 'asset/sprites/bumperError.png');
		game.load.image('bumperDisable', 'asset/sprites/bumperDisable.png');
		game.load.image('bone', 'asset/sprites/bone.png');
		game.load.spritesheet('button', 'asset/sprites/GreenButton.png');
		game.load.physics('paddle_physics', 'asset/physics/physics.json');
		game.load.image('circle', 'asset/sprites/placement.png');
		for(var i=0;i<3;i++){
			game.load.spritesheet('bumper'+i, 'asset/sprites/bumper'+i+'.png',60,60);
		}

		//Loading physics
		game.load.physics('paddle_physics', 'asset/physics/physics.json');

		//Loading Sounds
		game.load.audio('guyPain1', 'asset/sounds/guy_pain1.wav');
		game.load.audio('guyPain2', 'asset/sounds/guy_pain2.ogg');
		game.load.audio('guyPain3', 'asset/sounds/guy_pain3.wav');
		game.load.audio('bump1', 'asset/sounds/bump.wav');
		game.load.audio('bump2', 'asset/sounds/otherBump.wav');
		game.load.audio('startingWave', 'asset/sounds/darkGong.wav');

    },

    create: function() {
		//Start the menu
		game.state.start('menu');
		//game.state.start('level1');
    }
};
