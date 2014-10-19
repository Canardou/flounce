/*global Monster,game,pi,cos,sin,def,isDef,rand,inh from utils.js*/
var Ghost = function(x, y, life, gold, value, strength, decay, damage, hero, vx, vy) {
    Monster.call(this, life, gold, value, strength, decay, damage, hero);

    var head = game.add.sprite(x, y, 'guy_head');
    this.parts.push(head);
    game.physics.p2.enableBody(head, true);
    head.body.setCircle(12);
    this.body = head.body;
    this.body.velocity.x = def(vx, Math.random() * 2000 - 1000);
    this.body.velocity.y = -def(vy, Math.random() * 1000);
    this.body.mass = 4;
    this.body.gravityScale = -1;


    //Head
    var chest = game.add.sprite(x, y - 16, 'guy_body');
    this.parts.push(chest);
    game.physics.p2.enableBody(chest, true);
    chest.body.setRectangle(24, 20);

    chest.revolute = game.physics.p2.createRevoluteConstraint(head, [0, 12], chest, [0, -5]);
    chest.revolute.collideConnected = false;
    chest.revolute.upperLimitEnabled = true;
    chest.revolute.lowerLimitEnabled = true;
    chest.revolute.lowerLimit = -0.5;
    chest.revolute.upperLimit = 0.5;
    chest.body.mass = 4;
    this.constraints.push(chest.revolute);
    //head.rotation = game.physics.p2.createRotationalSpring(head, chest, 0, 5, 1);
    //this.constraints.push(head.rotation);
    //Arms
    var chest2 = game.add.sprite(x, y - 24, 'guy_body');
    this.parts.push(chest2);
    game.physics.p2.enableBody(chest2, true);
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
        game.global.depth[1].add(this.parts[i]);
    }

    this.updateCollision();
};

inh(Ghost, Monster);

Ghost.prototype.update = function() {
    this.loop++;
    if (this.loop >= 6) {
        this.moves ++;
        if(this.moves>=3){
        this.body.velocity.x = Math.random() * 500 - 250;
        this.body.velocity.y = -Math.random() * 25;
        this.moves=0;
        }
        this.stopCombo();
        this.loop = 0;
    }
}