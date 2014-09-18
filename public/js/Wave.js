/*global Monster,Guy,game,pi,cos,sin,floor,def,isDef,rand,inh from utils.js*/
var Wave = function(monstersToCreate, number, entrees) {
    this.monstersToCreate = monstersToCreate;
    this.entrees = def(entrees, [new Entree(100,100)]);
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

Wave.prototype.popMonster = function(type, life, gold, value, strength, entree){
	var entreeToUse = def(entree, floor(rand(this.entrees.length - 1, 0)));
	var aliveMonster;
	var weigth = 1;//+(number/10);
	
	if(type === "Guy") {
		aliveMonster = new Guy(this.entrees[entreeToUse].x, this.entrees[entreeToUse].y,life * weigth, gold * weigth, value * weigth, strength, false);
	}
	/*
	else if(monsterToCreate.type === "Cow") {
		aliveMonster = new Cow(life * weigth, gold * weigth, value * weigth, strength, entreeToUse); 
	}
	else { //banan ;)
		aliveMonster = new Banan(life * weigth, gold * weigth, value * weigth, strength, entreeToUse);  
	}*/
};

Wave.prototype.monsterTime = function(){
	var toSummon= this.monstersToCreate.pop();
	game.time.events.repeat(Phaser.Timer.HALF, toSummon.number, this.popMonster, this, toSummon.type,toSummon.life,toSummon.gold, toSummon.weight,toSummon.strength);
};


Wave.prototype.start = function(){
	game.time.events.repeat(Phaser.Timer.SECOND*3, this.monstersToCreate.length, this.monsterTime, this);
};


