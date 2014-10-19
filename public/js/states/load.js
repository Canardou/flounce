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
		game.load.image('walls', 'asset/sprites/walls.png');
		game.load.image('hint', 'asset/sprites/hint.png');
		game.load.image('wood_frame', 'asset/sprites/wood_panel.png');
		game.load.image('delete', 'asset/sprites/deleteButton.png');
		game.load.image('upgrade', 'asset/sprites/upgrade.png');
		game.load.image('bumperError', 'asset/sprites/bumperError.png');
		game.load.image('bumperDisable', 'asset/sprites/bumperDisable.png');
		game.load.image('sawError', 'asset/sprites/sawErr.png');
		game.load.image('bone', 'asset/sprites/bone.png');
		game.load.image('charlie_bone', 'asset/sprites/bone_purp.png');
		game.load.image('skeleton', 'asset/sprites/squeletton_body.png');
		game.load.spritesheet('rubick', 'asset/sprites/rubick.png', 160, 160);
		game.load.spritesheet('button', 'asset/sprites/GreenButton.png');
		game.load.image('circle', 'asset/sprites/placement.png');
		game.load.image('hand', 'asset/sprites/hand.png');
		game.load.image('heart', 'asset/sprites/heart.png');
		game.load.image('points', 'asset/sprites/points.png');
		game.load.image('princess', 'asset/sprites/princess.png');
		game.load.image('bigPrincess', 'asset/sprites/princessBig.png');
		game.load.image('infobox', 'asset/sprites/infobox.png');
		game.load.image('mute', 'asset/sprites/mute.png');
		game.load.image('unMute', 'asset/sprites/unMute.png');
		game.load.image('help', 'asset/sprites/help.png');
		game.load.spritesheet('gold', 'asset/sprites/coin_gold.png', 32, 32);
		for(var i=0;i<4;i++){
			game.load.spritesheet('bumper'+i, 'asset/sprites/bumper'+i+'.png',120,120);
		}
		game.load.spritesheet('saw', 'asset/sprites/razor.png',120,120);
		//Loading physics
		game.load.physics('paddle_physics', 'asset/physics/physics.json');

		//Loading Sounds
		game.load.audio('guyPain1', 'asset/sounds/guy_pain1.wav');
		game.load.audio('guyPain2', 'asset/sounds/guy_pain2.ogg');
		game.load.audio('guyPain3', 'asset/sounds/guy_pain3.wav');
		game.load.audio('bump1', 'asset/sounds/bump.wav');
		game.load.audio('bump2', 'asset/sounds/otherBump.wav');
		game.load.audio('startingWave', 'asset/sounds/darkGong.wav');
		game.load.audio('loose', 'asset/sounds/youLose.wav');
		game.load.audio('paddle1', 'asset/sounds/paddle1.mp3');

    },

    create: function() {
		//Start the menu
		game.state.start('menu');
		//game.state.start('level1');
    }
};
