//design and waves will be arrayObject or json files
//design will have different constructibles types and their initial localisations

var Niveau = function(waves, initialHeroLife, initialGold, difficulty, availableTower, design) {
	this.waves = waves;
	this.totalOfWave = waves.length;
	this.initialHeroLife = def(initialHeroLife, 20);
	this.initialGold = def(initialGold, 2000);
	this.difficulty = def(difficulty, "easy");
	this.availableTower = def(availableTower,1);
	this.design = design;
	this.phase = "beginning";
};

//Sera dans le level1State.js !!! et pas une methode de niveau
//Niveau.prototype.start = function(){
//	var hero = new Hero(this.initialHeroLife, this.initialGold);
//	var currentWave = new Wave(this.waves[0], 1);
	//Find a way to check sprites on screen :
	//Compte des monstres invoqués - compte monstres tués ?
	
//};
Niveau.prototype.checkStage = function(){
	if (this.phase === "fight") {
	}
	else if(this.phase === "fight"){

	}
	else
	{

	}
};