var Saw = function(damage, x, y, orientation, animation) {
    Building.call(this, damage);
    this.bump1 = game.add.audio('bump1');
    this.bump2 = game.add.audio('bump2');
    this.levelMax = 1;

    this.direction = 1;
    if (orientation == 'left') {
        this.direction = -1;
    }
    x=x+this.direction*5;

    this.x = x;
    this.y = y;

    this.heatLimit = 30;
    this.cooldown = 100;
    this.heat = 0;
    this.overHeat = false;
    this.cost = [500, 750];
    this.size = 0.7;

    this.design = game.add.sprite(x, y, 'saw', this.level);
    this.entity = this.design;
    this.design.anchor.setTo(0.5, 0.5);
    this.design.scale.set(this.size);

    game.global.depth[2].add(this.design);
    game.physics.p2.enableBody(this.entity);

    this.entity.body.setCircle(this.size * 40);
    this.entity.body.setCollisionGroup(game.global.playerCollisionGroup);
    this.entity.body.collides(game.global.enemiesCollisionGroup, this.hit, this);
    this.entity.body.collides(game.global.limbsCollisionGroup);

    this.entity.pivotPoint = game.add.sprite(x, y);
    //Physics of the pivot : static, no collision, revolute constraint with upper/lower limit
    game.physics.p2.enable(this.entity.pivotPoint);
    this.entity.pivotPoint.body.static = true;
    this.entity.pivotPoint.body.clearCollision(true, true);
    this.entity.constraint = game.physics.p2.createRevoluteConstraint(this.entity, [0, 0],
        this.entity.pivotPoint, [0, 0]);
    this.entity.constraint.enableMotor();
    this.entity.constraint.setMotorSpeed(this.direction * 5);

    //this.loop = game.time.events.loop(Phaser.Timer.SECOND / 10, this.decreaseHeat, this);
    this.loop = 0;
    this.animation = 0;


    this.allowInput();
};

Saw.inherits(Building);

Saw.prototype.hit = function(bumper, part) {
    //Gestion de collision
    if (part.sprite !== null) {
        var entity = part.sprite.entity;
        if (entity.lastCollision.length === 0 || entity.lastCollision[0] != bumper) {

            if (this.heat < this.heatLimit && !this.overHeat) {
                this.heat += part.sprite.entity.strength;// + this.heat / this.heatLimit * part.sprite.entity.strength;
                if (this.heat > this.heatLimit - 10) {
                    this.heat = this.heatLimit;
                }
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
                    part.sprite.entity.stop();
                    part.velocity.x = -2000 * cos(angle + this.direction * pi / 2);
                    entity.body.velocity.x = -3000 * cos(angle + this.direction * pi / 2);
                    part.velocity.y = -2000 * sin(angle + this.direction * pi / 2);
                    entity.body.velocity.y = -3000 * sin(angle + this.direction * pi / 2);;
                }
            }
        }
    }
    return {};
};

Saw.prototype.update = function() {
    this.loop++;
    this.animation++;
    if (this.loop >= 6) {
        this.decreaseHeat();
        this.loop = 0;
    }
    this.design.body.y = this.y + cos(this.animation / 50) * 50;
    this.entity.pivotPoint.body.y = this.y + cos(this.animation / 50) * 50;
    if (this.animation >= 18000) {
        this.animation = 0;
    }
}

Saw.prototype.decreaseHeat = function() {
    if (this.heat > 0) {
        if (this.animation / 42 === Math.floor(this.animation / 42))
            this.heat--;
        this.design.body.x = this.x + this.direction * this.heat / this.heatLimit * 40;
        this.entity.pivotPoint.body.x = this.x + this.direction * this.heat / this.heatLimit * 40;
    }
};

Saw.prototype.destroy = function() {
    game.global.towers = game.global.towers.remove(this);
    game.time.events.remove(this.loop);
    this.entity.destroy();
    this.design.destroy();
    this.entity = null;
    this.design = null;
};


Saw.prototype.upgrade = function() {
    this.level++;
    this.design.loadTexture('saw', this.level+1);
    //this.heatLimit += 20;
    //this.cooldown -= 5;
    /*this.size *= 1.08;
    this.design.scale.set(this.size);
    this.entity.body.setCircle(this.size * 40);
    this.entity.body.kinematic = true;
    this.entity.body.setCollisionGroup(game.global.playerCollisionGroup);
    this.entity.body.collides(game.global.enemiesCollisionGroup, this.hit, this);
    this.entity.body.collides(game.global.limbsCollisionGroup);*/

    /*switch (this.level) {
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
    }*/
};

Saw.prototype.checkValidity = function(bool) {
    if (bool) {
        this.check = game.add.sprite(this.design.x, this.design.y, 'circle');
        game.global.depth[3].add(this.check);
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

Saw.prototype.disable = function(){
    //this.design.loadTexture('bumperDisable');
    //this.design.scale.set(0.5);
}

Saw.prototype.designCheck = function() {
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

Saw.prototype.restart = function() {
    this.entity.body.setCollisionGroup(game.global.playerCollisionGroup);
    this.entity.constraint.setMotorSpeed(this.direction * 5);
    this.monsterHits = 0;
    if(this.blocker)
        this.blocker.destroy();
}


Saw.prototype.reset = function() {
    this.entity.constraint.setMotorSpeed(0);
    this.heat = 0;
    this.entity.body.setCollisionGroup(game.global.voidCollisionGroup);
    /*this.blocker = game.add.sprite(this.x, this.y);
    game.physics.p2.enableBody(this.blocker,true);
    this.blocker.body.setRectangle(60,200);
    this.blocker.body.static=true;
    this.blocker.body.setCollisionGroup(game.global.playerCollisionGroup);*/
    //this.animation= 0;
    //this.loop = 0;
    this.design.body.x = this.x + this.direction * this.heat / this.heatLimit * 40;
    this.entity.pivotPoint.body.x = this.x + this.direction * this.heat / this.heatLimit * 40;
    if (this.overHeat) {
        game.global.depth[1].remove(this.design);
        game.global.depth[5].add(this.design);
        this.overHeat = false;
        this.entity.body.setCollisionGroup(game.global.playerCollisionGroup);
    }
};


Saw.prototype.findInfos = function() {
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
