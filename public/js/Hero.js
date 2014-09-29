var Hero = function(life, gold, power){
	this.life = def(life, 20);
	this.points = 0;
	this.gold = def(gold, 2000);
	this.power = def(power, false);
	this.dead = false;
    this.monsterKilledDuringCurrentWave = 0;
    var heigth = 1000;
    this.entity = game.add.sprite(game.global.width/2, game.global.heigth-(1138-heigth)/2);
    game.physics.p2.enableBody(this.entity,true);
    this.entity.body.setRectangle(640,1138-heigth);
    this.entity.body.setCollisionGroup(game.global.playerCollisionGroup);
    this.entity.body.collides(game.global.enemiesCollisionGroup, this.getHit, this);
    this.entity.renderable=false;
    this.entity.body.static=true;
    console.log("Mon héro : "+this.life+' '+this.gold);
};

Hero.prototype.die = function() {
    this.dead = true;
};

Hero.prototype.getHit = function(hero,monster) {
	if (!this.dead) {
        this.life -= monster.strength;
        if (this.life <= 0) {
            this.life = 0;
            this.die();
        }
        this.gold -= monster.gold;
        if(this.gold < 0){
			this.gold = 0;
        }
    }
    monster.sprite.entity.die();
};

//Use the special power of our hero => just a draft
Hero.prototype.usePower = function(powerName){
	if(this.power && powerName === "HEAL"){
		this.life += 5;
	}
};