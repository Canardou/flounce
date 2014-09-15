var menuState = {
	create: function() {
	// Add a background image
	game.add.image(0, 0, 'background');

	// Display the name of the game
	var nameLabel = game.add.text(game.world.centerX, 80, 'Flounce', { font: '50px Arial', fill: '#ffffff' });
	nameLabel.anchor.setTo(0.5, 0.5);
	}
};