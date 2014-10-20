//var test=new Building({base:50,max:150});
var Building = function(damage, cost) {
    this.design;
    this.entity;
    this.damage = {
        base: def(damage.base, 0),
        max: def(damage.max, 0),
        critMult: def(damage.critMult, 2),
        critOdds: def(damage.critOdds, 0)
    };
    this.level = 0;
    this.levelMax = 0;
    this.cost = [];
    this.deleteButton;
    this.upgradeButton;
    this.monsterHitsTotal = 0;
    this.monsterHits = 0;
    this.stats;
    this.valid = false;
    this.infos;
    this.drag = false;
    this.buttons = false;
};

Building.prototype.available = 0;

Building.prototype.getDamage = function(body1, body2) {
    if (rand(100, 0) < this.damage.critOdds)
        return {
            damage: floor(this.damage.max * rand(this.damage.critMult, 1)),
            crit: true
        };
    else
        return {
            damage: floor(rand(this.damage.max, this.damage.base)),
            crit: false
        };
};

Building.prototype.hit = function(building, enemy) {
    //Gestion de collision
    if (enemy.sprite !== null) {
        var entity = enemy.sprite.entity;
        if (entity.lastCollision.length === 0 || entity.lastCollision[0] != building) {
            var retour = this.getDamage(building, enemy);
            if (retour.damage !== 0) {
                //text !
                console.log(retour.damage);
                entity.lastCollision.unshift(building);
                game.time.events.add(1000, function() {
                    if (entity.sprite)
                        entity.lastCollision.pop();
                }, this);
                entity.getHit(retour.damage); //DAMAGE!
                return retour;
            }
        }
    }
    return {};
};

Building.prototype.allowInput = function() {
    this.design.inputEnabled = true;
    this.design.input.useHandCursor = true;
    this.design.events.onInputOver.add(this.descriptTower, this);
    this.design.events.onInputUp.add(this.statsTower, this);
    this.design.events.onInputOut.add(this.HideDescriptTower, this);
    this.design.events.onDragStart.add(this.onDragStart, this);
    this.design.events.onDragStop.add(this.onDragStop, this);
}

Building.prototype.allowClick = function() {
    this.design.input.disableDrag();
};

Building.prototype.allowMouseOver = function() {

};

Building.prototype.allowDrag = function() {
    this.design.input.enableDrag(true);
};

Building.prototype.stopDrag = function() {
    this.design.input.disableDrag();
    this.drag = false;
};

Building.prototype.onDragStart = function(sprite, pointer) {
    //Empty for the moment
    this.drag = true;
    sprite.scale.set(0.7, 0.7);
    if (this.panel) {
        this.panel.shown.splice(this, 1);
    }
    this.checkValidity(true);
    this.designCheck();
};

Building.prototype.onDragStop = function(sprite, pointer) {
    this.design.x = pointer.x;
    this.design.y = pointer.y;
    this.entity.body.x = pointer.x;
    this.entity.body.y = pointer.y;
    sprite.scale.set(0.5, 0.5);
    this.designCheck();
    this.checkValidity(false);
    if (this.valid && game.global.currentLevel.hero.gold >= this.cost[0] && game.global.currentLevel.phase=='constructing') {
        game.global.currentLevel.hero.changeGold(-this.cost[0]);
        game.global.towers.push(this);
        this.stopDrag();
        this.allowClick();
        this.allowMouseOver();
    }
    if (!this.valid || game.global.currentLevel.phase!='constructing') {
        if (this.stats){
            this.stats.destroy();
            this.statsInfobox.destroy();
        }
        this.HideDescriptTower();
        this.destroy();
    }
    if (this.panel) {
        this.panel.reset();
        //this.panel = null;
    }


};

