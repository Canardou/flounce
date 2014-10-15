/*global Phaser game*/
//design and waves will be arrayObject or json files
//design will have different constructibles types and their initial localisations

var Niveau = function(waves, initialHeroLife, initialHeroGold, entries, difficulty, availableTower, design) {
	this.waves = waves;
	this.hero = new Hero(initialHeroLife, initialHeroGold);
	this.totalOfWave = waves.length;
	console.log("Nombre de vagues de ce niveau 1: "+this.totalOfWave);
	this.difficulty = def(difficulty, "easy");
	this.availableTower = def(availableTower,1);
	this.design = def(design, true);
	this.level=0;
	this.phase = "beginning"; // to find if it will be a fight or a contruct phase.
	this.countWave = 0;
	this.won = false;
	this.panel = new TowerPanel();
	this.startingWave = game.add.audio('startingWave');
	this.startingWave.volume = 0.5;
	this.panel.setTowers([Bumper]);
	this.panel.activateTower();
	this.panel.greyTower();
	this.entries = def(entries, [new Entree(100, -100), new Entree(400, -100)]);
	this.currentWave = new Wave(this.waves[0], this.hero, 1, this.entries);
};

 
Niveau.prototype.defend = function(){
	this.phase = "defending";
	this.currentWave.totalMonster = 0;
	this.countWave++;
	this.hero.lifeLostPerWave[this.countWave] = 0;
	var towers = game.global.towers;
	for(var i in towers){
		towers[i].restart();
	}
	if(this.waves.length > 0){
		this.panel.greyTower();
		var waveToStart = new Wave(this.waves.pop(), this.hero, this.countWave, this.entries);//To do : .shift instead of .pop()
		this.currentWave = waveToStart;
		console.log("Nombre de monstres: " + this.currentWave.totalMonster);
		//waveToStart.start();
		this.startingWave.play();
		var waveHint = new TextHint('Wave n°'+this.countWave, 300, 200, 'white', 40, 8);
	}
	
};

//When every monster have been killed
Niveau.prototype.construct = function(){
	this.phase = "constructing";
	var towers = game.global.towers;
	for(var i in towers){
		towers[i].reset();
	}
	if(this.countWave === 1 && this.level === 0)
		dragExample();
	this.hero.monsterKilledDuringCurrentWave = 0;
	this.hero.changeGold(250);
	//Show all the consruction panel
	this.panel.setTowers([Bumper]);
	this.panel.activateTower();
};

Niveau.prototype.endLevel = function(){
	if (this.waves.length === 0 && (this.hero.monsterKilledDuringCurrentWave === this.currentWave.totalMonster)) {
		game.state.start('end');
	}
};

Niveau.prototype.destroy = function(){
	if(this.hero)
		this.hero.destroy();
	if(this.panel)
		this.panel.destroy();
	if(this.entries)
		this.entries = []; //Ask Olivier about memories with entries
	//this.waves.hero = null -> nothing to destroy ? 

};