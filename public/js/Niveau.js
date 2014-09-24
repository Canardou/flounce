//design and waves will be arrayObject or json files
//design will have different constructibles types and their initial localisations

var Niveau = function(waves, initialHeroLife, initialHeroGold, difficulty, availableTower, design) {
	this.waves = waves;
	this.totalOfWave = waves.length;
	console.log("Nombre de vagues de ce niveau 1: "+this.totalOfWave);
	this.difficulty = def(difficulty, "easy");
	this.availableTower = def(availableTower,1);
	this.design = design;
	this.phase = "beginning"; // to find if it will be a fight or a contruct phase.
	this.currentWave = new Wave(this.waves[0], this.hero, 1);
	this.hero = new Hero(def(initialHeroLife, 20), def(initialHeroGold, 2000));
};

 
Niveau.prototype.defend = function(){
	this.phase = "defending";
	console.log("phase de défense");
	this.currentWave.totalMonster = 0;
	if(this.waves.length > 0){
		var waveToStart = new Wave(this.waves.pop(), this.hero, 1);
		this.currentWave = waveToStart;
		console.log("Nombre de monstres: " + this.currentWave.totalMonster);
		waveToStart.start();
	}
	else{
		console.log("endOfLevel");
		this.endLevel();
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
	if (this.waves.length === 0 && (niveau1.hero.monsterKilledDuringCurrentWave === niveau1.currentWave.totalMonster)) {
		alert("You won !");
		//Changement d'état, 
		//passage au menu avec le niveau 2 de débloqué 
		//Ou mieux etat de choix dynamique : continuer -> start état lvl2 || menu -> état menu
	}
};