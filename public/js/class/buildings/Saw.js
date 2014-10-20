var Saw = function(damage, x, y, orientation, real) {
    Building.call(this, damage);
    this.bump1 = game.add.audio('bump1');
    this.bump2 = game.add.audio('bump2');
    this.levelMax = 1;
    this.damage = {
        base: 15,
        max: 20,
        critMult: def(damage.critMult, 2),
        critOdds: def(damage.critOdds, 0)
    };
    
    

    this.direction = 1;
    if (orientation == 'left') {
        this.direction = -1;
    }
    //x=x+this.direction*5;

    this.x = x;
    this.y = y;

    this.heatLimit = 40;
    this.heat = 0;
    this.overHeat = false;
    this.cost = [500, 600];
    this.size = 0.7;

    this.design = game.add.sprite(x, y, 'saw', this.level + 1);
    this.entity = this.design;
    this.design.anchor.setTo(0.5, 0.5);
    
    if (real){
        this.design.scale.set(this.size);
        game.global.depth[2].add(this.design);
    }
    else{
        this.design.scale.set(0.5);
        game.global.depth[5].add(this.design);
    }
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
    this.entity.constraint.setMotorSpeed(0);

    //this.loop = game.time.events.loop(Phaser.Timer.SECOND / 10, this.decreaseHeat, this);
    this.loop = 0;
    this.animation = 0;
    this.speed = 1;
    this.cooldown = 0;
    

    this.allowInput();
    if (real) {
        this.design.kill();
    }
};

Saw.inherits(Building);

Saw.prototype.onDragStart = function(sprite, pointer) {
    //Empty for the moment
    this.panel.isDragged = true;
    this.drag = true;
    sprite.scale.set(0.7, 0.7);
    if (this.panel) {
        this.panel.shown.splice(this, 1);
    }
    this.checkValidity(true);
    this.designCheck();
    for (var i in this.panel.saws) {
        this.panel.saws[i].show();
    }
    
};

Saw.prototype.onDragStop = function() {
    this.panel.isDragged = false;
    game.time.events.remove(this.check.event);
    if (this.valid && game.global.currentLevel.hero.gold >= this.cost[0] && game.global.currentLevel.phase=='constructing') {
        game.global.currentLevel.hero.changeGold(-this.cost[0]);
        this.panel.saws=this.panel.saws.remove(this.current);
        game.global.towers.push(this.current);
    }
    for (var i in this.panel.saws) {
        this.panel.saws[i].hide();
    }
    this.HideDescriptTower();
    this.design.destroy();
    this.panel.reset();
};

Saw.prototype.hit = function(bumper, part) {
    //Gestion de collision
    if (part.sprite !== null) {
        var entity = part.sprite.entity;
        if (entity.lastCollision.length === 0 || entity.lastCollision[0] != bumper) {

            if (this.heat < this.heatLimit && !this.overHeat) {
                this.heat += part.sprite.entity.strength; // + this.heat / this.heatLimit * part.sprite.entity.strength;
                if (this.heat > this.heatLimit - 10) {
                    this.heat = this.heatLimit;
                }
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
                    //part.sprite.entity.stop();
                    part.sprite.entity.add(-250 * cos(angle + this.direction * pi / 2),-200 * sin(angle + this.direction * pi / 2));
                }
            }
        }
    }
    return {};
};

Saw.prototype.update = function() {
    this.loop++;
    this.animation += this.speed;
    if (this.loop >= 6) {
        this.cooldown++;
        this.decreaseHeat();
        this.loop = 0;
    }
    this.design.body.y = this.y + cos(this.animation / 50) * 50;
    this.entity.pivotPoint.body.y = this.y + cos(this.animation / 50) * 50;
    if (this.animation >= 18000) {
        this.animation = 0;
    }
}

