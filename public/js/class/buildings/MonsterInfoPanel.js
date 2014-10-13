var MonsterInfoPanel = function() {
	this.sprite = game.add.sprite(250, 950, 'wood_frame'); // To adjust
	this.sprite.scale.x = 0.5;
	this.sprite.scale.y = 0.4;

	game.global.depth[4].add(this.sprite);

	this.text = game.add.text(540, 975, 'Monster Infos', this.style);
	this.heart = game.add.sprite(295, 1000, 'heart');
	this.heart.scale.x = 0.6;
	this.heart.scale.y = 0.6;
	this.heart.tween = game.add.tween(this.heart.scale);
	this.heart.tween.to({x: 0.65, y: 0.65}, 600, null, true, 0, 0, false).
	to({x: 0.6, y: 0.6}, 600, null, true, 0, 0, false).loop();

	this.maxBump = game.add.sprite(495, 1070, 'bumper' + this.level, 0);
	this.maxBump.scale.x = 0.2;
	this.maxBump.scale.y = 0.2;
	this.maxBump.tween = game.add.tween(this.maxBump.scale);
	this.maxBump.tween.to({x: 0.25, y: 0.25}, 600, null, true, 0, 0, false).
	to({x: 0.2, y: 0.2}, 600, null, true, 0, 0, false).loop();

};
