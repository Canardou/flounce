var Bumper = function(damage, x, y) {
    Building.call(this, damage);

    this.type = 1;

    this.heatLimit = 10;
    this.heat = 0;
    this.overHeat = false;

    this.entity = game.add.sprite(x, y);
    this.design = game.add.sprite(x, y, 'bumper'+this.type, 0);
    this.design.anchor.setTo(0.5, 0.5);
    this.design.bringToTop();
    game.physics.p2.enableBody(this.entity);

    this.entity.body.setCircle(20);
    this.entity.body.static = true;
    this.entity.body.setCollisionGroup(game.global.playerCollisionGroup);
    this.entity.body.collides(game.global.enemiesCollisionGroup, this.hit, this);
    this.entity.body.collides(game.global.limbsCollisionGroup);

    game.time.events.loop(Phaser.Timer.SECOND, this.decreaseHeat, this);
};

Bumper.prototype.hit = function(bumper, part) {
    //Gestion de collision
    if (part.sprite !== null) {
        var entity = part.sprite.entity;
        if (entity.lastCollision != bumper) {
            if (this.heat < this.heatLimit && !this.overHeat) {
                this.heat++;
                if (this.heat >= this.heatLimit)
                    this.design.loadTexture('bumper'+this.type, 2);
                else if (this.heat > this.heatLimit / 2)
                    this.design.loadTexture('bumper'+this.type, 1);
                var retour = this.getDamage(bumper, part);
                if (retour.damage != 0) {
                    console.log(retour.damage);
                    entity.lastCollision = bumper;
                    entity.nextDamage = new Phaser.Timer(game);
                    entity.nextDamage.add(200, function() {
                        entity.lastCollision = null;
                    }, this);
                    entity.nextDamage.start();
                    entity.getHit(retour.damage); //DAMAGE!
                    return retour;
                }
                var angle = Math.atan2(bumper.y - entity.body.y, bumper.x - entity.body.x);
                console.log(angle);
                part.velocity.x = -2000 * cos(angle);
                part.velocity.y = -2000 * sin(angle);
                entity.body.velocity.x = -3000 * cos(angle);
                entity.body.velocity.y = -3000 * sin(angle);
                this.design.x = this.entity.x + 5 * cos(angle);
                this.design.y = this.entity.y + 5 * sin(angle);
                var tween = game.add.tween(this.design);
                tween.to({
                    x: this.entity.x,
                    y: this.entity.y
                }, 100, Phaser.Easing.Linear.None, true, 0, false);
            }
            else if (this.overHeat == false) {
                this.overHeat = true;
            }
        }
    }
    return {};
};

Bumper.prototype.decreaseHeat = function() {
    if (this.heat > 0) {
        this.heat--;
        if (this.heat <= 0) {
            this.overHeat = false;
        }
        if (this.overHeat)
            this.design.loadTexture('bumper'+this.type, 2);
        else if (this.heat > this.heatLimit / 2)
            this.design.loadTexture('bumper'+this.type, 1);
        else
            this.design.loadTexture('bumper'+this.type, 0);
    }
};

inh(Bumper, Building);