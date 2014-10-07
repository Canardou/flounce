//Manage towers in-between battle phases
var Panel = function() {
    this.towers = [];
    this.shown = [];
    this.design;
};

Panel.prototype.setTowers = function(towers) {
    this.towers = towers;
};

Panel.prototype.show = function() {
    this.design = game.add.sprite(0, 1000, 'wood_frame');
    game.global.depth[4].add(this.design);
    if(game.global.currentLevel.countWave === 1)
        var showGold = new TextHint('Oh my Gold !', 80, 50, '#E8B71A');
    for (var i = 0; i < this.towers.length; i++) {
        var tower = new this.towers[i]({
            base: 10,
            max: 20
        }, 150 * (i + 1), 1075);
        this.shown.push(tower);
        tower.allowMouseOver(); //En construction
        if(game.global.currentLevel.hero.gold >= tower.cost){
            tower.allowDrag();
    }
        tower.panel=this;
    }
};

Panel.prototype.reset = function() {
    while (this.shown.length > 0) {
        (this.shown.pop()).destroy();
    }
    for (var i = 0; i < this.towers.length; i++) {
        var tower = new this.towers[i]({
            base: 10,
            max: 20
        }, 150 * (i + 1), 1075);
        this.shown.push(tower);
         tower.allowMouseOver(); //En construction
        if(game.global.currentLevel.hero.gold >= tower.cost){
            tower.allowDrag();
        }
        tower.panel=this;
    }
};

Panel.prototype.hide = function() {
    if (this.design)
        this.design.destroy();
    this.design = null;
    while (this.shown.length > 0) {
        (this.shown.pop()).destroy();
    }
};