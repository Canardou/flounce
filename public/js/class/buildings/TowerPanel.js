/**
 * Generate the left panel with towers
 */
var TowerPanel = function() {
    this.sprite = game.add.sprite(0, 950, 'wood_frame');
    this.sprite.scale.x = 0.24;
    this.sprite.scale.y = 0.8;

    this.towers = [];
    this.shown = [];
    this.saws = [];
    this.design;
    this.isDragged = false;

    game.global.depth[15].add(this.sprite);
};


TowerPanel.prototype.setTowers = function(towers) {
    this.towers = towers;
};

TowerPanel.prototype.reset = function() {
    if (this.shown) {
        while (this.shown.length > 0) {
            var tower = this.shown.pop();
            if (tower.nonAvailable)
                tower.nonAvailable.destroy();
            tower.destroy();
        }
    }
    for (var i = 0; i < this.towers.length; i++) {

        var tower = new this.towers[i]({
            base: 10,
            max: 20
        }, 70, 1000 + (i * 75));
        this.shown.push(tower);
        tower.drag = true;
        if (tower.available < game.global.currentLevel.countWave && game.global.currentLevel && game.global.currentLevel.hero.gold >= tower.cost[0] && game.global.currentLevel.phase=='constructing') {
            tower.allowDrag();
        }
        else {
            if (tower.available >= game.global.currentLevel.countWave) {
                tower.nonAvailable = game.add.text(tower.entity.x - 40, tower.entity.y - 5, 'Wave ' + (tower.available + 1));
                tower.nonAvailable.style.fill = '#FF1E02';
                tower.nonAvailable.style.font = '18px bd_cartoon_shoutregular';
            }
            tower.disable();
        }
        tower.panel = this;
    }

    if (game.global.currentLevel && game.global.currentLevel.countWave === 1)
        var showGold = new TextHint('Oh my Gold !', 400, 1045, '#E8B71A');
};

TowerPanel.prototype.greyTower = function() {
    for (var i = this.shown.length - 1; i >= 0; i--) {
        this.shown[i].disable();
        this.shown[i].design.input.disableDrag();
        //this.shown[i].events.onInputUp.removeAll();
    }
    for (var i in this.saws) {
        this.saws[i].hide();
    }

    if (game.global.currentLevel && game.global.currentLevel.countWave === 2)
        var showPoints = new TextHint('Hard score gamer ?', 360, 1080, '#ff7f00');
};

TowerPanel.prototype.destroy = function() {
    this.sprite.destroy();
    this.shown = [];
    this.towers = [];
};
