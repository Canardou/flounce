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
    this.totalDamage = 0;
    this.monsterHits = 0;
    this.stats;
    this.valid = false;
    this.infos;
};

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

Building.prototype.allowDrag = function() {
    this.design.inputEnabled = true;
    this.design.input.enableDrag(true);
    this.design.input.useHandCursor = true;
    this.design.events.onDragStart.add(this.onDragStart, this);
    this.design.events.onDragStop.add(this.onDragStop, this);
};

Building.prototype.stopDrag = function() {
    this.design.input.disableDrag();
    this.design.events.onInputOver.remove(this.descriptTower, this);
};

Building.prototype.onDragStart = function(sprite, pointer) {
    //Empty for the moment
    sprite.scale.set(1.2, 1.2);
    if (this.panel) {
        this.panel.shown.splice(this, 1);
    }
    this.checkValidity(true);
};

Building.prototype.onDragStop = function(sprite, pointer) {
    this.design.x = pointer.x;
    this.design.y = pointer.y;
    this.entity.body.x = pointer.x;
    this.entity.body.y = pointer.y;
    sprite.scale.set(1, 1);
    this.designCheck();
    this.checkValidity(false);
    if (this.valid && game.global.currentLevel.hero.gold >= this.cost[0]) {
        game.global.currentLevel.hero.gold -= this.cost[0];
    }
    if (this.panel) {
        this.panel.reset();
        //this.panel = null;
        this.stopDrag();
        this.allowClick();
        this.allowMouseOver();
    }
    if(!this.valid){
        this.destroy();
    }
    
};

Building.prototype.allowClick = function() {
    this.design.inputEnabled = true;
    this.design.input.disableDrag();
    this.design.input.useHandCursor = true;
    this.design.events.onInputUp.add(this.statsTower, this);
};

Building.prototype.allowMouseOver = function() {
    this.design.inputEnabled = true;
    this.design.events.onInputOver.add(this.descriptTower, this);
    this.design.events.onInputOut.add(this.HideDescriptTower, this);
};

Building.prototype.statsTower = function() {
    //Show the delete button
    game.input.onDown.add(this.hideButtons, this);
    if (game.global.currentLevel.phase === "constructing") {
        this.deleteButton = game.add.button(this.entity.body.x, this.entity.body.y, 'delete');
        this.deleteButton.onInputDown.add(this.deleteTower, this);
        this.deleteButton.input.useHandCursor = true;
        this.deleteButton.scale.x = 0.25;
        this.deleteButton.scale.y = 0.25;
        //Upgrade Button
        if (this.level < this.levelMax) {
            this.upgradeButton = game.add.button(this.entity.body.x - 40, this.entity.body.y, 'upgrade');
            this.upgradeButton.onInputDown.add(this.upgradeTower, this);
            this.upgradeButton.input.useHandCursor = true;
            this.upgradeButton.scale.x = 0.25;
            this.upgradeButton.scale.y = 0.25;
        }
        else{
            //TODO : Have to make a litte "MAX" sign in red
        }
    }

    //Show the stats (number of monster touched && damage dealt)
    stats = "Damage dealt: " + this.totalDamage + "\nMonster hits: " + this.monsterHits;
    var style = {
        'font': 'bold 175% Arial',
        'fill': 'white'
    };
    this.stats = game.add.text(this.entity.body.x - 50, this.entity.body.y + 30, stats, style);

};

Building.prototype.descriptTower = function() {
    //console.log("Description test success");
    this.infobox = game.add.sprite(180,960, 'infobox');
    this.infobox.scale.y = 2.7;
    this.infobox.scale.x = 1.05;
    this.infobox.alpha = 0.9;
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
};

Building.prototype.HideDescriptTower = function() {
    this.infobox.destroy();
    this.infobox = null;
    this.nameToAdd.destroy();
    this.nameToAdd = null;
    this.descToAdd.destroy();
    this.descToAdd = null;
};

Building.prototype.deleteTower = function() {

    game.global.currentLevel.hero.gold += ceil(this.costCalcul()* 0.75);
    game.input.onDown.remove(this.hideButtons, this);
    this.deleteButton.destroy();
    if (this.level < this.levelMax) {
        this.upgradeButton.destroy();
    }
    this.stats.destroy();
    this.destroy();
};

Building.prototype.upgradeTower = function() {
    if (game.global.currentLevel.hero.gold >= this.cost[this.level+1]) {
        game.global.currentLevel.hero.gold -= this.cost[this.level+1];
        this.upgrade();
        this.panel.reset();
    }
    if (this.level === this.levelMax)
        this.upgradeButton.destroy();
};

Building.prototype.upgrade = function(){};
Building.prototype.findInfos = function(){};

Building.prototype.hideButtons = function() {
    if(this.deleteButton && !this.deleteButton.input.checkPointerOver(game.input.mousePointer)){
        if(this.upgradeButton && !this.upgradeButton.input.checkPointerOver(game.input.mousePointer)){
            this.upgradeButton.destroy();
            this.deleteButton.destroy();
        }
    }
    if(this.stats){
        this.stats.destroy();
    }

};

Building.prototype.costCalcul = function() {
	var sum = 0;
	for (var i = 0; i <= this.level; i++) {
		sum += this.cost[i]; //Iterate over your first array and then grab the second element add the values up
	}
	return sum;
};