Saw.prototype.deleteTower = function() {
    game.global.currentLevel.hero.changeGold(ceil(this.costCalcul() * 0.75));
    game.input.onDown.remove(this.hideButtons, this);
    this.hideMoneyback();
    this.hideUpgradeEffect();
    this.HideDescriptTower();
    this.deleteButton.destroy();
    if (this.level < this.levelMax) {
        this.upgradeButton.destroy();
    }
    else {
        this.maxUpgrade.destroy();
    }
    if (this.stats)
        this.stats.destroy();
    var that=this;
    this.panel.saws.push(that);
    game.global.towers=game.global.towers.remove(that);
    this.heatLimit = 40;
    this.speed = 1;
    this.level = 0;
    this.monsterHitsTotal = 0;
    this.monsterHits = 0;
    this.reset();
    this.hide();
    this.panel.reset();
};

Saw.prototype.decreaseHeat = function() {
    if (this.heat > 0) {
        if (this.cooldown >= 6 / this.speed){
            this.heat--;
            this.cooldown=0;
        }
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

Saw.prototype.show = function() {
    this.design.revive();
};

Saw.prototype.hide = function() {
    this.design.kill();
};

Saw.prototype.upgrade = function() {
    this.level++;
    if (this.direction == 1)
        this.design.loadTexture('saw', this.level + 1);
    else
        this.design.loadTexture('saw', this.level + 2);
    this.speed++;
    this.heatLimit += 40;
    this.damage = {
                base: 20,
                max: 25
            };
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
        this.current=null;
        this.valid=false;
        game.physics.p2.removeConstraint(this.entity.constraint);
        this.entity.constraint = null;
        this.entity.body.destroy();
        this.entity.body = null;
        this.check = {};
        this.check.event = game.time.events.loop(50, function() {
            this.designCheck();
        }, this);
    }
    /*if (bool) {
        this.check = game.add.sprite(this.design.x, this.design.y, 'circle');
        game.global.depth[3].add(this.check);
        this.check.entity = this;
        game.physics.p2.enableBody(this.check);
        this.check.body.clearShapes();
        var sensorShape = this.check.body.addCircle(60);
        sensorShape.sensor = true;
        this.check.body.gravityScale = 0;
        this.check.body.overlap = 0;
        this.check.body.setCollisionGroup(game.global.playerCollisionGroup);
        this.check.body.collides([game.global.playerCollisionGroup]);
        game.global.sensors.push(this.check.body);
        
    }
    else {
        game.time.events.remove(this.check.event);
        this.check.entity = null;
        this.check.destroy();
    }*/
};

Saw.prototype.disable = function() {
    this.design.loadTexture('saw', 0);
    this.design.scale.set(0.5);
    this.entity.constraint.setMotorSpeed(0);
}

Saw.prototype.designCheck = function() {
    this.valid=false;
    if (this.entity) {
        for (var i in this.panel.saws) {
            if (Math.sqrt((this.entity.x - this.panel.saws[i].entity.x) * (this.entity.x - this.panel.saws[i].entity.x) + (this.entity.y - this.panel.saws[i].entity.y) * (this.entity.y - this.panel.saws[i].entity.y)) < 80){
                this.panel.saws[i].entity.loadTexture('saw', 1);
                this.valid=true;
                this.current=this.panel.saws[i];
            }
            else
                this.panel.saws[i].entity.loadTexture('sawError');
        }
    }
    /*this.check.body.reset(this.design.x, this.design.y, true);
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
    }*/
};

Saw.prototype.restart = function() {
    this.entity.body.setCollisionGroup(game.global.playerCollisionGroup);
    this.entity.constraint.setMotorSpeed(this.direction * 5);
    this.monsterHits = 0;
    this.loop=0;
    this.animation = 0;
    if (this.blocker)
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
    this.animation= 0;
    this.loop = 0;
    this.design.body.x = this.x + this.direction * this.heat / this.heatLimit * 40;
    this.entity.pivotPoint.body.x = this.x + this.direction * this.heat / this.heatLimit * 40;
    this.design.body.y = this.y;
    this.entity.pivotPoint.body.y = this.y;
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
            infos.name = 'Circular thing (base)';
            infos.description += 'Warning, pointy !';
            break;
        case 1:
            infos.name += 'Circular saw (lvl 1)';
            infos.description += 'Cutin\', choppin\' !';
            break;
    }
    infos.description += '\nDamage: ' + this.damage.base + '-' + this.damage.max +
        '\nHeat limit: ' + this.heatLimit +
        '\nSpeed: ' + this.speed;

    return infos;
};
