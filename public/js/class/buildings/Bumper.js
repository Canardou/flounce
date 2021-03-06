/**
 * Bumper class
 */

var Bumper = function(x, y) {
    Building.call(this);
    this.bump1 = game.add.audio('bump1');
    this.bump2 = game.add.audio('bump2');
    this.levelMax = 3;

    this.heatLimit = 20;
    this.cooldown = 120;
    this.heat = 0;
    this.overHeat = false;
    this.cost = [300, 325, 350, 375];
    this.size = 0.5;
    this.damage.base = 10;
    this.damage.max = 20;

    this.entity = game.add.sprite(x, y);
    this.design = game.add.sprite(x, y, 'bumper' + this.level, 0);
    this.design.scale.set(this.size);
    this.design.anchor.setTo(0.5, 0.5);
    game.global.depth[17].add(this.design);
    game.physics.p2.enableBody(this.entity);

    this.entity.body.setCircle(this.size * 40);
    this.entity.body.kinematic = true;
    this.entity.body.setCollisionGroup(game.global.playerCollisionGroup);
    this.entity.body.collides(game.global.enemiesCollisionGroup, this.hit, this);
    this.entity.body.collides(game.global.limbsCollisionGroup);

    //this.loop = game.time.events.loop(Phaser.Timer.SECOND / 10, this.decreaseHeat, this);
    this.loop = 0;

    this.allowInput();
};

Bumper.inherits(Building);

Bumper.prototype.hit = function(bumper, part) {
    //Gestion de collision
    if (part.sprite !== null) {
        var entity = part.sprite.entity;
        if (entity.lastCollision.length === 0 || entity.lastCollision[0] != bumper) {

            if (this.heat < this.heatLimit && !this.overHeat) {
                this.heat += part.sprite.entity.strength;
                if (this.heat > this.heatLimit - 10) {
                    this.design.loadTexture('bumper' + this.level, 2);
                    game.global.depth[17].remove(this.design);
                    game.global.depth[1].add(this.design);
                    this.overHeat = true;
                    this.heat = this.cooldown;
                    this.entity.body.setCollisionGroup(game.global.voidCollisionGroup);
                }
                else if (this.heat > this.heatLimit / 2 - 10 && this.heat != 0)
                    this.design.loadTexture('bumper' + this.level, 1);
                var retour = this.getDamage(bumper, part);
                var angle = Math.atan2(bumper.y - entity.body.y, bumper.x - entity.body.x);
                if (retour.damage !== 0) {
                    //text !
                    this.totalDamage += retour.damage;
                    this.monsterHits++;
                    this.monsterHitsTotal++;
                    var combo = entity.combo;
                    if (combo > 0) {
                        var onoma = game.add.text(this.entity.x - 25 * cos(angle), this.entity.y - 25 * sin(angle), 'x' + (combo + 1), {
                            font: '' + (combo * 7 + 20) + 'px "bd_cartoon_shoutregular"',
                            fill: '#A50000'
                        });
                        game.global.currentLevel.hero.changePoints((combo + 1) * 10);
                        onoma.anchor.set(0.5);
                        onoma.tween = game.add.tween(onoma);
                        onoma.tween2 = game.add.tween(onoma);
                        onoma.tween.to({
                            angle: 10
                        }, 500);
                        onoma.tween2.to({
                            angle: -20,
                            alpha: 0
                        }, 500);
                        onoma.tween.chain(onoma.tween2);
                        onoma.tween2.onComplete.add(function() {
                            onoma.destroy();
                        });
                        onoma.tween.start();
                    }
                    entity.lastCollision.unshift(bumper);
                    entity.combo++;
                    entity.comboCounter = 20;
                    game.time.events.add(500, function() {
                        if (entity) {
                            entity.lastCollision.pop();
                        }
                    }, this);
                    this.bump1.play();
                    entity.getHit(retour.damage); //DAMAGE!
                }

                if (entity.life > 0) {
                    part.sprite.entity.stop(-700 * cos(angle), -700 * sin(angle));
                }
                this.design.x = this.entity.x + 5 * cos(angle);
                this.design.y = this.entity.y + 5 * sin(angle);
                var tween = game.add.tween(this.design);
                tween.to({
                    x: this.entity.x,
                    y: this.entity.y
                }, 100, Phaser.Easing.Linear.None, true, 0, false);
            }
        }
    }
    return {};
};

Bumper.prototype.disable = function() {
    this.design.loadTexture('bumperDisable');
    this.design.scale.set(0.5);
}


Bumper.prototype.update = function() {
    this.loop++;
    if (this.loop >= 6) {
        this.decreaseHeat();
        this.loop = 0;
    }
}

