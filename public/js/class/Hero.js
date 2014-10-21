var Hero = function(life, gold, printText, power) {
    this.life = def(life, 20);
    this.points = 0;
    this.gold = def(gold, 2000);
    this.printText = def(printText, true);
    this.power = def(power, false);
    this.dead = false;
    this.deadSound = game.add.audio('loose');
    this.monsterKilledDuringCurrentWave = 0;

    this.lifeLostPerWave = [];
    this.lifeLostPerWave[0] = 0;
    this.time = 0;
    this.seconds = 0;
    this.minutes = 0;

    var height = 1100;
    this.entity = game.add.sprite(game.global.width / 2, game.global.height - (1138 - height) / 2);
    game.physics.p2.enableBody(this.entity);
    this.entity.body.setRectangle(640, 1138 - height);

    this.entity.body.setCollisionGroup(game.global.playerCollisionGroup);
    this.entity.body.collides(game.global.enemiesCollisionGroup, this.getHit, this);
    this.entity.renderable = false;
    this.entity.body.static = true;

    if (this.printText) {
        this.lifeText2 = game.add.text(526, 1001, '' + this.life, {
            fill: 'black',
            font: '25px "moderne_frakturregular"'
        });
        this.lifeText = game.add.text(525, 1000, '' + this.life, {
            fill: 'white',
            font: '25px "moderne_frakturregular"'
        });
        this.pointsText2 = game.add.text(526, 1071, '' + this.points, {
            fill: 'black',
            font: '25px "moderne_frakturregular"'
        });
        this.pointsText = game.add.text(525, 1070, '' + this.points, {
            fill: 'white',
            font: '25px "moderne_frakturregular"'
        });
        this.goldText2 = game.add.text(526, 1036, '' + this.gold, {
            fill: 'black',
            font: '25px "moderne_frakturregular"'
        });
        this.goldText = game.add.text(525, 1035, '' + this.gold, {
            fill: 'white',
            font: '25px "moderne_frakturregular"'
        });
        this.timeText2 = game.add.text(556, 1101, '0:00', {
            fill: 'black',
            font: '25px "moderne_frakturregular"'
        });
        this.timeText = game.add.text(555, 1100, '0:00', {
            fill: 'white',
            font: '25px "moderne_frakturregular"'
        });
    }

    this.looseLife = game.add.audio('guyPain3');
    this.looseLife.volume = 0.5;

};

Hero.prototype.die = function() {
    this.dead = true;
    if (game.global.currentLevel && game.global.currentLevel !== null) {
        if (game.global.currentLevel.hero.life <= 0) {
            var gameOver = game.add.text(game.world.centerX, game.world.centerY, "You lose");
            gameOver.fill = '#700E0D';
            gameOver.anchor.setTo(0.5);
            gameOver.fontSize = 80;
            gameOver.tween = game.add.tween(gameOver);
            gameOver.tween.to({
                angle: 360
            }, 1500, null, true, 0, 1, false);
            gameOver.scale.x = 0.1;
            gameOver.scale.y = 0.1;
            gameOver.scaleTween = game.add.tween(gameOver.scale);
            gameOver.scaleTween.to({
                x: 1,
                y: 1
            }, 6000, null, true).onComplete.add(function() {
                gameOver.destroy();
                game.state.start('end');
            }, this);
            this.deadSound.play();
        }
    }
};

Hero.prototype.getHit = function(hero, monster) {
    if (!this.dead) {
        new TextGold(monster.x, monster.y, -monster.sprite.entity.damage);
        this.changeLife(-monster.sprite.entity.damage);
        if (monster.sprite.entity.damage > 0) {
            this.lifeLostPerWave[game.global.currentLevel.countWave] += monster.sprite.entity.damage;
            this.looseLife.play();
        }

        if (this.life <= 0) {
            this.life = 0;
            this.die();
        }
        /*this.changeGold(-monster.sprite.entity.gold);
        if (this.gold < 0) {
            this.changeGold (-(this.gold));
        }*/
    }
    monster.sprite.entity.dieWithoutGlory();
};

//Use the special power of our hero => just a draft
Hero.prototype.usePower = function(powerName) {
    if (this.power && powerName === "HEAL") {
        this.life += 5;
    }
};

Hero.prototype.changeGold = function(amount) {
    if (this.printText) {
        this.gold += amount;
        this.goldText2.setText(this.gold);
        this.goldText.setText(this.gold);
    }

};

Hero.prototype.changePoints = function(amount) {
    if (this.printText) {
        this.points += amount;
        this.pointsText2.setText(this.points);
        this.pointsText.setText(this.points);
    }
};

Hero.prototype.changeLife = function(amount) {
    if (this.printText) {
        this.life += amount;
        this.lifeText2.setText(this.life);
        this.lifeText.setText(this.life);
    }
};

Hero.prototype.addTime = function() {
    if (this.printText) {
        if (!this.dead) {
            this.time++;
            if (this.time >= 60) {
                this.time = 0;
                this.seconds++;
                if (this.seconds >= 60) {
                    this.seconds = 0;
                    this.minutes++;
                }
                if (this.seconds < 10) {
                    this.timeText2.setText(this.minutes + ":0" + this.seconds);
                    this.timeText.setText(this.minutes + ":0" + this.seconds);
                }
                else {
                    this.timeText2.setText(this.minutes + ":" + this.seconds);
                    this.timeText.setText(this.minutes + ":" + this.seconds);
                }
            }
        }
    }
};

Hero.prototype.scoreTime = function(limit) {
    if (!this.dead)
        return Math.floor((limit - (this.minutes + this.seconds / 60)) * 100)
    else
        return 0;
}

Hero.prototype.destroy = function() {
    this.lifeLostPerWave = [];
    this.entity.destroy();
    if (this.printText) {
        this.lifeText2.destroy();
        this.lifeText.destroy();
        this.pointsText2.destroy();
        this.pointsText.destroy();
        this.goldText2.destroy();
        this.goldText.destroy();
    }
};
