/*global Monster,game,pi,cos,sin,def,isDef,rand,inh from utils.js*/
var Skeleton = function(x, y, life, gold, value, strengh, decay, damage, hero, vx, vy, variation) {
    Monster.call(this, life, gold, value, strengh, decay, damage, hero);
    var bones = 'bone';
    if(variation === 1){
        bones = 'charlie_bone';
    }
    //skeletoooooon !
    var chest = game.add.sprite(x, y, 'skeleton');
    this.parts.push(chest);
    game.physics.p2.enableBody(chest);
    chest.body.setRectangle(8, 16);

    this.body=chest.body;
    this.body.velocity.x=Math.random()*2000-1000;
    this.body.velocity.y=-Math.random()*1000;
    //Head
    var head = game.add.sprite(x, y - 13, 'guy_head');
    this.parts.push(head);
    game.physics.p2.enableBody(head);
    head.body.setCircle(5);
    head.revolute = game.physics.p2.createRevoluteConstraint(head, [0, 5], chest, [0, -8]);
    head.revolute.collideConnected = false;
    head.revolute.upperLimitEnabled = true;
    head.revolute.lowerLimitEnabled = true;
    head.revolute.lowerLimit = -0.5;
    head.revolute.upperLimit = 0.5;
    this.constraints.push(head.revolute);
    //head.rotation = game.physics.p2.createRotationalSpring(head, chest, 0, 5, 1);
    //this.constraints.push(head.rotation);
    //Arms
    var left_arm = game.add.sprite(x - 4, y - 4, bones);
    this.parts.push(left_arm);
    game.physics.p2.enableBody(left_arm);
    left_arm.body.setRectangle(4, 8);
    left_arm.revolute = game.physics.p2.createRevoluteConstraint(left_arm, [0, -4], chest, [-4, -8]);
    left_arm.revolute.collideConnected = false;
    this.constraints.push(left_arm.revolute);
    
    var left_hand = game.add.sprite(x - 4, y + 4, bones);
    this.parts.push(left_hand);
    game.physics.p2.enableBody(left_hand);
    left_hand.body.setRectangle(4, 8);
    left_hand.revolute = game.physics.p2.createRevoluteConstraint(left_hand, [0, -4], left_arm, [0, 4]);
    left_hand.revolute.collideConnected = false;
    left_hand.revolute.upperLimitEnabled = true;
    left_hand.revolute.lowerLimitEnabled = true;
    left_hand.revolute.lowerLimit = -1;
    left_hand.revolute.upperLimit = 1;
    this.constraints.push(left_hand.revolute);
    
    var right_arm = game.add.sprite(x + 4, y - 4, bones);
    this.parts.push(right_arm);
    game.physics.p2.enableBody(right_arm);
    right_arm.body.setRectangle(4, 8);
    right_arm.revolute = game.physics.p2.createRevoluteConstraint(right_arm, [0, -4], chest, [4, -8]);
    right_arm.revolute.collideConnected = false;
    this.constraints.push(right_arm.revolute);
    
    var right_hand = game.add.sprite(x + 4, y + 4, bones);
    this.parts.push(right_hand);
    game.physics.p2.enableBody(right_hand);
    right_hand.body.setRectangle(4, 8);
    right_hand.revolute = game.physics.p2.createRevoluteConstraint(right_hand, [0, -4], right_arm, [0, 4]);
    right_hand.revolute.collideConnected = false;
    right_hand.revolute.upperLimitEnabled = true;
    right_hand.revolute.lowerLimitEnabled = true;
    right_hand.revolute.lowerLimit = -1;
    right_hand.revolute.upperLimit = 1;
    this.constraints.push(right_hand.revolute);
    //Legs
    var left_leg = game.add.sprite(x - 2, y + 8, bones);
    this.parts.push(left_leg);
    game.physics.p2.enableBody(left_leg);
    left_leg.body.setRectangle(4, 8);
    left_leg.revolute = game.physics.p2.createRevoluteConstraint(left_leg, [0, -4], chest, [-2, 8]);
    left_leg.revolute.collideConnected = false;
    left_leg.revolute.upperLimitEnabled = true;
    left_leg.revolute.lowerLimitEnabled = true;
    left_leg.revolute.lowerLimit = -1.5;
    left_leg.revolute.upperLimit = 1;
    this.constraints.push(left_leg.revolute);
    
    var left_foot = game.add.sprite(x - 2, y + 16, bones);
    this.parts.push(left_foot);
    game.physics.p2.enableBody(left_foot);
    left_foot.body.setRectangle(4, 8);
    left_foot.revolute = game.physics.p2.createRevoluteConstraint(left_foot, [0, -4], left_leg, [0, 4]);
    left_foot.revolute.collideConnected = false;
    left_foot.revolute.upperLimitEnabled = true;
    left_foot.revolute.lowerLimitEnabled = true;
    left_foot.revolute.lowerLimit = 0;
    left_foot.revolute.upperLimit = 1;
    this.constraints.push(left_foot.revolute);
    
    var right_leg = game.add.sprite(x + 2, y + 8, bones);
    this.parts.push(right_leg);
    game.physics.p2.enableBody(right_leg);
    right_leg.body.setRectangle(4, 8);
    right_leg.revolute = game.physics.p2.createRevoluteConstraint(right_leg, [0, -4], chest, [2, 8]);
    right_leg.revolute.collideConnected = false;
    right_leg.revolute.upperLimitEnabled = true;
    right_leg.revolute.lowerLimitEnabled = true;
    right_leg.revolute.lowerLimit = -1;
    right_leg.revolute.upperLimit = 1.5;
    this.constraints.push(right_leg.revolute);
    
    var right_foot = game.add.sprite(x + 2, y + 16, bones);
    this.parts.push(right_foot);
    game.physics.p2.enableBody(right_foot);
    right_foot.body.setRectangle(4, 8);
    right_foot.revolute = game.physics.p2.createRevoluteConstraint(right_foot, [0, -4], right_leg, [0, 4]);
    right_foot.revolute.collideConnected = false;
    right_foot.revolute.upperLimitEnabled = true;
    right_foot.revolute.lowerLimitEnabled = true;
    right_foot.revolute.lowerLimit = -1;
    right_foot.revolute.upperLimit = 0;
    this.constraints.push(right_foot.revolute);
    
    for(var i in this.parts){
        this.parts[i].entity=this;
        game.global.depth[1].add(this.parts[i]);
    }
    
    this.updateCollision();
};

inh(Skeleton, Monster);