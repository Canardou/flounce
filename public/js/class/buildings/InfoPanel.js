var InfoPanel = function() {
	this.sprite = game.add.sprite(485, 950, 'wood_frame');
	this.sprite.scale.x = 0.24;
	this.sprite.scale.y = 0.8;
	game.global.depth[7].add(this.sprite);
};