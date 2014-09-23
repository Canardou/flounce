/*global game,pi,cos,sin,def,isDef,rand from utils.js*/
var Monster = function(life, gold, value, strength, decay) {
    this.life = life;
    this.gold = gold;
    this.value = def(value, 0);
    this.strength = def(strength, 1);
    this.decay = def(decay, true);
    this.dead = false;
    this.isDestroy = false;
    this.parts = game.add.group();
    this.constraints = [];
};

Monster.prototype.die = function() {
    this.dead = true;
};

Monster.prototype.getHit = function(damage) {
    if (!this.dead) {
        this.life -= damage;
        if (this.life <= 0) {
            this.life = 0;
            this.die();
            this.parts.forEach(function(part) {
                part.die();
            });
        }
    }
};

Monster.prototype.destroy = function() {
    if (!this.isDestroy) {
        this.isDestroy = true;
        this.parts.forEach(function(part) {
            if (part !== undefined) {
                /*if (part.revolute)
                    game.physics.p2.removeConstraint(part.revolute);
                if (part.rotation)
                    game.physics.p2.removeSpring(part.rotation);*/
                //part.body.destroy();
                //part.kill();
            }
        },this);
    }
};

Monster.prototype.updateCollision = function() {
    this.parts.forEach(function(item) {
        item.body.setCollisionGroup(game.global.enemiesCollisionGroup);
        item.body.collides([game.global.enemiesCollisionGroup, game.global.wallsCollisionGroup, game.global.playerCollisionGroup]);
    })
}
