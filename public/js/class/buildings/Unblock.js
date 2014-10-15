var Unblock = function(x, y){
    this.entity = game.add.sprite(x, y+5);
    game.physics.p2.enableBody(this.entity);

    this.entity.body.setCircle(8);
    this.entity.body.setCollisionGroup(game.global.playerCollisionGroup);
    this.entity.body.collides(game.global.enemiesCollisionGroup);
    this.entity.pivotPoint = game.add.sprite(x,y+5);
    //Physics of the pivot : static, no collision, revolute constraint with upper/lower limit
    game.physics.p2.enable(this.entity.pivotPoint);
    this.entity.pivotPoint.body.static = true;
    this.entity.pivotPoint.body.clearCollision(true, true);
    this.entity.constraint = game.physics.p2.createRevoluteConstraint(this.entity, [0,0],
        this.entity.pivotPoint, [0, 0]);
};

Unblock.prototype.destroy = function(){
    game.physics.p2.removeConstraint(this.entity.constraint);
    this.entity.pivotPoint.destroy();
    this.entity.destroy();
}