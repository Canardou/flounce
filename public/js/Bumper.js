var Bumper = function(damage, x, y) {
    Building.call(this, damage);
    this.bump1 = game.add.audio('bump1');
    this.bump2 = game.add.audio('bump2');
    this.levelMax = 2;

    this.heatLimit = 5;
    this.heat = 0;
    this.overHeat = false;


    this.entity = game.add.sprite(x, y);
    this.design = game.add.sprite(x, y, 'bumper' + this.level, 0);
    this.design.anchor.setTo(0.5, 0.5);
    game.global.depth[5].add(this.design);
    game.physics.p2.enableBody(this.entity);

    this.entity.body.setCircle(20);
    this.entity.body.kinematic = true;
    this.entity.body.setCollisionGroup(game.global.playerCollisionGroup);
    this.entity.body.collides(game.global.enemiesCollisionGroup, this.hit, this);
    this.entity.body.collides(game.global.limbsCollisionGroup);

    game.time.events.loop(Phaser.Timer.SECOND, this.decreaseHeat, this);
};

Bumper.inherits(Building);

Bumper.prototype.hit = function(bumper, part) {
    //Gestion de collision
    if (part.sprite !== null) {
        var entity = part.sprite.entity;
        if (entity.lastCollision.length === 0 || entity.lastCollision[0] != bumper) {

            if (this.heat < this.heatLimit && !this.overHeat) {
                this.heat++;
                if (this.heat > this.heatLimit)
                    this.design.loadTexture('bumper' + this.level, 2);
                else if (this.heat > this.heatLimit / 2)
                    this.design.loadTexture('bumper' + this.level, 1);
                var retour = this.getDamage(bumper, part);
                var angle = Math.atan2(bumper.y - entity.body.y, bumper.x - entity.body.x);
                if (retour.damage !== 0) {
                    //text !
                    this.totalDamage += retour.damage;
                    this.monsterHits++;
                    var combo = entity.combo;
                    if (combo > 0) {
                        var onoma = game.add.text(this.entity.x - 25 * cos(angle), this.entity.y - 25 * sin(angle), 'x' + (combo + 1), {
                            font: '' + (combo * 7 + 20) + 'px "bd_cartoon_shoutregular"',
                            fill: '#A50000'
                        });
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
                    console.log(retour.damage);
                    entity.lastCollision.unshift(bumper);
                    entity.combo++;
                    game.time.events.add(500, function() {
                        if (entity) {
                            entity.lastCollision.pop();
                        }
                    }, this);
                    this.bump1.play();
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
                game.global.depth[5].remove(this.design);
                game.global.depth[1].add(this.design);
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
            game.global.depth[1].remove(this.design);
            game.global.depth[5].add(this.design);
            this.overHeat = false;
            this.entity.body.setCollisionGroup(game.global.playerCollisionGroup);
        }
        if (this.overHeat)
            this.design.loadTexture('bumper' + this.level, 2);
        else if (this.heat > this.heatLimit / 2)
            this.design.loadTexture('bumper' + this.level, 1);
        else
            this.design.loadTexture('bumper' + this.level, 0);
    }
};

Bumper.prototype.destroy = function() {
    this.entity.destroy();
    this.design.destroy();
    this.entity = null;
    this.design = null;
};


Bumper.prototype.upgrade = function() {
    this.level++;
    this.design.loadTexture('bumper' + this.level, 0);
    this.heatLimit += 2;
    switch (this.level) {
        case 1:
            this.damage = {
                base: 10,
                max: 20,
                critMult: 2,
                critOdds: 1
            };
            //default
            break;
        case 2:
            this.damage = {
                base: 15,
                max: 35,
                critMult: 2.5,
                critOdds: 1
            };
            break;
        case 3:
            this.damage = {
                base: 20,
                max: 50,
                critMult: 3,
                critOdds: 1
            };
            break;
    }
};

Bumper.prototype.checkValidity = function(bool) {
    if (bool) {
        this.check = game.add.sprite(this.design.x, this.design.y, 'circle');
        game.global.depth[3].add(this.check);
        this.check.entity = this;
        game.physics.p2.enableBody(this.check);
        this.check.body.clearShapes();
        var sensorShape = this.check.body.addCircle(60);
        sensorShape.sensor=true;
        this.check.body.overlap = 0;
        this.check.body.setCollisionGroup(game.global.enemiesCollisionGroup);
        this.check.body.collides([game.global.playerCollisionGroup,game.global.wallsCollisionGroup]);
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
    this.check.body.reset(this.design.x,this.design.y,true);
    if (this.check.body.overlap > 0) {
        this.valid = false;
        this.design.loadTexture('bumperError');
        this.design.scale.set(0.5, 0.5);
        this.check.tint=0xFFFFFF;
    }
    else {
        this.valid = true;
        this.design.loadTexture('bumper' + this.level, 0);
        this.design.scale.set(1, 1);
        this.check.tint=0x00FFFF;
    }
};