Building.prototype.statsTower = function() {
    //Show the delete button
    if (!this.drag && !this.buttons) {
        this.buttons = true;
        game.input.onDown.add(this.hideButtons, this); //Surcharge de game.input.onDown ? Penser à supprimer
        if (game.global.currentLevel.phase === "constructing") {
            this.deleteButton = game.add.button(this.entity.body.x, this.entity.body.y, 'delete');
            this.deleteButton.onInputDown.add(this.deleteTower, this);
            this.deleteButton.input.useHandCursor = true;
            this.deleteButton.scale.x = 0.25;
            this.deleteButton.scale.y = 0.25;
            this.deleteButton.events.onInputOver.add(this.moneyback, this);
            this.deleteButton.events.onInputOut.add(this.hideMoneyback, this);
            //Upgrade Button
            if (this.level < this.levelMax) {
                this.upgradeButton = game.add.button(this.entity.body.x - 40, this.entity.body.y, 'upgrade');
                this.upgradeButton.onInputDown.add(this.upgradeTower, this);
                this.upgradeButton.input.useHandCursor = true;
                this.upgradeButton.scale.x = 0.25;
                this.upgradeButton.scale.y = 0.25;
                this.upgradeButton.events.onInputOver.add(this.upgradeEffect, this);
                this.upgradeButton.events.onInputOut.add(this.hideUpgradeEffect, this);
            }
            else {
                this.maxUpgrade = game.add.text(this.entity.body.x - 45, this.entity.body.y + 5, 'MAX');
                this.maxUpgrade.style.fill = '#FF1E02';
                this.maxUpgrade.style.font = '18px bd_cartoon_shoutregular';
            }
        }


        //Show the stats (number of monster touched && damage dealt)
        var stats = "Current wave: " + this.monsterHits +  "\n      Total: " + this.monsterHitsTotal;
        this.statsInfobox = game.add.sprite(this.entity.body.x - 95, this.entity.body.y + 30, 'infobox');
        this.statsInfobox.scale.y = 1;
        this.statsInfobox.scale.x = 0.7;
        this.statsInfobox.alpha = 0.9;

        this.stats = game.add.text(this.entity.body.x - 85, this.entity.body.y + 30, stats, {
            'font': '25px Indie Flower',
            'fill': 'white'
        });
    }

};

Building.prototype.descriptTower = function() {
    //console.log("Description test success");
    this.HideDescriptTower();

    this.infobox = game.add.sprite(180, 960, 'infobox');
    this.infobox.scale.y = 2.7;
    this.infobox.scale.x = 1.05;
    this.infobox.alpha = 0.9;
    this.infobox.inputEnabled = true;
    this.infobox.events.onInputOver.add(this.HideDescriptTower,this);
    //Cost, damage, percentage of crits and description of the tower
    this.infos = this.findInfos();
    //Name of the tower
    this.nameToAdd = game.add.text(185, 960, this.infos.name);
    this.nameToAdd.style.fill = 'white';
    this.nameToAdd.style.font = 'bold 25px Indie Flower';
    //Description of the tower
    this.descToAdd = game.add.text(185, 990, this.infos.description);
    this.descToAdd.style.fill = 'white';
    this.descToAdd.style.font = 'bold 20px Indie Flower';
    //Cost
    this.showCost = game.add.text(340, 1020, 'Cost: ' + this.costCalcul());
    this.showCost.style.fill = 'white';
    this.showCost.style.font = 'bold 20px Indie Flower';
};

Building.prototype.HideDescriptTower = function() {
    if (this.infobox) {
        this.infobox.events.onInputOver.removeAll();
        this.infobox.destroy();
        this.infobox = null;
        this.nameToAdd.destroy();
        this.nameToAdd = null;
        this.descToAdd.destroy();
        this.descToAdd = null;
        this.showCost.destroy();
        this.showCost = null;
    }
};

Building.prototype.deleteTower = function() {
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
    if (this.stats){
        this.stats.destroy();
        this.statsInfobox.destroy();
    }
    this.destroy();
    this.panel.reset();
};

Building.prototype.restart = function(){
    this.monsterHits=0;
}

