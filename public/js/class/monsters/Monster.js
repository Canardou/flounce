/*global game,pi,cos,sin,def,isDef,rand from utils.js*/
var Monster = function(life, gold, value, strength, decay, damage, hero) {
    game.global.monsters.push(this);
    this.life = life;
    this.gold = gold;
    this.value = def(value, 10);
    this.strength = def(strength, 1);
    this.decay = def(decay, true);
    this.damage = def(damage, 1);
    this.dead = false;
    this.isDestroy = false;
    this.parts = [];
    this.constraints = [];
    this.lastCollision = [];
    this.body = null;
    this.combo = 0;
    this.hero = hero;

    this.comboCounter = 0;

    game.time.events.loop(Phaser.Timer.SECOND / 10, this.stopComobo, this);
};

Monster.prototype.stopComobo = function() {
    if (!this.dead) {
        if (this.comboCounter > 0) {
            this.comboCounter--;
            if (this.comboCounter <= 0) {
                this.combo = 0;
            }
        }
    }
}

Monster.prototype.stop = function() {
    for (var item in this.parts) {
        //this.parts[item].body.collideWorldBounds=true;
        this.parts[item].body.velocity.y = 0;
        this.parts[item].body.velocity.x = 0;
    }
}

//When a monster is killed
Monster.prototype.die = function() {
    this.dead = true;
    this.playSound();
    if (this.isDestroy === false) {
        this.hero.monsterKilledDuringCurrentWave++;
        this.hero.changeGold(this.gold);
        this.hero.changePoints(this.value * this.combo);
        this.destroy();
    }

};

//When a monster touch the hero
Monster.prototype.dieWithoutGlory = function() {
    this.dead = true;
    if (this.isDestroy === false) {
        this.destroy();
        this.hero.monsterKilledDuringCurrentWave++;
    }

};

Monster.prototype.playSound = function() {};

Monster.prototype.getHit = function(damage) {
    if (!this.dead) {
        this.life -= damage;
        if (this.life <= 0) {
            this.dead = true;
            this.life = 0;
            this.die();
        }
    }
};

Monster.prototype.destroy = function() {
    if (!this.isDestroy) {
        var destroy =  function() {
                this.destroy();
            };
        for (var item in this.constraints)
            game.physics.p2.removeConstraint(this.constraints[item]);
        for (var item in this.parts) {
            var that = this.parts[item];

            //Remove parent class
            that.entity = null;

            that.body.setCollisionGroup(game.global.limbsCollisionGroup);
            that.body.collides([game.global.wallsCollisionGroup, game.global.playerCollisionGroup]);
            that.body.collideWorldBounds = false;
            that.checkWorldBounds = true;

            /*that.events.onOutOfBounds.add(function() {
                if (that) {
                    that.destroy();
                }
            }, this); //Sprite must be dead before destroying it, so we must check*/
            //Remove out of bounds parts
            that.outOfBoundsKill = true;
            //Make the parts disapear after 5 seconds, exponential fade out : slow at start
            that.tween = game.add.tween(this.parts[item]).to({
                alpha: 0
            }, 5000, Phaser.Easing.Exponential.In, true, 0, false).onComplete.add(destroy, that);
        }

        this.constraints = [];
        this.parts = [];
        this.entity = null;
        this.isDestroy = true;
        this.body = null;
        game.global.monsters = game.global.monsters.remove(this);
    }
};

Monster.prototype.updateCollision = function() {
    for (var item in this.parts) {
        //this.parts[item].body.collideWorldBounds=true;
        this.parts[item].body.setCollisionGroup(game.global.enemiesCollisionGroup);
        this.parts[item].body.collides([game.global.enemiesCollisionGroup, game.global.wallsCollisionGroup, game.global.playerCollisionGroup]);
    }
};
