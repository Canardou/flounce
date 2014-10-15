var TowerPanel = function() {
	this.sprite = game.add.sprite(0, 950, 'wood_frame');
	this.sprite.scale.x = 0.24;
	this.sprite.scale.y = 0.8;

	this.towers = [];
    this.shown = [];
    this.design;

	game.global.depth[4].add(this.sprite);
};


TowerPanel.prototype.setTowers = function(towers) {
    this.towers = towers;
};

TowerPanel.prototype.activateTower = function() {// A lancer dans Niveau.js ligne 46
    if(this.shown){
		while (this.shown.length > 0) {
			(this.shown.pop()).destroy();
		}
    }
    for (var i = 0; i < this.towers.length; i++) {
        var tower = new this.towers[i]({
            base: 10,
            max: 20
        }, 70, 1000 + (i * 75));
        this.shown.push(tower);
        tower.drag=true;
        if(game.global.currentLevel && game.global.currentLevel.hero.gold >= tower.cost[0]){
            tower.allowDrag();
        }
        else{
            tower.design.loadTexture('bumperDisable');
            tower.design.scale.set(0.5);
        }
        tower.panel=this;
    }

    if(game.global.currentLevel && game.global.currentLevel.countWave === 1)
        var showGold = new TextHint('Oh my Gold !', 400, 1045, '#E8B71A');
};

TowerPanel.prototype.reset = function() {
    while (this.shown.length > 0) {
        (this.shown.pop()).destroy();
    }
    for (var i = 0; i < this.towers.length; i++) {
        var tower = new this.towers[i]({
            base: 10,
            max: 20
        }, 70, 1000 + (i * 75));
        this.shown.push(tower);
        tower.drag=true;
        if(game.global.currentLevel && game.global.currentLevel.hero.gold >= tower.cost[0]){
            tower.allowDrag();
        }
        else{
			tower.design.loadTexture('bumperDisable');
			tower.design.scale.set(0.5);
        }
        tower.panel=this;
    }
};

TowerPanel.prototype.greyTower = function() {
	for (var i = this.shown.length - 1; i >= 0; i--) {
		this.shown[i].design.loadTexture('bumperDisable');
		this.shown[i].design.scale.set(0.5);
		this.shown[i].design.input.disableDrag();
		//this.shown[i].events.onInputUp.removeAll();
	}

    if(game.global.currentLevel && game.global.currentLevel.countWave === 2)
        var showPoints = new TextHint('Hard score gamer ?', 360, 1080, '#ff7f00');
};

TowerPanel.prototype.destroy = function() {
    this.sprite.destroy();
    this.shown = [];
    this.towers = [];
};