Bumper.prototype.decreaseHeat = function() {
    if (this.heat > 0) {
        this.heat--;
        if (this.heat <= 0 && this.overHeat) {
            game.global.depth[1].remove(this.design);
            game.global.depth[17].add(this.design);
            this.overHeat = false;
            this.entity.body.setCollisionGroup(game.global.playerCollisionGroup);
        }
        if (this.overHeat)
            this.design.loadTexture('bumper' + this.level, 2);
        else if (this.heat > this.heatLimit / 2 - 10 && this.heat != 0)
            this.design.loadTexture('bumper' + this.level, 1);
        else
            this.design.loadTexture('bumper' + this.level, 0);
    }
};

Bumper.prototype.destroy = function() {
    game.global.towers = game.global.towers.remove(this);
    game.time.events.remove(this.loop);
    this.entity.destroy();
    this.design.destroy();
    this.entity = null;
    this.design = null;
};


Bumper.prototype.upgrade = function() {
    this.level++;
    this.design.loadTexture('bumper' + this.level, 0);
    this.heatLimit += 20;
    this.cooldown -= 10;
    this.size *= 1.08;
    this.design.scale.set(this.size);
    this.entity.body.setCircle(this.size * 40);
    this.entity.body.kinematic = true;
    this.entity.body.setCollisionGroup(game.global.playerCollisionGroup);
    this.entity.body.collides(game.global.enemiesCollisionGroup, this.hit, this);
    this.entity.body.collides(game.global.limbsCollisionGroup);

    switch (this.level) {
        case 1:
            this.damage = {
                base: 13,
                max: 21
            };
            //default
            break;
        case 2:
            this.damage = {
                base: 17,
                max: 23
            };
            break;
        case 3:
            this.damage = {
                base: 22,
                max: 26
            };
            break;
    }
};

Bumper.prototype.checkValidity = function(bool) {
    if (bool) {
        this.check = game.add.sprite(this.design.x, this.design.y, 'circle');
        game.global.depth[16].add(this.check);
        this.check.entity = this;
        game.physics.p2.enableBody(this.check);
        this.check.body.clearShapes();
        var sensorShape = this.check.body.addCircle(60);
        sensorShape.sensor = true;
        this.check.body.gravityScale = 0;
        this.check.body.overlap = 0;
        this.check.body.setCollisionGroup(game.global.enemiesCollisionGroup);
        this.check.body.collides([game.global.playerCollisionGroup, game.global.wallsCollisionGroup]);
        game.global.sensors.push(this.check.body);
        this.check.event = game.time.events.loop(50, function() {
            this.designCheck();
            //this.check.body.angularVelocity = 1;
        }, this);
    }
    else {
        game.time.events.remove(this.check.event);
        this.check.entity = null;
        this.check.destroy();
    }
};

Bumper.prototype.designCheck = function() {
    this.check.body.reset(this.design.x, this.design.y, true);
    if (this.check.body.overlap > 0) {
        this.valid = false;
        this.design.loadTexture('bumperError');
        this.design.scale.set(this.size);
        this.check.tint = 0xFFFFFF;
    }
    else {
        this.valid = true;
        this.design.loadTexture('bumper' + this.level, 0);
        this.design.scale.set(this.size);
        this.check.tint = 0x00FFFF;
    }
};

Bumper.prototype.reset = function() {
    this.heat = 0;
    if (this.overHeat) {
        game.global.depth[1].remove(this.design);
        game.global.depth[5].add(this.design);
        this.overHeat = false;
        this.entity.body.setCollisionGroup(game.global.playerCollisionGroup);
    }
    this.design.loadTexture('bumper' + this.level, 0);
};


Bumper.prototype.findInfos = function() {
    var infos = {
        name: '',
        description: ''
    };
    switch (this.level) {
        case 0:
            infos.name = 'Tiny Bumper (base)';
            infos.description += 'Nice castle decoration';
            break;
        case 1:
            infos.name += 'Classic Bumper (lvl 1)';
            infos.description += 'Simple bumper that kills guys';
            break;
        case 2:
            infos.name += 'Double Whoomper (lvl 2)';
            infos.description += 'Well, the same but in different';
            break;
        case 3:
            infos.name += 'Doomper (lvl 3)';
            infos.description += 'BOUUUM !';
            break;
    }
    infos.description += '\nDamage: ' + this.damage.base + '-' + this.damage.max +
        '\nHeat limit: ' + this.heatLimit +
        '\nCooldown: ' + this.cooldown;

    return infos;
};
