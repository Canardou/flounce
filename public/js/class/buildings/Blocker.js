/**
 * create a simple Blocker on the map
 */
var Blocker = function(x, y, angle){
    this.entity = game.add.sprite(x, y, 'blocker');
    game.physics.p2.enableBody(this.entity);
    this.entity.body.angle = angle;
    this.entity.body.setCollisionGroup(game.global.playerCollisionGroup);
    this.entity.body.collides(game.global.enemiesCollisionGroup);
    this.entity.body.collides(game.global.limbsCollisionGroup);
    this.entity.body.kinematic=true;
    game.global.depth[2].add(this.entity);
    this.entity.kill();
}

Blocker.prototype.destroy = function(){
    this.entity.destroy();
}