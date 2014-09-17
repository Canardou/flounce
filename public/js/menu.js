var menuState = {
	create: function() {


		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.gravity.y=300;
		// Display the name of the game
		var nameLabel = game.add.text(game.world.centerX, 80, 'Flounce', {
			font: '50px Arial',
			fill: '#ffffff'
		});
		nameLabel.anchor.setTo(0.5, 0.5);
		

		var yolo = new Guy(1, 1, 1, 0, false);
	}
};