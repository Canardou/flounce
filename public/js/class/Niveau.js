/*global Phaser game*/
//design and waves will be arrayObject or json files
//design will have different constructibles types and their initial localisations

var Niveau = function(waves, initialHeroLife, initialHeroGold, difficulty, availableTower, design) {
	this.waves = waves;
	this.hero = new Hero(initialHeroLife, initialHeroGold);
	this.totalOfWave = waves.length;
	console.log("Nombre de vagues de ce niveau 1: "+this.totalOfWave);
	this.difficulty = def(difficulty, "easy");
	this.availableTower = def(availableTower,1);
	this.design = def(design, true);
	this.phase = "beginning"; // to find if it will be a fight or a contruct phase.
	this.countWave = 0;
	this.currentWave = new Wave(this.waves[0], this.hero, 1);
	this.won = false;
	this.panel = new TowerPanel();
	this.startingWave = game.add.audio('startingWave');
	this.startingWave.volume = 0.2;
};

 
Niveau.prototype.defend = function(){
	this.phase = "defending";
	this.currentWave.totalMonster = 0;
	this.countWave++;
	if(this.waves.length > 0){
		this.panel.greyTower();
		var waveToStart = new Wave(this.waves.pop(), this.hero, this.countWave);
		this.currentWave = waveToStart;
		console.log("Nombre de monstres: " + this.currentWave.totalMonster);
		waveToStart.start();
		this.startingWave.play();
	}
	
};

//When every monster have been killed
Niveau.prototype.construct = function(){
	this.phase = "constructing";
	this.hero.monsterKilledDuringCurrentWave = 0;
	//Show all the consruction panel
	this.panel.setTowers([Bumper]);
	this.panel.activateTower();
};

Niveau.prototype.endLevel = function(){
	if (this.waves.length === 0 && (this.hero.monsterKilledDuringCurrentWave === this.currentWave.totalMonster)) {
		game.global.scoreMonster = this.hero.points;
		game.global.scoreLife = this.hero.life;
		game.state.start('gameStats');
	}
};