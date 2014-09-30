/*global Monster,Guy,game,pi,cos,sin,floor,def,isDef,rand,inh from utils.js*/
var Wave = function(monstersToCreate, hero, number, entrees) {
    this.monstersToCreate = monstersToCreate;
    this.hero = hero;
    this.entrees = def(entrees, [new Entree(100,-100), new Entree(400,100)]);
    this.number = number;
    this.totalMonster = 0;
    for (var i = monstersToCreate.length - 1; i >= 0; i--) {
		this.totalMonster+=monstersToCreate[i].number;
    }
    this.end = false;
    this.hero = hero;
};

Wave.prototype.popMonster = function(type, life, gold, value, strength, entree){
	var entreeToUse = def(entree, floor(rand(this.entrees.length, 0)));
	var aliveMonster;
	var weigth = 1;//+(number/10);

	if(type === "Guy") {
		aliveMonster = new Guy(this.entrees[entreeToUse].x, this.entrees[entreeToUse].y,life * weigth, gold * weigth, value * weigth, strength, false, this.hero);
	}
	/*
	else if(monsterToCreate.type === "Cow") {
		aliveMonster = new Cow(life * weigth, gold * weigth, value * weigth, strength, entreeToUse); 
	}
	else { //banan ;)
		aliveMonster = new Banan(life * weigth, gold * weigth, value * weigth, strength, entreeToUse);  
	}*/
};

Wave.prototype.monsterTime = function(that){
	var toSummon= that.monstersToCreate.pop();
	game.time.events.repeat(Phaser.Timer.HALF, toSummon.number, that.popMonster, that, toSummon.type,toSummon.life,toSummon.gold, toSummon.weight,toSummon.strength);
	if(that.monstersToCreate.length > 0){
		setTimeout(function(){that.monsterTime(that);}, Phaser.Timer.HALF * toSummon.number);
	}
	else{
		that.end = true;
	}
};


Wave.prototype.start = function(){
	this.monsterTime(this);
};

//To know if the wave has monster to invoke
Wave.prototype.isRunning = function(){
	return (this.monstersToCreate.length > 0);
};

