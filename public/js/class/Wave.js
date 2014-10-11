/*global Monster,Guy,game,pi,cos,sin,floor,def,isDef,rand,inh from utils.js*/
var Wave = function(monstersToCreate, hero, number, entrees) {
    this.monstersToCreate = monstersToCreate;
    this.hero = hero;
    this.entrees = def(entrees, [new Entree(100, -100), new Entree(400, -100)]);
    this.number = number;
    this.totalMonster = 0;
    for (var i = monstersToCreate.length - 1; i >= 0; i--) {
		this.totalMonster+=monstersToCreate[i].number;
    }
    this.end = false;
    this.hero = hero;
};

Wave.prototype.popMonster = function(type, life, gold, value, strength, damage, entree){
	var entreeToUse;
	if(entree === 'all')
	{
		entreeToUse = floor(rand(this.entrees.length, 0));
	}
	else{
		entreeToUse = entree;
	}

	
	var aliveMonster;
	var weigth = 1;//+(this.number/10);
	if(type === "Guy") {
		aliveMonster = new Guy(this.entrees[entreeToUse].x, this.entrees[entreeToUse].y,life * weigth, gold * weigth, value * weigth, strength, false, damage, this.hero);
	}
	else if(type === "Skeleton") {
		aliveMonster = new Skeleton(this.entrees[entreeToUse].x, this.entrees[entreeToUse].y,life * weigth, gold * weigth, value * weigth, strength, false, damage, this.hero);
	}
	else if(type === "Break") {
	}
	/*else { //banan ;)
		aliveMonster = new Banan(life * weigth, gold * weigth, value * weigth, strength, entreeToUse);  
	}*/
};

Wave.prototype.monsterTime = function(that){
	var toSummon = that.monstersToCreate.pop();
	game.time.events.repeat(Phaser.Timer.HALF, toSummon.number, that.popMonster, that, toSummon.type,toSummon.life,toSummon.gold, toSummon.value,toSummon.strength,toSummon.damage, toSummon.entry);
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

//To know if the wave has still monster to invoke
Wave.prototype.isRunning = function(){
	return (this.monstersToCreate.length > 0);
};

