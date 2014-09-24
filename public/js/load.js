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
		game.load.image('guy_body', 'asset/sprites/guy_body.png');
		game.load.image('guy_hand', 'asset/sprites/guy_hand.png');
		game.load.image('guy_arm', 'asset/sprites/guy_arm.png');
		game.load.image('guy_leg', 'asset/sprites/guy_leg.png');
		game.load.image('guy_rfoot', 'asset/sprites/guy_right_foot.png');
		game.load.image('guy_lfoot', 'asset/sprites/guy_left_foot.png');
		game.load.image('guy_limb', 'asset/sprites/guy_limb.png');
		game.load.image('guy_head', 'asset/sprites/guy_head.png');
		game.load.image('flipperRightImg', 'asset/sprites/flipper_right.png');
		game.load.image('background', 'asset/sprites/design.jpg');
		game.load.spritesheet('button', 'asset/sprites/GreenButton.png');
		game.load.physics('paddle_physics', 'asset/physics/physics.json');
    },

    create: function() {
		//Start the menu
		//game.state.start('level');


		game.state.start('level1');
    }
};
