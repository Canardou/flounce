/*global Phaser game*/
//design and waves will be arrayObject or json files
//design will have different constructibles types and their initial localisations
/**
 * handle the creation of a level
 * kind of the same as hero ?
 */
var Level = function(waves, initialHeroLife, initialHeroGold, entries, minutes, difficulty, availableTower, design) {
	this.waves = waves;
	this.minutes=minutes;
	this.hero = new Hero(initialHeroLife, initialHeroGold);
	this.totalOfWave = waves.length;
	console.log("Nombre de vagues de ce Level 1: " + this.totalOfWave);
	this.difficulty = def(difficulty, "easy");
	this.availableTower = def(availableTower, 1);
	this.design = def(design, true);
	this.level = 0;
	this.phase = "beginning"; // to find if it will be a fight or a contruct phase.
	this.countWave = 0;
	this.won = false;
	this.panel = new TowerPanel();
	this.startingWave = game.add.audio('startingWave');
	this.startingWave.volume = 0.5;
	this.panel.reset();
	this.panel.greyTower();
	this.entries = def(entries, [new Entrance(100, -100), new Entrance(400, -100)]);
	this.currentWave = new Wave(this.waves[0], this.hero, 1, this.entries);
};


Level.prototype.defend = function() {
	if (this.panel.isDragged == false) {
		this.phase = "defending";
		this.countWave++;
		this.hero.lifeLostPerWave[this.countWave] = 0;
		var towers = game.global.towers;
		for (var i in towers) {
			towers[i].restart();
		}
		if (this.waves.length > 0) {
			this.panel.greyTower();
			var waveToStart = new Wave(this.waves.pop(), this.hero, this.countWave, this.entries); //To do : .shift instead of .pop()
			this.currentWave = waveToStart;
			this.startingWave.play();
			var waveHint = new TextHint('Wave n°' + this.countWave, 300, 200, 'white', 40, 8);
		}
	}

};

//When every monster have been killed
Level.prototype.construct = function() {
	this.phase = "constructing";
	var towers = game.global.towers;
	for (var i in towers) {
		towers[i].reset();
	}
	if (this.countWave === 1 && this.level === 0) {
		dragExample();
		Saw.prototype.available = 2;
	}
	if (this.countWave === 2 && this.level === 0) {
		upgradeExample();
		var upgradeHint = new TextHint('Don\'t forget to upgrade', 320, 850, '#7AE60D', 40, 8);
	}
	this.hero.monsterKilledDuringCurrentWave = 0;
	new TextGold(this.hero.goldText.x+50,this.hero.goldText.y,250);
	this.hero.changeGold(250);
	//Show all the consruction panel
	this.panel.setTowers([Bumper, Saw]);
	this.panel.reset();
};

Level.prototype.endLevel = function() {
	if (this.waves.length === 0 && game.global.monsters.length === 0 && !game.global.currentLevel.currentWave.isRunning()) {
		game.state.start('end');
	}
};

Level.prototype.destroy = function() {
	if (this.hero)
		this.hero.destroy();
	if (this.panel)
		this.panel.destroy();
	if (this.entries)
		this.entries = [];

};