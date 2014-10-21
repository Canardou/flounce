/*global Monster,game,pi,cos,sin,def,isDef,rand,inh from utils.js*/
var Rubick = function(x, y, life, gold, value, strength, decay, damage, hero, vx, vy, variation) {
    Monster.call(this, life, gold, value, strength, decay, damage, hero);
    this.variation = def(variation, 0);
    this.lifeMax = life;
    this.gold = gold;
    this.strength = strength;
    this.decay = decay;
    this.damage = damage;
    this.hero = hero;

    if (variation == 2) {
        var chest = game.add.sprite(x, y, 'rubick', Math.floor(Math.random() * 2));
        this.parts.push(chest);
        chest.scale.set(0.3);
        game.physics.p2.enableBody(chest);
        chest.body.setRectangle(30, 30);
        //chest.body.clearShapes();
        //chest.body.loadPolygon('paddle_physics', 'rubick');
        this.body = chest.body;
        this.body.mass = 15;
        this.body.velocity.x = def(vx, Math.random() * 200 - 100);
        this.body.velocity.y = -def(vy, Math.random() * 100);
        chest.entity = this;
        game.global.depth[1].add(chest);
    }
    else if (variation == 1) {
        var chest = game.add.sprite(x, y, 'rubick', Math.floor(Math.random() * 2));
        this.parts.push(chest);
        chest.scale.set(0.4);
        game.physics.p2.enableBody(chest);
        chest.body.setRectangle(45, 45);
        //chest.body.clearShapes();
        //chest.body.loadPolygon('paddle_physics', 'rubick');
        this.body = chest.body;
        this.body.mass = 20;
        this.body.velocity.x = def(vx, Math.random() * 200 - 100);
        this.body.velocity.y = -def(vy, Math.random() * 100);
        chest.entity = this;
        game.global.depth[1].add(chest);
    }
    else {
        var chest = game.add.sprite(x, y, 'rubick', Math.floor(Math.random() * 2));
        this.parts.push(chest);
        chest.scale.set(0.5);
        game.physics.p2.enableBody(chest);
        chest.body.clearShapes();
        chest.body.loadPolygon('paddle_physics', 'rubick');
        this.body = chest.body;
        this.body.mass = 25;
        this.body.velocity.x = def(vx, Math.random() * 200 - 100);
        this.body.velocity.y = -def(vy, Math.random() * 100);
        chest.entity = this;
        game.global.depth[1].add(chest);
    }

    this.updateCollision();
};

inh(Rubick, Monster);

Rubick.prototype.getHit = function(damage) {
    if (!this.dead) {
        this.life -= damage;
        if (this.life > 10)
            this.parts[0].loadTexture('rubick', Math.floor(Math.floor(Math.random() * 2) + ((this.lifeMax - this.life) / this.lifeMax * 8)));
        else
            this.parts[0].loadTexture('rubick', 9);
        if (this.life <= 0) {
            this.dead = true;
            this.life = 0;
            this.die();
        }
    }
};

Rubick.prototype.destroy = function(hero) {

    if (!this.isDestroy) {
        this.isDestroy = true;
        this.body.setCollisionGroup(game.global.limbsCollisionGroup);
        this.body.collides([game.global.wallsCollisionGroup, game.global.playerCollisionGroup]);
        this.body.collideWorldBounds = false;
        this.parts[0].checkWorldBounds = true;
        this.parts[0].entity = null;
        for (var i = 0; i < (this.variation + 1) * 4; i++) {
            var part = game.add.sprite(this.parts[0].x, this.parts[0].y, 'rubick_parts', Math.floor(Math.random() * 6));
            game.global.depth[1].add(part);
            part.scale.set(1.5 / (this.variation + 2));
            game.physics.p2.enableBody(part);
            part.body.setCollisionGroup(game.global.limbsCollisionGroup);
            part.body.collides([game.global.wallsCollisionGroup, game.global.playerCollisionGroup]);
            part.body.collideWorldBounds = false;
            part.body.velocity.x = this.parts[0].body.velocity.x + Math.random() * 200 - 100;
            part.body.velocity.y = this.parts[0].body.velocity.y + Math.random() * 200 - 100;
            var that = part;
            part.tween = game.add.tween(part).to({
                alpha: 0
            }, 5000, Phaser.Easing.Exponential.In, true, 0, false).onComplete.add(function() {
                this.destroy();
            }, that);
        }
        if (this.variation < 2 && !hero) {

            for (var i = 0; i < 4; i++) {
                game.global.monsters.push(new Rubick(this.parts[0].x, this.parts[0].y, Math.floor(this.lifeMax / 2), Math.floor(this.gold / 4), Math.floor(this.value / 2), Math.floor(this.strength / 2), this.decay, Math.max(Math.floor(this.damage / 4),1), this.hero, Math.random() * 200 - 100, Math.random() * 200 - 100, this.variation + 1))
            }
        }
        this.parts[0].destroy();


        this.constraints = [];
        this.parts = [];
        this.entity = null;

        this.body = null;
        game.global.monsters = game.global.monsters.remove(this);

    }
};