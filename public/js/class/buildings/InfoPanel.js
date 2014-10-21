var InfoPanel = function() {
	this.sprite = game.add.sprite(485, 950, 'wood_frame');
	this.sprite.scale.x = 0.24;
	this.sprite.scale.y = 0.8;


    this.style = {
        'font': '20px "bd_cartoon_shoutregular"',
        'fill': 'white'
    };
	this.text = game.add.text(540, 975, 'Infos', this.style);

	this.heart = game.add.sprite(495, 1000, 'heart');
	game.global.depth[16].add(this.heart);
	this.heart.scale.x = 0.6;
	this.heart.scale.y = 0.6;
	this.heart.tween = game.add.tween(this.heart.scale);
	this.heart.tween.to({x: 0.65, y: 0.65}, 600, null, true, 0, 0, false).
	to({x: 0.6, y: 0.6}, 600, null, true, 0, 0, false).loop();

	this.coin = game.add.sprite(495, 1035, 'gold');
	game.global.depth[16].add(this.coin);
	this.coin.animations.add('rotate', [0,1,2,3,4,5,6,7], 8, true);
	this.coin.animations.play('rotate');

	this.points = game.add.sprite(495, 1070, 'points');
	game.global.depth[16].add(this.points);
	this.points.scale.x = 0.8;
	this.points.scale.y = 0.8;
	this.points.tween = game.add.tween(this.points);
	this.points.tween.to({angle: 2}, 600, null, true, 0, 0, false).
	to({angle: -2}, 600, null, true, 0, 0, false).loop();

	this.princess = game.add.sprite(340, 1060, 'princess');
	this.princess.scale.set(1);
	game.global.depth[2].add(this.princess);
	this.help = game.add.sprite(390,1040, 'help');
	game.global.depth[2].add(this.help);
	this.help.text = game.add.text(400, 1050, 'Help', {
        'font': '20px "Indie Flower"',
        'fill': 'white'
    });

	game.global.depth[15].add(this.sprite);
};