var Hero = function(life, gold, power){
	this.life = def(life, 12);
	this.points = 0;
	this.gold = def(gold, 1000);
	this.power = def(power, false);
	this.dead = false;
    this.monsterKilledDuringCurrentWave = 0;
};

Hero.prototype.die = function() {
    this.dead = true;
};

Hero.prototype.getHit = function(monster) {
	if (!this.dead) {
        this.life -= monster.strength;
        if(this.gold > monster.gold){
			this.gold -= monster.gold;
        }
        else {
			this.gold = 0;
        }
        
        if (this.life <= 0) {
            this.life = 0;
            this.die();
        }
    }
    monster.destroy();
};

//Use the special power of our hero => just a draft
Hero.prototype.usePower = function(powerName){
	if(this.power && powerName === "HEAL"){
		this.life += 5;
	}
};