var Bumper = function(damage, x, y) {
    Building.call(this, damage);

    this.type = 1;

    this.heatLimit = 5;
    this.heat = 0;
    this.overHeat = false;

    this.entity = game.add.sprite(x, y);
    this.design = game.add.sprite(x, y, 'bumper' + this.type, 0);
    this.design.anchor.setTo(0.5, 0.5);
    game.physics.p2.enableBody(this.entity);

    this.entity.body.setCircle(20);
    this.entity.body.kinematic = true;
    this.entity.body.setCollisionGroup(game.global.playerCollisionGroup);
    this.entity.body.collides(game.global.enemiesCollisionGroup, this.hit, this);
    this.entity.body.collides(game.global.limbsCollisionGroup);

    game.time.events.loop(Phaser.Timer.SECOND, this.decreaseHeat, this);
};

Bumper.prototype.hit = function(bumper, part) {
    //Gestion de collision
    if (part.sprite !== null) {
        var entity = part.sprite.entity;
        if (entity.lastCollision.length === 0 || entity.lastCollision[0] != bumper) {

            if (this.heat < this.heatLimit && !this.overHeat) {
                this.heat++;
                if (this.heat >= this.heatLimit)
                    this.design.loadTexture('bumper' + this.type, 2);
                else if (this.heat > this.heatLimit / 2)
                    this.design.loadTexture('bumper' + this.type, 1);
                var retour = this.getDamage(bumper, part);
                var angle = Math.atan2(bumper.y - entity.body.y, bumper.x - entity.body.x);
                if (retour.damage !== 0) {
                    //text !
                    var combo = entity.combo;
                    if (combo > 0) {
                        var onoma = game.add.text(this.entity.x - 25 * cos(angle), this.entity.y - 25 * sin(angle), 'x' + (combo+1), {
                            font: ''+(combo*7+20)+'px "bd_cartoon_shoutregular"',
                            fill: '#A50000'
                        });
                        onoma.anchor.set(0.5);
                        onoma.tween = game.add.tween(onoma);
                        onoma.tween.to({
                            angle: 10
                        }, 1000, Phaser.Easing.Linear.None, true, 0, false);
                        onoma.tween.onComplete.add(function() {
                            onoma.destroy();
                        });
                    }
                    console.log(retour.damage);
                    entity.lastCollision.unshift(bumper);
                    entity.combo++;
                    game.time.events.add(500, function() {
                        if (entity) {
                            entity.lastCollision.pop();
                        }
                    }, this);
                    game.time.events.add(1000, function() {
                        if (entity) {
                            entity.combo--;
                        }
                    }, this);
                    entity.getHit(retour.damage); //DAMAGE!
                }

                if (entity.life > 0) {
                    part.velocity.x = -2000 * cos(angle);
                    part.velocity.y = -2000 * sin(angle);
                    entity.body.velocity.x = -3000 * cos(angle);
                    entity.body.velocity.y = -3000 * sin(angle);
                }
                this.design.x = this.entity.x + 5 * cos(angle);
                this.design.y = this.entity.y + 5 * sin(angle);
                var tween = game.add.tween(this.design);
                tween.to({
                    x: this.entity.x,
                    y: this.entity.y
                }, 100, Phaser.Easing.Linear.None, true, 0, false);
            }
            else if (this.overHeat === false) {
                this.overHeat = true;
                this.entity.body.setCollisionGroup(game.global.voidCollisionGroup);
            }
        }
    }
    return {};
};

Bumper.prototype.decreaseHeat = function() {
    if (this.heat > 0) {
        this.heat--;
        if (this.heat <= 0 && this.overHeat) {
            this.overHeat = false;
            this.entity.body.setCollisionGroup(game.global.playerCollisionGroup);
        }
        if (this.overHeat)
            this.design.loadTexture('bumper' + this.type, 2);
        else if (this.heat > this.heatLimit / 2)
            this.design.loadTexture('bumper' + this.type, 1);
        else
            this.design.loadTexture('bumper' + this.type, 0);
    }
};

Bumper.prototype.destroy = function() {
    this.entity.destroy();
    this.design.destroy();
}

inh(Bumper, Building);