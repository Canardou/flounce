var bootState = {
	preload: function() {
		// Load the image
		game.load.image('progressBar', 'asset/sprites/Progressbar.png');
	},

	create: function() {
		//Screen size management
		game.scale.maxHeight = document.body.scrollHeight < 1138 ? document.body.scrollHeight : 1138;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.setScreenSize(true);
		game.stage.smoothed = false;
		// Set some game settings 
		game.stage.backgroundColor = '#3498db';
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.gravity.y=300;
		// game.global.GROUND=2;
		// game.global.BODY_PARTS=game.physics.p2.createCollisionGroup();
		game.physics.p2.updateBoundsCollisionGroup();
		// Start the load state
		game.state.start('load');
	}
};