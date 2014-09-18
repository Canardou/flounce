var Niveau = function(numberOfWave, initialHeroLife, initialGold, difficulty, availableTower, design) {
	this.numberOfWave = numberOfWave;
	this.initialHeroLife = def(initialHeroLife, 20);
	this.initialGold = def(initialGold, 2000);
	this.difficulty = def(difficulty, "easy");
	this.availableTower = def(availableTower,1);
	this.design = design;
    
};