var Wave = function(monstersToCreate, number, entrees) {
    this.monstersToCreate = monstersToCreate;
    this.entrees = entrees;
    this.number = number;
};

Wave.prototype.isEmpty = function() {
	if(this.monstersToCreate.length > 0){
		return false;
	}
    else{
        return true;
    }
};

Wave.prototype.popMonster = function(entree){
	var aliveMonster;
	var weigth = 1;//+(number/10);
	
	var monsterToCreate = monstersToCreate.pop();
	if(monsterToCreate.type === "Guy") {
		aliveMonster = new Guy(monsterToCreate.life * weigth, monsterToCreate.gold * weigth, monsterToCreate.value * weigth, monsterToCreate.strength, entree); 
	}
	else if(monsterToCreate.type === "Cow") {
		aliveMonster = new Cow(monsterToCreate.life * weigth, monsterToCreate.gold * weigth, monsterToCreate.value * weigth, monsterToCreate.strength, entree); 
	}
	else { //banan ;)
		aliveMonster = new Banan(monsterToCreate.life * weigth, monsterToCreate.gold * weigth, monsterToCreate.value * weigth, monsterToCreate.strength, entree); 
	}
};