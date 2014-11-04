/*global Monster,game,pi,cos,sin,def,isDef,rand,inh from utils.js*/
/**
 * Ghost class
 */
var Ghost = function(x, y, life, gold, value, strength, decay, damage, hero, vx, vy) {
    Monster.call(this, life, gold, value, strength, decay, damage, hero);

    var head = game.add.sprite(x, y, 'ghost0');
    this.parts.push(head);
    game.physics.p2.enableBody(head);
    head.body.setCircle(12);
    this.body = head.body;
    this.body.velocity.x = def(vx, Math.random() * 2000 - 1000);
    this.body.velocity.y = -def(vy, Math.random() * 1000);
    this.body.mass = 4;


    //Head
    var chest = game.add.sprite(x, y - 16, 'ghost1');
    this.parts.push(chest);
    game.physics.p2.enableBody(chest);
    chest.body.setRectangle(24, 20);

    chest.revolute = game.physics.p2.createRevoluteConstraint(head, [0, 12], chest, [0, -5]);
    chest.revolute.collideConnected = false;
    chest.revolute.upperLimitEnabled = true;
    chest.revolute.lowerLimitEnabled = true;
    chest.revolute.lowerLimit = -0.5;
    chest.revolute.upperLimit = 0.5;
    chest.body.mass = 4;
    this.constraints.push(chest.revolute);
    //Arms
    var chest2 = game.add.sprite(x, y - 24, 'ghost2');
    this.parts.push(chest2);
    game.physics.p2.enableBody(chest2);
    chest2.body.setRectangle(24, 20);
    chest2.revolute = game.physics.p2.createRevoluteConstraint(chest, [0, 5], chest2, [0, -5]);
    chest2.revolute.collideConnected = false;
    chest2.revolute.upperLimitEnabled = true;
    chest2.revolute.lowerLimitEnabled = true;
    chest2.revolute.lowerLimit = -0.5;
    chest2.revolute.upperLimit = 0.5;
    chest2.body.mass = 4;
    this.constraints.push(chest2.revolute);

    this.moves = 0;
    for (var i in this.parts) {
        this.parts[i].entity = this;
        game.global.depth[4].add(this.parts[i]);
    }

    this.updateCollision();
};

Ghost.inherits(Monster);

Ghost.prototype.destroy = function() {
    var ghost = this;
    if (!this.isDestroy) {
        for (var item in this.parts) {
            var that = this.parts[item];
            that.body.setCollisionGroup(game.global.limbsCollisionGroup);
            that.body.collides([game.global.wallsCollisionGroup, game.global.playerCollisionGroup]);
            that.body.collideWorldBounds = false;
            that.checkWorldBounds = true;
            that.tween = game.add.tween(this.parts[item]).to({
                alpha: 0
            }, 1000, Phaser.Easing.Exponential.In, true, 0, false);
        }
        setTimeout(function() {
            ghost.remove(ghost)
        }, 1000);
        game.global.monsters = game.global.monsters.remove(this);
    }
};

Ghost.prototype.remove = function(ghost) {
    if (!ghost.isDestroy) {
        var destroy = function() {
            ghost.destroy();
        };
        for (var item in ghost.constraints)
            game.physics.p2.removeConstraint(ghost.constraints[item]);
        for (var item in ghost.parts) {
            var that = ghost.parts[item];

            //Remove parent class
            that.entity = null;

            that.body.setCollisionGroup(game.global.limbsCollisionGroup);
            that.body.collides([game.global.wallsCollisionGroup, game.global.playerCollisionGroup]);
            that.body.collideWorldBounds = false;
            that.checkWorldBounds = true;

            //Remove out of bounds parts
            that.outOfBoundsKill = true;
            //Make the parts disapear after 5 seconds, exponential fade out : slow at start
            that.destroy();

        }

        ghost.constraints = [];
        ghost.parts = [];
        ghost.entity = null;
        ghost.isDestroy = true;
        ghost.body = null;
        game.global.monsters = game.global.monsters.remove(ghost);
    }
};

Ghost.prototype.update = function() {
    this.loop++;
    if (this.loop >= 6) {
        this.moves++;
        if (this.moves >= 3) {
            this.body.velocity.x = Math.random() * 500 - 250;
            this.body.velocity.y = -Math.random() * 25;
            this.moves = 0;
        }
        this.stopCombo();
        this.loop = 0;
    }
}