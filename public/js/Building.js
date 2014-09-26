//var test=new Building({base:50,max:150});
var Building = function(damage, limit) {
    this.design;
    this.entity;
    this.threshold = def(limit, true);
    this.damage = {
        base: def(damage.base, 0),
        max: def(damage.max, 0),
        critMult: def(damage.critMult, 2),
        critOdds: def(damage.critOdds, 1)
    };
};

Building.prototype.getDamage = function(body1, body2) {
    var bonus = floor(body2.velocity.x * body2.velocity.x) + Math.abs(body2.velocity.y * body2.velocity.y);
    if (bonus > 250000 || !this.threshold) {
        bonus = Math.log(bonus);
        bonus /= 12.4;
        if (rand(100, 0) < this.damage.critOdds)
            return {
                damage: floor(bonus * this.damage.max * rand(this.damage.critMult, 1)),
                crit: true
            };
        else
            return {
                damage: floor(bonus * rand(this.damage.max, this.damage.base)),
                crit: false
            };
    }
    else
        return {
            damage: 0
        };
}

Building.prototype.hit = function(building, enemy) {
    //Gestion de collision
    if (enemy.sprite !== null) {
        var entity = enemy.sprite.entity;
        if (entity.lastCollision != building) {
            var retour = this.getDamage(building, enemy);
            if (retour.damage != 0) {
                console.log(retour.damage);
                entity.lastCollision = building;
                entity.nextDamage = new Phaser.Timer(game);
                entity.nextDamage.add(200, function() {
                    entity.lastCollision = null;
                }, this);
                entity.nextDamage.start();
                entity.getHit(retour.damage); //DAMAGE!
                return retour;
            }
        }
    }
    return {};
};

Building.prototype.allowDrag = function() {
    this.design.inputEnabled = true;
    this.design.input.enableDrag(true);
    this.design.events.onDragStart.add(this.onDragStart, this);
    this.design.events.onDragStop.add(this.onDragStop, this);
};

Building.prototype.onDragStart = function(sprite, pointer) {
    //Empty for the moment
};

Building.prototype.onDragStop = function(sprite, pointer) {
    this.design.x=pointer.x;
    this.design.y=pointer.y;
    this.entity.body.x=pointer.x;
    this.entity.body.y=pointer.y;
};