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
	this.currentWave = new Wave(this.waves[0], this.hero, 1);
	this.won = false;
};

 
Niveau.prototype.defend = function(){
	console.log("phase de défense");
	this.phase = "defending";
	this.currentWave.totalMonster = 0;
	if(this.waves.length > 0){
		var waveToStart = new Wave(this.waves.pop(), this.hero, 1);
		this.currentWave = waveToStart;
		console.log("Nombre de monstres: " + this.currentWave.totalMonster);
		waveToStart.start();
	}
};

//When every monster have been killed
Niveau.prototype.construct = function(){
	this.phase = "constructing";
	console.log("phase de construction");
	this.hero.monsterKilledDuringCurrentWave = 0;
	//Show all the consruction panel
};

Niveau.prototype.endLevel = function(){
	console.log("endOfLevel");
	if (this.waves.length === 0 && (this.hero.monsterKilledDuringCurrentWave === this.currentWave.totalMonster)) {
		console.log("You won !");
		game.global.scoreMonster = this.hero.points;
		game.global.scoreLife = this.hero.life;
		console.log(this.hero.life);
		game.state.start('gameStats');
		//Changement d'état, 
		//passage au menu avec le niveau 2 de débloqué 
		//Ou mieux etat de choix dynamique : continuer -> start état lvl2 || menu -> état menu
	}
};