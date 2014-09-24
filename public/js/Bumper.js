var Bumper = function(damage, x, y) {
    Building.call(this, damage);

    this.entity = game.add.sprite(x, y, 'guy_limb');
    game.physics.p2.enableBody(this.entity,true);
    
    this.entity.body.setCircle(20);
    this.entity.body.static=true;
    this.entity.body.setCollisionGroup(game.global.playerCollisionGroup);
    this.entity.body.collides(game.global.enemiesCollisionGroup, this.hit, this);
    this.entity.body.collides(game.global.limbsCollisionGroup);
};

Bumper.prototype.hit = function(bumper, part) {
    //Gestion de collision
    if (part.sprite !== null) {
        var entity = part.sprite.entity;
        if (entity.lastCollision != bumper) {
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
            var angle = Math.atan2(bumper.y-entity.body.y, bumper.x-entity.body.x);
            console.log(angle);
            part.velocity.x=-2000*cos(angle);
            part.velocity.y=-2000*sin(angle);
            entity.body.velocity.x=-3000*cos(angle);
            entity.body.velocity.y=-3000*sin(angle);
        }
    }
    return {};
};

inh(Bumper,Building);