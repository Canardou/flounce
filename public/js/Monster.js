/*global game,pi,cos,sin,def,isDef,rand from utils.js*/
var Monster = function(life, gold, value, strength, decay, hero) {
    this.life = life;
    this.gold = gold;
    this.value = def(value, 0);
    this.strength = def(strength, 1);
    this.decay = def(decay, true);
    this.dead = false;
    this.isDestroy = false;
    this.parts = [];
    this.constraints = [];
    this.lastCollision = null;
    this.hero = hero;
};

Monster.prototype.die = function() {
    this.dead = true;
    if (this.isDestroy === false){
        this.destroy();
        this.hero.monsterKilledDuringCurrentWave++;
        this.hero.gold += this.gold;
        this.hero.point += this.value;
    }
        
};

Monster.prototype.getHit = function(damage) {
    if (!this.dead) {
        this.life -= damage;
        if (this.life <= 0) {
            this.dead=true;
            this.life = 0;
            this.die();
        }
    }
};

Monster.prototype.destroy = function() {
    if (!this.isDestroy) {
        for (var item in this.constraints)
            game.physics.p2.removeConstraint(this.constraints[item]);
        for (var item in this.parts){
            this.parts[item].body.setCollisionGroup(game.global.limbsCollisionGroup);
            this.parts[item].body.collides([game.global.wallsCollisionGroup, game.global.playerCollisionGroup]);
            this.parts[item].body.collideWorldBounds=false;
            this.parts[item].checkWorldBounds=true;
            var that = this.parts[item];
            this.parts[item].events.onOutOfBounds.add(function(){if(!that.alive)that.destroy();},this);//Sprite must be dead before destroying it
            this.parts[item].outOfBoundsKill=true;
        }
        this.constraints=[];
        this.parts=[];
        this.isDestroy = true;
    }
};

Monster.prototype.updateCollision = function() {
    for (var item in this.parts) {
        this.parts[item].body.collideWorldBounds=false;
        this.parts[item].body.setCollisionGroup(game.global.enemiesCollisionGroup);
        this.parts[item].body.collides([game.global.enemiesCollisionGroup, game.global.wallsCollisionGroup, game.global.playerCollisionGroup]);
    }
};
