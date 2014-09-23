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
	this.phase = "beginning"; // to find if it will be a fight or a contruct phase.
};

 
Niveau.prototype.defend = function(){
	this.phase = "defending";
	if(this.waves.length > 0){
		var waveToStart = new Wave(this.waves.pop(), 1);
		waveToStart.start();
	}
	else{
		this.endLevel();
	}
};

//When every monster have been killed
Niveau.prototype.contruct = function(){
	this.phase = "constructing";
	//Show all the consruction panel
};

Niveau.prototype.endLevel = function(){
	if (this.waves.length > 0 && this.enemiesAllDead === true) {
		alert("You won !");
	}
};