Building.prototype.upgradeTower = function() {
    if (game.global.currentLevel.hero.gold >= this.cost[this.level + 1]) {
        game.global.currentLevel.hero.changeGold(-this.cost[this.level + 1]);
        this.upgrade();
        this.panel.reset();
        this.hideUpgradeEffect();
        this.upgradeEffect();
    }
    if (this.level === this.levelMax) {
        this.hideUpgradeEffect();
        this.upgradeButton.destroy();
        this.maxUpgrade = game.add.text(this.entity.body.x - 45, this.entity.body.y + 5, 'MAX');
        this.maxUpgrade.style.fill = '#FF1E02';
        this.maxUpgrade.style.font = '18px bd_cartoon_shoutregular';
    }
};

Building.prototype.upgrade = function() {};
Building.prototype.findInfos = function() {};

Building.prototype.hideButtons = function() {
    if (this.buttons) {
        if (this.deleteButton && !this.deleteButton.input.checkPointerOver(game.input.mousePointer)) {
            if (this.upgradeButton && !this.upgradeButton.input.checkPointerOver(game.input.mousePointer)) {
                if (this.level === this.levelMax) {
                    this.maxUpgrade.destroy();
                }
                else {
                    this.upgradeButton.destroy();
                }
                this.deleteButton.destroy();
                game.input.onDown.remove(this.hideButtons, this);
                this.buttons = false;
            }
        }
        else {
            game.input.onDown.remove(this.hideButtons, this);
            this.buttons = false;
        }
    }
    if (this.stats) {
        this.stats.destroy();
    }
    if(this.statsInfobox)
        this.statsInfobox.destroy();

};

Building.prototype.costCalcul = function() {
    var sum = 0;
    for (var i = 0; i <= this.level; i++) {
        sum += this.cost[i]; //Iterate over your first array and then grab the second element add the values up
    }
    return sum;
};

Building.prototype.moneyback = function() {
    if (this.stats) {
        this.stats.destroy();
        this.statsInfobox.destroy();
    }
    this.hideMoneyback();
    this.deleteButton.infobox = game.add.sprite(this.entity.body.x - 35, this.entity.body.y + 30, 'infobox');
    this.deleteButton.infobox.scale.y = 0.6;
    this.deleteButton.infobox.scale.x = 0.3;
    this.deleteButton.infobox.alpha = 0.9;
    this.deleteButton.infobox.text = game.add.text(this.entity.body.x - 35, this.entity.body.y + 30, '+' + ceil(this.costCalcul() * 0.75));
    this.deleteButton.infobox.text.style.fill = 'white';
    this.deleteButton.infobox.text.style.font = '28px Indie Flower';
    this.deleteButton.infobox.sprite = game.add.sprite(this.entity.body.x + 18, this.entity.body.y + 35, 'gold', 4);
};

Building.prototype.hideMoneyback = function() {
    if (this.deleteButton.infobox) {
        this.deleteButton.infobox.sprite.destroy();
        this.deleteButton.infobox.text.destroy();
        this.deleteButton.infobox.destroy();
        this.deleteButton.infobox = null;
    }
};

Building.prototype.upgradeEffect = function() {
    if (this.stats) {
        this.stats.destroy();
        this.statsInfobox.destroy();
        this.stats = null;
    }
    this.hideUpgradeEffect();
    this.upgradeButton.infobox = game.add.sprite(this.entity.body.x - 35, this.entity.body.y + 30, 'infobox');
    this.upgradeButton.infobox.scale.y = 0.6;
    this.upgradeButton.infobox.scale.x = 0.25;
    this.upgradeButton.infobox.alpha = 0.9;
    //Name of the tower
    this.upgradeButton.infobox.text = game.add.text(this.entity.body.x - 35, this.entity.body.y + 30, '-' + this.cost[this.level + 1]);
    this.upgradeButton.infobox.text.style.fill = 'white';
    this.upgradeButton.infobox.text.style.font = '28px Indie Flower';
    this.upgradeButton.infobox.sprite = game.add.sprite(this.entity.body.x + 10, this.entity.body.y + 35, 'gold', 4);
};

Building.prototype.hideUpgradeEffect = function() {
    if (this.upgradeButton.infobox) {
        this.upgradeButton.infobox.sprite.destroy();
        this.upgradeButton.infobox.text.destroy();
        this.upgradeButton.infobox.destroy();
        this.upgradeButton.infobox = null;
    }
};
